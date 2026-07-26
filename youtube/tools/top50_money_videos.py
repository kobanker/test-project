import sys, json, urllib.request, urllib.parse, os, time, re

SP = os.path.dirname(os.path.abspath(__file__))
KEY = os.environ.get("YT_API_KEY", "")
if not KEY:
    sys.exit("環境変数 YT_API_KEY に YouTube Data API v3 のキーを設定してください")
API = "https://www.googleapis.com/youtube/v3/"
AFTER = "2025-07-26T00:00:00Z"

def call(ep, **p):
    p["key"] = KEY
    for a in range(3):
        try:
            return json.load(urllib.request.urlopen(API + ep + "?" + urllib.parse.urlencode(p), timeout=30))
        except Exception as e:
            if a < 2: time.sleep(2 * (a + 1)); continue
            return {"__error__": str(e)}

# 前回18本 + このチャンネルの守備範囲（住宅ローン/年金受給/相続/保険/教育費）を厚くした計34本
QUERIES = [
    "新NISA", "投資 初心者", "米国株 投資", "資産運用", "節約 家計", "貯金 方法",
    "老後 年金", "節税 税金", "副業 稼ぐ", "お金 増やす", "高配当株", "住宅ローン",
    "インデックス投資", "投資信託 おすすめ", "円安 経済", "日経平均 株価", "iDeCo", "家計簿 節約",
    "住宅ローン 破綻", "住宅ローン 変動金利", "ペアローン", "年金 繰下げ受給", "年金 繰上げ受給",
    "特別支給の老齢厚生年金", "相続 揉める", "相続税 対策", "生命保険 見直し", "教育費 大学",
    "退職金 運用", "老後資金 いくら", "銀行員 本音", "定年後 生活", "扶養 年収の壁", "ふるさと納税",
]

vid_ids, per_q = set(), {}
for q in QUERIES:
    r = call("search", part="snippet", q=q, type="video", order="viewCount",
             publishedAfter=AFTER, regionCode="JP", relevanceLanguage="ja", maxResults=50)
    if "__error__" in r: print("ERR", q, r["__error__"][:80]); continue
    ids = [i["id"]["videoId"] for i in r.get("items", [])]
    per_q[q] = len(ids); vid_ids.update(ids)
print("queries:", len(per_q), "unique videos:", len(vid_ids))

def dur(s):
    m = re.match(r"P(?:(\d+)D)?T?(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?", s or "")
    if not m: return 0
    d, h, mi, se = [int(x) if x else 0 for x in m.groups()]
    return d*86400 + h*3600 + mi*60 + se

vids = []
ids = sorted(vid_ids)
for i in range(0, len(ids), 50):
    r = call("videos", part="snippet,statistics,contentDetails", id=",".join(ids[i:i+50]))
    for it in r.get("items", []):
        vids.append({
            "id": it["id"], "title": it["snippet"]["title"],
            "channel": it["snippet"]["channelTitle"], "channelId": it["snippet"]["channelId"],
            "pub": it["snippet"]["publishedAt"][:10],
            "views": int(it["statistics"].get("viewCount", 0)),
            "likes": int(it["statistics"].get("likeCount", 0)),
            "comments": int(it["statistics"].get("commentCount", 0)),
            "secs": dur(it["contentDetails"].get("duration")),
        })
print("hydrated:", len(vids))
json.dump(vids, open(os.path.join(SP,"pool.json"),"w"), ensure_ascii=False)

# 除外1: 広告出稿でインプレッションが乗るチャンネル（前回特定）
AD_CH = {"三菱UFJ銀行公式「MUFGBankChannel」", "三菱UFJアセットマネジメント ON AIR",
         "リノシーチャンネル【公式】", "楽天証券 公式YouTube", "SBI証券"}
# 除外2: お金クエリで釣れるが実体が別ジャンル
OFF_CH = {"2chのたまり場", "心に響く名言・タメになる雑学", "ティアロ疾風伝", "あんの遊びチャンネル",
          "キニナルセカイ", "まごそぼ(孫と祖母)", "カマちゃんねる", "噂の政治の雑学図鑑",
          "心と体の処方せん", "人生の物語アニメ", "人生ラジオ", "わせだや", "さな | 家計簿と日常ASMR",
          "シニアの勝ち逃げログ 〜ココロの裏・心理学〜", "ほのぼの猫ミーム", "けんた食堂",
          "シニアの開運とライフ", "日本正論チャンネル", "ヒカル（Hikaru）", "ひろゆけ【ひろゆき切り抜き】",
          "Paranoia_パラノイア【有益な2ch】", "古着物販攻略チャンネル-Vintage-",
          "ABEMA Prime #アベプラ【公式】", "FNNプライムオンライン", "TBS NEWS DIG Powered by JNN"}
OFF_KW = ("猫ミーム", "#shorts", "切り抜き", "せどり", "物販", "古着")

def keep(v):
    if v["channel"] in AD_CH or v["channel"] in OFF_CH: return False
    if v["secs"] <= 61: return False           # ショートは除外（尺の設計が別物）
    if v["views"] < 1000: return False
    if any(k in v["title"] for k in OFF_KW): return False
    return True

pool = [v for v in vids if keep(v)]
pool.sort(key=lambda v: -v["views"])

# 1チャンネル最大3本まで（同じチャンネルで埋まるのを防ぐ）
top, cnt = [], {}
for v in pool:
    c = cnt.get(v["channelId"], 0)
    if c >= 3: continue
    cnt[v["channelId"]] = c + 1
    top.append(v)
    if len(top) == 50: break

json.dump(top, open(os.path.join(SP, "top50.json"), "w"), ensure_ascii=False, indent=1)
print(f"\n{'#':>3} {'再生':>10} {'尺':>5} {'like%':>6} {'公開':>10}  チャンネル / タイトル")
for i, v in enumerate(top, 1):
    er = v["likes"] / v["views"] * 100 if v["views"] else 0
    print(f"{i:>3} {v['views']:>10,} {v['secs']//60:>4}分 {er:>5.1f}% {v['pub']}  [{v['channel'][:18]}] {v['title'][:66]}")
