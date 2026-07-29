#!/usr/bin/env python3
"""YouTube 動画の字幕をテキストに落とす。

動画ファイル自体はダウンロードしない。字幕トラック（数十 KB のテキスト）だけを
取ってきて、Markdown に整形して `youtube/refs/` に保存する。

使い方:
    python3 fetch_transcript.py <URL または動画ID> [オプション]

オプション:
    --lang ja,en        字幕言語の優先順（既定: ja,en）
    --out DIR           出力先ディレクトリ（既定: youtube/refs）
    --interval 30       何秒ごとに時刻を打つか（既定: 30、0 で時刻なし）
    --stdout            ファイルに書かず標準出力に出す

必要なもの:
    pip install -U yt-dlp
"""

from __future__ import annotations

import argparse
import datetime as dt
import html
import re
import sys
import tempfile
from pathlib import Path

CUE_RE = re.compile(r"(\d{2}:\d{2}:\d{2}[.,]\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}[.,]\d{3})")
TAG_RE = re.compile(r"<[^>]+>")
# 自動字幕は同じ行を数回くり返して流す（ロール表示）。この秒数内に出た行は重複とみなす。
# 時間で切るので、あとから本当に同じ言い回しが再登場したときは残る。
DEDUPE_SECONDS = 8.0


def die(msg: str) -> "NoReturn":  # noqa: F821
    print(f"error: {msg}", file=sys.stderr)
    raise SystemExit(1)


def load_ytdlp():
    try:
        from yt_dlp import YoutubeDL
    except ImportError:
        die("yt-dlp が入っていません。`pip install -U yt-dlp` を実行してください。")
    return YoutubeDL


class QuietLogger:
    """yt-dlp 自身の出力を止める。失敗はこちらのメッセージで一本化して出す。"""

    def debug(self, msg): pass

    def info(self, msg): pass

    def warning(self, msg): pass

    def error(self, msg): pass


def parse_ts(value: str) -> float:
    hh, mm, rest = value.split(":")
    ss = rest.replace(",", ".")
    return int(hh) * 3600 + int(mm) * 60 + float(ss)


def fmt_ts(seconds: float) -> str:
    total = int(seconds)
    h, m, s = total // 3600, (total % 3600) // 60, total % 60
    return f"{h:02d}:{m:02d}:{s:02d}" if h else f"{m:02d}:{s:02d}"


def fmt_duration(seconds) -> str:
    if not seconds:
        return ""
    return fmt_ts(float(seconds))


def parse_vtt(text: str) -> list[tuple[float, str]]:
    """VTT を (開始秒, 行) の列にする。ロール表示による重複行は落とす。"""
    lines_out: list[tuple[float, str]] = []
    recent: list[tuple[float, str]] = []

    for block in re.split(r"\r?\n\s*\r?\n", text):
        block = block.strip()
        if not block or block.startswith(("WEBVTT", "NOTE", "STYLE", "REGION")):
            continue

        cue = None
        body: list[str] = []
        for line in block.splitlines():
            match = CUE_RE.search(line)
            if match and cue is None:
                cue = parse_ts(match.group(1))
            elif cue is not None:
                body.append(line)
        if cue is None:
            continue

        recent = [(t, k) for t, k in recent if cue - t <= DEDUPE_SECONDS]

        for raw in body:
            cleaned = html.unescape(TAG_RE.sub("", raw)).strip()
            cleaned = re.sub(r"\s+", " ", cleaned)
            if not cleaned:
                continue
            # ロール表示だと同じ行がタグ入り／タグ無しで来て空白の有無だけが変わる。
            # 空白を落としたものを突き合わせのキーにする。
            key = re.sub(r"\s+", "", cleaned)
            if any(key == seen for _, seen in recent):
                continue
            lines_out.append((cue, cleaned))
            recent.append((cue, key))

    return lines_out


def render_body(cues: list[tuple[float, str]], interval: int) -> str:
    if not cues:
        return "（字幕テキストが空でした）"
    if interval <= 0:
        return "\n".join(text for _, text in cues)

    chunks: list[str] = []
    buf: list[str] = []
    chunk_start = cues[0][0]
    for start, text in cues:
        if buf and start - chunk_start >= interval:
            chunks.append(f"[{fmt_ts(chunk_start)}] " + " ".join(buf))
            buf, chunk_start = [], start
        buf.append(text)
    if buf:
        chunks.append(f"[{fmt_ts(chunk_start)}] " + " ".join(buf))
    return "\n\n".join(chunks)


def pick_subtitle(files: dict[str, Path], prefs: list[str], manual: set[str], auto: set[str]):
    """優先順に (言語, ファイル, 手動字幕かどうか) を選ぶ。手動字幕を自動字幕より優先。"""
    for source, is_manual in ((manual, True), (auto, False)):
        for pref in prefs:
            for lang, path in files.items():
                base = lang.split("-")[0]
                if (lang == pref or base == pref) and (lang in source or base in source):
                    return lang, path, is_manual
    # 優先言語が無ければ、取れたものを何でも使う
    for lang, path in files.items():
        return lang, path, lang in manual
    return None, None, False


def fetch(url: str, prefs: list[str]):
    YoutubeDL = load_ytdlp()
    with tempfile.TemporaryDirectory() as tmp:
        opts = {
            "skip_download": True,  # 動画本体は落とさない
            "writesubtitles": True,
            "writeautomaticsub": True,
            "subtitleslangs": prefs + [f"{p}-orig" for p in prefs],
            "subtitlesformat": "vtt",
            "outtmpl": str(Path(tmp) / "%(id)s.%(ext)s"),
            "quiet": True,
            "no_warnings": True,
            "noprogress": True,
            "logger": QuietLogger(),
        }
        with YoutubeDL(opts) as ydl:
            try:
                info = ydl.extract_info(url, download=True)
            except Exception as exc:  # yt-dlp は多様な例外を投げる
                die(f"取得に失敗しました: {exc}")

        files = {}
        for path in sorted(Path(tmp).glob("*.vtt")):
            parts = path.name.split(".")
            if len(parts) >= 3:
                files[parts[-2]] = path

        if not files:
            die(
                "字幕トラックが見つかりませんでした。"
                "字幕が無い動画か、--lang の指定と一致しない可能性があります。"
            )

        manual = set(info.get("subtitles") or {})
        auto = set(info.get("automatic_captions") or {})
        lang, path, is_manual = pick_subtitle(files, prefs, manual, auto)
        return info, lang, path.read_text(encoding="utf-8"), is_manual


def build_markdown(info: dict, lang: str, is_manual: bool, body: str) -> str:
    published = info.get("upload_date") or ""
    if len(published) == 8:
        published = f"{published[:4]}-{published[4:6]}-{published[6:]}"

    meta = [
        ("source", info.get("webpage_url") or ""),
        ("video_id", info.get("id") or ""),
        ("title", info.get("title") or ""),
        ("channel", info.get("uploader") or ""),
        ("published", published),
        ("duration", fmt_duration(info.get("duration"))),
        ("subtitle", f"{lang}（{'手動' if is_manual else '自動生成'}）"),
        ("fetched", dt.date.today().isoformat()),
    ]
    def yaml_str(value) -> str:
        return str(value).replace("\\", "\\\\").replace('"', '\\"')

    front = "\n".join(f'{k}: "{yaml_str(v)}"' for k, v in meta if v)

    note = (
        ""
        if is_manual
        else "\n> 自動生成字幕のため、固有名詞・数字は誤りを含む。"
        "引用する前に動画の該当箇所で確認すること。\n"
    )

    return (
        f"---\n{front}\n---\n\n"
        f"# {info.get('title') or info.get('id')}\n"
        f"{note}\n"
        f"## 文字起こし\n\n{body}\n"
    )


def main() -> None:
    ap = argparse.ArgumentParser(description="YouTube の字幕を Markdown に落とす")
    ap.add_argument("url", help="YouTube の URL または動画ID")
    ap.add_argument("--lang", default="ja,en", help="字幕言語の優先順（既定: ja,en）")
    ap.add_argument("--out", default="youtube/refs", help="出力先ディレクトリ")
    ap.add_argument("--interval", type=int, default=30, help="時刻を打つ間隔（秒）。0 で時刻なし")
    ap.add_argument("--stdout", action="store_true", help="ファイルに書かず標準出力へ")
    args = ap.parse_args()

    prefs = [x.strip() for x in args.lang.split(",") if x.strip()]
    info, lang, vtt, is_manual = fetch(args.url, prefs)
    markdown = build_markdown(info, lang, is_manual, render_body(parse_vtt(vtt), args.interval))

    if args.stdout:
        sys.stdout.write(markdown)
        return

    out_dir = Path(args.out)
    out_dir.mkdir(parents=True, exist_ok=True)
    out_path = out_dir / f"{info.get('id')}.md"
    out_path.write_text(markdown, encoding="utf-8")
    print(f"{out_path}  ({len(markdown):,} 文字 / 字幕 {lang} / {'手動' if is_manual else '自動生成'})")


if __name__ == "__main__":
    main()
