import sys, json, urllib.request, urllib.parse, os, time, statistics, datetime

SP = os.path.dirname(os.path.abspath(__file__))
KEY = os.environ.get("YT_API_KEY", "")
if not KEY:
    sys.exit("環境変数 YT_API_KEY に YouTube Data API v3 のキーを設定してください")
API = "https://www.googleapis.com/youtube/v3/"
CUTOFF = "2025-07-26T00:00:00Z"

def call(endpoint, **params):
    params["key"] = KEY
    url = API + endpoint + "?" + urllib.parse.urlencode(params)
    for attempt in range(3):
        try:
            with urllib.request.urlopen(url, timeout=30) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            body = e.read().decode()[:300]
            if e.code in (403, 429) and attempt < 2:
                time.sleep(2 * (attempt + 1)); continue
            return {"__error__": f"{e.code} {body}"}
        except Exception:
            if attempt < 2:
                time.sleep(2); continue
            return {"__error__": "network"}

# 発見された「お金系」チャンネル（明らかに非マネーのバイラル動画は除外）＋既知の大手
DISCOVERED = os.path.join(SP, "channels_discovered.json")
if not os.path.exists(DISCOVERED):
    sys.exit("先に discover_money_channels.py を実行してください（channels_discovered.json が必要）")
discovered = json.load(open(DISCOVERED))
EXCLUDE = {
    "2chのたまり場", "心に響く名言・タメになる雑学", "ティアロ疾風伝", "あんの遊びチャンネル",
    "キニナルセカイ", "TBS NEWS DIG Powered by JNN", "日テレNEWS", "ABEMA Prime #アベプラ【公式】",
    "シニアの勝ち逃げログ 〜ココロの裏・心理学〜", "わせだや", "さな | 家計簿と日常ASMR",
}
cands = {r["channelId"]: r["title"] for r in discovered[:60] if r["title"] not in EXCLUDE}

KNOWN = {  # 前回の記事ベース調査で挙げたもの（比較のため）
    "UC67Wr_9pA4I0glIxDt_Cpyw": "両学長 リベラルアーツ大学",
    "UCFo4kqllbcQ4nV83WCyraiw": "中田敦彦のYouTube大学",
    "UCwKupwJ1EpdNH8Z98SKjY2Q": "脱・税理士スガワラくん",
    "UCG_oqDSlIYEspNpd2H4zWhw": "ReHacQ−リハック−",
    "UC8yHePe_RgUBE-waRWy6olw": "PIVOT 公式チャンネル",
    "UCGXU4lVXc9msfUkjNykA7TA": "BANK ACADEMY",
}
cands.update(KNOWN)
print("candidate channels:", len(cands))

# チャンネル本体のメタ
meta = {}
cids = list(cands)
for i in range(0, len(cids), 50):
    res = call("channels", part="snippet,statistics,contentDetails", id=",".join(cids[i:i+50]))
    for it in res.get("items", []):
        meta[it["id"]] = it

results = []
for cid, title in cands.items():
    m = meta.get(cid)
    if not m:
        continue
    uploads = m["contentDetails"]["relatedPlaylists"].get("uploads")
    if not uploads:
        continue
    vids, token, pages = [], None, 0
    stop = False
    while not stop and pages < 60:
        p = dict(part="contentDetails", playlistId=uploads, maxResults=50)
        if token: p["pageToken"] = token
        res = call("playlistItems", **p)
        if "__error__" in res: break
        items = res.get("items", [])
        for it in items:
            pub = it["contentDetails"].get("videoPublishedAt", "")
            if pub and pub < CUTOFF:
                stop = True; continue
            if pub:
                vids.append(it["contentDetails"]["videoId"])
        token = res.get("nextPageToken"); pages += 1
        if not token: break

    stats = []
    for i in range(0, len(vids), 50):
        res = call("videos", part="statistics,contentDetails,snippet", id=",".join(vids[i:i+50]))
        for it in res.get("items", []):
            dur = it["contentDetails"]["duration"]
            # ISO8601 -> 秒（PT#M#S など）
            import re
            mm = re.match(r"PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?", dur)
            h, mi, s = [int(x) if x else 0 for x in (mm.groups() if mm else (0,0,0))]
            secs = h*3600 + mi*60 + s
            stats.append({
                "id": it["id"],
                "title": it["snippet"]["title"],
                "pub": it["snippet"]["publishedAt"],
                "views": int(it["statistics"].get("viewCount", 0)),
                "secs": secs,
                "short": secs <= 61,
            })
    longs = [v for v in stats if not v["short"]]
    st = m["statistics"]
    results.append({
        "channelId": cid,
        "title": m["snippet"]["title"],
        "handle": m["snippet"].get("customUrl", ""),
        "since": m["snippet"]["publishedAt"][:10],
        "subs": int(st.get("subscriberCount", 0)) if not st.get("hiddenSubscriberCount") else None,
        "totalViews": int(st.get("viewCount", 0)),
        "totalVideos": int(st.get("videoCount", 0)),
        "y_videos": len(stats),
        "y_longs": len(longs),
        "y_views": sum(v["views"] for v in stats),
        "long_median": int(statistics.median([v["views"] for v in longs])) if longs else 0,
        "long_max": max([v["views"] for v in longs]) if longs else 0,
        "top": max(longs, key=lambda v: v["views"])["title"][:70] if longs else "",
        "top_id": max(longs, key=lambda v: v["views"])["id"] if longs else "",
        "capped": pages >= 60 and not stop,
        "oldest": min([v["pub"] for v in stats])[:10] if stats else "",
    })
    print(f'  measured {m["snippet"]["title"][:30]:32} y_videos={len(stats):>4} y_views={sum(v["views"] for v in stats):>12,}')

results.sort(key=lambda r: -r["y_views"])
json.dump(results, open(os.path.join(SP, "measured.json"), "w"), ensure_ascii=False, indent=1)
print("\nDONE ->", len(results), "channels measured")
