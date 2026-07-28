const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.defineLayout({ name: "SQ", width: 7.5, height: 7.5 });
p.layout = "SQ";

// ---------- palette ----------
const BG = "0E1B33";        // deep navy
const CARD = "1B2A4A";      // card navy
const CARD2 = "223558";     // lighter card
const TXT = "F5F7FA";       // near-white
const MUT = "9FB0CC";       // muted blue-gray
const GOLD = "F2C14E";
const RED = "FF6B6B";
const GREEN = "3DDC97";
const PAPER = "FDFBF4";     // source-document paper
const INK = "20293A";       // text on paper

const FUND = {
  orukan: { c: "4CC9F0", n: "オルカン" },
  sp: { c: "F2C14E", n: "S&P500" },
  nas: { c: "9B5DE5", n: "NASDAQ100" },
  fang: { c: "EF476F", n: "FANG+" },
  jp: { c: "06D6A0", n: "日本株" },
};
const F = "Meiryo";
const W = 7.5, M = 0.45, CW = W - 2 * M;

// ---------- helpers ----------
function slideBase() {
  const s = p.addSlide();
  s.background = { color: BG };
  return s;
}
function chip(s, x, y, fund, w = 1.25, h = 0.34, fs = 12) {
  s.addShape("roundRect", { x, y, w, h, rectRadius: 0.17, fill: { color: fund.c } });
  s.addText(fund.n, { x, y, w, h, align: "center", valign: "middle", fontFace: F, fontSize: fs, bold: true, color: "0E1B33", margin: 0 });
}
function kicker(s, text, color = GOLD) {
  s.addText(text, { x: M, y: 0.38, w: CW, h: 0.32, fontFace: F, fontSize: 13, bold: true, color, charSpacing: 2, margin: 0 });
}
function title(s, text, y = 0.72, fs = 27, color = TXT, h = 0.95) {
  s.addText(text, { x: M, y, w: CW, h, fontFace: F, fontSize: fs, bold: true, color, margin: 0, lineSpacingMultiple: 1.15 });
}
function foot(s, text) {
  s.addText(text, { x: M, y: 7.06, w: CW, h: 0.3, fontFace: F, fontSize: 9.5, color: MUT, margin: 0 });
}
function takeaway(s, text) {
  // bottom takeaway card
  s.addShape("roundRect", { x: M, y: 6.1, w: CW, h: 0.82, rectRadius: 0.1, fill: { color: "142544" }, line: { color: GOLD, width: 1.25 } });
  s.addText([
    { text: "持ち帰り　", options: { fontSize: 12, bold: true, color: GOLD } },
    { text, options: { fontSize: 16, bold: true, color: TXT } },
  ], { x: M + 0.25, y: 6.1, w: CW - 0.5, h: 0.82, valign: "middle", fontFace: F, margin: 0 });
}
// source "document" card (paper look)
function sourceCard(s, opts) {
  const { x = M, y, w = CW, h, publisher, docTitle, rows, url } = opts;
  s.addShape("roundRect", { x: x + 0.06, y: y + 0.08, w, h, rectRadius: 0.06, fill: { color: "060C1A" } }); // shadow
  s.addShape("roundRect", { x, y, w, h, rectRadius: 0.06, fill: { color: PAPER } });
  s.addText("出典（一次情報）", { x: x + 0.22, y: y + 0.14, w: 2.4, h: 0.26, fontFace: F, fontSize: 10, bold: true, color: "8A6D1D", margin: 0 });
  s.addText(publisher, { x: x + 0.22, y: y + 0.4, w: w - 0.44, h: 0.3, fontFace: F, fontSize: 13, bold: true, color: INK, margin: 0 });
  s.addText(docTitle, { x: x + 0.22, y: y + 0.7, w: w - 0.44, h: 0.3, fontFace: F, fontSize: 11.5, color: "4A5568", margin: 0 });
  let yy = y + 1.06;
  rows.forEach(r => {
    s.addText([
      { text: r[0], options: { fontSize: 11.5, color: "4A5568" } },
      { text: "　" + r[1], options: { fontSize: 13, bold: true, color: INK } },
    ], { x: x + 0.22, y: yy, w: w - 0.44, h: 0.3, fontFace: F, margin: 0 });
    yy += 0.32;
  });
  s.addText(url, { x: x + 0.22, y: y + h - 0.34, w: w - 0.44, h: 0.24, fontFace: F, fontSize: 8.5, color: "7A869A", margin: 0 });
}
// big money stat
function bigMoney(s, label, from, to, sub, color = GOLD) {
  s.addText(label, { x: M, y: 2.15, w: CW, h: 0.4, align: "center", fontFace: F, fontSize: 16, color: MUT, margin: 0 });
  s.addText(from, { x: M, y: 2.7, w: CW, h: 0.7, align: "center", fontFace: F, fontSize: 30, bold: true, color: TXT, margin: 0 });
  s.addText("▼", { x: M, y: 3.5, w: CW, h: 0.45, align: "center", fontFace: F, fontSize: 22, color: MUT, margin: 0 });
  s.addText(to, { x: M, y: 4.0, w: CW, h: 1.1, align: "center", fontFace: F, fontSize: 54, bold: true, color, margin: 0 });
  s.addText(sub, { x: M, y: 5.25, w: CW, h: 0.4, align: "center", fontFace: F, fontSize: 13, color: MUT, margin: 0 });
}
const TH = { fontFace: F, fontSize: 12, bold: true, color: "0E1B33", fill: { color: "CADCFC" }, align: "center", valign: "middle" };
const TD = { fontFace: F, fontSize: 12, color: TXT, fill: { color: CARD }, align: "center", valign: "middle" };

// =========================================================
// 1. Title
// =========================================================
let s = slideBase();
s.addText("正直銀行員", { x: M, y: 0.85, w: CW, h: 0.4, align: "center", fontFace: F, fontSize: 15, bold: true, color: GOLD, charSpacing: 6, margin: 0 });
s.addText("結局、どれを買えばいい？", { x: M, y: 1.4, w: CW, h: 0.75, align: "center", fontFace: F, fontSize: 33, bold: true, color: TXT, margin: 0 });
const funds5 = [FUND.orukan, FUND.sp, FUND.nas, FUND.fang, FUND.jp];
funds5.forEach((f, i) => {
  const bw = 3.1, bx = i % 2 === 0 ? W / 2 - bw - 0.12 : W / 2 + 0.12;
  const by = 2.55 + Math.floor(i / 2) * 0.62;
  if (i === 4) { // center last
    s.addShape("roundRect", { x: W / 2 - bw / 2, y: by, w: bw, h: 0.5, rectRadius: 0.1, fill: { color: CARD }, line: { color: f.c, width: 1.5 } });
    s.addText(f.n, { x: W / 2 - bw / 2, y: by, w: bw, h: 0.5, align: "center", valign: "middle", fontFace: F, fontSize: 16, bold: true, color: f.c, margin: 0 });
  } else {
    s.addShape("roundRect", { x: bx, y: by, w: bw, h: 0.5, rectRadius: 0.1, fill: { color: CARD }, line: { color: f.c, width: 1.5 } });
    s.addText(f.n, { x: bx, y: by, w: bw, h: 0.5, align: "center", valign: "middle", fontFace: F, fontSize: 16, bold: true, color: f.c, margin: 0 });
  }
});
s.addShape("roundRect", { x: 1.05, y: 5.05, w: 5.4, h: 1.0, rectRadius: 0.12, fill: { color: GOLD } });
s.addText("未来を 15万回 シミュレーション", { x: 1.05, y: 5.05, w: 5.4, h: 1.0, align: "center", valign: "middle", fontFace: F, fontSize: 20, bold: true, color: "0E1B33", margin: 0 });
s.addText("本気で比較して、答えを出します", { x: M, y: 6.35, w: CW, h: 0.4, align: "center", fontFace: F, fontSize: 15, color: MUT, margin: 0 });

// =========================================================
// 2. Highlight: 460万円の差
// =========================================================
s = slideBase();
kicker(s, "同じ20年・毎月5万円の積立でも");
title(s, "悪い未来では、こんなに違う", 0.72, 27);
// two bars
function hl(x, fund, val, maxv, color) {
  const bh = (val / maxv) * 3.0;
  s.addShape("roundRect", { x, y: 5.5 - bh, w: 2.1, h: bh, rectRadius: 0.08, fill: { color } });
  s.addText(`約${val.toLocaleString()}万円`, { x: x - 0.3, y: 5.5 - bh - 0.5, w: 2.7, h: 0.4, align: "center", fontFace: F, fontSize: 18, bold: true, color: TXT, margin: 0 });
  chip(s, x + 0.35, 5.66, fund, 1.4, 0.4, 13);
}
hl(1.0, FUND.orukan, 1082, 1200, FUND.orukan.c);
hl(4.4, FUND.fang, 620, 1200, FUND.fang.c);
s.addShape("roundRect", { x: 1.45, y: 1.9, w: 4.6, h: 0.72, rectRadius: 0.36, fill: { color: RED } });
s.addText("その差、約460万円", { x: 1.45, y: 1.9, w: 4.6, h: 0.72, align: "center", valign: "middle", fontFace: F, fontSize: 22, bold: true, color: "FFFFFF", margin: 0 });
foot(s, "下位10%地点の試算値 ※当チャンネル試算（15万回モンテカルロ）");

// =========================================================
// 3. Before
// =========================================================
s = slideBase();
kicker(s, "BEFORE", RED);
title(s, "知らないまま選ぶと", 0.72, 28);
const befores = [
  ["「一番増えたから」で選ぶ", "悪い未来では 約460万円 少ない"],
  ["「全部買えば分散」", "実は 同じ会社の重ね買い"],
  ["暴落の日、理由を言えない", "一番安いところで 売ってしまう"],
];
befores.forEach((b, i) => {
  const y = 1.85 + i * 1.55;
  s.addShape("roundRect", { x: M, y, w: CW, h: 1.3, rectRadius: 0.1, fill: { color: CARD } });
  s.addShape("ellipse", { x: M + 0.28, y: y + 0.37, w: 0.56, h: 0.56, fill: { color: RED } });
  s.addText("!", { x: M + 0.28, y: y + 0.37, w: 0.56, h: 0.56, align: "center", valign: "middle", fontFace: F, fontSize: 22, bold: true, color: "FFFFFF", margin: 0 });
  s.addText(b[0], { x: M + 1.05, y: y + 0.16, w: CW - 1.3, h: 0.45, fontFace: F, fontSize: 17, bold: true, color: TXT, margin: 0 });
  s.addText(b[1], { x: M + 1.05, y: y + 0.66, w: CW - 1.3, h: 0.45, fontFace: F, fontSize: 15, color: RED, bold: true, margin: 0 });
});
foot(s, "※金額は当チャンネル試算");

// =========================================================
// 4. After
// =========================================================
s = slideBase();
kicker(s, "AFTER", GREEN);
title(s, "この動画を見終わると", 0.72, 28);
const afters = [
  ["5本の中身と「選ばれ方」", "が分かる"],
  ["自分の比率を", "数字で決められる"],
  ["暴落の日に売らない理由を", "自分の言葉で説明できる"],
];
afters.forEach((b, i) => {
  const y = 1.85 + i * 1.32;
  s.addShape("roundRect", { x: M, y, w: CW, h: 1.1, rectRadius: 0.1, fill: { color: CARD } });
  s.addShape("ellipse", { x: M + 0.28, y: y + 0.27, w: 0.56, h: 0.56, fill: { color: GREEN } });
  s.addText("✓", { x: M + 0.28, y: y + 0.27, w: 0.56, h: 0.56, align: "center", valign: "middle", fontFace: F, fontSize: 20, bold: true, color: "0E1B33", margin: 0 });
  s.addText([
    { text: b[0], options: { fontSize: 15.5, bold: true, color: TXT } },
    { text: b[1], options: { fontSize: 15.5, bold: true, color: GREEN } },
  ], { x: M + 1.05, y, w: CW - 1.3, h: 1.1, valign: "middle", fontFace: F, margin: 0 });
});
s.addText("商品選びの迷いが、今日で終わります", { x: M, y: 6.15, w: CW, h: 0.5, align: "center", fontFace: F, fontSize: 19, bold: true, color: GOLD, margin: 0 });

// =========================================================
// 5. 第1章 5本の思想
// =========================================================
s = slideBase();
kicker(s, "第1章");
title(s, "5本は「企業を選ぶ思想」が違う", 0.72, 24);
const shiso = [
  [FUND.orukan, "世界の株式市場を丸ごと買う"],
  [FUND.sp, "米国大型企業を委員会が選ぶ"],
  [FUND.nas, "NASDAQ非金融の大型100社"],
  [FUND.fang, "巨大テック10社に集中"],
  [FUND.jp, "日本株市場を幅広く買う"],
];
shiso.forEach((r, i) => {
  const y = 1.8 + i * 0.98;
  s.addShape("roundRect", { x: M, y, w: CW, h: 0.8, rectRadius: 0.1, fill: { color: CARD } });
  chip(s, M + 0.2, y + 0.21, r[0], 1.55, 0.38, 13);
  s.addText(r[1], { x: M + 1.95, y, w: CW - 2.15, h: 0.8, valign: "middle", fontFace: F, fontSize: 16.5, bold: true, color: TXT, margin: 0 });
});

// =========================================================
// 6. オルカン特徴 + 出典
// =========================================================
s = slideBase();
kicker(s, "カルテ①");
chip(s, M, 0.7, FUND.orukan, 1.6, 0.44, 15);
title(s, "世界まるごと。でも中身は…", 1.3, 23);
s.addText([
  { text: "47", options: { fontSize: 34, bold: true, color: TXT } },
  { text: " か国・", options: { fontSize: 16, color: MUT } },
  { text: "約2,461", options: { fontSize: 34, bold: true, color: TXT } },
  { text: " 銘柄", options: { fontSize: 16, color: MUT } },
], { x: M, y: 2.15, w: CW, h: 0.6, fontFace: F, margin: 0 });
s.addText([
  { text: "米国 ", options: { fontSize: 17, color: MUT } },
  { text: "63.6%", options: { fontSize: 34, bold: true, color: FUND.orukan.c } },
  { text: "　　情報技術 ", options: { fontSize: 17, color: MUT } },
  { text: "32.1%", options: { fontSize: 34, bold: true, color: FUND.orukan.c } },
], { x: M, y: 2.9, w: CW, h: 0.7, fontFace: F, margin: 0 });
sourceCard(s, {
  y: 3.95, h: 2.5,
  publisher: "MSCI",
  docTitle: "MSCI ACWI Index Factsheet（2026年6月末）",
  rows: [
    ["対象", "先進国23か国＋新興国24か国の大型・中型株"],
    ["カバー率", "投資可能な株式市場の約85%"],
    ["見直し", "2月・5月・8月・11月の年4回"],
  ],
  url: "msci.com/documents/10199/255599/msci-acwi-net.pdf",
});
foot(s, "収録時は実際のファクトシート画面に差し替え可");
s.addNotes("このスライドは出典カード。収録時にMSCI公式PDFのスクリーンショットに差し替えるとより説得力が出る。");

// =========================================================
// 7. オルカン 100万→333万
// =========================================================
s = slideBase();
kicker(s, "カルテ①");
chip(s, M, 0.7, FUND.orukan, 1.6, 0.44, 15);
title(s, "10年前に100万円入れていたら", 1.3, 23);
bigMoney(s, "年率 約12.8%（配当込み・米ドル）", "100万円", "約333万円", "指数ごとに通貨・配当の前提が異なるため目安", FUND.orukan.c);
foot(s, "※各指数の公表年率からの単純複利換算");

// =========================================================
// 8. オルカン上位10
// =========================================================
s = slideBase();
kicker(s, "カルテ①");
chip(s, M, 0.7, FUND.orukan, 1.6, 0.44, 15);
title(s, "上位10銘柄だけで 23.3%", 1.3, 23);
const oruTop = [
  ["1", "NVIDIA", "4.55%"], ["2", "Apple", "4.19%"], ["3", "Microsoft", "2.59%"],
  ["4", "Amazon", "2.27%"], ["5", "Alphabet A", "2.05%"], ["6", "TSMC", "1.84%"],
  ["7", "Broadcom", "1.67%"], ["8", "Alphabet C", "1.61%"], ["9", "Micron", "1.28%"], ["10", "Meta", "1.22%"],
];
s.addTable(
  [[{ text: "順位", options: TH }, { text: "銘柄", options: TH }, { text: "比率", options: TH }],
  ...oruTop.map(r => r.map(c => ({ text: c, options: { ...TD } })))],
  { x: 1.1, y: 2.1, w: 5.3, colW: [0.8, 2.9, 1.6], rowH: 0.36, border: { type: "solid", color: BG, pt: 1 } }
);
foot(s, "2026年6月末時点・iShares ACWI保有proxy");

// =========================================================
// 9. 持ち帰り①
// =========================================================
s = slideBase();
kicker(s, "カルテ① まとめ");
chip(s, M, 0.7, FUND.orukan, 1.6, 0.44, 15);
// donut-ish: US vs other
s.addShape("pie", { x: 1.55, y: 1.7, w: 3.1, h: 3.1, fill: { color: FUND.orukan.c }, angleRange: [0, 229] });
s.addShape("pie", { x: 1.55, y: 1.7, w: 3.1, h: 3.1, fill: { color: CARD2 }, angleRange: [229, 360] });
s.addText("米国\n63.6%", { x: 4.5, y: 2.2, w: 2.3, h: 0.9, fontFace: F, fontSize: 21, bold: true, color: FUND.orukan.c, margin: 0 });
s.addText("その他\n36.4%", { x: 4.5, y: 3.35, w: 2.3, h: 0.9, fontFace: F, fontSize: 15, color: MUT, margin: 0 });
takeaway(s, "オルカンの中身は、6割アメリカ");

// =========================================================
// 10. S&P500 特徴 + 採用基準 + 出典
// =========================================================
s = slideBase();
kicker(s, "カルテ②");
chip(s, M, 0.7, FUND.sp, 1.6, 0.44, 15);
title(s, "審査を通った選抜チーム", 1.3, 23);
const spReq = ["米国企業であること", "時価総額 おおむね200億ドル以上", "浮動株が一定比率以上", "直近四半期＋直近1年が黒字"];
spReq.forEach((t, i) => {
  const y = 2.1 + i * 0.52;
  s.addShape("ellipse", { x: M + 0.05, y: y + 0.07, w: 0.3, h: 0.3, fill: { color: FUND.sp.c } });
  s.addText(String(i + 1), { x: M + 0.05, y: y + 0.07, w: 0.3, h: 0.3, align: "center", valign: "middle", fontFace: F, fontSize: 12, bold: true, color: "0E1B33", margin: 0 });
  s.addText(t, { x: M + 0.5, y, w: CW - 0.6, h: 0.45, fontFace: F, fontSize: 15.5, bold: true, color: TXT, margin: 0 });
});
sourceCard(s, {
  y: 4.45, h: 2.1,
  publisher: "S&P Dow Jones Indices",
  docTitle: "S&P 500 指数メソドロジー",
  rows: [
    ["構成", "米国大型企業 約500社（浮動株時価総額加重）"],
    ["入れ替え", "委員会が随時判断・毎年20社前後"],
  ],
  url: "spglobal.com/spdji/jp/indices/equity/sp-500/",
});
s.addNotes("収録時はS&P DJI公式ページのスクリーンショットに差し替え可。時価総額基準は随時引き上げのため最新値を確認。");

// =========================================================
// 11. S&P500 100万→358万
// =========================================================
s = slideBase();
kicker(s, "カルテ②");
chip(s, M, 0.7, FUND.sp, 1.6, 0.44, 15);
title(s, "10年前に100万円入れていたら", 1.3, 23);
bigMoney(s, "年率 約13.6%", "100万円", "約358万円", "10年・価格指数ベース", FUND.sp.c);

// =========================================================
// 12. S&P500 上位10 = 同じ顔ぶれ
// =========================================================
s = slideBase();
kicker(s, "カルテ②");
chip(s, M, 0.7, FUND.sp, 1.6, 0.44, 15);
title(s, "上位は…オルカンと同じ顔ぶれ", 1.3, 22);
const spTop = [
  ["1", "NVIDIA", "情報技術"], ["2", "Apple", "情報技術"], ["3", "Microsoft", "情報技術"],
  ["4", "Amazon", "一般消費財"], ["5", "Alphabet A", "通信"], ["6", "Broadcom", "情報技術"],
  ["7", "Alphabet C", "通信"], ["8", "Micron", "情報技術"], ["9", "Meta", "通信"], ["10", "Tesla", "一般消費財"],
];
s.addTable(
  [[{ text: "順位", options: TH }, { text: "銘柄", options: TH }, { text: "業種", options: TH }],
  ...spTop.map(r => r.map(c => ({ text: c, options: { ...TD } })))],
  { x: 1.1, y: 2.0, w: 5.3, colW: [0.8, 2.6, 1.9], rowH: 0.35, border: { type: "solid", color: BG, pt: 1 } }
);
s.addText("情報技術だけで 38%・上位10銘柄で 36%", { x: M, y: 6.05, w: CW, h: 0.4, align: "center", fontFace: F, fontSize: 15, bold: true, color: GOLD, margin: 0 });
foot(s, "2026年6月末時点・VOO保有proxy");

// =========================================================
// 13. 持ち帰り②
// =========================================================
s = slideBase();
kicker(s, "カルテ② まとめ");
chip(s, M, 0.7, FUND.sp, 1.6, 0.44, 15);
s.addText("「500社に分散」の実態は", { x: M, y: 2.0, w: CW, h: 0.5, align: "center", fontFace: F, fontSize: 19, color: MUT, margin: 0 });
s.addText("巨大テック数社の影響が強い\n500社指数", { x: M, y: 2.7, w: CW, h: 1.7, align: "center", fontFace: F, fontSize: 27, bold: true, color: TXT, margin: 0, lineSpacingMultiple: 1.2 });
takeaway(s, "S&P500の上位は、オルカンと同じ顔ぶれ");

// =========================================================
// 14. NASDAQ100 特徴 + 出典
// =========================================================
s = slideBase();
kicker(s, "カルテ③");
chip(s, M, 0.7, FUND.nas, 1.6, 0.44, 15);
title(s, "金融を外した、成長特化の100社", 1.3, 22);
s.addText([
  { text: "テクノロジー比率 ", options: { fontSize: 16, color: MUT } },
  { text: "68.5%", options: { fontSize: 40, bold: true, color: FUND.nas.c } },
], { x: M, y: 2.15, w: CW, h: 0.85, fontFace: F, margin: 0 });
s.addText("半導体・AI・クラウドの色が\nS&P500よりずっと濃い「濃縮版」", { x: M, y: 3.1, w: CW, h: 0.85, fontFace: F, fontSize: 16, color: TXT, margin: 0, lineSpacingMultiple: 1.25 });
sourceCard(s, {
  y: 4.2, h: 2.35,
  publisher: "Nasdaq",
  docTitle: "Nasdaq-100 Index Factsheet",
  rows: [
    ["構成", "NASDAQ上場の非金融・大型100社"],
    ["10年実績", "年率 21.2%／リスク 22.6%（価格指数）"],
    ["ルール改定", "2026年5月〜 年4回の定期見直しに"],
  ],
  url: "indexes.nasdaqomx.com/docs/fs_ndx.pdf",
});
s.addNotes("収録時はNasdaq公式factsheetのスクリーンショットに差し替え可。");

// =========================================================
// 15. NASDAQ100 100万→684万
// =========================================================
s = slideBase();
kicker(s, "カルテ③");
chip(s, M, 0.7, FUND.nas, 1.6, 0.44, 15);
title(s, "10年前に100万円入れていたら", 1.3, 23);
bigMoney(s, "年率 約21.2%", "100万円", "約684万円", "ただし2022年は1年でマイナス33%", FUND.nas.c);

// =========================================================
// 16. Amazon / Tesla 事例
// =========================================================
s = slideBase();
kicker(s, "カルテ③ 設計の違い");
title(s, "黒字になる前から、持てる", 0.72, 26);
function caseRow(y, name, nasY, spY, note) {
  s.addShape("roundRect", { x: M, y, w: CW, h: 2.0, rectRadius: 0.1, fill: { color: CARD } });
  s.addText(name, { x: M + 0.25, y: y + 0.15, w: 2.6, h: 0.45, fontFace: F, fontSize: 20, bold: true, color: TXT, margin: 0 });
  chip(s, M + 0.25, y + 0.72, FUND.nas, 1.75, 0.36, 12);
  s.addText(nasY, { x: M + 2.15, y: y + 0.68, w: 4.2, h: 0.44, fontFace: F, fontSize: 15, bold: true, color: FUND.nas.c, margin: 0 });
  chip(s, M + 0.25, y + 1.2, FUND.sp, 1.75, 0.36, 12);
  s.addText(spY, { x: M + 2.15, y: y + 1.16, w: 4.2, h: 0.44, fontFace: F, fontSize: 15, bold: true, color: FUND.sp.c, margin: 0 });
  s.addText(note, { x: M + 0.25, y: y + 1.6, w: CW - 0.5, h: 0.34, fontFace: F, fontSize: 11.5, color: MUT, margin: 0 });
}
caseRow(1.7, "Amazon", "1998年〜（赤字時代に採用）", "2005年（黒字化後にやっと採用）", "S&P500の黒字条件を満たせなかった7年間");
caseRow(3.95, "Tesla", "2013年〜", "2020年12月（黒字条件クリア後）", "その7年で株価は数十倍に");
s.addText("審査が緩いのではなく、審査の思想が違う", { x: M, y: 6.25, w: CW, h: 0.45, align: "center", fontFace: F, fontSize: 16, bold: true, color: GOLD, margin: 0 });
foot(s, "採用年は収録前に一次情報で最終確認");

// =========================================================
// 17. 2026年6月 採用5社 + 持ち帰り③
// =========================================================
s = slideBase();
kicker(s, "カルテ③ 最近の変化");
chip(s, M, 0.7, FUND.nas, 1.6, 0.44, 15);
title(s, "2026年6月、新しく入った5社", 1.3, 22);
const newcos = ["アステラ・ラブス", "コアウィーブ", "ネビウス", "ロケット・ラボ", "テラダイン"];
newcos.forEach((n, i) => {
  const y = 2.15 + i * 0.68;
  s.addShape("roundRect", { x: 1.0, y, w: 5.5, h: 0.54, rectRadius: 0.27, fill: { color: CARD2 } });
  s.addText(n, { x: 1.0, y, w: 5.5, h: 0.54, align: "center", valign: "middle", fontFace: F, fontSize: 16, bold: true, color: TXT, margin: 0 });
});
s.addText("AIインフラ・宇宙・半導体を早く取り込む指数へ", { x: M, y: 5.65, w: CW, h: 0.4, align: "center", fontFace: F, fontSize: 14, color: MUT, margin: 0 });
takeaway(s, "10年で7倍。ただし2022年は −33%");

// =========================================================
// 18. 中間ブリッジ: 3本とも同じ
// =========================================================
s = slideBase();
kicker(s, "ここまでの3本");
title(s, "上位は、ほぼ同じ会社", 0.72, 27);
const common = ["NVIDIA", "Apple", "Microsoft", "Amazon", "Alphabet"];
const cols = [FUND.orukan, FUND.sp, FUND.nas];
cols.forEach((f, ci) => {
  const x = 0.55 + ci * 2.2;
  chip(s, x, 1.75, f, 2.0, 0.4, 12);
  common.forEach((co, ri) => {
    const y = 2.35 + ri * 0.62;
    s.addShape("roundRect", { x, y, w: 2.0, h: 0.5, rectRadius: 0.08, fill: { color: CARD }, line: { color: GOLD, width: 1 } });
    s.addText(co, { x, y, w: 2.0, h: 0.5, align: "center", valign: "middle", fontFace: F, fontSize: 13, bold: true, color: TXT, margin: 0 });
  });
});
s.addShape("roundRect", { x: M, y: 5.85, w: CW, h: 1.0, rectRadius: 0.1, fill: { color: "142544" }, line: { color: RED, width: 1.25 } });
s.addText("「全部買う」＝ 同じ会社を5つの箱から重ね買い", { x: M + 0.2, y: 5.85, w: CW - 0.4, h: 1.0, align: "center", valign: "middle", fontFace: F, fontSize: 16.5, bold: true, color: RED, margin: 0 });

// =========================================================
// 19. FANG+ 特徴 + 出典
// =========================================================
s = slideBase();
kicker(s, "カルテ④");
chip(s, M, 0.7, FUND.fang, 1.6, 0.44, 15);
title(s, "たった10社に、10%ずつ", 1.3, 23);
const fangCos = ["Meta", "Apple", "Amazon", "Netflix", "Microsoft", "Alphabet", "Micron", "NVIDIA", "Palantir", "Broadcom"];
fangCos.forEach((c, i) => {
  const x = 0.62 + (i % 5) * 1.29, y = 2.15 + Math.floor(i / 5) * 0.62;
  s.addShape("roundRect", { x, y, w: 1.19, h: 0.5, rectRadius: 0.08, fill: { color: CARD2 } });
  s.addText(c, { x, y, w: 1.19, h: 0.5, align: "center", valign: "middle", fontFace: F, fontSize: 10.5, bold: true, color: TXT, margin: 0 });
});
sourceCard(s, {
  y: 3.7, h: 2.55,
  publisher: "ICE Data Indices",
  docTitle: "NYSE FANG+ Index 公式ページ",
  rows: [
    ["実績", "2014年9月〜 年率 約27.4%（配当込み）"],
    ["注意", "指数の算出開始は2017年。それ以前はバックテスト"],
    ["入れ替え", "固定6社＋選抜4社を四半期ごとに10%へ戻す"],
  ],
  url: "ice.com/equity-index/fangplus",
});
s.addNotes("収録時はICE公式ページのスクリーンショットに差し替え可。");

// =========================================================
// 20. FANG+ 100万→1,126万
// =========================================================
s = slideBase();
kicker(s, "カルテ④");
chip(s, M, 0.7, FUND.fang, 1.6, 0.44, 15);
title(s, "10年当てはめると…11倍", 1.3, 23);
bigMoney(s, "年率 約27.4%を単純適用した参考値", "100万円", "約1,126万円", "", FUND.fang.c);
s.addShape("roundRect", { x: 0.85, y: 5.35, w: 5.8, h: 0.95, rectRadius: 0.1, fill: { color: "3A1220" }, line: { color: RED, width: 1.25 } });
s.addText("2014〜2017年分は「後づけ」のバックテスト込み", { x: 0.95, y: 5.35, w: 5.6, h: 0.95, align: "center", valign: "middle", fontFace: F, fontSize: 15, bold: true, color: RED, margin: 0 });

// =========================================================
// 21. FANG+ 入れ替え4基準
// =========================================================
s = slideBase();
kicker(s, "カルテ④ 入れ替えルール");
chip(s, M, 0.7, FUND.fang, 1.6, 0.44, 15);
title(s, "固定6社＋選抜4社（四半期ごと）", 1.3, 21);
const crit = [["時価総額", 35], ["売買代金", 35], ["株価売上高倍率", 15], ["売上成長率", 15]];
crit.forEach((c, i) => {
  const y = 2.2 + i * 0.78;
  const bw = (c[1] / 35) * 3.1;
  s.addText(c[0], { x: M, y: y + 0.06, w: 2.05, h: 0.45, fontFace: F, fontSize: 14.5, bold: true, color: TXT, margin: 0 });
  s.addShape("roundRect", { x: 2.6, y, w: bw, h: 0.5, rectRadius: 0.08, fill: { color: FUND.fang.c } });
  s.addText(`${c[1]}%`, { x: 2.6 + bw + 0.12, y: y + 0.04, w: 0.9, h: 0.45, fontFace: F, fontSize: 15, bold: true, color: TXT, margin: 0 });
});
s.addShape("roundRect", { x: M, y: 5.5, w: CW, h: 1.15, rectRadius: 0.1, fill: { color: CARD } });
s.addText([
  { text: "2026年3月：", options: { fontSize: 14, color: MUT } },
  { text: "Micron 採用 ／ CrowdStrike 除外\n", options: { fontSize: 15, bold: true, color: TXT } },
  { text: "成績の落ちた選手は、3か月ごとにベンチへ", options: { fontSize: 12.5, color: MUT } },
], { x: M + 0.25, y: 5.5, w: CW - 0.5, h: 1.15, valign: "middle", fontFace: F, margin: 0, lineSpacingMultiple: 1.25 });

// =========================================================
// 22. 持ち帰り④ 今年最下位
// =========================================================
s = slideBase();
kicker(s, "カルテ④ まとめ");
chip(s, M, 0.7, FUND.fang, 1.6, 0.44, 15);
s.addText("2026年上半期の騰落率", { x: M, y: 1.7, w: CW, h: 0.4, align: "center", fontFace: F, fontSize: 15, color: MUT, margin: 0 });
const ytd = [[FUND.nas, 20.3], [FUND.jp, 18.6], [FUND.sp, 15.2], [FUND.orukan, 11.3], [FUND.fang, 2.4]];
ytd.forEach((r, i) => {
  const y = 2.3 + i * 0.68;
  const bw = (r[1] / 20.3) * 3.6;
  chip(s, M, y + 0.05, r[0], 1.55, 0.4, 12);
  s.addShape("roundRect", { x: 2.35, y: y + 0.05, w: Math.max(bw, 0.25), h: 0.4, rectRadius: 0.06, fill: { color: r[0].c } });
  s.addText(`+${r[1]}%`, { x: 2.35 + Math.max(bw, 0.25) + 0.1, y: y + 0.02, w: 1.1, h: 0.45, fontFace: F, fontSize: 14, bold: true, color: TXT, margin: 0 });
});
takeaway(s, "11倍は「後づけ込み」。そして今年は最下位");
foot(s, "2026年6月末時点");

// =========================================================
// 23. クイズ
// =========================================================
s = slideBase();
kicker(s, "カルテ⑤ クイズ");
title(s, "過去10年、100万円がより増えたのは？", 0.85, 22);
s.addShape("roundRect", { x: 0.7, y: 2.3, w: 2.9, h: 2.5, rectRadius: 0.14, fill: { color: CARD }, line: { color: FUND.sp.c, width: 2 } });
s.addText("A", { x: 0.7, y: 2.6, w: 2.9, h: 0.7, align: "center", fontFace: F, fontSize: 38, bold: true, color: FUND.sp.c, margin: 0 });
s.addText("S&P500", { x: 0.7, y: 3.6, w: 2.9, h: 0.6, align: "center", fontFace: F, fontSize: 21, bold: true, color: TXT, margin: 0 });
s.addShape("roundRect", { x: 3.9, y: 2.3, w: 2.9, h: 2.5, rectRadius: 0.14, fill: { color: CARD }, line: { color: FUND.jp.c, width: 2 } });
s.addText("B", { x: 3.9, y: 2.6, w: 2.9, h: 0.7, align: "center", fontFace: F, fontSize: 38, bold: true, color: FUND.jp.c, margin: 0 });
s.addText("日本株", { x: 3.9, y: 3.6, w: 2.9, h: 0.6, align: "center", fontFace: F, fontSize: 21, bold: true, color: TXT, margin: 0 });
s.addText("（TOPIX・配当込み円ベース）", { x: M, y: 5.15, w: CW, h: 0.4, align: "center", fontFace: F, fontSize: 13, color: MUT, margin: 0 });
s.addText("答えは……", { x: M, y: 5.9, w: CW, h: 0.5, align: "center", fontFace: F, fontSize: 17, bold: true, color: GOLD, margin: 0 });

// =========================================================
// 24. クイズ答え + 出典
// =========================================================
s = slideBase();
kicker(s, "カルテ⑤ 正解");
chip(s, M, 0.7, FUND.jp, 1.6, 0.44, 15);
s.addText("正解は、日本株", { x: M, y: 1.35, w: CW, h: 0.6, fontFace: F, fontSize: 27, bold: true, color: TXT, margin: 0 });
s.addText([
  { text: "日本株　", options: { fontSize: 17, color: MUT } },
  { text: "100万円 → 約405万円\n", options: { fontSize: 25, bold: true, color: FUND.jp.c } },
  { text: "S&P500　", options: { fontSize: 17, color: MUT } },
  { text: "100万円 → 約358万円", options: { fontSize: 21, bold: true, color: MUT } },
], { x: M, y: 2.15, w: CW, h: 1.5, fontFace: F, margin: 0, lineSpacingMultiple: 1.4 });
sourceCard(s, {
  y: 3.95, h: 2.5,
  publisher: "JPX（日本取引所グループ）",
  docTitle: "TOPIX Factsheet（2026年6月末）",
  rows: [
    ["構成", "1,638銘柄・浮動株時価総額加重（上限10%）"],
    ["10年実績", "年率 15.0%／リスク 13.7%（配当込み・円）"],
    ["最近の変化", "2026年10月〜「次世代TOPIX」へ移行"],
  ],
  url: "jpx.co.jp/markets/indices/topix/",
});
s.addNotes("収録時はJPX公式factsheetのスクリーンショットに差し替え可。");

// =========================================================
// 25. 次世代TOPIX
// =========================================================
s = slideBase();
kicker(s, "カルテ⑤ 最近の変化");
chip(s, M, 0.7, FUND.jp, 1.6, 0.44, 15);
title(s, "2026年10月〜 次世代TOPIXへ", 1.3, 22);
const tpx = [
  ["対象拡大", "スタンダード・グロース市場も選定対象に"],
  ["基準で絞る", "売買代金回転率 0.14以上／浮動株時価総額 累積上位97%"],
  ["段階除外", "基準を満たさない企業は8段階で比率低減"],
];
tpx.forEach((r, i) => {
  const y = 2.2 + i * 1.15;
  s.addShape("roundRect", { x: M, y, w: CW, h: 0.95, rectRadius: 0.1, fill: { color: CARD } });
  s.addText(r[0], { x: M + 0.22, y: y + 0.12, w: 2.0, h: 0.4, fontFace: F, fontSize: 15, bold: true, color: FUND.jp.c, margin: 0 });
  s.addText(r[1], { x: M + 0.22, y: y + 0.5, w: CW - 0.44, h: 0.4, fontFace: F, fontSize: 13, color: TXT, margin: 0 });
});
takeaway(s, "過去10年、実は日本株はS&P500に勝っていた");

// =========================================================
// 26. 過去10年比較表
// =========================================================
s = slideBase();
kicker(s, "第7章 比較");
title(s, "過去10年の成績表", 0.72, 26);
s.addText("⚠ 条件が違う数字。小数点まで比べない", { x: M, y: 1.35, w: CW, h: 0.35, fontFace: F, fontSize: 13, bold: true, color: RED, margin: 0 });
const cmp = [
  ["オルカン", "12.8%", "14.7%", "0.73", "USD・配当込み"],
  ["S&P500", "13.6%", "15.4%", "0.88", "価格指数"],
  ["NASDAQ100", "21.2%", "22.6%", "0.94※", "価格指数"],
  ["TOPIX", "15.0%", "13.7%", "1.10※", "円・配当込み"],
  ["FANG+", "27.4%", "未公表", "—", "一部バックテスト"],
];
s.addTable(
  [[{ text: "指数", options: TH }, { text: "年率リターン", options: TH }, { text: "リスク", options: TH }, { text: "効率", options: TH }, { text: "前提", options: TH }],
  ...cmp.map(r => r.map(c => ({ text: c, options: { ...TD, fontSize: 11.5 } })))],
  { x: 0.35, y: 1.95, w: 6.8, colW: [1.45, 1.35, 1.05, 0.9, 2.05], rowH: 0.48, border: { type: "solid", color: BG, pt: 1 } }
);
s.addText("※効率＝リターン÷リスクの参考値（厳密なシャープレシオではない）", { x: M, y: 5.15, w: CW, h: 0.3, fontFace: F, fontSize: 10.5, color: MUT, margin: 0 });
foot(s, "各指数の公式factsheet・2026年6月末時点");

// =========================================================
// 27. 100円→10年
// =========================================================
s = slideBase();
kicker(s, "第7章 比較");
title(s, "仮に100円を10年入れていたら", 0.72, 25);
const yen100 = [[FUND.fang, 1126, "※一部バックテスト"], [FUND.nas, 684, ""], [FUND.jp, 405, ""], [FUND.sp, 358, ""], [FUND.orukan, 333, ""]];
yen100.forEach((r, i) => {
  const y = 1.85 + i * 0.92;
  const bw = (r[1] / 1126) * 3.4;
  chip(s, M, y + 0.13, r[0], 1.55, 0.42, 12);
  s.addShape("roundRect", { x: 2.35, y: y + 0.13, w: Math.max(bw, 0.3), h: 0.42, rectRadius: 0.06, fill: { color: r[0].c } });
  s.addText([
    { text: `${r[1].toLocaleString()}円`, options: { fontSize: 17, bold: true, color: TXT } },
    { text: r[2] ? `  ${r[2]}` : "", options: { fontSize: 9.5, color: MUT } },
  ], { x: 2.35, y: y + 0.58, w: 4.6, h: 0.32, fontFace: F, margin: 0 });
});
foot(s, "各指数の公表年率からの単純複利換算 ※前提は指数ごとに異なる");

// =========================================================
// 28. JPM LTCMA + 出典
// =========================================================
s = slideBase();
kicker(s, "第8章 プロの未来予測");
title(s, "今後10〜15年の期待リターン", 0.72, 24);
s.addText([
  { text: "日本株 ", options: { fontSize: 17, color: TXT, bold: true } },
  { text: "7.0%", options: { fontSize: 36, bold: true, color: FUND.jp.c } },
  { text: " ＞ 米国大型株 ", options: { fontSize: 17, color: TXT, bold: true } },
  { text: "4.9%", options: { fontSize: 36, bold: true, color: RED } },
], { x: M, y: 1.5, w: CW, h: 0.85, fontFace: F, margin: 0 });
const jpm = [
  ["日本株", "7.0%", "8.3%", "17.1%"],
  ["全世界株式", "5.2%", "6.8%", "18.9%"],
  ["米国大型株", "4.9%", "6.6%", "19.3%"],
  ["日本円現金", "1.4%", "1.4%", "0.1%"],
];
s.addTable(
  [[{ text: "資産", options: TH }, { text: "複利期待", options: TH }, { text: "算術平均", options: TH }, { text: "リスク", options: TH }],
  ...jpm.map(r => r.map(c => ({ text: c, options: { ...TD } })))],
  { x: 0.75, y: 2.55, w: 6.0, colW: [1.9, 1.4, 1.4, 1.3], rowH: 0.44, border: { type: "solid", color: BG, pt: 1 } }
);
sourceCard(s, {
  y: 5.1, h: 1.85,
  publisher: "J.P.モルガン・アセット・マネジメント",
  docTitle: "2026年 超長期市場予測（LTCMA）日本円版",
  rows: [["ポイント", "円ベースでは日本株の期待リターンが最上位"]],
  url: "am.jpmorgan.com（LTCMA 2026 日本円マトリックス）",
});
s.addNotes("収録時はJPモルガンの円マトリックスPDF画面に差し替え可。");

// =========================================================
// 29. 将来シャープ
// =========================================================
s = slideBase();
kicker(s, "第8章 リスク1単位あたりの効率");
title(s, "将来モデルのシャープレシオ", 0.72, 24);
const sh = [[FUND.jp, 0.41], [FUND.orukan, 0.29], [FUND.sp, 0.27], [FUND.nas, 0.23], [FUND.fang, 0.17]];
sh.forEach((r, i) => {
  const y = 1.8 + i * 0.92;
  const bw = (r[1] / 0.41) * 3.5;
  chip(s, M, y + 0.1, r[0], 1.55, 0.42, 12);
  s.addShape("roundRect", { x: 2.35, y: y + 0.1, w: bw, h: 0.42, rectRadius: 0.06, fill: { color: r[0].c } });
  s.addText(r[1].toFixed(2), { x: 2.35 + bw + 0.12, y: y + 0.07, w: 0.95, h: 0.45, fontFace: F, fontSize: 17, bold: true, color: TXT, margin: 0 });
});
s.addText("リスクを取るほど、効率は悪くなる前提", { x: M, y: 6.45, w: CW, h: 0.4, align: "center", fontFace: F, fontSize: 15, bold: true, color: GOLD, margin: 0 });
foot(s, "JPモルガン予測＋過去リスクからの試算 ※当チャンネル試算");

// =========================================================
// 30. モンテカルロ=天気予報
// =========================================================
s = slideBase();
kicker(s, "第9章");
title(s, "モンテカルロ・シミュレーション", 0.72, 24);
s.addShape("roundRect", { x: M, y: 1.7, w: CW, h: 2.1, rectRadius: 0.12, fill: { color: CARD } });
s.addText([
  { text: "たとえるなら 天気予報\n", options: { fontSize: 21, bold: true, color: GOLD } },
  { text: "明日の空を何千回も再現して、\n雨だった回数を数える", options: { fontSize: 15, color: TXT } },
], { x: M + 0.3, y: 1.7, w: CW - 0.6, h: 2.1, valign: "middle", fontFace: F, margin: 0, lineSpacingMultiple: 1.35 });
s.addText("今からやるのは、その資産運用版", { x: M, y: 4.15, w: CW, h: 0.45, align: "center", fontFace: F, fontSize: 16, color: MUT, margin: 0 });
s.addText("あなたの20年後を\n15万回 再現します", { x: M, y: 4.75, w: CW, h: 1.6, align: "center", fontFace: F, fontSize: 28, bold: true, color: TXT, margin: 0, lineSpacingMultiple: 1.25 });

// =========================================================
// 31. 条件
// =========================================================
s = slideBase();
kicker(s, "第9章 シミュレーション条件");
title(s, "毎月5万円 × 20年", 0.72, 27);
const cond = [
  ["元本", "1,200万円"],
  ["試行回数", "15万回"],
  ["期待リターン", "JPモルガン2026年予測（円）"],
  ["NASDAQ100", "米国大型株と同じ期待リターン"],
  ["FANG+", "リスク30%と仮定"],
  ["除外", "手数料・税金・インフレ"],
];
cond.forEach((r, i) => {
  const y = 1.75 + i * 0.82;
  s.addText(r[0], { x: M, y, w: 2.15, h: 0.6, fontFace: F, fontSize: 14, color: MUT, valign: "middle", margin: 0 });
  s.addText(r[1], { x: 2.7, y, w: 4.3, h: 0.6, fontFace: F, fontSize: 16, bold: true, color: TXT, valign: "middle", margin: 0 });
  if (i < cond.length - 1) s.addShape("line", { x: M, y: y + 0.72, w: CW, h: 0, line: { color: "2A3B5E", width: 0.75 } });
});
foot(s, "正規分布に基づく簡易モデル ※当チャンネル試算");

// =========================================================
// 32. 結果表 5ファンド
// =========================================================
s = slideBase();
kicker(s, "第9章 結果");
title(s, "20年後、いくらになったか", 0.72, 25);
const mc = [
  ["オルカン", "1,082", "2,101", "4,395"],
  ["S&P500", "1,040", "2,030", "4,300"],
  ["NASDAQ100", "880", "1,900", "4,560"],
  ["日本株", "1,360", "2,550", "5,060"],
  ["FANG+", "620", "1,600", "4,960"],
];
s.addTable(
  [[{ text: "投資先", options: TH }, { text: "悪い未来", options: TH }, { text: "真ん中", options: TH }, { text: "良い未来", options: TH }],
  ...mc.map((r, i) => r.map((c, j) => ({
    text: j === 0 ? c : `${c}万円`,
    options: { ...TD, fontSize: 12.5, color: (i === 4 && j === 1) ? RED : (i === 3 ? GREEN : TXT), bold: j === 0 || i === 3 || (i === 4 && j !== 0) },
  })))],
  { x: 0.4, y: 1.75, w: 6.7, colW: [1.75, 1.65, 1.65, 1.65], rowH: 0.52, border: { type: "solid", color: BG, pt: 1 } }
);
s.addShape("roundRect", { x: M, y: 5.35, w: CW, h: 1.15, rectRadius: 0.1, fill: { color: "3A1220" }, line: { color: RED, width: 1.25 } });
s.addText("FANG+：良い未来は約5,000万。\nでも悪い未来は 元本1,200万円 → 620万円", { x: M + 0.25, y: 5.35, w: CW - 0.5, h: 1.15, valign: "middle", align: "center", fontFace: F, fontSize: 14.5, bold: true, color: TXT, margin: 0, lineSpacingMultiple: 1.3 });
foot(s, "悪い未来=下位10% 良い未来=上位10% ※当チャンネル試算");

// =========================================================
// 33. 配分別 + NAS100単独
// =========================================================
s = slideBase();
kicker(s, "第10章 何対何がいいのか");
title(s, "混ぜるほど、中央値は下がった", 0.72, 24);
const mix = [
  ["オルカン100%", "1,082", "2,101", "4,395", "14.3%"],
  ["90 対 10", "1,071", "2,089", "4,401", "14.6%"],
  ["80 対 20", "1,057", "2,075", "4,410", "15.2%"],
  ["NASDAQ100だけ", "880", "1,900", "4,560", "約22%"],
];
s.addTable(
  [[{ text: "配分", options: TH }, { text: "悪い未来", options: TH }, { text: "真ん中", options: TH }, { text: "良い未来", options: TH }, { text: "元本割れ", options: TH }],
  ...mix.map((r, i) => r.map((c, j) => ({
    text: j === 0 ? c : (j === 4 ? c : `${c}万`),
    options: { ...TD, fontSize: 11.5, bold: i === 0 || i === 3, color: i === 3 ? RED : (i === 0 ? GREEN : TXT) },
  })))],
  { x: 0.3, y: 1.75, w: 6.9, colW: [1.9, 1.3, 1.3, 1.3, 1.1], rowH: 0.54, border: { type: "solid", color: BG, pt: 1 } }
);
s.addShape("roundRect", { x: M, y: 4.75, w: CW, h: 1.7, rectRadius: 0.12, fill: { color: CARD } });
s.addText([
  { text: "意外な結果\n", options: { fontSize: 14, bold: true, color: GOLD } },
  { text: "中央値の1位は オルカン100%\n", options: { fontSize: 20, bold: true, color: TXT } },
  { text: "「NASDAQ100が今後も勝つ」という前提を置いていないため", options: { fontSize: 12, color: MUT } },
], { x: M + 0.3, y: 4.75, w: CW - 0.6, h: 1.7, valign: "middle", fontFace: F, margin: 0, lineSpacingMultiple: 1.35 });
foot(s, "5%刻み・年1回リバランス・15万回 ※当チャンネル試算");

// =========================================================
// 34. 結論4段階
// =========================================================
s = slideBase();
kicker(s, "結論");
title(s, "あなたはどのタイプ？", 0.72, 26);
const concl = [
  ["数値上の最適", "オルカン 100%", GREEN],
  ["入れるなら最良", "オルカン95 ： NAS100 5", TXT],
  ["実用的な基本", "オルカン90 ： NAS100 10", GOLD],
  ["積極型の上限", "オルカン80 ： NAS100 20", TXT],
];
concl.forEach((r, i) => {
  const y = 1.8 + i * 1.15;
  const hl2 = i === 2;
  s.addShape("roundRect", { x: M, y, w: CW, h: 0.95, rectRadius: 0.1, fill: { color: hl2 ? "143025" : CARD }, line: hl2 ? { color: GOLD, width: 2 } : { color: CARD, width: 0 } });
  s.addText(r[0], { x: M + 0.25, y: y + 0.1, w: 2.6, h: 0.35, fontFace: F, fontSize: 12.5, color: MUT, margin: 0 });
  s.addText(r[1], { x: M + 0.25, y: y + 0.42, w: CW - 0.5, h: 0.45, fontFace: F, fontSize: 19, bold: true, color: r[2], margin: 0 });
});
s.addText("サテライトは「期待に賭けるリスク予算」。魔法ではない", { x: M, y: 6.5, w: CW, h: 0.4, align: "center", fontFace: F, fontSize: 13.5, color: MUT, margin: 0 });

// =========================================================
// 35. から揚げ増量
// =========================================================
s = slideBase();
kicker(s, "大事な注意");
title(s, "それは分散ではなく、増量", 0.72, 26);
s.addShape("roundRect", { x: 0.7, y: 1.85, w: 6.1, h: 2.0, rectRadius: 0.12, fill: { color: CARD } });
s.addText([
  { text: "オルカン ＝ 幕の内弁当\n", options: { fontSize: 19, bold: true, color: TXT } },
  { text: "から揚げ（米国テック）はもう入っている", options: { fontSize: 14, color: MUT } },
], { x: 1.0, y: 1.85, w: 5.5, h: 2.0, valign: "middle", fontFace: F, margin: 0, lineSpacingMultiple: 1.35 });
s.addText("＋", { x: M, y: 3.95, w: CW, h: 0.5, align: "center", fontFace: F, fontSize: 26, bold: true, color: MUT, margin: 0 });
s.addShape("roundRect", { x: 0.7, y: 4.5, w: 6.1, h: 1.55, rectRadius: 0.12, fill: { color: "2A1B3D" }, line: { color: FUND.nas.c, width: 1.5 } });
s.addText([
  { text: "NASDAQ100 ＝ から揚げ増量\n", options: { fontSize: 19, bold: true, color: FUND.nas.c } },
  { text: "新しいおかずではなく、同じ具の追加", options: { fontSize: 14, color: MUT } },
], { x: 1.0, y: 4.5, w: 5.5, h: 1.55, valign: "middle", fontFace: F, margin: 0, lineSpacingMultiple: 1.35 });
s.addText("分かった上で増やすなら、あり", { x: M, y: 6.4, w: CW, h: 0.45, align: "center", fontFace: F, fontSize: 15, bold: true, color: GOLD, margin: 0 });

// =========================================================
// 36. CTA
// =========================================================
s = slideBase();
s.addText("あなたの比率は？", { x: M, y: 1.5, w: CW, h: 0.8, align: "center", fontFace: F, fontSize: 34, bold: true, color: TXT, margin: 0 });
s.addText("どれを、何%ずつ？\nその比率にした理由は？", { x: M, y: 2.6, w: CW, h: 1.2, align: "center", fontFace: F, fontSize: 20, color: MUT, margin: 0, lineSpacingMultiple: 1.35 });
s.addShape("roundRect", { x: 1.3, y: 4.2, w: 4.9, h: 0.95, rectRadius: 0.47, fill: { color: GOLD } });
s.addText("コメント欄で教えてください", { x: 1.3, y: 4.2, w: 4.9, h: 0.95, align: "center", valign: "middle", fontFace: F, fontSize: 19, bold: true, color: "0E1B33", margin: 0 });
s.addText("高評価・チャンネル登録もお願いします\n次回は火曜日に投稿します", { x: M, y: 5.6, w: CW, h: 0.9, align: "center", fontFace: F, fontSize: 14, color: MUT, margin: 0, lineSpacingMultiple: 1.35 });

p.writeFile({ fileName: "/home/user/test-project/youtube/2026-07-28-slides-5fund.pptx" }).then(() => console.log("done"));
