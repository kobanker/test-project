#!/usr/bin/env bash
#
# Claude Code の Stop フック（＝Claude が一区切りついた瞬間）から呼ばれる。
# その時点の作業差分を Codex に読ませて、指摘を brain/reviews/ に書き出す。
# Codex は読むだけ。ファイルは直さない（--sandbox read-only）。
#
# 環境変数で挙動を変えられる。
#   CODEX_REVIEW_OFF=1    … このフックを黙って止める
#   CODEX_REVIEW_BLOCK=1  … 「要修正」のとき Claude を止めて直させる（既定はログだけ）
#   CODEX_REVIEW_FLAGS    … codex exec に渡す追加フラグ
#
set -uo pipefail

# Stop フックの JSON が stdin に来る。使わないが詰まらせないよう読み捨てる。
cat >/dev/null 2>&1 || true

[ "${CODEX_REVIEW_OFF:-}" = "1" ] && exit 0

# codex が入っていない端末では何もしない（導入前でも邪魔をしないため）
command -v codex >/dev/null 2>&1 || exit 0

cd "${CLAUDE_PROJECT_DIR:-$PWD}" 2>/dev/null || exit 0
git rev-parse HEAD >/dev/null 2>&1 || exit 0

MAX_BYTES=60000

# 日本語のファイル名を git がエスケープして返すと、下の while で中身が読めなくなる。
# 台本や記事のファイル名は日本語が入るので、必ず quotePath を切る。
git_() { git -c core.quotePath=false "$@"; }

# ---- 差分を集める ------------------------------------------------------------
diff_body=$(git_ diff HEAD -- . 2>/dev/null || true)

# 新規ファイルは git diff に出てこないので、中身をそのまま足す。
# note の下書きや台本は「新規ファイル 1 本」で出てくることが多いので、ここが本番。
while IFS= read -r f; do
  [ -f "$f" ] || continue
  case "$f" in brain/reviews/*) continue ;; esac
  diff_body+=$'\n'"===== 新規ファイル: ${f} ====="$'\n'"$(head -c 20000 -- "$f" 2>/dev/null)"
done < <(git_ ls-files --others --exclude-standard 2>/dev/null || true)

# 空白だけなら見るものがない
[ -n "${diff_body//[[:space:]]/}" ] || exit 0

if [ "${#diff_body}" -gt "$MAX_BYTES" ]; then
  diff_body="${diff_body:0:$MAX_BYTES}"$'\n\n（長いので以降を省略した）'
fi

# ---- Codex に投げる ----------------------------------------------------------
read -r -d '' instructions <<'EOS' || true
あなたはこのリポジトリの監視役です。校閲と監査だけを担当し、ファイルは一切変更しないこと。
リポジトリ直下の CLAUDE.md と AGENTS.md、および該当する .claude/skills/*/SKILL.md を読み、
そこに書かれたルールに対して、以下の差分が守れているかを確認してほしい。

特に次の点を厳しく見る。
- 価格・レート・日付などの数字に出典があるか。出典ノートへの [[リンク]] が張られているか。
- 記憶や推測で書いたと疑われる数字が混ざっていないか。
- 断定できないことを断定していないか。
- 常体／敬体、一人称、文量がスキルの指定どおりか。
- 成果物が所定のフォルダにファイルとして保存されているか。
- Obsidian のノートとして壊れていないか（frontmatter の有無、リンク切れ、使えない文字）。

出力の形式（これ以外は書かない）:
1 行目に `判定: OK` または `判定: 要修正` だけを書く。
2 行目以降に、指摘を箇条書きで書く。指摘には必ず該当ファイル名を添える。
差分から読み取れることだけを書く。埋めるために推測を足さない。指摘がなければ箇条書きは空でよい。
EOS

review=$(codex exec --sandbox read-only ${CODEX_REVIEW_FLAGS:-} \
  "${instructions}"$'\n\n---- ここから差分 ----\n'"${diff_body}" 2>&1)
status=$?

if [ "$status" -ne 0 ] || [ -z "${review//[[:space:]]/}" ]; then
  echo "codex-review: codex exec に失敗した (exit ${status})" >&2
  echo "${review}" | tail -n 5 >&2
  exit 1
fi

# ---- brain/reviews/ に残す ---------------------------------------------------
mkdir -p brain/reviews
stamp=$(date +%Y-%m-%d-%H%M%S)
out="brain/reviews/${stamp}.md"

verdict=$(printf '%s' "$review" | head -n 1)
files=$(git_ diff HEAD --name-only -- . 2>/dev/null; git_ ls-files --others --exclude-standard 2>/dev/null | grep -v '^brain/reviews/' || true)

{
  echo "---"
  echo "type: review"
  echo "created: $(date +%Y-%m-%d)"
  echo "reviewer: codex"
  echo "tags: [review]"
  echo "---"
  echo
  echo "# Codex レビュー ${stamp}"
  echo
  echo "## 見た範囲"
  echo
  printf '%s\n' "$files" | sed '/^$/d' | sed 's/^/- /'
  echo
  echo "## 指摘"
  echo
  printf '%s\n' "$review"
} > "$out"

# ---- Claude / 人間に返す -----------------------------------------------------
case "$verdict" in
  *要修正*)
    if [ "${CODEX_REVIEW_BLOCK:-}" = "1" ]; then
      # 同じ差分で二度止めない（直さないまま無限に往復するのを防ぐ）
      guard="$(git rev-parse --git-dir)/codex-review-last-block"
      now=$(printf '%s' "$diff_body" | cksum | cut -d' ' -f1)
      if [ "$(cat "$guard" 2>/dev/null)" != "$now" ]; then
        printf '%s' "$now" > "$guard"
        {
          echo "Codex（監視役）が要修正と判定した。指摘は ${out} にある。"
          echo "以下に対応してから終わること。直せない／直すべきでないものは理由を述べる。"
          echo
          printf '%s\n' "$review"
        } >&2
        exit 2
      fi
    fi
    printf '{"systemMessage":"Codex: 要修正の指摘あり → %s"}\n' "$out"
    ;;
  *)
    printf '{"systemMessage":"Codex: OK → %s"}\n' "$out"
    ;;
esac

exit 0
