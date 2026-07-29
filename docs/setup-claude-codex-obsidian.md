---
type: doc
created: 2026-07-29
tags: [meta, setup]
---

# Claude Code × Codex × Obsidian の組み方

やりたいことは三つ。**Claude Code で作業する / その内容を Codex が監視する /
Obsidian を脳として使う**。この三つは、それぞれ別のアプリを繋ぎ込むのではなく、
**同じフォルダを三者で共有する**だけで組める。

```
        ┌──────────────────────────────────────────┐
        │  test-project/  ← 一つのフォルダ         │
        │                                          │
        │   brain/       考えを溜める（= 脳）      │
        │   youtube/     台本                      │
        │   note/drafts/ 記事                      │
        └──────────────────────────────────────────┘
             ▲              ▲                ▲
             │ 書く         │ 見る/書く      │ 差分を読む
             │              │                │
       Claude Code       Obsidian          Codex
      （作業する）    （人間が考える）   （監視する）
                                              │
                                              ▼
                                     brain/reviews/ に指摘が溜まる
                                     → 溜まった指摘が脳の一部になる
```

肝は最後の一行。**Codex の指摘が Obsidian に流れ込む**ので、監視は使い捨ての小言では
なく、検索できてリンクできる資産になる。

## 1. Obsidian を脳にする

Obsidian は「マークダウンの入ったフォルダ」を見ているだけのアプリで、独自の保存形式を
持たない。だから**このリポジトリをそのまま保管庫（vault）にするのが一番強い**。
API もプラグインも同期設定も要らず、Claude Code が書いた瞬間に Obsidian 側に現れる。

### やること

1. Obsidian を開き、「保管庫を開く」→「フォルダを保管庫として開く」を選ぶ。
2. このリポジトリのフォルダ（`test-project`）を指定する。
3. 設定 → コアプラグイン → **テンプレート** を有効化し、テンプレートの場所を
   `brain/templates` にする。
4. 設定 → コアプラグイン → **デイリーノート** を有効化し、保存先を `brain/daily`、
   テンプレートを `brain/templates/デイリー.md` にする。

`.obsidian/` は `.gitignore` に入れてある（端末ごとに違う設定なので共有しない）。
共有したいテンプレートは `brain/templates/` にリポジトリ側で持たせている。

### フォルダの役割

`brain/README.md` に一覧がある。要点は、`brain/` が考える場所で、`youtube/` と
`note/drafts/` が外に出す場所、ということ。

### いちばん効くのは出典ノート

CLAUDE.md の共通ルールに「数字は必ず出典を確認してから書く」がある。これを毎回の
気合いでやると必ず抜ける。そこで、確認したら `brain/sources/` にノートを作り、
記事からは `[[出典ノート]]` でリンクする形にした。こうすると、

- 次回は同じノートを開いて最終確認日を見るだけで済む。
- **Codex がリンクの有無で「出典を確認したか」を機械的に判定できる。**
- どの出典をどの記事で使ったかが Obsidian のグラフで一目で見える。

守ってほしい書き方（frontmatter、`[[リンク]]`、使えない文字）は CLAUDE.md の
「Obsidian の使い方」に書いた。Claude Code はそれを読んで従う。

## 2. Codex を監視役にする

### なぜ「監視」が成り立つか

Codex に見せるものは、Claude Code が書いた**差分（git diff）**。コードレビューと同じ
仕組みを、コードではなく文章に当てている。台本や記事はマークダウンなので、差分は
そのまま読める。

そして Codex は `AGENTS.md` を読む。ここに「監視役として何を見るか」を書いてあるので、
Codex は一般的なレビューではなく、**このリポジトリのルールに対する監査**をする。
ルール本体は CLAUDE.md 側にあり、二重管理していない。

### 導入

```bash
# どちらでもよい
npm install -g @openai/codex
brew install codex

# ログイン（ChatGPT のアカウントでよい）
codex login
```

入れたら準備は終わり。`.claude/settings.json` に Stop フックが登録済みなので、
Claude Code が一区切りつくたびに自動で走る。

**Codex を入れていない間、フックは何もせずに終わる。** つまり導入前でも邪魔にならない。

### 何が起きるか

1. Claude Code が台本や記事を書き終える。
2. Stop フックが `git diff HEAD` と新規ファイルの中身を集める。
3. `codex exec --sandbox read-only` で Codex に渡す。**read-only なので Codex は
   ファイルを書き換えられない。** 監視役が作業に手を出す事故が起きない。
4. 指摘が `brain/reviews/YYYY-MM-DD-HHMMSS.md` に frontmatter 付きで保存される。
5. Claude Code の画面に一行だけ結果が出る（`Codex: OK` か `Codex: 要修正の指摘あり`）。

### つまみ

| したいこと | やり方 |
| --- | --- |
| 今すぐ見てほしい | Claude Code で `/codex-check` |
| 自分の目で見る | `codex review --uncommitted` |
| 要修正なら Claude に直させる | `CODEX_REVIEW_BLOCK=1` を設定して `claude` を起動 |
| 一時的に止める | `CODEX_REVIEW_OFF=1` |
| モデルなどを変える | `CODEX_REVIEW_FLAGS="-m o4-mini"` のように渡す |

`CODEX_REVIEW_BLOCK=1` にすると、Codex が「要修正」と判定したとき Claude Code が
終了せず、指摘を受け取って直してから終わるようになる。**監視が自動で効く形**だが、
往復が増えて遅くなるので、まずは既定（ログだけ）で慣らしてから切り替えるのを勧める。
同じ差分で二度は止めない仕掛けを入れてあるので、無限に往復することはない。

### 指摘が溜まったら

`brain/reviews/` を月に一度でも見返して、**同じ指摘が三回出ていたらルールの書き漏れ**
と判断する。個別に直すのをやめて、CLAUDE.md か該当スキルに書き足す。これをやらないと
永遠に同じことを指摘され続ける。

## 3. さらに厚くしたいとき

手元の監視だけで足りなければ、GitHub 側にもう一段置ける。

- Claude Code がブランチを切って push → プルリクエストを作る。
- GitHub Actions で `codex exec --full-auto -o review.md "$(git diff origin/main...HEAD)"`
  を走らせ、結果をプルリクにコメントさせる。`OPENAI_API_KEY` をリポジトリの
  シークレットに登録する必要がある。

手元のフックが「書いた直後の監視」、プルリクが「外に出す前の関門」という二段になる。
今は入れていない。必要になったら足す。

## 動作確認の手順

```bash
# 1. Obsidian でこのフォルダを保管庫として開き、brain/README.md が読めるか見る
# 2. Codex が入っているか
codex --version

# 3. フックが動くか（適当なファイルを触ってから）
echo '{}' | .claude/hooks/codex-review.sh
ls brain/reviews/
```

3 が何も出力せず終わる場合は、差分がない・`codex` が入っていない・
`CODEX_REVIEW_OFF=1` が効いている、のどれか。

## 注意

このリポジトリを Claude Code の**クラウド側のセッション**（claude.ai/code など）で
動かしている場合、フックはそのクラウドのコンテナで動くので、手元の Obsidian には
反映されない。Codex も入っていない。**この組み方が本当に効くのは、手元の VSCode で
`claude` を起動したとき。** クラウド側は下書きを作らせる用途に留め、
`git pull` で手元に引いてから Obsidian で読む、という使い方になる。
