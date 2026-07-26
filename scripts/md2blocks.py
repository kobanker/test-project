#!/usr/bin/env python3
"""Markdown 下書き → Gutenberg（SWELL 対応）ブロック HTML 変換。

blog/drafts/*.md を WordPress のブロックエディタがそのまま解釈できる HTML に変換する。
生成するのは core ブロック（段落・見出し・リスト・表・引用・画像・区切り・コード）のみ。
SWELL 独自ブロックは実際のサイトで名前を確認してから追加する。

    python3 scripts/md2blocks.py blog/drafts/2026-07-26-example.md

外部ライブラリは使わない（標準ライブラリのみ）。
"""

from __future__ import annotations

import argparse
import html
import re
import sys
from pathlib import Path

# --- front matter -----------------------------------------------------------


_FRONT_MATTER = re.compile(r"\A---[ \t]*\n(.*?)\n---[ \t]*(?:\n|\Z)", re.DOTALL)


def split_front_matter(text: str) -> tuple[dict[str, str], str]:
    """`---` で囲まれた front matter と本文を分ける。

    値は文字列としてそのまま持つ（カンマ区切りは呼び出し側で分解する）。
    本文中の `---`（水平線）を終端と誤認しないよう、先頭のブロックだけを見る。
    """
    m = _FRONT_MATTER.match(text.replace("\r\n", "\n"))
    if not m:
        return {}, text

    head = m.group(1)
    body = text.replace("\r\n", "\n")[m.end() :]

    meta: dict[str, str] = {}
    for line in head.splitlines():
        line = line.strip()
        if not line or line.startswith("#") or ":" not in line:
            continue
        key, value = line.split(":", 1)
        meta[key.strip()] = value.strip().strip('"').strip("'")
    return meta, body


# --- インライン記法 ---------------------------------------------------------

_INLINE_CODE = re.compile(r"`([^`]+)`")
_LINK = re.compile(r"\[([^\]]+)\]\(([^)\s]+)(?:\s+\"([^\"]*)\")?\)")
_BOLD = re.compile(r"\*\*(.+?)\*\*")
# 太字を先に置換するので、残った `*…*` を斜体として扱う
_ITALIC = re.compile(r"(?<!\*)\*([^*\n]+?)\*(?!\*)")


def inline(text: str) -> str:
    """テキストをエスケープしてからインライン記法を HTML に変換する。"""
    out = html.escape(text, quote=False)
    out = _INLINE_CODE.sub(lambda m: f"<code>{m.group(1)}</code>", out)

    def link(m: re.Match[str]) -> str:
        label, url, title = m.group(1), m.group(2), m.group(3)
        # アフィリエイトリンクなど外部リンクは rel を付けて別タブで開く
        attrs = f'href="{html.escape(url, quote=True)}"'
        if title:
            attrs += f' title="{html.escape(title, quote=True)}"'
        if url.startswith("http"):
            attrs += ' target="_blank" rel="noopener"'
        return f"<a {attrs}>{label}</a>"

    out = _LINK.sub(link, out)
    out = _BOLD.sub(lambda m: f"<strong>{m.group(1)}</strong>", out)
    out = _ITALIC.sub(lambda m: f"<em>{m.group(1)}</em>", out)
    return out


# --- ブロック変換 -----------------------------------------------------------


def heading(level: int, text: str) -> str:
    attr = "" if level == 2 else f' {{"level":{level}}}'
    return (
        f"<!-- wp:heading{attr} -->\n"
        f'<h{level} class="wp-block-heading">{inline(text)}</h{level}>\n'
        f"<!-- /wp:heading -->"
    )


def paragraph(text: str) -> str:
    return f"<!-- wp:paragraph -->\n<p>{inline(text)}</p>\n<!-- /wp:paragraph -->"


def image(alt: str, url: str) -> str:
    return (
        "<!-- wp:image -->\n"
        f'<figure class="wp-block-image"><img src="{html.escape(url, quote=True)}"'
        f' alt="{html.escape(alt, quote=True)}"/></figure>\n'
        "<!-- /wp:image -->"
    )


def separator() -> str:
    return (
        "<!-- wp:separator -->\n"
        '<hr class="wp-block-separator has-alpha-channel-opacity"/>\n'
        "<!-- /wp:separator -->"
    )


def build_list(items: list[str], ordered: bool) -> str:
    tag = "ol" if ordered else "ul"
    attr = ' {"ordered":true}' if ordered else ""
    inner = "".join(
        f"<!-- wp:list-item -->\n<li>{inline(i)}</li>\n<!-- /wp:list-item -->\n"
        for i in items
    )
    return (
        f"<!-- wp:list{attr} -->\n"
        f'<{tag} class="wp-block-list">\n{inner}</{tag}>\n'
        f"<!-- /wp:list -->"
    )


def build_quote(lines: list[str]) -> str:
    inner = "".join(paragraph(l) + "\n" for l in lines if l.strip())
    return (
        "<!-- wp:quote -->\n"
        f'<blockquote class="wp-block-quote">\n{inner}</blockquote>\n'
        "<!-- /wp:quote -->"
    )


def build_code(lines: list[str]) -> str:
    body = html.escape("\n".join(lines), quote=False)
    return (
        "<!-- wp:code -->\n"
        f'<pre class="wp-block-code"><code>{body}</code></pre>\n'
        "<!-- /wp:code -->"
    )


def split_row(line: str) -> list[str]:
    return [c.strip() for c in line.strip().strip("|").split("|")]


def build_table(rows: list[str]) -> str:
    head = split_row(rows[0])
    body_rows = [split_row(r) for r in rows[2:]]  # rows[1] は区切り行
    thead = "".join(f"<th>{inline(c)}</th>" for c in head)
    tbody = "".join(
        "<tr>" + "".join(f"<td>{inline(c)}</td>" for c in r) + "</tr>" for r in body_rows
    )
    return (
        "<!-- wp:table -->\n"
        '<figure class="wp-block-table"><table>'
        f"<thead><tr>{thead}</tr></thead><tbody>{tbody}</tbody>"
        "</table></figure>\n"
        "<!-- /wp:table -->"
    )


_HEADING = re.compile(r"^(#{2,4})\s+(.*)$")
_UL = re.compile(r"^[-*]\s+(.*)$")
_OL = re.compile(r"^\d+[.)]\s+(.*)$")
_IMG_ONLY = re.compile(r"^!\[([^\]]*)\]\(([^)\s]+)\)$")
_TABLE_SEP = re.compile(r"^\|?[\s:|-]+\|[\s:|-]*$")


def convert(markdown: str) -> str:
    lines = markdown.replace("\r\n", "\n").split("\n")
    blocks: list[str] = []
    i = 0
    n = len(lines)

    while i < n:
        line = lines[i]
        stripped = line.strip()

        if not stripped:
            i += 1
            continue

        # コードフェンス
        if stripped.startswith("```"):
            i += 1
            buf: list[str] = []
            while i < n and not lines[i].strip().startswith("```"):
                buf.append(lines[i])
                i += 1
            i += 1  # 閉じフェンス
            blocks.append(build_code(buf))
            continue

        # 水平線
        if re.fullmatch(r"(-{3,}|\*{3,}|_{3,})", stripped):
            blocks.append(separator())
            i += 1
            continue

        # 見出し
        m = _HEADING.match(stripped)
        if m:
            blocks.append(heading(len(m.group(1)), m.group(2).strip()))
            i += 1
            continue

        # 画像だけの行
        m = _IMG_ONLY.match(stripped)
        if m:
            blocks.append(image(m.group(1), m.group(2)))
            i += 1
            continue

        # 表（ヘッダ行 + 区切り行）
        if stripped.startswith("|") and i + 1 < n and _TABLE_SEP.match(lines[i + 1].strip()):
            rows = []
            while i < n and lines[i].strip().startswith("|"):
                rows.append(lines[i].strip())
                i += 1
            blocks.append(build_table(rows))
            continue

        # 引用
        if stripped.startswith(">"):
            buf = []
            while i < n and lines[i].strip().startswith(">"):
                buf.append(lines[i].strip().lstrip(">").strip())
                i += 1
            blocks.append(build_quote(buf))
            continue

        # 箇条書き / 番号付き
        if _UL.match(stripped) or _OL.match(stripped):
            ordered = bool(_OL.match(stripped))
            pattern = _OL if ordered else _UL
            items = []
            while i < n:
                s = lines[i].strip()
                m = pattern.match(s)
                if not m:
                    break
                items.append(m.group(1).strip())
                i += 1
            blocks.append(build_list(items, ordered))
            continue

        # 段落（空行まで結合）
        buf = []
        while i < n and lines[i].strip():
            s = lines[i].strip()
            if (
                _HEADING.match(s)
                or _UL.match(s)
                or _OL.match(s)
                or s.startswith((">", "```", "|"))
            ):
                break
            buf.append(s)
            i += 1
        if buf:
            blocks.append(paragraph("".join(buf)))

    return "\n\n".join(blocks) + "\n"


def main() -> int:
    ap = argparse.ArgumentParser(description="Markdown を Gutenberg ブロック HTML に変換する")
    ap.add_argument("path", help="変換する Markdown ファイル")
    ap.add_argument("-o", "--out", help="出力先。省略時は標準出力")
    args = ap.parse_args()

    src = Path(args.path)
    if not src.exists():
        print(f"ファイルが見つからない: {src}", file=sys.stderr)
        return 1

    _, body = split_front_matter(src.read_text(encoding="utf-8"))
    result = convert(body)

    if args.out:
        Path(args.out).write_text(result, encoding="utf-8")
        print(f"書き出した: {args.out}")
    else:
        sys.stdout.write(result)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
