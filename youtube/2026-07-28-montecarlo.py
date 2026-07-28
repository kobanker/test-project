# -*- coding: utf-8 -*-
# 参考台本の前提を再現: JPモルガンLTCMA2026(円ベース)の算術平均リターン+年率リスク
# 正規分布・月次・毎月5万円×20年(元本1,200万円)
import numpy as np
rng = np.random.default_rng(7)
N, M = 100000, 240
C = 5.0

assets = {  # (算術平均, 年率リスク)
    "オルカン":  (0.0683, 0.1889),
    "S&P500":   (0.0661, 0.1932),
    "NASDAQ100":(0.0661, 0.2264),
    "TOPIX":    (0.0833, 0.1710),
    "FANG+":    (0.0661, 0.30),
}

def run(mu, sg, z):
    g = 1 + mu/12 + (sg/np.sqrt(12))*z
    g = np.maximum(g, 0.0)
    bal = np.zeros(z.shape[0])
    for t in range(M):
        bal = (bal + C)*g[:,t]
    return bal

print(f"{'':11s}{'悪い10%':>9s}{'中央値':>9s}{'良い10%':>9s}")
zs = {}
for k,(mu,sg) in assets.items():
    z = rng.standard_normal((N,M)); zs[k]=z
    b = run(mu,sg,z)
    p10,p50,p90 = np.percentile(b,[10,50,90])
    print(f"{k:10s}{p10:9.0f}{p50:9.0f}{p90:9.0f}")

# 配分別 (オルカン x NAS100, 相関0.9, 毎月リバランス)
rho=0.9
z1 = zs["オルカン"]; zi = rng.standard_normal((N,M))
z2 = rho*z1 + np.sqrt(1-rho**2)*zi
mu1,s1 = assets["オルカン"]; mu2,s2 = assets["NASDAQ100"]
g1 = 1+mu1/12+(s1/np.sqrt(12))*z1
g2 = 1+mu2/12+(s2/np.sqrt(12))*z2
print()
for w in [1.0, 0.9, 0.8, 0.7]:
    g = np.maximum(w*g1+(1-w)*g2, 0.0)
    bal = np.zeros(N)
    for t in range(M):
        bal = (bal + C)*g[:,t]
    p10,p50,p90 = np.percentile(bal,[10,50,90])
    print(f"オルカン{w*100:.0f}/NAS{(1-w)*100:.0f}  {p10:8.0f}{p50:9.0f}{p90:9.0f}")
