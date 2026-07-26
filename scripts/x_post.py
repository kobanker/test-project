#!/usr/bin/env python3
"""X（旧 Twitter）に告知ポスト / スレッドを投稿する。

既定は **dry run**（送信しない）。実際に投稿するときだけ --yes を付ける。

    # 内容と文字数を確認するだけ
    python3 scripts/x_post.py blog/drafts/2026-07-26-example.x.txt

    # 実際に投稿する
    python3 scripts/x_post.py blog/drafts/2026-07-26-example.x.txt --yes

入力ファイルは 1 ポスト 1 ブロック、空行 2 つ（---）で区切るとスレッドになる。

必要な環境変数（.env.example 参照）:
    X_API_KEY / X_API_SECRET / X_ACCESS_TOKEN / X_ACCESS_TOKEN_SECRET
    （X Developer Portal でアプリを作り、権限を Read and write にして発行する）

外部ライブラリは使わない（標準ライブラリのみ）。
"""

from __future__ import annotations

import argparse
import base64
import hashlib
import hmac
import json
import os
import secrets
import sys
import time
import unicodedata
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ENDPOINT = "https://api.x.com/2/tweets"
TIMEOUT = 30
# X の文字数カウントは全角 2 / 半角 1 の重み付け。280 weighted units が上限。
MAX_WEIGHTED = 280


def load_dotenv(path: Path) -> None:
    if not path.exists():
        return
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


def weighted_length(text: str) -> int:
    """X の重み付け文字数を概算する。

    全角・絵文字を 2、それ以外を 1 として数える。URL は実際には一律 23 文字
    （t.co 短縮）で数えられるが、その換算値は変わりうるので概算にとどめる。
    """
    total = 0
    for ch in text:
        total += 2 if unicodedata.east_asian_width(ch) in ("W", "F") else 1
    return total


def quote(value: str) -> str:
    return urllib.parse.quote(str(value), safe="~")


def oauth1_header(method: str, url: str, creds: dict[str, str]) -> str:
    """OAuth 1.0a (HMAC-SHA1) の Authorization ヘッダを組み立てる。

    JSON ボディは署名対象に含めない（oauth_* パラメータと URL クエリのみ）。
    """
    params = {
        "oauth_consumer_key": creds["api_key"],
        "oauth_nonce": secrets.token_hex(16),
        "oauth_signature_method": "HMAC-SHA1",
        "oauth_timestamp": str(int(time.time())),
        "oauth_token": creds["access_token"],
        "oauth_version": "1.0",
    }
    encoded = "&".join(f"{quote(k)}={quote(params[k])}" for k in sorted(params))
    base = f"{method.upper()}&{quote(url)}&{quote(encoded)}"
    key = f"{quote(creds['api_secret'])}&{quote(creds['access_token_secret'])}"
    signature = base64.b64encode(
        hmac.new(key.encode(), base.encode(), hashlib.sha1).digest()
    ).decode()
    params["oauth_signature"] = signature
    return "OAuth " + ", ".join(f'{quote(k)}="{quote(v)}"' for k, v in sorted(params.items()))


def post_tweet(text: str, creds: dict[str, str], reply_to: str | None) -> dict:
    payload: dict = {"text": text}
    if reply_to:
        payload["reply"] = {"in_reply_to_tweet_id": reply_to}

    req = urllib.request.Request(
        ENDPOINT, data=json.dumps(payload).encode("utf-8"), method="POST"
    )
    req.add_header("Authorization", oauth1_header("POST", ENDPOINT, creds))
    req.add_header("Content-Type", "application/json; charset=utf-8")
    try:
        with urllib.request.urlopen(req, timeout=TIMEOUT) as res:
            return json.loads(res.read().decode("utf-8"))
    except urllib.error.HTTPError as e:
        body = e.read().decode("utf-8", errors="replace")
        raise SystemExit(
            f"X API エラー {e.code}\n{body}\n\n"
            "よくある原因:\n"
            "  401 … キー/トークンの誤り、またはアプリ権限が Read only のまま\n"
            "        （権限を Read and write に変えたらアクセストークンを再発行する）\n"
            "  403 … 投稿内容の重複、またはプランの投稿上限に到達\n"
            "  429 … レート制限。時間をおいて再実行する"
        ) from e


def split_thread(text: str) -> list[str]:
    """空行 2 つ以上、または `---` 行でスレッドに分割する。"""
    chunks: list[str] = []
    buf: list[str] = []
    blank = 0
    for line in text.replace("\r\n", "\n").split("\n"):
        if line.strip() == "---":
            if buf:
                chunks.append("\n".join(buf).strip())
                buf = []
            blank = 0
            continue
        if not line.strip():
            blank += 1
            if blank >= 2 and buf:
                chunks.append("\n".join(buf).strip())
                buf = []
                continue
        else:
            blank = 0
        buf.append(line)
    if buf:
        chunks.append("\n".join(buf).strip())
    return [c for c in chunks if c]


def main() -> int:
    ap = argparse.ArgumentParser(description="X に告知ポストを投稿する")
    ap.add_argument("path", help="投稿テキストのファイル（- で標準入力）")
    ap.add_argument("--yes", action="store_true", help="実際に投稿する（既定は dry run）")
    args = ap.parse_args()

    root = Path(__file__).resolve().parent.parent
    load_dotenv(root / ".env")

    if args.path == "-":
        raw = sys.stdin.read()
    else:
        src = Path(args.path)
        if not src.exists():
            print(f"ファイルが見つからない: {src}", file=sys.stderr)
            return 1
        raw = src.read_text(encoding="utf-8")

    posts = split_thread(raw)
    if not posts:
        print("投稿する内容が空", file=sys.stderr)
        return 1

    over = False
    for idx, text in enumerate(posts, 1):
        length = weighted_length(text)
        mark = "  超過" if length > MAX_WEIGHTED else ""
        over = over or length > MAX_WEIGHTED
        print(f"--- {idx}/{len(posts)} （{length}/{MAX_WEIGHTED}）{mark}")
        print(text)
        print()

    if over:
        print("文字数が上限を超えているポストがある。分割するか短くしてください。", file=sys.stderr)
        return 1

    if not args.yes:
        print("dry run。実際に投稿するには --yes を付けて再実行してください。")
        return 0

    keys = {
        "api_key": "X_API_KEY",
        "api_secret": "X_API_SECRET",
        "access_token": "X_ACCESS_TOKEN",
        "access_token_secret": "X_ACCESS_TOKEN_SECRET",
    }
    missing = [env for env in keys.values() if not os.environ.get(env)]
    if missing:
        print(f"環境変数が足りない: {', '.join(missing)}（.env.example を参照）", file=sys.stderr)
        return 1
    creds = {name: os.environ[env] for name, env in keys.items()}

    reply_to: str | None = None
    for idx, text in enumerate(posts, 1):
        result = post_tweet(text, creds, reply_to)
        tweet_id = result["data"]["id"]
        reply_to = tweet_id
        print(f"投稿した {idx}/{len(posts)}: https://x.com/i/status/{tweet_id}")
        if idx < len(posts):
            time.sleep(2)  # 連投を少し空ける
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
