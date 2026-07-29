# プライベートクレジット リサーチレポート

作成日: 2026-07-29
用途: YouTube 解説動画の元ネタ（台本ではなく調査メモ）
文体: 常体（スキルの文体指定が未確定のため、台本化のときに合わせて変換する）

---

## 0. このレポートの読み方と、信頼度について

先に断っておく。ここに書いた数字は、すべてウェブ上の出典に当たって拾ったもので、
記憶で書いたものはない。ただし信頼度には段差がある。動画で読み上げる前に、
**[要確認]** を付けた数字だけは一次資料で裏を取ってほしい。

| 記号 | 意味 |
| --- | --- |
| （出典明記） | 一次資料または大手メディア・格付会社の発表として確認できたもの |
| [要確認] | 検索結果の要約経由で拾った数字。方向性は正しいが、桁・定義・時点を再確認したい |

技術的な制約として、今回 IMF・FSB・FRB・SEC EDGAR の PDF / HTML には
ゲートウェイ側で接続がブロックされ、**一次資料そのものを開けなかった**。
これらの機関の内容は検索結果の要約に依存している。動画で
「FSB の報告書によると」と言うなら、該当 PDF を自分で開いて確認してから話すこと。

---

## 1. 結論（動画で最初に言うべきこと）

プライベートクレジットは 2026 年に入って、**初めて本格的なストレスを受けている**。
ただしそれは「バブル崩壊」でも「リーマン再来」でもない。起きているのは次の3つが同時進行する現象だ。

1. **信用の悪化** — デフォルトが実際に増えている。ただし「何をデフォルトと数えるか」で
   率が 1.6% にも 9.2% にもなる。この幅そのものが、この市場の本質的な問題を表している。
2. **流動性の逆流** — 個人向けファンドで解約が殺到し、大手が軒並み「ゲート」（解約制限）を発動した。
   2026年Q2、Apollo の個人向けファンドには残高の 16.8% の解約請求が来たが、返せたのは 5% まで。
3. **震源が新しい** — 従来型の景気後退ではなく、**AI によるソフトウェア企業の破壊**が引き金になっている。
   これは過去の信用サイクルに前例がない。

そして日本人にとって他人事ではない理由が 2 つある。生保が既に持っていること、
そして 2025年12月から**個人向けの公募投信として日本で売られ始めた**ことだ。

---

## 2. 前提：プライベートクレジットとは何か

### 2-1. 定義

銀行を通さず、投資ファンドが企業に直接お金を貸す。それだけ。
株ではなく「貸付」なので、リターンは金利。上場していないので市場価格がつかない。

典型的な借り手は、**PEファンドに買収された中堅企業**。銀行が貸すには信用力が足りず、
社債を出すには規模が小さい。そこを埋めるのがこの市場。

### 2-2. なぜ増えたか（3つの理由）

1. **銀行が引いた** — 金融危機後の規制（自己資本比率、レバレッジドレンディング・ガイダンス）で、
   銀行は信用力の低い企業向け融資を balance sheet に置きづらくなった。
2. **金利が上がった** — 変動金利（SOFR連動）で貸すので、利上げ局面でそのまま利回りが上がった。
   投資家からすれば「株より安全そうなのに 10% 前後」に見えた。
3. **PEが必要とした** — 買収資金を素早く、確実に、条件交渉しやすい形で調達したかった。
   シンジケートローンは市場が荒れると組成できないが、プライベートクレジットは相対で決まる。

### 2-3. 主要な形

| 形態 | 中身 |
| --- | --- |
| ダイレクトレンディング | 中核。ファンドが企業に直接融資 |
| ユニトランシェ | シニアとメザニンを1本にまとめたローン。1社で全額出せる |
| BDC | Business Development Company。米国の上場/非上場の貸付専門会社。個人が買える器 |
| エバーグリーン / セミリキッドファンド | 期限なし、四半期ごとに一部解約可。個人向けの主戦場 |
| NAVローン | ファンドの保有資産を担保にファンド自体に貸す。レバレッジの隠れ層 |

**動画で強調すべき点**: 「BDC」という言葉を知らない視聴者が大半。
ここを「個人がプライベートクレジットに触れる唯一の窓口」として丁寧に説明すると、
後半のゲートの話が一気に自分ごとになる。

### 2-4. PIK（Payment In Kind）— これが今回の主役

**現金で利息を払わず、借金の元本に利息を上乗せしていく**方式。
借り手はキャッシュが出ていかないので楽。貸し手は「利息を受け取った」として
会計上の収益に計上できる。**現金は1円も入っていないのに**。

もともとは経営が苦しい会社向けの仕組みだったが、高金利下で普通の会社にも広がった。
PitchBook はこれを「今日のキャッシュフローの余裕が、明日の返済危機になりかねない」と表現している。

---

## 3. 市場規模と主要プレイヤー

### 3-1. 規模

| 出典 | 数字 | 時点 |
| --- | --- | --- |
| FSB | 1.5〜2.0兆ドル | 2024年末 |
| Moody's | 2兆ドル超 | 2026年 |
| PwC | 2兆ドル超 | 2026年 |
| Moody's（予測） | 2030年に4兆ドル接近 | 予測 |
| Preqin / BlackRock（予測） | 2030年に4.5兆ドル | 予測 |

比較のために覚えておくと効く数字: **米国の社債市場は約13兆ドル**。
つまりプライベートクレジットは社債市場の 1/6 程度。「巨大だが、まだ主役ではない」。

> **図解ポイント**: 2兆ドル vs 13兆ドル の棒グラフを出すと、
> 「危機だ」と煽る他チャンネルとの差別化になる。規模感を正しく置くこと自体が価値。

### 3-2. 上位運用会社

上位10社で市場の 65%超を占める（Apollo, Ares, Blackstone Credit & Insurance, Blue Owl,
HPS（現 BlackRock 傘下）, KKR Credit, Golub, Oaktree, Sixth Street, Antares）。[要確認]

- Apollo: クレジットAUM 約6,000億ドル [要確認]
- Ares: 約4,640億ドル [要確認]

**深い視点**: 「分散した無数の貸し手」ではなく、**寡占市場**であること。
上位10社が3分の2を握っている市場で「idiosyncratic（個別要因）だから大丈夫」という
説明がどこまで通るのか、というのは投げかける価値のある問い。

---

## 4. 何が起きたか — 2025〜2026 時系列

> 注: この時系列の骨格は Wikipedia の "2025–2026 private credit crisis" 項目の
> 検索要約から取り、個別の出来事は別途一次寄りの報道で確認した。
> ただし Wikipedia 本文は開けていない。[要確認]

| 時期 | 出来事 |
| --- | --- |
| 2025/6 | DoubleLine の Gundlach が「サブプライム前夜に似ている」と発言 |
| 2025/7 | JPMorgan の Dimon が「ピークかもしれない」、Morgan Stanley の Pick は銀行の参入拡大に言及 |
| 2025/9/10 | **Tricolor Holdings**（サブプライム自動車）が Chapter 7 |
| 2025/9下旬 | **First Brands Group** が Chapter 11。負債 100〜500億ドル規模 |
| 2025/10 | Meta × Blue Owl、**270億ドル**の Hyperion データセンター案件（史上最大のプライベートクレジット取引） |
| 2025/11 | Blue Owl が OBDC II と OBDC の合併を発表 → 数日後に撤回 |
| 2025/12 | **アポロ × 野村**、日本初の個人向けプライベート資産公募投信を販売開始 |
| 2026/2/4前後 | **ソフトウェア/AI 懸念でBDC株が急落**。Blue Owl は一時 -13%、他大手も -8〜10% |
| 2026/2/19 | Blue Owl が OBDC II の四半期解約を停止、「資本返還」方式に転換。14億ドルのローン売却 |
| 2026/2/20-25 | 英 **Market Financial Solutions (MFS)** が破綻申請。二重担保の疑い |
| 2026/3/12 | **Deutsche Bank** が 259億ユーロ（約300億ドル）のプライベートクレジット・エクスポージャーを開示 |
| 2026/3/30 | 米労働省(DOL)、401(k) にプライベート資産を入れるセーフハーバー規則案を公表 |
| 2026/4 | **Fitch の米プライベートクレジット・デフォルト率が過去最高の 6.0%** |
| 2026/4/9-10 | 日本の金融庁・財務相が「国内リスクは限定的」との認識を表明 |
| 2026/4/21 | 日銀 金融システムレポート（2026年4月号）でPCファンドの解約請求に言及 |
| 2026/5/6 | **FSB がプライベートクレジットの脆弱性に関する報告書**を公表 |
| 2026/6/4 | **Blackstone が BCRED（790億ドル）でゲート発動**。史上初 |
| 2026/6/9 | KBRA が Columbia ビジネススクール論文に反論 |
| 2026/7 | Q2 決算。解約請求はさらに増加。BCRED は請求が減ったと発表 |

---

## 5. 【深掘り①】デフォルト率が 1.6% から 9.2% まで振れる理由

**ここが動画の一番の差別化ポイント。** 他のチャンネルは「デフォルト率が過去最高」で終わる。

同じ2025年について、こんなに違う数字が並んでいる。

| 出典 | 数字 | 定義 |
| --- | --- | --- |
| Moody's | **1.6%** | 通常のデフォルトのみ（ディストレスト・エクスチェンジ除く） |
| Moody's | **4.7%** | ディストレスト・エクスチェンジを含む |
| KBRA | 1.5%（2025年、件数/金額ベース） | ダイレクトレンディングに限定 |
| Fitch | **9.2%** | Fitch の「非公開モニタリング格付」ユニバース。2024年の8.1%から上昇 |

なぜこんなに違うのか。答えは **「ディストレスト・レストラクチャリング」をデフォルトと数えるかどうか**。

Moody's によれば、**2025年のプライベートクレジットのデフォルトの約65%は
「ディストレスト・レストラクチャリング」だった**。つまり、正式な破綻ではなく、
「返済期限を延ばす」「利息を PIK に切り替える」といった、
追い詰められた状況での条件変更のこと。

- 貸し手側から見れば「デフォルトさせていない」= 損失を計上しなくていい
- 実態としては「返せていない」

**これを "extend and pretend"（延長して、見なかったことにする）と呼ぶ。**
Moody's 自身が「Lend, extend, and then...」というタイトルのレポートを出している。

### 最新値

- **Fitch: 2026年4月末までの12ヶ月で 6.0%**。2024年8月の統計開始以来の最高値。
  99件のデフォルト事象のうち **81件が初回デフォルト**。
- KBRA 予測: 2026年末のプライベートクレジット・デフォルト率は **約3.5%**。
  ダイレクトレンディングに限れば金額ベースで **2%**（2025年は1.5%）。

> **話し方の提案**: 「デフォルト率が過去最高の6%です」と言ってから、
> 「でも同じ年について1.6%という数字もあります。どちらも嘘じゃないんです」と続ける。
> ここで視聴者の姿勢が変わる。

### 回収率も落ちている

デフォルトしたときにいくら戻るか（リカバリーレート）。

- KBRA の DLD インデックス: 第一順位（ファーストリーン）で **54%**
  （シンジケートローンの57%平均に近いが、歴史的水準より低い）
- Moody's の2024年ファーストリーン回収率: **49.2%**（長期平均 76.4%） [要確認]

**なぜ落ちたか**: コベナンツ（財務制限条項）が緩くなり、
問題の発覚が遅れる。発覚した頃には担保価値が既に毀損している。
加えてソフトウェア企業の担保は「無形資産」で、清算価値がほぼない。

---

## 6. 【深掘り②】評価の問題 — 同じローンが、貸し手によって違う値段

上場していないので市場価格がない。では NAV（純資産価値）はどう決まるか。
**運用会社が自分でモデルを作って評価する**（第三者評価機関を使うが、
インプットを出すのは運用会社）。

### 分かっていること

- 同じローンを複数のBDCが持っているとき、**評価額に開きがある**。
  情報の非対称性（貸し手ごとの関係の深さ、貸し手と評価機関の間の差）が原因とされる。
- 分散は**非上場BDCの方が大きい**。「非上場の方がパフォーマンスが安定している」という
  見え方とは逆。
- 時系列のボラティリティは低いのに、横断的な分散は大きい。
  これは「共通の値付けの拠り所がある」という説明と整合しない。
  **NAV が市場水準ではなく、運用会社ごとの前提で動いている**ことを示唆する。

### Moody's の反論（2026年6月）

Moody's は「BDC の評価は、むしろストレスを**過大に**見せている可能性がある」とも指摘している。
簿価が額面を下回っているローンについて、その乖離を
「取得時の割引（entry basis）」と「取得後の劣化」に分解すると、
**割引で取得したローンについては乖離の約4分の3が取得時の要因**だった、という分析。

つまり「安く買ったから安く載っている」だけで、信用が悪化したわけではないケースが相当ある。

> **バランスの取り方**: ここは片方に寄せない。
> 「評価が不透明」は事実だが、「不透明 = 隠している」ではない。両論を出す。

### 市場が出した答え: BDC のディスカウント

上場BDCは市場価格がつく。その市場価格が NAV より大幅に安い。

- Blue Owl Capital Corporation (OBDC): 2026年3月時点で株価 $11.45 / NAV $14.81 = **約23%のディスカウント** [要確認]
- 2025年11月の合併撤回時点で既に約20%のディスカウント [要確認]

**これは何を意味するか**: 市場は「運用会社が言っている NAV を信じていない」と言っている。
Blue Owl が合併を撤回したのも、この乖離が理由。

> **図解ポイント**: 「運用会社の言い値（NAV）」と「市場の言い値（株価）」を
> 2本の線で並べる。2025年後半から開いていくのが一目でわかる。

---

## 7. 【深掘り③】Medallia — 一つの案件で全部を説明できる事例

**この事例だけで動画が1本作れる。** 教科書的なほど、問題が全部入っている。

### 何があったか

- 2021年、**Thoma Bravo** が顧客体験管理ソフトの **Medallia** を **64億ドル**で買収（LBO）
- 融資は **ARR（年間経常収益）ベース**で組成された。
  → 利益ではなく「売上」を基準に貸す。SaaS 企業は赤字でも成長していれば貸せる、という理屈
- **PIK の柔軟性（PIKトグル）付き**。つまり現金で利息を払えないときは元本に積める契約
- その後、成長が鈍化。AI がこの領域のビジネスモデルを直撃
- **2026年、貸し手が PIK の継続を拒否**
  → 年間の債務返済負担が約1億ドル増えて **約3億ドル**に
  → 会社の利益は **約2億ドル**。**返済額が利益を上回った**
- 最大の貸し手である **Blackstone Private Credit Fund (BCRED) が非計上（non-accrual）に移行**
- Thoma Bravo は Medallia を貸し手に引き渡す方向。**株式価値 51億ドルが消えた**

### なぜこれが重要か

1. **ARRローンという発想の限界** — 売上基準で貸すのは、売上が伸び続ける前提。
   AI で SaaS の売上前提が崩れると、担保も何もない
2. **PIK は問題を先送りするが、消さない** — 5年間積み上がった利息が、
   PIK を止めた瞬間に現実の返済負担として顕在化する
3. **PIK を止める判断をするのは貸し手** — つまり貸し手が「もう無理」と判断した瞬間が
   デフォルトのタイミング。**貸し手が意図的にタイミングを選べる**
4. **BCRED の非計上率が急上昇した直接の原因** — 個人が買っているファンドに、直撃した

### BCRED の非計上率の動き

- 2025年Q4: **0.6%**
- 2026年Q1: **4.7%**（Medallia の追加が主因、ソフトウェアと歯科系の評価減）

Golub の BDC も同期間で 1.3% → **2.3%** に上昇。

FS KKR (FSK) は NAV が 9.9% 下落して $18.83、非計上が取得原価ベースで 8.1%、
配当を 40% 削減。[要確認 — 出典が二次的なので、FSK の開示で確認したい]

---

## 8. 【深掘り④】AI が震源だという新しさ

**ここが「一歩深い」内容の核。** 過去の信用危機は、景気後退か金利か不動産が原因だった。
今回は違う。

### 何が起きているか

2026年2月、ソフトウェア企業向けローンが売られた。理由は景気ではなく
**「AI がこのビジネスモデルを不要にするのではないか」という疑い**。

- BDC株が急落: Blue Owl 一時 **-13%**、Ares/KKR/Blackstone/TPG/Apollo の関連ビークルも **-8〜10%**
- 2026年2月時点で、プライベートクレジット市場のディストレスト・ソフトウェアローンは
  **469億ドル** [要確認]
- Deutsche Bank のテクノロジー（ソフトウェア含む）向け与信は
  **158億ユーロ**（前年 117億ユーロから増加）

### なぜプライベートクレジットに集中しているのか

PE ファンドは 2020〜2021 年に SaaS 企業を大量に買収した。
高い倍率で、ARR ベースの融資で。その融資の出し手がプライベートクレジットだった。

つまり **AI に最も破壊されやすいセクターに、最も緩い基準で貸したポートフォリオ**が
出来上がっていた。これは偶然ではなく構造。

### ただし冷静な見方も

2026年2月の売りは「プライベートクレジット全体のストレス」ではなく、
**ソフトウェア固有のリスクを約6%再評価しただけ**という分析もある。
セクター限定の「外科的な」動きで、市場全体の崩壊ではない、と。

### 一方で、AI はプライベートクレジットの最大の成長エンジンでもある

同じ AI が、この市場の需要側を作っている。

- **Meta × Blue Owl: 270億ドル**（2025年10月クローズ）。ルイジアナ州 Hyperion データセンター。
  400万平方フィート、最大5GW、2029年完成予定。Meta が約20%の持分を残し、
  Blue Owl が約70億ドルを現金拠出、Meta が約30億ドルの一時払いを受領
- **プライベートクレジットの AI 関連企業向け融資残高は、数年でほぼゼロから 2,000億ドル超へ** [要確認]
- Morgan Stanley 予測: プライベートクレジットがさらに **8,000億ドル**のデータセンター融資を供給 [要確認]

> **動画で一番おいしい構図**:
> 「AI が、この市場の**最大の借り手**であり、同時に**最大の破壊者**でもある」
> ソフトウェア企業を殺しながら、データセンターに資金を吸い込んでいる。
> 同じ運用会社が、両方のポジションを持っている。

---

## 9. 【深掘り⑤】流動性のミスマッチ — ゲートは何を意味するか

### 構造上の問題

貸したお金は5〜7年の企業向けローン。売ろうとしても相手を探して相対で交渉するしかない。
一方で、個人向けのエバーグリーンファンドは**四半期ごとに解約できる**と説明されている。

**5年のものを買って、3ヶ月で返す約束をしている。** これがミスマッチ。

安全弁が「ゲート」。四半期の解約を NAV の **5%** までに制限する条項。
これは事故ではなく、**最初から契約に書いてある設計**。

### 2026年に実際に起きたこと

**2026年Q1:**
- 大手非上場BDC 12社の解約請求は平均 **12.1%**（中央値 10.1%）— 5%のゲート水準の倍以上
- BDC全体で **139億ドル**の解約請求、うち **46億ドル**がゲートで止められた [要確認]

**2026年Q2（最新）:**

| ファンド | 解約請求（残高比） | 実際に返した額 |
| --- | --- | --- |
| Blackstone BCRED（790億ドル） | **10%**（44億ドル）※Q1は7.9% | 5%（上限） |
| Apollo Debt Solutions | **16.8%** ※Q1は11.2% | 5%（上限） |
| Ares Strategic Income Fund | **14.4%** | 5%（上限） |
| Blue Owl OCIC | 36億ドル（Q1の42億ドルから減少） | 5%（上限） |
| Goldman Sachs Private Credit Corp | **3.24%** | **全額** |

BCRED のゲートは **2026年6月4日**、同ファンド史上初。

### Blue Owl OBDC II の「ソフトフリーズ」

2026年2月、Blue Owl は非上場の OBDC II について
**四半期解約そのものをやめ、「資本返還」方式に切り替えた**。

- 投資家が「返してくれ」と言うのではなく、**運用会社が返せるときに返す**
- タイミングも金額も投資家は選べない
- 14億ドルのローン売却を実施し、NAV の最大30%（1株 $2.35、計 約2億6,800万ドル）を返還

Morningstar はこれを「セミリキッド・ファンド投資家への厳しい教訓」と評した。

### 深い論点：ゲートは失敗か、機能か

**強気派の主張**: ゲートは正常に機能した。取り付け騒ぎを防ぐためのブレーキであり、
非流動資産を投げ売りせずに済んだ。むしろ設計通り。

**弱気派の主張**: 問題は、**投資家がそう理解して買っていなかった**こと。
「四半期ごとに解約できる」と説明されて買った人が、実際には残高の3分の1しか
返してもらえない。これは商品説明の問題であって、設計の問題ではない。

> **動画での扱い**: ここは断定しない。ただし
> 「あなたが買うとき、ゲート条項を読みましたか?」という問いは投げる価値がある。

### 市場規模

米国のエバーグリーンファンド市場は **2026年3月末で 6,070億ドル、567本**
（2025年の 5,908億ドル、552本から増加）。
解約が出ている中でも、残高自体は増えている。

---

## 10. 【深掘り⑥】銀行との接続 — 本当のリスクはここ

「プライベートクレジットは投資家のお金だから、損しても投資家が損するだけ」
という説明がよく出る。**これは半分しか正しくない。**

### 銀行はプライベートクレジットに直接貸している

米国の銀行の **NDFI（ノンバンク金融機関）向け貸出残高**:

- 2025年末で **1.4兆ドル**、銀行業界総資産の **5.6%**
- 2026年3月11日時点で **1兆4,194億ドル**（季節調整済、国内商業銀行）
- 増加ペースは **年率22.7%** — 次に大きいカテゴリ（マルチファミリー）の3倍以上
- NDFI向け貸出の約 **57%** が、住宅・事業・消費者ローンを供給する信用仲介業者向け

つまり銀行は「危ない融資を balance sheet から外した」のではなく、
**危ない融資をしている人に貸している**。リスクは移ったが、消えてはいない。

### 個別行の開示

- **Deutsche Bank**: 259億ユーロ（約300億ドル）。2024年の245億ユーロから増加。
  うちテクノロジー向けが 158億ユーロ（前年117億ユーロ）。
  同行は「NBFI に関する重大なリスクはない」としつつ、
  「相互に連関したポートフォリオとカウンターパーティを通じた**間接的な信用リスク**」に言及
- **MUFG**: 上場プライベートクレジットファンド向けに実行した約 **20億ドル**の
  ローンについて、投資家への売却を協議中（FT報道）

### MFS 事件 — 銀行にどう伝わるかの実例

英国のブリッジローン会社 **Market Financial Solutions (MFS)**:

- 2026年2月20日に管財手続を申請、25日に管財人選任
- ローン残高 約 **24億ポンド**、債権者への負債 約 **26億ポンド**
- 管財人は創業者 Paresh Raja が **少なくとも13億ポンドを不正流用**したと主張
- **同じ担保が複数回差し入れられていた**疑い
- エクスポージャー: **Barclays 約8億ドル、Apollo傘下 Atlas SP 約5億ドル、Jefferies 約1億3,000万ドル** [要確認]
- Barclays と Jefferies の株価が下落し、金融株全体の売りに波及

### パターンが繰り返されている

| 案件 | 時期 | 手口 |
| --- | --- | --- |
| Tricolor | 2025/9 | 同じ自動車担保の二重計上疑い |
| First Brands | 2025/9 | オフバランスの簿外債務、担保の二重差入れ |
| MFS | 2026/2 | 担保の二重差入れ、資金流用 |

**共通点は「担保の二重差入れ」**。First Brands では、複数の資金調達層
（シンジケート、プライベート、オフバランス）があり、
**貸し手が資本構成の全体像を把握していなかった**。

> **これが一番深い論点**: プライベートクレジットの売り文句は
> 「借り手と直接向き合うので、公開市場より情報が深い」だった。
> ところが実際に起きたのは、**誰も全体像を見ていなかった**という事故。
> 相対取引は、情報が深い代わりに、**横のつながりが見えない**。

なお First Brands については、Rithm Capital のように
「商品の複雑さではなく、レンダーコントロール（貸し手による統制）の欠如が原因」
とする見方もある。

---

## 11. 当局の動き

### FSB（金融安定理事会）— 2026年5月6日

「プライベートクレジットにおける脆弱性に関する報告書」を公表。

指摘された脆弱性:
1. **銀行との相互連関**
2. **借り手の信用リスクと評価実務の不透明性**
3. **集中・レバレッジ・流動性** — 集中はテクノロジー、ヘルスケア、サービス業に対して。
   解約可能なファンドの拡大が**プロシクリカリティ（景気増幅性）**を高める懸念
4. **監督当局のデータ不足**

借り手の信用力について: 「**比較可能な公開市場の借り手より信用力が低く、レバレッジが高い**」。
レバレッジは「不透明で多層的な構造」に表れている、と。

提言: 市場規模・成長、銀行/保険とのリンク、レバレッジ、流動性条項、集中度、
クロスボーダー活動、借り手の信用力について、**当局が追跡すべき共通指標**を提示。

日銀も 2026年5月7日にこの報告書公表を国内向けに周知している。

### IMF — GFSR 2026年4月

- レバレッジと相互連関がリスクを高めうる領域として、プライベートクレジットと
  テクノロジー関連投資に注意を向けている
- ただし「**流動性のミスマッチはセミリキッド構造に限定されているように見える**」とし、
  最も重大なリスクは市場全体ではなく特定のセグメントに封じ込められている、との見方
- 新興国のプライベートクレジットについて Chapter 2 に BOX あり
- 情報は 2026年3月13日時点

### 米 OFR（金融調査局）— 2026年3月12日

「Measuring Counterparty Exposures to Private Credit」ブリーフを公表。
（PDF にアクセスできず、内容未確認。**動画で使うなら要確認**）

### 日本

- **日銀 金融システムレポート（2026年4月号、4/21公表）**:
  個人投資家を中心とした一部PCファンドへの解約請求事例を踏まえ、
  **先行きの動向に注意していくことが必要**と指摘。
  海外データセンター向け貸出スキームを分析し信用コストを試算したが、
  **現時点で大きなリスクの偏りは見られない**との評価
- **金融庁**: 主要金融機関のプライベートクレジット・エクスポージャーを点検中
- **財務相**（2026年4月）: 投資はあるが、現時点で国内の大きな問題とは見ていない

### 米労働省（DOL）— 401(k) 開放

- **2025年8月7日**: トランプ大統領が大統領令
  "Democratizing Access to Alternative Assets for 401(k) Investors" に署名
- **2026年3月30日**: DOL が規則案を公表。プライベートエクイティ、プライベートクレジット等を
  401(k) のラインナップに加える受託者向けの**セーフハーバー**を創設。
  検討要素は (i)パフォーマンス (ii)手数料 (iii)流動性 (iv)評価 (v)ベンチマーク (vi)複雑性
- コメント期間は **2026年6月1日**に終了
- 対象は確定拠出年金の **9,000万人超**のアメリカ人
- 実際のエクスポージャーは**ターゲット・デート・ファンド経由**で来る可能性が高い。
  つまり**個人が何も選択しないまま**、給与天引きの一部が非流動資産に流れる

> **皮肉な構図**: 個人向けファンドがゲートを発動している最中に、
> 当局が個人の年金を同じ資産に開放しようとしている。
> Axios はこれを「気まずいタイミングで来た規則案」と表現した。

---

## 12. 日本から見た接点

**動画の後半で「で、自分に関係あるの?」に答えるパート。**

### 機関投資家

- **日本生命**: 2026年3月31日時点でファンド融資商品の保有額 **約7,500億円**
  （運用資産全体の **0.9%**）。米子会社では **3.3兆円**
- **国内生保全体**: Morgan Stanley によれば、日本の保険会社のプライベートクレジット・
  エクスポージャーは **AUM の1〜3%**
- 日本生命・第一生命・明治安田生命・住友生命は **2026年度もプライベートクレジット投資を継続**する方針。
  ただし英ノンバンク（MFS）の破綻や一部ファンドの資金流出を受けて**警戒を強め、対象を厳選**
- **MUFG**: 上場プライベートクレジットファンド向け約20億ドルのエクスポージャーの
  売却を協議中

### 個人向け販売 — ここが新しい

- **2025年12月**、**アポロ・グローバル・マネジメント**が**野村証券・野村アセットマネジメント**と組み、
  プライベートエクイティ、プライベートクレジット、不動産、インフラに分散投資する
  **公募投信**を発売。**日本の個人投資家向け商品としては初**
- 野村は富裕層向け投資一任サービスにもプライベートアセットを組み入れ（国内初）
- 野村が提供する未公開資産を含む公募投信4本で、**約3万件の契約**がある [要確認]

> **視聴者への実務的な示唆**（断定は避けつつ）:
> 1. 目論見書の**解約条項**を必ず読む。「四半期解約可」の後に何が書いてあるか
> 2. **手数料**を確認する。プライベート資産は一般に信託報酬が高い
> 3. 「利回りが高い」の理由を確認する。**流動性を諦めた対価**なのか、
>    **信用リスクを取っている対価**なのか。前者なら耐えられるが、後者は別の話

### 日本の当局の立ち位置

日銀・金融庁とも「**現時点では限定的**」という評価で一致している。
ただし日銀は「先行きの動向に注意」と明記している。
**「大丈夫」ではなく「今のところ大丈夫」**という言い方であることは押さえておきたい。

---

## 13. 反対側の意見（強気派の主張）

**これを入れないと「煽り動画」になる。必ず入れる。**

1. **システミックリスクではない** — JPMorgan の Dimon が
   「プライベートクレジットはおそらくシステミックリスクをもたらさない」と書いている。
   損失は主に民間資本が吸収し、規制対象の金融機関に直接伝播しにくい

2. **銀行から出たこと自体が改善** — リスクの高い融資が銀行のバランスシートから
   離れたことは、金融システム全体の頑健性の**構造的な改善**である

3. **レバレッジが桁違いに低い** — ファンドレベルのレバレッジは **1〜1.5倍**。
   金融危機前の **30〜40倍** とは比較にならない [要確認]

4. **取り付けが起きにくい** — 資金の大半はクローズドエンドで数年ロックされており、
   要求払預金のように逃げない。ゲートは非流動市場での**標準的な実務**であり、
   銀行の取り付けに相当する事態を防ぐためのもの

5. **規模の文脈** — 2兆ドルは、13兆ドルの米社債市場に比べれば小さい

6. **足元の条件はむしろ改善** — 2025年後半以降、スプレッドは **50〜100bp 拡大**し、
   レバレッジは低下、コベナンツは強化、PIK 要求は減少、ドキュメンテーションは厳格化。
   Lord Abbett はこれを「**貸し手に有利なリセット**」と表現

7. **PIK は実はピークアウトしている** — S&P Global（2025年4月）および PitchBook の分析では、
   BDC 資産に占める PIK 比率は減少傾向。上位15BDCの PIK 利息は
   2025年Q2 に **2億4,400万ドル、利息収入の 8.3%** で、2023年Q4以来の低水準
   （2024年Q3のピーク 2億6,900万ドルから3四半期連続減）

8. **評価はストレスを過大に見せている可能性** — Moody's（2026年6月）の分析（§6参照）

9. **需要は健在** — ポートフォリオマネージャーの **80%超**が今後12ヶ月で
   配分の増加を見込んでいる（PwC調査）

**ただし同じ PwC 調査では、93% が2026年のリターンについて「横ばいか低下」を予想し、
3分の2が最大の逆風として「競争激化」を挙げている。**

---

## 14. まだ分かっていないこと・誤解しやすい点

動画で「ここは分かっていない」と正直に言うと、逆に信頼される。

1. **本当のデフォルト率は誰も知らない** — 定義次第で 1.6% から 9.2% まで動く。
   統一された定義も、統一された報告義務もない
2. **総エクスポージャーが把握されていない** — FSB が最初に挙げた課題が「データギャップ」。
   規制当局ですら、銀行のエクスポージャー、ファンドレベルのレバレッジ、
   保険会社の関与を既存の枠組みで測れていない
3. **NAV が正しいかどうかは、売ってみるまで分からない** — 上場BDCの23%ディスカウントは
   「市場は信じていない」という情報であって、「NAV が間違っている」という証明ではない
4. **AI がソフトウェアをどこまで壊すかは、まだ誰も知らない** — 2026年2月の売りが
   「合理的な再評価」なのか「過剰反応」なのかは、後になってしか分からない
5. **保険会社経由のリスクは論争中** — Columbia ビジネススクールの
   「Rating Without Market Discipline」は、非公開格付の債券が信用リスクを過小評価し、
   減損率が高く、必要資本を低く抑えていると結論づけた。
   KBRA は2026年6月9日に反論し、論文が減損という会計指標を使っていること、
   格付インフレを直接測定せず推論していることを問題視。
   KBRA の計算では追加所要資本は業界全体で**約40億ドル**にとどまり、
   これは業界の総調整後資本の **約0.5%**、運用資産の **0.1%未満**

---

## 15. 動画構成案

### 想定

- タイプ: 解説
- 尺: 18〜22分（この情報量なら短くすると薄くなる）
- ターゲット: 投資に関心はあるが、プライベートクレジットは名前しか知らない層

### 構成（尺配分つき）

| # | パート | 尺 | 内容 |
| --- | --- | --- | --- |
| 0 | フック | 0:00-1:00 | 「790億ドルのファンドが、6月4日に投資家の出口を閉じた」から入る。BCRED のゲート |
| 1 | 結論先出し | 1:00-2:30 | §1 の3点。バブル崩壊ではない、が、初めての本格ストレス |
| 2 | 前提 | 2:30-6:00 | プライベートクレジットとは。なぜ増えたか。BDC とは。PIK とは |
| 3 | 規模 | 6:00-7:30 | 2兆ドル vs 13兆ドル。寡占構造 |
| 4 | 時系列 | 7:30-9:30 | 2025年9月の2件から2026年7月まで |
| 5 | **深掘り①** | 9:30-12:00 | デフォルト率が1.6%〜9.2%。extend and pretend |
| 6 | **深掘り②** | 12:00-13:30 | Medallia。ARRローン、PIK、AI |
| 7 | **深掘り③** | 13:30-15:30 | AI が最大の借り手であり最大の破壊者。Meta 270億ドル |
| 8 | **深掘り④** | 15:30-17:30 | ゲート。Q2 2026 の実数。銀行のNDFI 1.4兆ドル。担保の二重差入れ |
| 9 | 反対側 | 17:30-19:30 | §13。ここを厚くやると信頼される |
| 10 | 日本 | 19:30-21:00 | 生保、MUFG、アポロ×野村の公募投信。目論見書の読み方3点 |
| 11 | 締め | 21:00-22:00 | 「今のところ大丈夫」と当局は言っている。その「今のところ」をどう読むか |

### 冒頭フック候補

1. 「2026年6月4日、790億ドルを預かるファンドが、投資家に『お金は返せません』と伝えました」
2. 「同じ市場について、デフォルト率1.6%という数字と、9.2%という数字が同時に存在します。どちらも嘘ではありません」
3. 「AI がソフトウェア企業を壊しています。そのソフトウェア企業に貸していたのは、あなたの年金かもしれません」

→ **推し: 2番。** 「両方本当」という構図が最も好奇心を引き、
かつ他チャンネルとの差別化になる。1番は他でも使われている可能性が高い。

### タイトル案

- 「プライベートクレジットで今、何が起きているのか【デフォルト率1.6%と9.2%が同時に存在する理由】」
- 「2兆ドル市場の初めての試練｜プライベートクレジットを1本で理解する」
- 「AIが借り手であり、破壊者でもある｜プライベートクレジット2026」

### 図解を作るべき箇所（優先順）

1. **2兆ドル vs 13兆ドル**の規模比較（誤解を防ぐため最優先）
2. **NAV と株価の乖離**の2本線チャート
3. **デフォルト率の定義別比較**（1.6 / 4.7 / 6.0 / 9.2 を横棒で並べる）
4. **Q2 2026 の解約請求 vs 実際の返還額**（16.8% → 5% の落差）
5. **PIK の仕組み**（現金が動かないのに収益計上される図）
6. **銀行 → ファンド → 企業**の資金の流れ（リスクは移っていない、を示す）

### 言ってはいけないこと（このレポートの範囲では根拠がない）

- 「リーマンショックの再来」「金融危機が来る」— 断定できる材料はない
- 「今すぐ売るべき」「買うべき」— 投資助言になる
- 特定のファンドが破綻する、という予測
- 日本の生保が危ない、という示唆（エクスポージャーは AUM の1〜3%）

---

## 16. 出典一覧

### 規制・当局
- [FSB: Report on Vulnerabilities in Private Credit（2026/5/6）](https://www.fsb.org/2026/05/report-on-vulnerabilities-in-private-credit/) ※PDF 本体はアクセス不可
- [FSB: FSB warns on private credit vulnerabilities](https://www.fsb.org/2026/05/fsb-warns-on-private-credit-vulnerabilities/)
- [IMF: Global Financial Stability Report, April 2026](https://www.imf.org/en/publications/gfsr/issues/2026/04/14/global-financial-stability-report-april-2026) ※アクセス不可、検索要約による
- [OFR Brief 26-02: Measuring Counterparty Exposures to Private Credit（2026/3/12）](https://www.financialresearch.gov/briefs/files/OFRBrief-26-02-measuring-counterparty-exposures-private-credit.pdf) ※アクセス不可
- [日本銀行: 金融システムレポート（2026年4月号）](https://www.boj.or.jp/research/brp/fsr/fsr260421.htm)
- [日本銀行: FSB「プライベートクレジットにおける脆弱性に関する報告書」の公表について](https://www.boj.or.jp/intl_finance/meeting/group/gro260507a.htm)
- [FRB: H.8 Assets and Liabilities of Commercial Banks（2026/7/2）](https://www.federalreserve.gov/releases/h8/20260702/)
- [FDIC: Bank Lending to Nondepository Financial Institutions](https://www.fdic.gov/analysis/2026-02/bank-lending-nondepository-financial-institutions)
- [Morrison Foerster: DOL Proposes Rule on 401(k) Private Market Assets（2026/4/3）](https://www.mofo.com/resources/insights/260403-dol-proposed-rule-401-k-alternative-assets)
- [Axios: Rule proposal to open 401(k)s to private credit and crypto comes at an awkward time（2026/3/30）](https://www.axios.com/2026/03/30/private-credit-crypto-401ks)

### 格付会社・調査機関
- [KBRA: Private Credit 2026 Outlook](https://www.kbra.com/publications/RwTYWQZJ/kbra-releases-research-private-credit-2026-outlook)
- [KBRA: Q1 2026 Middle Market Compendium](https://www.kbra.com/publications/wdhymSND/kbra-releases-research-private-credit-q1-2026-middle-market-compendium-stability-despite-march-madness)
- [KBRA: Much Ado About Nothing — Columbia 論文への反論（2026/6/9）](https://www.kbra.com/publications/DpDfGwkJ/kbra-releases-research-private-credit-much-ado-about-nothing-perspectives-on-columbia-business-school-paper-about-private-ratings)
- [Moody's: Private credit outlook 2026](https://www.moodys.com/web/en/us/insights/credit-risk/outlooks/private-credit-2026.html)
- [Moody's: US corporate default risk in 2026](https://www.moodys.com/web/en/us/insights/credit-risk/private-credit/us-corporate-default-risk-in-2026.html)
- [Moody's: Lend, extend, and then...](https://www.moodys.com/web/en/us/insights/credit-risk/private-credit/lend-extend-and-then.html)
- [Moody's: Entry Pricing or Credit Deterioration?](https://www.moodys.com/web/en/us/insights/credit-risk/private-credit/entry-pricing-or-credit-deterioration.html)
- [Fitch: U.S. Private Credit Default Rate Hits 6.0% in April 2026（Reuters経由）](https://www.tradingview.com/news/reuters.com,2026:newsml_FWN41V0W8:0-fitch-ratings-u-s-private-credit-default-rate-hits-a-high-of-6-0-in-april-2026/)
- [Bloomberg Tax: US Private Credit Defaults Hit New Record of 6% in April](https://news.bloombergtax.com/financial-accounting/us-private-credit-defaults-hit-new-record-of-6-in-april-fitch)
- [S&P Global: PIK-paying loans decline as a share of BDC assets](https://spglobal.com/ratings/en/research/articles/250408-pik-paying-loans-decline-as-a-share-of-bdc-assets-13466213)
- [PwC: Private Credit Survey 2026](https://www.pwc.com/gx/en/industries/private-equity/private-credit-survey.html)

### BDC・市場データ
- [PitchBook: Q1 2026 Warning Signs — Non-accruals, PIK discounts, and distress rise across top BDCs](https://pitchbook.com/news/reports/q1-2026-warning-signs-non-accruals-pik-discounts-and-distress-rise-across-top-bdcs)
- [PitchBook: Blackstone Private Credit Fund non-accruals rise in Q1, driven by software and dental markdowns](https://pitchbook.com/news/articles/blackstone-private-credit-fund-non-accruals-rise-in-q1-driven-by-software-and-dental-markdowns)
- [PitchBook: PIK interest income at BDCs falls for 3rd straight quarter](https://pitchbook.com/news/articles/pik-interest-income-at-bdcs-falls-for-3rd-straight-quarter-as-schism-appears)
- [PitchBook: Traded BDCs from Blackstone, Golub receive negative outlooks from Moody's](https://pitchbook.com/news/articles/traded-bdcs-from-blackstone-golub-receive-negative-outlooks-from-moodys)
- [Mercer Capital: Public Prices, Private Marks — What BDC Discounts Are Signaling](https://mercercapital.com/insights/posts/2026/public-prices-private-marks-what-bdc-discounts-are-signaling/)
- [Crowdfund Insider: US Private Credit Market Closes Q2 Quietly（2026/7）](https://www.crowdfundinsider.com/2026/07/289205-us-private-credit-market-closes-q2-quietly-punctuated-by-mega-deal-and-increasing-redemption-pressures/)
- [Alternative Credit Investor: Redemptions rise across private credit funds in Q2（2026/7/27）](https://alternativecreditinvestor.com/2026/07/27/redemptions-rise-across-private-credit-funds-in-q2-as-software-risks-build/)
- [Alternative Credit Investor: Blackstone says BCRED redemption requests have fallen（2026/7/23）](https://alternativecreditinvestor.com/2026/07/23/blackstone-private-credit-strategy-returns-6-8pc-in-12-months/)
- [Wealth Management: Evergreen Funds Reach $607 Billion Despite Redemptions](https://www.wealthmanagement.com/alternative-investments/evergreen-funds-grow-to-607b-despite-redemptions)
- [Morningstar: Blue Owl Offers a Harsh Lesson for Semiliquid Fund Investors](https://www.morningstar.com/alternative-investments/blue-owl-offers-harsh-lesson-semiliquid-fund-investors)
- [Private Debt Investor: Blue Owl halts quarterly redemptions in a non-traded BDC](https://www.privatedebtinvestor.com/blue-owl-halts-quarterly-redemptions-in-a-non-traded-bdc/)

### 個別事例
- [Octus: PIK to nonaccrual to restructuring — Medallia and what to watch as BDCs file Q1](https://octus.com/resources/articles/pik-to-nonaccrual-to-restructuring-medallia-and-what-to-watch-as-bdcs-file-q1/)
- [Bloomberg: Blackstone Squeezes Thoma Bravo and Its Ailing Software Company Medallia（2026/4/2）](https://www.bloomberg.com/news/articles/2026-04-02/blackstone-squeezes-thoma-bravo-and-its-ailing-software-company-medallia)
- [Cambridge Associates: Do the Recent Bankruptcies of First Brands and Tricolor Suggest Trouble Ahead in Private Credit?](https://www.cambridgeassociates.com/insight/do-the-recent-bankruptcies-of-first-brands-and-tricolor-suggest-trouble-ahead-in-private-credit/)
- [CNBC: Why a small UK lender has major U.S. credit firms on edge（2026/5/18）](https://www.cnbc.com/2026/05/18/mfs-private-credit-insolvency-banks-failure-collapse-barclays-mortgage.html)
- [US News / Reuters: Wall Street Hit by UK Mortgage Lender Collapse（2026/2/27）](https://money.usnews.com/investing/news/articles/2026-02-27/wall-street-hit-by-uk-mortgage-lender-collapse-raising-fears-of-more-credit-cockroaches)
- [Bloomberg: Deutsche Bank Flags $30 Billion Exposure to Private Credit（2026/3/12）](https://www.bloomberg.com/news/articles/2026-03-12/deutsche-bank-flags-a-30-billion-exposure-to-private-credit)
- [PR Newswire: Meta Announces Joint Venture with Blue Owl Capital to Develop Hyperion Data Center](https://www.prnewswire.com/news-releases/meta-announces-joint-venture-with-funds-managed-by-blue-owl-capital-to-develop-hyperion-data-center-302590584.html)
- [Axios: Private credit woes could become data center difficulties（2026/3/9）](https://www.axios.com/2026/03/09/ai-data-center-private-credit)
- [Alternative Credit Investor: Private credit firms take hit on exposure to software selloff（2026/2/4）](https://alternativecreditinvestor.com/2026/02/04/private-credit-firms-take-hit-on-exposure-to-software-selloff/)

### 日本
- [日本経済新聞: 日本生命、ファンド融資商品の保有額7500億円 米子会社では3.3兆円](https://www.nikkei.com/article/DGXZQOUB102DB0Q6A610C2000000/)
- [Bloomberg / Yahoo!ニュース: 国内生保はプライベートクレジット投資継続、警戒高まる中で対象厳選](https://news.yahoo.co.jp/articles/2a4cd1d856426bf15c8cc4dbc2a3ebb41ab0d435)
- [Bloomberg: Japan FSA Watching Private Credit Risks, Sees Limited Exposure（2026/4/10）](https://www.bloomberg.com/news/articles/2026-04-10/japan-fsa-watching-private-credit-risks-sees-limited-exposure)
- [US News / Reuters: Japan Rules Out Major Domestic Risks From Private Credit for Now（2026/4/9）](https://money.usnews.com/investing/news/articles/2026-04-09/japan-rules-out-major-domestic-risks-from-private-credit-for-now)
- [Investing.com: Japan insurers' private credit exposure ranges from 1% to 3% of AUM, Morgan Stanley says](https://www.investing.com/news/stock-market-news/japan-insurers-private-credit-exposure-ranges-from-1-to-3-of-aum-morgan-stanley-says-93CH-4556957)
- [TradingView / Reuters: Japan's MUFG seeks to offload $2 billion exposure to private credit loans（FT報道）](https://www.tradingview.com/news/reuters.com,2026:newsml_L4N41Q09R:0-japan-s-mufg-seeks-to-offload-2-billion-exposure-to-private-credit-loans-ft-reports/)
- [東洋経済オンライン: プライベート資産の巨人「アポロ」が日本に照準／国内初の個人向け公募投信を野村証券と販売](https://toyokeizai.net/articles/-/933498)
- [日本経済新聞: 野村証券が投資一任サービスにプライベートアセット 国内初](https://www.nikkei.com/article/DGXZQOUB27BRW0X21C25A1000000/)
- [丸紅: プライベートクレジット市場の拡大（2026/4/14）](https://www.marubeni.com/jp/research/report/data/20260414_sagawa.pdf)
- [三井住友DSアセットマネジメント: プライベートクレジット問題に関する考察（2026/3/6）](https://www.smd-am.co.jp/market/ichikawa/2026/03/irepo260306/)
- [ピクテ: プライベートクレジット市場と金融システムリスク（2026/4/30）](https://www.pictet.co.jp/investment-information/market/deep-insight/20260430.html)

### 市況・見通し
- [Lord Abbett: 2026 Midyear Investment Outlook — Private Credit's Lender-Friendly Reset](https://www.lordabbett.com/en-us/financial-advisor/insights/investment-objectives/2026/2026-midyear-investment-outlook-private-credits-lender-friendly-reset.html)
- [Northleaf Capital: Private Credit Market Update Q1-2026](https://www.northleafcapital.com/news/private-credit-market-update-q1-2026)
- [Capstone Partners: Middle Market Leveraged Finance Update – Q1 2026](https://www.capstonepartners.com/insights/middle-market-leveraged-finance-report/)
- [MSCI: Run Risk or Rational Repricing? Private Credit's Software Stress Test](https://www.msci.com/research-and-insights/blog-post/run-risk-or-rational-repricing-private-credits-software-stress-test)
- [MSCI: The Ascendance and Implications of Evergreen Funds in Private Markets](https://www.msci.com/research-and-insights/blog-post/the-ascendance-and-implications-of-evergreen-funds-in-private-markets)
- [GW&K: Private Credit — Systemic Risk or Growing Pains?](https://www.gwkinvest.com/insight/macro/private-credit-systemic-risk-or-growing-pains/)
- [CNN: Private credit is worrying Wall Street. Here's how it might affect everyone else（2026/4/16）](https://www.cnn.com/2026/04/16/business/private-credit-consumers-nightcap)
- [Forbes: Rising Private Credit Defaults Are Testing Banks And Insurers（2026/5/24）](https://www.forbes.com/sites/mayrarodriguezvalladares/2026/05/24/rising-private-credit-defaults-are-testing-banks-and-insurers/)
- [Advisor Perspectives: Inflated 'Private' Ratings Are Masking Credit Risk, Columbia Study Says（2026/6/10）](https://www.advisorperspectives.com/articles/2026/06/10/inflated-private-ratings-masking-credit-risk-columbia-study)
- [Wellington: 2026年のプライベート・クレジット市場予測](https://www.wellington.com/jp-jp/professional/insights/2026-private-credit-outlook)

---

## 17. 次のアクション

1. **[要確認] タグの数字を一次資料で裏取り** — 特に以下は動画の主張の骨格に関わる
   - Fitch 6.0%（Fitch のリリース原文）
   - BCRED / Apollo / Ares の Q2 解約請求率（各社の 8-K / プレスリリース）
   - BDC のディスカウント率（現在値を再取得）
   - Moody's の回収率 49.2% / 76.4%
2. **FSB 報告書 PDF と 日銀 金融システムレポートを直接読む** — 今回アクセスできなかった
3. 台本化する前に、`youtube-project` スキルの文体・尺・一人称の TODO を埋める
4. 図解6点の作図
