#!/usr/bin/env python3
"""Google Drive の download_file_content の結果(JSON+base64)から .one を復元し、
ページタイトルと本文テキストを抽出する。"""
import sys, json, base64, io, contextlib
from pyOneNote.OneDocument import OneDocment


def extract(tool_result_path):
    with open(tool_result_path) as f:
        data = json.load(f)
    raw = base64.b64decode(data['content'])
    buf = io.BytesIO(raw)
    with contextlib.redirect_stdout(io.StringIO()):
        doc = OneDocment(buf)
        j = doc.get_json()
    if isinstance(j, str):
        j = json.loads(j)

    titles, texts = [], []

    def walk(o):
        if isinstance(o, dict):
            for k, v in o.items():
                if isinstance(v, str):
                    if k in ('CachedTitleString', 'CachedTitleStringFromPage'):
                        titles.append(v.strip())
                    elif k == 'RichEditTextUnicode':
                        texts.append(v.strip())
                walk(v)
        elif isinstance(o, list):
            for i in o:
                walk(i)

    walk(j)
    seen = set()
    uniq_titles = [t for t in titles if t and not (t in seen or seen.add(t))]
    return data['title'], len(raw), uniq_titles, texts


def extract_fallback(tool_result_path):
    """パーサが未対応の構造で落ちたときの粗い抽出（UTF-16 の文字列走査）。"""
    import re
    with open(tool_result_path) as f:
        data = json.load(f)
    raw = base64.b64decode(data['content'])
    text = raw.decode('utf-16-le', errors='ignore')
    runs = re.findall(r'[ -~　-ヿ一-鿿＀-￯]{6,}', text)
    skip = ('Meiryo', 'Segoe', 'Yu Gothic', 'MS P', 'Calibri')
    out = []
    for r in runs:
        r = r.strip()
        if r and not any(s in r for s in skip) and r not in out:
            out.append(r)
    return data['title'], len(raw), out


if __name__ == '__main__':
    for path in sys.argv[1:]:
        try:
            name, size, titles, texts = extract(path)
            print(f'=== {name} ({size//1024} KB, ページ {len(titles)}, テキスト断片 {len(texts)}) ===')
            for t in titles:
                print(f'  - {t}')
        except Exception as e:
            name, size, runs = extract_fallback(path)
            print(f'=== {name} ({size//1024} KB) パーサ失敗({type(e).__name__}) → 粗い抽出 {len(runs)} 断片 ===')
            for r in runs[:20]:
                print(f'  ~ {r[:80]}')
