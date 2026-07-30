# NotebookLM CLI（nlm）のセットアップ

Google NotebookLM（現 Gemini Notebook）をコマンドラインから操作するための非公式 CLI。
パッケージ名は `notebooklm-mcp-cli`、コマンド名は `nlm`。
MCP サーバー（`notebooklm-mcp`）も同梱されていて、Claude Code から直接叩けるようになる。

- リポジトリ: https://github.com/jacob-bd/notebooklm-mcp-cli
- PyPI: https://pypi.org/project/notebooklm-mcp-cli/

Google 公式の API ではない。ブラウザの Cookie を使って NotebookLM の内部 API を叩く仕組みなので、
Google 側の変更で動かなくなることがある。公式 API は Gemini Enterprise 向けのみで、個人アカウントでは使えない。

## インストール（ローカルの Mac / PC で実行）

uv を使う方法が推奨。

```bash
uv tool install notebooklm-mcp-cli
```

pip / pipx でも入る。

```bash
pipx install notebooklm-mcp-cli   # または pip install notebooklm-mcp-cli
```

`nlm` と `notebooklm-mcp` の 2 つが `~/.local/bin` に入る。PATH に無ければ通しておく。

```bash
nlm --version
```

## ログイン

```bash
nlm login
```

Chrome / Brave / Edge が立ち上がって Google ログインを求められる。
ログインすると Cookie を取り出して保存する。**ブラウザが必要なので、この手順はローカル環境でしか通らない。**
（Claude Code のリモートセッション内にはサインイン済みブラウザが無いため認証できない）

確認は次のコマンド。

```bash
nlm login --check
nlm doctor
```

### リモートセッション（ブラウザが無い環境）で認証する場合

Claude Code のウェブ／リモートセッションにはサインイン済みブラウザが無いので `nlm login` は使えない。
その場合は Cookie を手で渡す方法がある。

1. ローカルのブラウザで https://notebook.google.com を開く（ログイン済みの状態）
2. DevTools を開き（F12 / Cmd+Option+I）、Network タブへ
3. `batchexecute` でフィルタし、ノートブックをクリックしてリクエストを発生させる
4. リクエストの Request Headers から `cookie:` の**値**をコピーする（`SID=...` で始まる部分。`cookie: ` は含めない）
5. その文字列をファイルに保存して読み込ませる

```bash
nlm login --manual --file ~/.nlm/cookies.txt
```

**注意：** ここでコピーする Cookie は Google アカウントのセッション認証情報そのもの。
チャットや共有リポジトリに貼らないこと。ローカルで `nlm login` が使える場面では、そちらを使うほうが安全。

## Claude Code に MCP として登録する

このリポジトリには `.mcp.json` を置いてあるので、`claude` をこのフォルダで起動すれば
`notebooklm` サーバーが候補に出る（初回は接続の許可を聞かれる）。43 個のツールが使えるようになる。

グローバルに登録したい場合は次のコマンド。

```bash
nlm setup add "Claude Code"
nlm setup list          # 登録状況の確認
```

## .mcpb（Claude Desktop 用の拡張）について

配布されている `notebooklmmcp0.9.4.mcpb` は **Claude Desktop 専用**のパッケージ形式。
Claude Desktop の設定 → Extensions にドラッグ＆ドロップすると入る。Claude Code では使わない。

中身は `uvx --from notebooklm-mcp-cli notebooklm-mcp` を叩くだけの起動スクリプトで、
サーバー本体は同梱されていない。したがって .mcpb を入れる場合でも、
上のインストール（`uv` / `uvx`）と `nlm login` は別途必要。

## よく使うコマンド

```bash
nlm notebook list                  # ノートブック一覧
nlm source add <notebook-id> <URL> # ソースを追加
nlm chat <notebook-id> "質問"       # ノートブックに質問
nlm audio create <notebook-id>     # 音声概要を作る
nlm --help                         # 全コマンド
```

`nlm --ai` を叩くと AI 向けに整形されたコマンド一覧が出る。Claude Code に読ませるとき便利。
