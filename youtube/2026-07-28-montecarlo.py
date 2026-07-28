# -*- coding: utf-8 -*-
# 検証: 5%刻みコアサテ(オルカン/NAS100), 年1回リバランス, 15万回相当
# JPM LTCMA2026円ベース算術平均 + リスク, 正規分布・月次
import numpy as np
rng = np.random.default_rng(11)
N, YRS = 150000, 20
M = YRS*12
C = 5.0
mu1, s1 = 0.0683, 0.1889   # オルカン
mu2, s2 = 0.0661, 0.2264   # NASDAQ100
rho = 0.9

z1 = rng.standard_normal((N,M))
z2 = rho*z1 + np.sqrt(1-rho**2)*rng.standard_normal((N,M))
g1 = np.maximum(1 + mu1/12 + (s1/np.sqrt(12))*z1, 0.0)
g2 = np.maximum(1 + mu2/12 + (s2/np.sqrt(12))*z2, 0.0)

print(f"{'配分':16s}{'下位10%':>8s}{'中央値':>8s}{'上位10%':>8s}{'元本割れ':>8s}")
for w in [1.0, 0.95, 0.90, 0.85, 0.80, 0.70]:
    a = np.zeros(N); b = np.zeros(N)   # 資産をオルカン部分/NAS部分で保持
    for t in range(M):
        a = (a + C*w)*g1[:,t]
        b = (b + C*(1-w))*g2[:,t]
        if (t+1) % 12 == 0:            # 年1回リバランス
            tot = a + b
            a, b = tot*w, tot*(1-w)
    tot = a + b
    p10, p50, p90 = np.percentile(tot,[10,50,90])
    ruin = (tot < C*M).mean()*100
    print(f"オルカン{w*100:3.0f}/NAS{(1-w)*100:2.0f}   {p10:8.0f}{p50:8.0f}{p90:8.0f}{ruin:7.1f}%")
