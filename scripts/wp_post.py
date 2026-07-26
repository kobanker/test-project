#!/usr/bin/env python3
"""blog/drafts/*.md を WordPress（SWELL / エックスサーバー）へ投稿する。

既定は **下書き（draft）保存**。公開したいときだけ明示的に --status publish を渡す。

    # 下書きとして新規投稿
    python3 scripts/wp_post.py blog/drafts/2026-07-26-example.md

    # 既存記事を更新（front matter の wp_id を使う。--id で上書きも可）
    python3 scripts/wp_post.py blog/drafts/2026-07-26-example.md --update

必要な環境変数（.env.example 参照）:
    WP_URL              https://example.com          （サイトのトップ URL）
    WP_USER             WordPress のユーザー名
    WP_APP_PASSWORD     アプリケーションパスワード（管理画面 → プロフィールで発行）

外部ライブラリは使わない（標準ライブラリのみ）。
"""

from __future__ import annotations

import argparse
import base64
import json
import os
import re
import sys
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

from md2blocks import convert, split_front_matter

TIMEOUT = 30


def load_dotenv(path: Path) -> None:
    """.env があれば読み込む（既存の環境変数は上書きしない）。"""
    if not path.exists():
        return
    for line in path.read_text(encoding="utf-8").splitlines():
        line = line.strip()
        if not line or line.startswith("#") or "=" not in line:
            continue
        key, value = line.split("=", 1)
        os.environ.setdefault(key.strip(), value.strip().strip('"').strip("'"))


class WordPress:
    def __init__(self, base_url: str, user: str, app_password: str) -> None:
        self.api = base_url.rstrip("/") + "/wp-json/wp/v2"
        token = base64.b64encode(f"{user}:{app_password}".encode()).decode()
        self.auth = f"Basic {token}"

    def _request(self, method: str, path: str, payload: dict | None = None) -> dict:
        url = f"{self.api}{path}"
        data = json.dumps(payload).encode("utf-8") if payload is not None else None
        req = urllib.request.Request(url, data=data, method=method)
        req.add_header("Authorization", self.auth)
        req.add_header("Content-Type", "application/json; charset=utf-8")
        # エックスサーバーの WAF は既定 UA を弾くことがあるので明示する
        req.add_header("User-Agent", "blog-pipeline/1.0")
        try:
            with urllib.request.urlopen(req, timeout=TIMEOUT) as res:
                return json.loads(res.read().decode("utf-8"))
        except urllib.error.HTTPError as e:
            body = e.read().decode("utf-8", errors="replace")
            raise SystemExit(
                f"WordPress API エラー {e.code} {method} {url}\n{body}\n\n"
                "401/403 が出る場合の確認点:\n"
                "  - アプリケーションパスワードが正しいか（スペースは残したままでよい）\n"
                "  - エックスサーバーの WAF 設定で REST API が弾かれていないか\n"
                "  - セキュリティ系プラグインが /wp-json/ を無効化していないか"
            ) from e
        except urllib.error.URLError as e:
            raise SystemExit(f"接続できない: {url}\n{e.reason}") from e

    def resolve_terms(self, taxonomy: str, names: list[str], create: bool) -> list[int]:
        """カテゴリー / タグ名を ID に変換する。無ければ（create 時のみ）作る。"""
        ids: list[int] = []
        for name in names:
            query = urllib.parse.urlencode({"search": name, "per_page": 100})
            found = self._request("GET", f"/{taxonomy}?{query}")
            match = next((t for t in found if t.get("name") == name), None)
            if match:
                ids.append(match["id"])
            elif create:
                created = self._request("POST", f"/{taxonomy}", {"name": name})
                ids.append(created["id"])
                print(f"  {taxonomy} を新規作成: {name} (id={created['id']})")
            else:
                print(f"  警告: {taxonomy} '{name}' が見つからない（スキップ）", file=sys.stderr)
        return ids

    def create_post(self, payload: dict) -> dict:
        return self._request("POST", "/posts", payload)

    def update_post(self, post_id: int, payload: dict) -> dict:
        return self._request("POST", f"/posts/{post_id}", payload)


def csv(value: str | None) -> list[str]:
    if not value:
        return []
    return [v.strip() for v in value.split(",") if v.strip()]


def write_back_wp_id(path: Path, post_id: int) -> None:
    """front matter に wp_id を書き戻す（次回から --update で更新できるように）。"""
    text = path.read_text(encoding="utf-8")
    if re.search(r"^wp_id:", text, flags=re.M):
        text = re.sub(r"^wp_id:.*$", f"wp_id: {post_id}", text, count=1, flags=re.M)
    elif text.startswith("---"):
        head, sep, rest = text.partition("\n---")
        text = f"{head}wp_id: {post_id}\n{sep}{rest}"
    else:
        return
    path.write_text(text, encoding="utf-8")


def main() -> int:
    ap = argparse.ArgumentParser(description="Markdown 下書きを WordPress に投稿する")
    ap.add_argument("path", help="投稿する Markdown ファイル")
    ap.add_argument(
        "--status",
        default="draft",
        choices=["draft", "publish", "pending", "future", "private"],
        help="投稿ステータス（既定: draft）",
    )
    ap.add_argument("--update", action="store_true", help="既存記事を更新する")
    ap.add_argument("--id", type=int, help="更新する記事 ID（front matter の wp_id より優先）")
    ap.add_argument(
        "--create-terms",
        action="store_true",
        help="存在しないカテゴリー / タグを新規作成する",
    )
    ap.add_argument("--dry-run", action="store_true", help="送信せず内容だけ表示する")
    args = ap.parse_args()

    root = Path(__file__).resolve().parent.parent
    load_dotenv(root / ".env")

    src = Path(args.path)
    if not src.exists():
        print(f"ファイルが見つからない: {src}", file=sys.stderr)
        return 1

    meta, body = split_front_matter(src.read_text(encoding="utf-8"))
    title = meta.get("title", "").strip()
    if not title:
        print("front matter に title がない", file=sys.stderr)
        return 1

    content = convert(body)
    status = args.status or meta.get("status", "draft")

    payload: dict = {"title": title, "content": content, "status": status}
    if meta.get("slug"):
        payload["slug"] = meta["slug"]
    if meta.get("excerpt"):
        payload["excerpt"] = meta["excerpt"]

    if args.dry_run:
        print(f"--- dry run: {src} ---")
        print(f"title  : {title}")
        print(f"status : {status}")
        print(f"slug   : {meta.get('slug', '(自動)')}")
        print(f"本文   : {len(content)} 文字 / {content.count('<!-- wp:')} ブロック")
        print(f"category: {csv(meta.get('categories'))}")
        print(f"tags    : {csv(meta.get('tags'))}")
        return 0

    missing = [k for k in ("WP_URL", "WP_USER", "WP_APP_PASSWORD") if not os.environ.get(k)]
    if missing:
        print(f"環境変数が足りない: {', '.join(missing)}（.env.example を参照）", file=sys.stderr)
        return 1

    wp = WordPress(os.environ["WP_URL"], os.environ["WP_USER"], os.environ["WP_APP_PASSWORD"])

    if categories := csv(meta.get("categories")):
        payload["categories"] = wp.resolve_terms("categories", categories, args.create_terms)
    if tags := csv(meta.get("tags")):
        payload["tags"] = wp.resolve_terms("tags", tags, args.create_terms)

    post_id = args.id or (int(meta["wp_id"]) if meta.get("wp_id", "").isdigit() else None)

    if args.update or args.id:
        if not post_id:
            print("更新対象の ID がない（front matter の wp_id か --id を指定）", file=sys.stderr)
            return 1
        result = wp.update_post(post_id, payload)
        print(f"更新した: {result['link']} (id={result['id']}, status={result['status']})")
    else:
        result = wp.create_post(payload)
        write_back_wp_id(src, result["id"])
        print(f"投稿した: {result['link']} (id={result['id']}, status={result['status']})")
        if result["status"] == "draft":
            print("下書き保存。管理画面で確認してから公開してください。")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
