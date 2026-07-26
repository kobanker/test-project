import sys, json, urllib.request, urllib.parse, collections, os, time

SP = os.path.dirname(os.path.abspath(__file__))
KEY = os.environ.get("YT_API_KEY", "")
if not KEY:
    sys.exit("環境変数 YT_API_KEY に YouTube Data API v3 のキーを設定してください")
API = "https://www.googleapis.com/youtube/v3/"
PUBLISHED_AFTER = "2025-07-26T00:00:00Z"   # 直近1年

def call(endpoint, **params):
    params["key"] = KEY
    url = API + endpoint + "?" + urllib.parse.urlencode(params)
    for attempt in range(3):
        try:
            with urllib.request.urlopen(url, timeout=30) as r:
                return json.load(r)
        except urllib.error.HTTPError as e:
            body = e.read().decode()[:400]
            if e.code in (403, 429) and attempt < 2:
                time.sleep(2 * (attempt + 1)); continue
            return {"__error__": f"{e.code} {body}"}
        except Exception as e:
            if attempt < 2:
                time.sleep(2); continue
            return {"__error__": str(e)}

QUERIES = [
    "新NISA", "投資 初心者", "米国株 投資", "資産運用", "節約 家計",
    "貯金 方法", "老後 年金", "節税 税金", "副業 稼ぐ", "お金 増やす",
    "高配当株", "住宅ローン", "インデックス投資", "投資信託 おすすめ",
    "円安 経済", "日経平均 株価", "iDeCo", "家計簿 節約",
]

video_ids = set()
per_query = {}
errors = []
for q in QUERIES:
    res = call("search", part="snippet", q=q, type="video", order="viewCount",
               publishedAfter=PUBLISHED_AFTER, regionCode="JP",
               relevanceLanguage="ja", maxResults=50)
    if "__error__" in res:
        errors.append((q, res["__error__"])); continue
    ids = [it["id"]["videoId"] for it in res.get("items", [])]
    per_query[q] = len(ids)
    video_ids.update(ids)

print("queries ok:", len(per_query), "errors:", errors[:3])
print("unique videos:", len(video_ids))

# hydrate videos with real stats
videos = []
ids = sorted(video_ids)
for i in range(0, len(ids), 50):
    res = call("videos", part="snippet,statistics,contentDetails", id=",".join(ids[i:i+50]))
    if "__error__" in res:
        errors.append(("videos", res["__error__"])); continue
    videos.extend(res.get("items", []))

print("hydrated:", len(videos))
json.dump(videos, open(os.path.join(SP, "videos_raw.json"), "w"))

def vc(v):
    return int(v.get("statistics", {}).get("viewCount", 0))

by_channel = collections.defaultdict(list)
for v in videos:
    by_channel[(v["snippet"]["channelId"], v["snippet"]["channelTitle"])].append(v)

rows = []
for (cid, title), vs in by_channel.items():
    rows.append({
        "channelId": cid, "title": title,
        "hits": len(vs),
        "sumViews": sum(vc(v) for v in vs),
        "maxViews": max(vc(v) for v in vs),
        "topVideo": max(vs, key=vc)["snippet"]["title"][:60],
    })
rows.sort(key=lambda r: -r["sumViews"])
json.dump(rows, open(os.path.join(SP, "channels_discovered.json"), "w"), ensure_ascii=False)

print("\n=== 直近1年・お金系クエリでヒットした動画の合計再生数 上位40チャンネル ===")
for r in rows[:40]:
    print(f'{r["sumViews"]:>12,}  hits={r["hits"]:<3} max={r["maxViews"]:>10,}  {r["title"]}')
if errors:
    print("\nERRORS:", errors[:5])
