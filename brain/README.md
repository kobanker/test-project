---
type: index
tags: [meta]
---

# brain — Obsidian の保管庫（vault）

**このリポジトリのフォルダをそのまま Obsidian の vault として開く。** Obsidian は結局
マークダウンの入ったフォルダを見ているだけなので、プラグインも API も要らない。
Claude Code が書いたファイルがそのまま Obsidian に出て、Obsidian で書いたメモが
そのまま Claude Code から読める。

`brain/` は考えを溜める場所。`youtube/` と `note/drafts/` は外に出す成果物の置き場。
**成果物は brain から生える**、という向きを崩さないこと。

## 中身

| 場所 | 何を置くか | 誰が書くか |
| --- | --- | --- |
| `brain/inbox/` | 思いついたネタ、拾った話題。整理前でよい | 主に人間（Obsidian で） |
| `brain/notes/` | 残す価値のある知見。切り口、過去の反応、覚えた相場の癖 | 人間と Claude の両方 |
| `brain/sources/` | 出典ノート。どこの数字をどう取ったか、最終確認日 | 主に Claude |
| `brain/daily/` | デイリーノート。その日やったこと、気づき | 人間 |
| `brain/reviews/` | Codex（監視役）の指摘ログ。自動で溜まる | Codex |
| `brain/templates/` | Obsidian のテンプレート | — |

## 書くときの決まり

CLAUDE.md の「Obsidian の使い方」に本文がある。要点だけ繰り返すと、

- どのノートにも frontmatter を付ける。
- 他のノートを指すときは必ず `[[ノート名]]` で書く。これがないとグラフが繋がらず、
  Obsidian を使っている意味が消える。
- 数字を書いたら、その根拠になった `brain/sources/` のノートへリンクを張る。

## 出典ノートがいちばん効く

CLAUDE.md の共通ルールに「数字は必ず出典を確認してから書く」がある。これを一回ごとの
気合いでやると必ず抜けるので、**確認したら `brain/sources/` にノートを作る**。
次回は同じノートを開いて最終確認日を見るだけで済み、Codex もリンクの有無で
出典を確認したかどうかを機械的に判定できる。
