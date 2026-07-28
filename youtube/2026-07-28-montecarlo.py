# -*- coding: utf-8 -*-
# 前提:
#  期待リターン(幾何・円ベース) = JPモルガン超長期市場予測2026
#    世界株式(オルカン) 5.2% / 米国大型株(S&P500) 4.9% / 日本大型株(TOPIX) 7.1%
#    NASDAQ100・FANG+はJPM予測なし → 米国大型株と同じ4.9%と置く(集中が報われる保証はない、という前提)
#  リスク(年率σ) = アップロードdocxの10年proxy(FANG+のみ5年proxy)
#    オルカン15.09 / S&P500 15.73 / NASDAQ100 25.72 / TOPIX 14.34 / FANG+ 50.47
#  毎月5万円 x 20年 = 元本1,200万円, 対数正規, 月次, 20,000パス
import numpy as np
rng = np.random.default_rng(42)

N, YRS = 20000, 20
M = YRS*12
CONTRIB = 5.0  # 万円/月

assets = {
    "オルカン":      (0.052, 0.1509),
    "S&P500":       (0.049, 0.1573),
    "NASDAQ100":    (0.049, 0.2572),
    "日本株(TOPIX)": (0.071, 0.1434),
    "FANG+":        (0.049, 0.5047),
}

def sim(mu, sigma, z):
    drift = np.log(1+mu)/12
    s = sigma/np.sqrt(12)
    growth = np.exp(drift - 0  + s*z)  # 幾何平均を固定(中央値=複利予測)
    bal = np.zeros(z.shape[0])
    for t in range(M):
        bal = (bal + CONTRIB) * growth[:, t]
    return bal

print(f"毎月5万円×20年(元本1,200万円) 20,000パス  単位:万円")
print(f"{'':14s}{'悪い未来(下位10%)':>16s}{'真ん中':>10s}{'良い未来(上位10%)':>16s}{'元本割れ確率':>10s}")
results = {}
zs = {}
for name,(mu,sg) in assets.items():
    z = rng.standard_normal((N, M))
    zs[name] = z
    bal = sim(mu, sg, z)
    results[name] = bal
    p10, p50, p90 = np.percentile(bal, [10,50,90])
    ruin = (bal < CONTRIB*M).mean()*100
    print(f"{name:12s}{p10:14.0f}{p50:12.0f}{p90:14.0f}{ruin:11.0f}%")

# コアサテライト 70/30 オルカン/NASDAQ100 (相関0.90, 毎月リバランス相当)
rho = 0.90
z1 = zs["オルカン"]; z_ind = rng.standard_normal((N, M))
z2 = rho*z1 + np.sqrt(1-rho**2)*z_ind
mu1,s1 = assets["オルカン"]; mu2,s2 = assets["NASDAQ100"]
g1 = np.exp(np.log(1+mu1)/12 + (s1/np.sqrt(12))*z1)
g2 = np.exp(np.log(1+mu2)/12 + (s2/np.sqrt(12))*z2)
gmix = 0.7*g1 + 0.3*g2
bal = np.zeros(N)
for t in range(M):
    bal = (bal + CONTRIB) * gmix[:, t]
p10,p50,p90 = np.percentile(bal,[10,50,90])
ruin = (bal < CONTRIB*M).mean()*100
print(f"{'コアサテ70/30':12s}{p10:14.0f}{p50:12.0f}{p90:14.0f}{ruin:11.0f}%")

# もしAIが本当に伸びてNASDAQ100が+2%上振れ(6.9%)した世界
mu2b = 0.069
g2b = np.exp(np.log(1+mu2b)/12 + (s2/np.sqrt(12))*z2)
for label, gm in [("NAS100単独(上振れ6.9%)", g2b), ("70/30(NAS上振れ)", 0.7*g1+0.3*g2b)]:
    bal = np.zeros(N)
    for t in range(M):
        bal = (bal + CONTRIB) * gm[:, t]
    p10,p50,p90 = np.percentile(bal,[10,50,90])
    ruin = (bal < CONTRIB*M).mean()*100
    print(f"{label:12s}{p10:14.0f}{p50:12.0f}{p90:14.0f}{ruin:11.0f}%")

# シャープレシオ確認(docx系列, rf=0)
print()
print("docx採用系列のシャープ(参考): 5年: TOPIX1.37 > S&P500 0.82 > オルカン0.72 > FANG+0.65 > NAS100 0.61")
print("10年: S&P500 1.01 > NAS100 0.88 > オルカン0.84 > TOPIX 0.80 (FANG+は10年整合系列なし)")
