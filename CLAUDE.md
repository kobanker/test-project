# このリポジトリについて

Claude のホーム（Cowork）で回していた作業手順を Claude Code に移管したもの。
現時点で扱う仕事は次の二つ。

- **YouTube プロジェクト** — 詳細は `.claude/skills/youtube-project/SKILL.md`
- **note の相場投稿** — 詳細は `.claude/skills/note-souba-post/SKILL.md`

手順そのものはスキルに書いてある。このファイルには、どの作業でも共通して守ってほしい
ことだけを置く。手順が増えたら CLAUDE.md を膨らませるのではなく、
`.claude/skills/` にスキルを足すこと。

## フォルダの使い分け

| 場所 | 用途 |
| --- | --- |
| `.claude/skills/` | 作業手順（スキル本体）。ここを読めば同じ品質で再現できる状態にしておく |
| `youtube/` | YouTube 側の台本・企画メモ・書き出したもの |
| `note/drafts/` | note の投稿下書き。1 投稿 1 ファイル |

## 参照資料（Google ドライブ）

OneNote に溜めていた文章系の資料は、Google ドライブの「マイドライブ > Onenote」
フォルダにエクスポートして置いてある。今後もここに追加されるので、
過去の文章・メモを参照したいときは Google Drive コネクタでこのフォルダを検索すること。

- フォルダ名: `Onenote`（マイドライブ直下）
- フォルダ ID: `1dym38baAruZnFCxCEyt4PpVaXtziCpfG`
- 検索例: `parentId = '1dym38baAruZnFCxCEyt4PpVaXtziCpfG'`
- 制約: コネクタでダウンロードできるのは 1 ファイル 10MB まで。超えるファイルは
  読めないので、セクションをさらに分けるか PDF で小分けにして置いてもらう。
- OneNote ネイティブの `.one` ファイルも読める。`download_file_content` で取得した
  結果（JSON + base64）を `scripts/extract_one.py` に通すと、ページタイトルと
  本文テキストを抽出できる（`pip install pyOneNote` が必要）。
- `🔏重要・PASS.one` はパスワード管理ファイルなので開かないこと。

## 共通ルール

<!-- TODO: 以下はいったん一般的な内容を置いてあります。実際のこだわりに書き換えてください -->

- 文章は日本語。常体・敬体は各スキルの指定に従う。
- 数字（価格、レート、日付）は必ず出典を確認してから書く。記憶で書かない。
- 断定できないことは断定しない。「〜と見られる」など、確度がわかる書き方をする。
- 下書きは必ずファイルとして保存する。チャットに出して終わりにしない。

## 使い方

VSCode でこのフォルダを開き、ターミナルで `claude` を起動する。
スキルは起動時に自動で読み込まれる。直接呼びたいときは `/youtube-project`
または `/note-souba-post` と入力する。
