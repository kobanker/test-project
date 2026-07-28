// 5ファンド比較・演者横スライド v2 —— テレビフリップ風（白背景・特大文字・図解中心）
const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.defineLayout({ name: "SQ", width: 7.5, height: 7.5 });
p.layout = "SQ";

// ---- palette: 情報番組フリップ ----
const BG = "FFFFFF";
const NAVY = "17325A";   // 本文の濃紺
const RED = "D7263D";    // 朱赤（損失・警告）
const GREEN = "0E7A46";  // 深緑（プラス・正解）
const HL = "FFE45C";     // 蛍光マーカー黄
const GRAY = "6B7280";
const PANEL = "F1F5FB";  // 薄い青グレー面
const LINE = "C9D4E4";

const FUND = {
  orukan: { c: "2563EB", n: "オルカン" },
  sp: { c: "E67E22", n: "S&P500" },
  nas: { c: "7C3AED", n: "NASDAQ100" },
  fang: { c: "DC2626", n: "FANG+" },
  jp: { c: "059669", n: "日本株" },
};
const F = "BIZ UDPGothic";
const W = 7.5, M = 0.5, CW = W - 2 * M;

function base() { const s = p.addSlide(); s.background = { color: BG }; return s; }
function head(s, text, opts = {}) {
  // 見出し：太字濃紺、下に余白。マーカー部分は配列で
  const arr = Array.isArray(text) ? text : [{ text, options: {} }];
  s.addText(arr.map(r => ({ text: r.text, options: { fontSize: opts.fs || 30, bold: true, color: r.options.color || NAVY, highlight: r.options.hl ? HL : undefined } })),
    { x: opts.x !== undefined ? opts.x : M, y: opts.y !== undefined ? opts.y : 0.42, w: opts.w !== undefined ? opts.w : CW, h: opts.h || 1.0, fontFace: F, margin: 0, lineSpacingMultiple: 1.12, align: opts.align || "left", valign: opts.valign || "top" });
}
function foot(s, text) {
  s.addText(text, { x: M, y: 7.08, w: CW, h: 0.3, fontFace: F, fontSize: 10.5, color: GRAY, margin: 0 });
}
function chip(s, x, y, f, w = 1.7, h = 0.48, fs = 15) {
  s.addShape("rect", { x, y, w, h, fill: { color: f.c } });
  s.addText(f.n, { x, y, w, h, align: "center", valign: "middle", fontFace: F, fontSize: fs, bold: true, color: "FFFFFF", margin: 0 });
}
function srcStrip(s, text, y = 6.62) {
  s.addShape("rect", { x: M, y, w: CW, h: 0.42, fill: { color: PANEL } });
  s.addText([{ text: "出典 ", options: { bold: true, color: NAVY, fontSize: 11 } }, { text, options: { color: GRAY, fontSize: 11 } }],
    { x: M + 0.15, y, w: CW - 0.3, h: 0.42, valign: "middle", fontFace: F, margin: 0 });
}
function bigMoney(s, cap, from, to, color, note) {
  s.addText(cap, { x: M, y: 1.95, w: CW, h: 0.5, align: "center", fontFace: F, fontSize: 19, bold: true, color: GRAY, margin: 0 });
  s.addText(from, { x: M, y: 2.6, w: CW, h: 0.8, align: "center", fontFace: F, fontSize: 40, bold: true, color: NAVY, margin: 0 });
  s.addShape("triangle", { x: 3.45, y: 3.62, w: 0.6, h: 0.5, fill: { color: GRAY }, rotate: 180 });
  s.addText(to, { x: M, y: 4.25, w: CW, h: 1.3, align: "center", fontFace: F, fontSize: 66, bold: true, color, margin: 0 });
  if (note) s.addText(note, { x: M, y: 5.75, w: CW, h: 0.5, align: "center", fontFace: F, fontSize: 15, bold: true, color: RED, margin: 0 });
}
function marubatsu(s, x, y, ok, d = 0.62) {
  s.addShape("ellipse", { x, y, w: d, h: d, fill: { color: ok ? GREEN : RED } });
  s.addText(ok ? "○" : "×", { x, y, w: d, h: d, align: "center", valign: "middle", fontFace: F, fontSize: d * 40, bold: true, color: "FFFFFF", margin: 0 });
}

// =====================================================
// 1 タイトル
// =====================================================
let s = base();
s.addText("結局、", { x: M, y: 0.82, w: CW, h: 0.6, align: "center", fontFace: F, fontSize: 38, bold: true, color: NAVY, margin: 0 });
s.addText("どれ", { x: M, y: 1.5, w: CW, h: 1.15, align: "center", fontFace: F, fontSize: 76, bold: true, color: RED, margin: 0 });
s.addText("を買えばいい？", { x: M, y: 2.62, w: CW, h: 0.7, align: "center", fontFace: F, fontSize: 40, bold: true, color: NAVY, margin: 0 });
const F5 = [FUND.orukan, FUND.sp, FUND.nas, FUND.fang, FUND.jp];
F5.forEach((f, i) => {
  const y = 3.55 + i * 0.63;
  s.addShape("rect", { x: 1.55, y, w: 4.4, h: 0.54, fill: { color: f.c } });
  s.addText(f.n, { x: 1.55, y, w: 4.4, h: 0.54, align: "center", valign: "middle", fontFace: F, fontSize: 19, bold: true, color: "FFFFFF", margin: 0 });
});
s.addText([{ text: "未来を ", options: { fontSize: 20, bold: true, color: NAVY } }, { text: "15万回", options: { fontSize: 30, bold: true, color: RED } }, { text: " 計算しました", options: { fontSize: 20, bold: true, color: NAVY } }],
  { x: M, y: 6.75, w: CW, h: 0.55, align: "center", fontFace: F, margin: 0 });

// =====================================================
// 2 460万円の差
// =====================================================
s = base();
head(s, [{ text: "悪い未来では ", options: {} }, { text: "460万円の差", options: { hl: true, color: RED } }], { fs: 30 });
function bar2(x, f, val) {
  const bh = (val / 1200) * 3.4;
  s.addShape("rect", { x, y: 5.7 - bh, w: 2.2, h: bh, fill: { color: f.c } });
  s.addText(`${val.toLocaleString()}万円`, { x: x - 0.35, y: 5.7 - bh - 0.62, w: 2.9, h: 0.55, align: "center", fontFace: F, fontSize: 24, bold: true, color: NAVY, margin: 0 });
  chip(s, x + 0.25, 5.85, f, 1.7, 0.5, 15);
}
bar2(1.0, FUND.orukan, 1082);
bar2(4.3, FUND.fang, 620);
s.addText("同じ20年・毎月5万円でも", { x: M, y: 1.55, w: CW, h: 0.45, fontFace: F, fontSize: 17, bold: true, color: GRAY, margin: 0 });
foot(s, "下位10%地点 ※当チャンネル試算（15万回）");

// =====================================================
// 3 見る前（Before）
// =====================================================
s = base();
head(s, "知らないと、こうなる", { fs: 32 });
const bef = ["「一番増えた」で選んで大損", "全部買い＝同じ会社の重ね買い", "暴落の日、底値で売る"];
bef.forEach((t, i) => {
  const y = 1.85 + i * 1.55;
  marubatsu(s, M + 0.1, y + 0.25, false, 0.8);
  s.addText(t, { x: M + 1.2, y, w: CW - 1.3, h: 1.3, valign: "middle", fontFace: F, fontSize: 23, bold: true, color: NAVY, margin: 0, lineSpacingMultiple: 1.15 });
  if (i < 2) s.addShape("line", { x: M, y: y + 1.42, w: CW, h: 0, line: { color: LINE, width: 1 } });
});

// =====================================================
// 4 見た後（After）
// =====================================================
s = base();
head(s, "この動画を見終わると", { fs: 32 });
const aft = ["5本の中身が全部わかる", "自分の比率を数字で決められる", "暴落の日に売らずにいられる"];
aft.forEach((t, i) => {
  const y = 1.75 + i * 1.35;
  marubatsu(s, M + 0.1, y + 0.2, true, 0.8);
  s.addText(t, { x: M + 1.2, y, w: CW - 1.3, h: 1.15, valign: "middle", fontFace: F, fontSize: 23, bold: true, color: NAVY, margin: 0 });
});
s.addText([{ text: "迷いは今日で終わり", options: { fontSize: 26, bold: true, color: NAVY, highlight: HL } }],
  { x: M, y: 6.1, w: CW, h: 0.7, align: "center", fontFace: F, margin: 0 });

// =====================================================
// 5 5本の思想
// =====================================================
s = base();
head(s, "選び方の「思想」が違う", { fs: 30 });
const shiso = [
  [FUND.orukan, "世界を丸ごと"],
  [FUND.sp, "米国の選抜500社"],
  [FUND.nas, "成長テック100社"],
  [FUND.fang, "巨大テック10社に集中"],
  [FUND.jp, "日本を幅広く"],
];
shiso.forEach((r, i) => {
  const y = 1.7 + i * 1.05;
  chip(s, M, y, r[0], 2.0, 0.62, 16);
  s.addText(r[1], { x: 2.75, y, w: 4.25, h: 0.62, valign: "middle", fontFace: F, fontSize: 21, bold: true, color: NAVY, margin: 0 });
});

// =====================================================
// 6 オルカンの中身（円グラフ風）
// =====================================================
s = base();
chip(s, M, 0.45, FUND.orukan, 1.9, 0.55, 17);
head(s, [{ text: "中身は？", options: {} }], { fs: 30, x: 2.55, w: 4.45, valign: "middle", h: 0.62 });
// pie: US 63.6%
s.addShape("pie", { x: 0.85, y: 1.9, w: 3.6, h: 3.6, fill: { color: FUND.orukan.c }, angleRange: [270, 270 + 229] });
s.addShape("pie", { x: 0.85, y: 1.9, w: 3.6, h: 3.6, fill: { color: "D8E2F2" }, angleRange: [270 + 229, 270 + 360] });
s.addText([{ text: "米国\n", options: { fontSize: 20, bold: true, color: "FFFFFF" } }, { text: "63.6%", options: { fontSize: 27, bold: true, color: "FFFFFF" } }],
  { x: 0.95, y: 2.95, w: 2.6, h: 1.25, align: "center", fontFace: F, margin: 0 });
s.addText("その他の国\n36.4%", { x: 4.55, y: 2.6, w: 2.4, h: 1.0, fontFace: F, fontSize: 17, bold: true, color: GRAY, margin: 0, lineSpacingMultiple: 1.2 });
s.addText([{ text: "実は6割アメリカ", options: { fontSize: 27, bold: true, color: NAVY, highlight: HL } }],
  { x: M, y: 5.85, w: CW, h: 0.6, align: "center", fontFace: F, margin: 0 });
srcStrip(s, "MSCI「ACWI Index Factsheet」2026年6月末", 6.66);

// =====================================================
// 7 オルカン 100万→333万
// =====================================================
s = base();
chip(s, M, 0.45, FUND.orukan, 1.9, 0.55, 17);
head(s, "10年前に買っていたら", { fs: 22, x: 2.55, w: 4.45, valign: "middle", h: 0.62 });
bigMoney(s, "年率 約12.8%（配当込み・ドル）", "100万円", "333万円", FUND.orukan.c, "");
foot(s, "公表年率からの単純換算。前提は指数ごとに異なる");

// =====================================================
// 8 オルカン上位5
// =====================================================
s = base();
chip(s, M, 0.45, FUND.orukan, 1.9, 0.55, 17);
head(s, "上位はこの顔ぶれ", { fs: 22, x: 2.55, w: 4.45, valign: "middle", h: 0.62 });
const oru5 = [["NVIDIA", "4.6%"], ["Apple", "4.2%"], ["Microsoft", "2.6%"], ["Amazon", "2.3%"], ["Alphabet", "2.1%"]];
oru5.forEach((r, i) => {
  const y = 1.6 + i * 0.88;
  s.addShape("ellipse", { x: M, y: y + 0.08, w: 0.6, h: 0.6, fill: { color: FUND.orukan.c } });
  s.addText(String(i + 1), { x: M, y: y + 0.08, w: 0.6, h: 0.6, align: "center", valign: "middle", fontFace: F, fontSize: 22, bold: true, color: "FFFFFF", margin: 0 });
  s.addText(r[0], { x: M + 0.85, y, w: 3.6, h: 0.76, valign: "middle", fontFace: F, fontSize: 24, bold: true, color: NAVY, margin: 0 });
  s.addText(r[1], { x: 5.0, y, w: 2.0, h: 0.76, valign: "middle", align: "right", fontFace: F, fontSize: 22, bold: true, color: GRAY, margin: 0 });
});
s.addText([{ text: "上位10社で ", options: { fontSize: 19, bold: true, color: NAVY } }, { text: "23.3%", options: { fontSize: 26, bold: true, color: RED } }],
  { x: M, y: 6.15, w: CW, h: 0.55, align: "center", fontFace: F, margin: 0 });
foot(s, "2026年6月末時点");

// =====================================================
// 9 S&P500 選抜4条件
// =====================================================
s = base();
chip(s, M, 0.45, FUND.sp, 1.9, 0.55, 17);
head(s, "入るのに審査がある", { fs: 22, x: 2.55, w: 4.45, valign: "middle", h: 0.62 });
const spq = ["米国企業", "時価総額 約200億ドル以上", "浮動株が十分ある", "黒字であること"];
spq.forEach((t, i) => {
  const y = 1.7 + i * 1.08;
  s.addShape("ellipse", { x: M, y: y + 0.06, w: 0.72, h: 0.72, fill: { color: FUND.sp.c } });
  s.addText(String(i + 1), { x: M, y: y + 0.06, w: 0.72, h: 0.72, align: "center", valign: "middle", fontFace: F, fontSize: 26, bold: true, color: "FFFFFF", margin: 0 });
  s.addText(t, { x: M + 1.0, y, w: CW - 1.1, h: 0.85, valign: "middle", fontFace: F, fontSize: 22, bold: true, color: i === 3 ? RED : NAVY, margin: 0 });
});
s.addText([{ text: "赤字では入れない", options: { fontSize: 24, bold: true, color: NAVY, highlight: HL } }],
  { x: M, y: 6.15, w: CW, h: 0.6, align: "center", fontFace: F, margin: 0 });
srcStrip(s, "S&P ダウ・ジョーンズ・インデックス 指数メソドロジー", 6.66);

// =====================================================
// 10 S&P500 100万→358万
// =====================================================
s = base();
chip(s, M, 0.45, FUND.sp, 1.9, 0.55, 17);
head(s, "10年前に買っていたら", { fs: 22, x: 2.55, w: 4.45, valign: "middle", h: 0.62 });
bigMoney(s, "年率 約13.6%", "100万円", "358万円", FUND.sp.c, "");

// =====================================================
// 11 同じ顔ぶれ
// =====================================================
s = base();
head(s, [{ text: "上位は", options: {} }, { text: "同じ顔ぶれ", options: { hl: true } }], { fs: 30 });
const pair = [["NVIDIA", "NVIDIA"], ["Apple", "Apple"], ["Microsoft", "Microsoft"], ["Amazon", "Amazon"], ["Alphabet", "Alphabet"]];
chip(s, 0.8, 1.6, FUND.orukan, 2.5, 0.55, 16);
chip(s, 4.2, 1.6, FUND.sp, 2.5, 0.55, 16);
pair.forEach((r, i) => {
  const y = 2.35 + i * 0.78;
  s.addShape("rect", { x: 0.8, y, w: 2.5, h: 0.62, fill: { color: PANEL } });
  s.addText(r[0], { x: 0.8, y, w: 2.5, h: 0.62, align: "center", valign: "middle", fontFace: F, fontSize: 17, bold: true, color: NAVY, margin: 0 });
  s.addShape("rect", { x: 4.2, y, w: 2.5, h: 0.62, fill: { color: PANEL } });
  s.addText(r[1], { x: 4.2, y, w: 2.5, h: 0.62, align: "center", valign: "middle", fontFace: F, fontSize: 17, bold: true, color: NAVY, margin: 0 });
  s.addText("＝", { x: 3.3, y, w: 0.9, h: 0.62, align: "center", valign: "middle", fontFace: F, fontSize: 22, bold: true, color: RED, margin: 0 });
});
s.addText("中身は、かなり重なっている", { x: M, y: 6.45, w: CW, h: 0.55, align: "center", fontFace: F, fontSize: 21, bold: true, color: NAVY, margin: 0 });

// =====================================================
// 12 NASDAQ100 テク68.5%
// =====================================================
s = base();
chip(s, M, 0.45, FUND.nas, 1.9, 0.55, 17);
head(s, "金融ぬきの成長特化", { fs: 22, x: 2.55, w: 4.45, valign: "middle", h: 0.62 });
s.addShape("pie", { x: 0.85, y: 1.8, w: 3.6, h: 3.6, fill: { color: FUND.nas.c }, angleRange: [270, 270 + 247] });
s.addShape("pie", { x: 0.85, y: 1.8, w: 3.6, h: 3.6, fill: { color: "E4DBF7" }, angleRange: [270 + 247, 270 + 360] });
s.addText([{ text: "テック\n", options: { fontSize: 19, bold: true, color: "FFFFFF" } }, { text: "68.5%", options: { fontSize: 27, bold: true, color: "FFFFFF" } }],
  { x: 0.95, y: 2.85, w: 3.4, h: 1.2, align: "center", fontFace: F, margin: 0 });
s.addText("半導体・AI\nクラウドの\n「濃縮版」", { x: 4.65, y: 2.6, w: 2.4, h: 1.6, fontFace: F, fontSize: 16, bold: true, color: NAVY, margin: 0, lineSpacingMultiple: 1.25 });
s.addText([{ text: "銀行・保険は ", options: { fontSize: 21, bold: true, color: NAVY } }, { text: "0社", options: { fontSize: 28, bold: true, color: RED } }],
  { x: M, y: 5.75, w: CW, h: 0.6, align: "center", fontFace: F, margin: 0 });
srcStrip(s, "Nasdaq「Nasdaq-100 Factsheet」2026年6月末", 6.66);

// =====================================================
// 13 NASDAQ100 100万→684万
// =====================================================
s = base();
chip(s, M, 0.45, FUND.nas, 1.9, 0.55, 17);
head(s, "10年前に買っていたら", { fs: 22, x: 2.55, w: 4.45, valign: "middle", h: 0.62 });
bigMoney(s, "年率 約21.2%", "100万円", "684万円", FUND.nas.c, "ただし2022年は −33%");

// =====================================================
// 14 Amazon/Tesla タイムライン
// =====================================================
s = base();
head(s, [{ text: "黒字になる前から", options: { hl: true } }, { text: "持てる", options: {} }], { fs: 30 });
function tl(y, name, y1, y1lab, y2, y2lab) {
  s.addText(name, { x: M, y, w: 2.2, h: 0.44, fontFace: F, fontSize: 23, bold: true, color: NAVY, margin: 0 });
  // line
  s.addShape("line", { x: 1.0, y: y + 1.05, w: 5.5, h: 0, line: { color: LINE, width: 3 } });
  // point1 NAS
  s.addShape("ellipse", { x: y1 - 0.14, y: y + 0.91, w: 0.28, h: 0.28, fill: { color: FUND.nas.c } });
  s.addText(y1lab, { x: y1 - 1.05, y: y + 0.5, w: 2.1, h: 0.46, align: "center", fontFace: F, fontSize: 13, bold: true, color: FUND.nas.c, margin: 0, lineSpacingMultiple: 1.05 });
  // point2 SP
  s.addShape("ellipse", { x: y2 - 0.14, y: y + 0.91, w: 0.28, h: 0.28, fill: { color: FUND.sp.c } });
  s.addText(y2lab, { x: y2 - 1.05, y: y + 1.28, w: 2.1, h: 0.55, align: "center", fontFace: F, fontSize: 13.5, bold: true, color: FUND.sp.c, margin: 0, lineSpacingMultiple: 1.1 });
}
tl(1.6, "Amazon", 2.0, "NASDAQ100\n1998年（赤字）", 5.6, "S&P500\n2005年（黒字後）");
tl(3.75, "Tesla", 2.6, "NASDAQ100\n2013年", 5.6, "S&P500\n2020年（黒字後）");
s.addText([{ text: "その間に株価は ", options: { fontSize: 20, bold: true, color: NAVY } }, { text: "数十倍", options: { fontSize: 30, bold: true, color: RED } }],
  { x: M, y: 6.0, w: CW, h: 0.6, align: "center", fontFace: F, margin: 0 });
foot(s, "採用年は収録前に一次情報で確認");

// =====================================================
// 15 重ね買い図解（中間ブリッジ）
// =====================================================
s = base();
head(s, [{ text: "全部買い＝", options: {} }, { text: "重ね買い", options: { hl: true, color: RED } }], { fs: 32 });
// 3 boxes down to same companies
const boxes = [FUND.orukan, FUND.sp, FUND.nas];
boxes.forEach((f, i) => {
  const x = 0.75 + i * 2.05;
  s.addShape("rect", { x, y: 1.8, w: 1.85, h: 0.7, fill: { color: f.c } });
  s.addText(f.n, { x, y: 1.8, w: 1.85, h: 0.7, align: "center", valign: "middle", fontFace: F, fontSize: 15, bold: true, color: "FFFFFF", margin: 0 });
  s.addShape("line", { x: x + 0.92, y: 2.5, w: 3.75 - x + 0.5 - 0.17, h: 1.0, line: { color: GRAY, width: 2.5, endArrowType: "triangle" } });
});
s.addShape("rect", { x: 1.65, y: 3.7, w: 4.2, h: 1.7, fill: { color: PANEL }, line: { color: RED, width: 2.5 } });
s.addText("NVIDIA・Apple\nMicrosoft・Amazon…", { x: 1.65, y: 3.7, w: 4.2, h: 1.7, align: "center", valign: "middle", fontFace: F, fontSize: 20, bold: true, color: NAVY, margin: 0, lineSpacingMultiple: 1.3 });
s.addText("行き先は、同じ会社", { x: M, y: 5.85, w: CW, h: 0.65, align: "center", fontFace: F, fontSize: 26, bold: true, color: RED, margin: 0 });

// =====================================================
// 16 FANG+ 10社グリッド
// =====================================================
s = base();
chip(s, M, 0.45, FUND.fang, 1.9, 0.55, 17);
head(s, "たった10社に集中", { fs: 22, x: 2.55, w: 4.45, valign: "middle", h: 0.62 });
const fang10 = ["Meta", "Apple", "Amazon", "Netflix", "Microsoft", "Alphabet", "Micron", "NVIDIA", "Palantir", "Broadcom"];
fang10.forEach((c, i) => {
  const x = 0.65 + (i % 2) * 3.15, y = 1.65 + Math.floor(i / 2) * 0.92;
  s.addShape("rect", { x, y, w: 2.95, h: 0.76, fill: { color: i < 6 ? FUND.fang.c : "F5A6B0" } });
  s.addText(c, { x, y, w: 2.95, h: 0.76, align: "center", valign: "middle", fontFace: F, fontSize: 18, bold: true, color: i < 6 ? "FFFFFF" : "7A1220", margin: 0 });
});
s.addText([{ text: "各10%ずつ　", options: { fontSize: 17, bold: true, color: NAVY } }, { text: "濃い6社＋入替4社", options: { fontSize: 17, bold: true, color: GRAY } }],
  { x: M, y: 6.35, w: CW, h: 0.5, align: "center", fontFace: F, margin: 0 });
srcStrip(s, "ICE「NYSE FANG+ Index」", 6.85);

// =====================================================
// 17 FANG+ 100万→1126万 + 注意
// =====================================================
s = base();
chip(s, M, 0.45, FUND.fang, 1.9, 0.55, 17);
head(s, "10年当てはめると", { fs: 22, x: 2.55, w: 4.45, valign: "middle", h: 0.62 });
bigMoney(s, "年率 約27.4%（2014年〜）", "100万円", "1,126万円", FUND.fang.c, "");
s.addShape("rect", { x: 0.75, y: 5.6, w: 6.0, h: 1.0, fill: { color: "FBE9EC" }, line: { color: RED, width: 2 } });
s.addText([{ text: "注意　", options: { fontSize: 16, bold: true, color: RED } }, { text: "2017年以前は「後づけ」の数字", options: { fontSize: 18, bold: true, color: NAVY } }],
  { x: 0.9, y: 5.6, w: 5.7, h: 1.0, valign: "middle", fontFace: F, margin: 0 });

// =====================================================
// 18 今年の成績
// =====================================================
s = base();
head(s, [{ text: "ところが今年は", options: {} }, { text: "最下位", options: { hl: true, color: RED } }], { fs: 30 });
const ytd2 = [[FUND.nas, 20.3], [FUND.jp, 18.6], [FUND.sp, 15.2], [FUND.orukan, 11.3], [FUND.fang, 2.4]];
ytd2.forEach((r, i) => {
  const y = 1.75 + i * 0.95;
  const bw = (r[1] / 20.3) * 3.3;
  chip(s, M, y + 0.06, r[0], 1.8, 0.52, 14);
  s.addShape("rect", { x: 2.5, y: y + 0.06, w: Math.max(bw, 0.3), h: 0.52, fill: { color: r[0].c } });
  s.addText(`+${r[1]}%`, { x: 2.5 + Math.max(bw, 0.3) + 0.12, y: y + 0.02, w: 1.3, h: 0.58, valign: "middle", fontFace: F, fontSize: 19, bold: true, color: i === 4 ? RED : NAVY, margin: 0 });
});
foot(s, "2026年上半期の騰落率（6月末時点）");

// =====================================================
// 19 クイズ
// =====================================================
s = base();
head(s, "【クイズ】10年でより増えたのは？", { fs: 26 });
s.addShape("rect", { x: 0.65, y: 2.0, w: 2.95, h: 3.0, fill: { color: PANEL }, line: { color: FUND.sp.c, width: 3 } });
s.addText("A", { x: 0.65, y: 2.3, w: 2.95, h: 0.9, align: "center", fontFace: F, fontSize: 52, bold: true, color: FUND.sp.c, margin: 0 });
s.addText("S&P500", { x: 0.65, y: 3.5, w: 2.95, h: 0.7, align: "center", fontFace: F, fontSize: 25, bold: true, color: NAVY, margin: 0 });
s.addShape("rect", { x: 3.9, y: 2.0, w: 2.95, h: 3.0, fill: { color: PANEL }, line: { color: FUND.jp.c, width: 3 } });
s.addText("B", { x: 3.9, y: 2.3, w: 2.95, h: 0.9, align: "center", fontFace: F, fontSize: 52, bold: true, color: FUND.jp.c, margin: 0 });
s.addText("日本株", { x: 3.9, y: 3.5, w: 2.95, h: 0.7, align: "center", fontFace: F, fontSize: 25, bold: true, color: NAVY, margin: 0 });
s.addText("え、そんなの決まってる…？", { x: M, y: 5.6, w: CW, h: 0.6, align: "center", fontFace: F, fontSize: 19, bold: true, color: GRAY, margin: 0 });

// =====================================================
// 20 正解
// =====================================================
s = base();
head(s, [{ text: "正解は ", options: {} }, { text: "日本株", options: { hl: true, color: GREEN } }], { fs: 34 });
s.addText("100万円が…", { x: M, y: 1.8, w: CW, h: 0.5, align: "center", fontFace: F, fontSize: 19, bold: true, color: GRAY, margin: 0 });
chip(s, 1.1, 2.5, FUND.jp, 2.0, 0.6, 17);
s.addText("405万円", { x: 3.3, y: 2.35, w: 3.4, h: 0.95, fontFace: F, fontSize: 44, bold: true, color: GREEN, margin: 0 });
chip(s, 1.1, 3.9, FUND.sp, 2.0, 0.6, 17);
s.addText("358万円", { x: 3.3, y: 3.8, w: 3.4, h: 0.85, fontFace: F, fontSize: 34, bold: true, color: GRAY, margin: 0 });
s.addText("「日本株は増えない」は10年前の話", { x: M, y: 5.4, w: CW, h: 0.6, align: "center", fontFace: F, fontSize: 20, bold: true, color: NAVY, margin: 0 });
srcStrip(s, "JPX「TOPIX Factsheet」配当込み・円 2026年6月末", 6.4);

// =====================================================
// 21 次世代TOPIX
// =====================================================
s = base();
chip(s, M, 0.45, FUND.jp, 1.9, 0.55, 17);
head(s, "2026年10月から変わる", { fs: 22, x: 2.55, w: 4.45, valign: "middle", h: 0.62 });
s.addShape("rect", { x: 0.7, y: 1.9, w: 6.1, h: 1.25, fill: { color: PANEL } });
s.addText("いま：上場していれば入る", { x: 0.95, y: 1.9, w: 5.6, h: 1.25, valign: "middle", fontFace: F, fontSize: 21, bold: true, color: GRAY, margin: 0 });
s.addShape("triangle", { x: 3.45, y: 3.35, w: 0.6, h: 0.5, fill: { color: NAVY }, rotate: 180 });
s.addShape("rect", { x: 0.7, y: 4.05, w: 6.1, h: 1.45, fill: { color: "E7F5EE" }, line: { color: GREEN, width: 2.5 } });
s.addText([{ text: "これから：", options: { fontSize: 19, bold: true, color: GREEN } }, { text: "選ばれた企業だけ", options: { fontSize: 23, bold: true, color: NAVY } }],
  { x: 0.95, y: 4.05, w: 5.6, h: 1.45, valign: "middle", fontFace: F, margin: 0 });
s.addText("売買の少ない企業は段階的に除外", { x: M, y: 5.85, w: CW, h: 0.5, align: "center", fontFace: F, fontSize: 17, bold: true, color: NAVY, margin: 0 });
srcStrip(s, "JPX「次世代TOPIXへの移行について」", 6.55);

// =====================================================
// 22 100円→10年 比較
// =====================================================
s = base();
head(s, "100円を10年入れたら", { fs: 30 });
const y100 = [[FUND.fang, 1126, true], [FUND.nas, 684, false], [FUND.jp, 405, false], [FUND.sp, 358, false], [FUND.orukan, 333, false]];
y100.forEach((r, i) => {
  const y = 1.7 + i * 0.98;
  const bw = (r[1] / 1126) * 3.3;
  chip(s, M, y + 0.05, r[0], 1.8, 0.55, 14);
  s.addShape("rect", { x: 2.5, y: y + 0.05, w: bw, h: 0.55, fill: { color: r[0].c } });
  s.addText([{ text: `${r[1].toLocaleString()}円`, options: { fontSize: 19, bold: true, color: NAVY } }, { text: r[2] ? " ※後づけ込み" : "", options: { fontSize: 11, bold: true, color: RED } }],
    { x: 2.5, y: y + 0.62, w: 4.3, h: 0.35, fontFace: F, margin: 0 });
});
foot(s, "各指数の公表年率から単純換算。通貨・配当の前提は指数ごとに異なる");

// =====================================================
// 23 JPモルガン予測
// =====================================================
s = base();
head(s, "プロの10年予測は「逆」", { fs: 30 });
s.addText("J.P.モルガン 超長期市場予測 2026（円ベース）", { x: M, y: 1.5, w: CW, h: 0.4, fontFace: F, fontSize: 14, bold: true, color: GRAY, margin: 0 });
const jpmv = [[FUND.jp, 7.0], [{ c: "64748B", n: "全世界" }, 5.2], [{ c: "94A3B8", n: "米国大型" }, 4.9]];
jpmv.forEach((r, i) => {
  const y = 2.15 + i * 1.15;
  const bw = (r[1] / 7.0) * 3.4;
  chip(s, M, y + 0.08, r[0], 1.8, 0.62, 15);
  s.addShape("rect", { x: 2.5, y: y + 0.08, w: bw, h: 0.62, fill: { color: r[0].c } });
  s.addText(`${r[1].toFixed(1)}%`, { x: 2.5 + bw + 0.12, y: y, w: 1.5, h: 0.78, valign: "middle", fontFace: F, fontSize: 27, bold: true, color: i === 0 ? GREEN : GRAY, margin: 0 });
});
s.addText([{ text: "日本株が1位。米国は最下位", options: { fontSize: 22, bold: true, color: NAVY, highlight: HL } }],
  { x: M, y: 5.75, w: CW, h: 0.6, align: "center", fontFace: F, margin: 0 });
srcStrip(s, "J.P.モルガン・アセット・マネジメント LTCMA 2026 日本円版", 6.55);

// =====================================================
// 24 モンテカルロ＝天気予報
// =====================================================
s = base();
head(s, "未来を15万回つくる", { fs: 32 });
s.addText("たとえるなら", { x: M, y: 1.9, w: CW, h: 0.5, align: "center", fontFace: F, fontSize: 18, bold: true, color: GRAY, margin: 0 });
s.addText([{ text: "天気予報", options: { fontSize: 48, bold: true, color: NAVY, highlight: HL } }],
  { x: M, y: 2.5, w: CW, h: 1.0, align: "center", fontFace: F, margin: 0 });
s.addText("明日の空を何千回も再現して\n雨の回数を数える", { x: M, y: 3.8, w: CW, h: 1.1, align: "center", fontFace: F, fontSize: 20, bold: true, color: NAVY, margin: 0, lineSpacingMultiple: 1.35 });
s.addText("これの「資産運用版」をやります", { x: M, y: 5.3, w: CW, h: 0.55, align: "center", fontFace: F, fontSize: 18, bold: true, color: GRAY, margin: 0 });
foot(s, "毎月5万円×20年（元本1,200万円）・15万回 ※当チャンネル試算");

// =====================================================
// 25 結果レンジバー
// =====================================================
s = base();
head(s, "20年後の「幅」", { fs: 30 });
s.addText("悪い未来 ←→ 良い未来（●は真ん中）", { x: M, y: 1.42, w: CW, h: 0.4, fontFace: F, fontSize: 14, bold: true, color: GRAY, margin: 0 });
const MAXV = 5100;
const rng = [
  [FUND.orukan, 1082, 2101, 4395],
  [FUND.sp, 1040, 2030, 4300],
  [FUND.nas, 880, 1900, 4560],
  [FUND.jp, 1360, 2550, 5060],
  [FUND.fang, 620, 1600, 4960],
];
const X0 = 2.42, XW = 3.95;
rng.forEach((r, i) => {
  const y = 2.05 + i * 0.92;
  chip(s, M, y + 0.02, r[0], 1.8, 0.5, 14);
  const x1 = X0 + (r[1] / MAXV) * XW, x2 = X0 + (r[3] / MAXV) * XW, xm = X0 + (r[2] / MAXV) * XW;
  s.addShape("roundRect", { x: x1, y: y + 0.12, w: x2 - x1, h: 0.3, rectRadius: 0.15, fill: { color: r[0].c, transparency: 55 } });
  s.addShape("ellipse", { x: xm - 0.12, y: y + 0.15, w: 0.24, h: 0.24, fill: { color: r[0].c } });
  s.addText(`${r[1]}`, { x: x1 - 0.75, y: y + 0.1, w: 0.7, h: 0.34, align: "right", fontFace: F, fontSize: 12, bold: true, color: i === 4 ? RED : GRAY, margin: 0 });
  s.addText(`${r[3]}`, { x: x2 + 0.05, y: y + 0.1, w: 0.75, h: 0.34, fontFace: F, fontSize: 12, bold: true, color: GRAY, margin: 0 });
});
s.addText([{ text: "集中するほど、幅が広がる", options: { fontSize: 21, bold: true, color: NAVY, highlight: HL } }],
  { x: M, y: 6.62, w: CW, h: 0.55, align: "center", fontFace: F, margin: 0 });
foot(s, "");
s.addText("単位：万円 ※当チャンネル試算", { x: M, y: 7.14, w: CW, h: 0.26, fontFace: F, fontSize: 10, color: GRAY, margin: 0 });

// =====================================================
// 26 FANG+の両極端
// =====================================================
s = base();
chip(s, M, 0.45, FUND.fang, 1.9, 0.55, 17);
head(s, "夢と、現実", { fs: 24, x: 2.55, w: 4.45, valign: "middle", h: 0.62 });
s.addShape("rect", { x: 0.65, y: 1.8, w: 2.95, h: 3.3, fill: { color: "E7F5EE" } });
s.addText("良い未来", { x: 0.65, y: 2.1, w: 2.95, h: 0.5, align: "center", fontFace: F, fontSize: 19, bold: true, color: GREEN, margin: 0 });
s.addText("約5,000万", { x: 0.65, y: 2.85, w: 2.95, h: 0.8, align: "center", fontFace: F, fontSize: 30, bold: true, color: GREEN, margin: 0 });
s.addShape("rect", { x: 3.9, y: 1.8, w: 2.95, h: 3.3, fill: { color: "FBE9EC" } });
s.addText("悪い未来", { x: 3.9, y: 2.1, w: 2.95, h: 0.5, align: "center", fontFace: F, fontSize: 19, bold: true, color: RED, margin: 0 });
s.addText("620万", { x: 3.9, y: 2.85, w: 2.95, h: 0.8, align: "center", fontFace: F, fontSize: 34, bold: true, color: RED, margin: 0 });
s.addText("元本割れ 約28%→", { x: 3.9, y: 3.8, w: 2.95, h: 0.4, align: "center", fontFace: F, fontSize: 13, bold: true, color: RED, margin: 0 });
s.addText([{ text: "元本1,200万円が ", options: { fontSize: 20, bold: true, color: NAVY } }, { text: "半分", options: { fontSize: 28, bold: true, color: RED, highlight: HL } }, { text: " になる未来も", options: { fontSize: 20, bold: true, color: NAVY } }],
  { x: M, y: 5.55, w: CW, h: 0.65, align: "center", fontFace: F, margin: 0 });
foot(s, "※当チャンネル試算。元本割れ確率はFANG+単独で約22〜28%（前提により変動）");

// =====================================================
// 27 混ぜても増えない（中央値バー）
// =====================================================
s = base();
head(s, [{ text: "混ぜても、", options: {} }, { text: "増えなかった", options: { hl: true, color: RED } }], { fs: 30 });
s.addText("真ん中の未来（中央値）", { x: M, y: 1.5, w: CW, h: 0.4, fontFace: F, fontSize: 14, bold: true, color: GRAY, margin: 0 });
const mixes = [["オルカン100%", 2101, GREEN], ["90:10", 2089, NAVY], ["80:20", 2075, NAVY], ["NASDAQ100だけ", 1900, RED]];
mixes.forEach((r, i) => {
  const y = 2.1 + i * 1.05;
  const bw = ((r[1] - 1700) / (2101 - 1700)) * 3.4 + 0.8;
  s.addText(r[0], { x: M, y: y + 0.05, w: 2.15, h: 0.55, valign: "middle", fontFace: F, fontSize: 15, bold: true, color: NAVY, margin: 0 });
  s.addShape("rect", { x: 2.75, y: y + 0.05, w: bw, h: 0.55, fill: { color: r[2] } });
  s.addText(`${r[1].toLocaleString()}万`, { x: 2.75 + 0.1, y: y + 0.05, w: bw - 0.15, h: 0.55, valign: "middle", align: "right", fontFace: F, fontSize: 16, bold: true, color: "FFFFFF", margin: 0 });
});
s.addText("1位はオルカン100%", { x: M, y: 6.45, w: CW, h: 0.55, align: "center", fontFace: F, fontSize: 22, bold: true, color: GREEN, margin: 0 });
foot(s, "年1回リバランス・15万回 ※当チャンネル試算（軸は1,700万〜）");

// =====================================================
// 28 結論4段階
// =====================================================
s = base();
head(s, "結論：あなたはどれ？", { fs: 30 });
const con = [
  ["迷う人", "オルカン100%", GREEN, false],
  ["基本形", "オルカン90：NAS10", NAVY, true],
  ["積極派の上限", "オルカン80：NAS20", NAVY, false],
  ["やらないこと", "これ以上の集中", RED, false],
];
con.forEach((r, i) => {
  const y = 1.7 + i * 1.28;
  s.addShape("rect", { x: M, y, w: CW, h: 1.08, fill: { color: r[3] ? "FFF7DC" : PANEL }, line: r[3] ? { color: "E0A800", width: 2.5 } : { color: LINE, width: 1 } });
  s.addText(r[0], { x: M + 0.25, y: y + 0.1, w: 2.4, h: 0.4, fontFace: F, fontSize: 14, bold: true, color: GRAY, margin: 0 });
  s.addText(r[1], { x: M + 0.25, y: y + 0.44, w: CW - 0.5, h: 0.56, fontFace: F, fontSize: 25, bold: true, color: r[2], margin: 0 });
});

// =====================================================
// 29 から揚げ増量
// =====================================================
s = base();
head(s, [{ text: "それは分散でなく", options: {} }, { text: "増量", options: { hl: true, color: RED } }], { fs: 30 });
// bento box
s.addShape("rect", { x: 0.9, y: 1.8, w: 5.7, h: 3.2, fill: { color: "FFFFFF" }, line: { color: NAVY, width: 3 } });
s.addText("幕の内弁当（オルカン）", { x: 0.9, y: 1.9, w: 5.7, h: 0.4, align: "center", fontFace: F, fontSize: 15, bold: true, color: GRAY, margin: 0 });
const okz = [["ごはん", "E8E4D8", NAVY], ["焼き魚", "D9C9A3", NAVY], ["卵焼き", "F5D67B", NAVY], ["から揚げ", "C87B3B", "FFFFFF"], ["漬物", "B7CE9E", NAVY], ["から揚げ", "C87B3B", "FFFFFF"]];
okz.forEach((o, i) => {
  const x = 1.15 + (i % 3) * 1.78, y = 2.45 + Math.floor(i / 3) * 1.15;
  s.addShape("rect", { x, y, w: 1.62, h: 1.0, fill: { color: o[1] } });
  s.addText(o[0], { x, y, w: 1.62, h: 1.0, align: "center", valign: "middle", fontFace: F, fontSize: 15, bold: true, color: o[2], margin: 0 });
});
s.addText([{ text: "NASDAQ100を足す ＝ ", options: { fontSize: 18, bold: true, color: NAVY } }, { text: "から揚げ増量", options: { fontSize: 24, bold: true, color: RED } }],
  { x: M, y: 5.35, w: CW, h: 0.6, align: "center", fontFace: F, margin: 0 });
s.addText("新しいおかずは、増えていない", { x: M, y: 6.05, w: CW, h: 0.5, align: "center", fontFace: F, fontSize: 18, bold: true, color: GRAY, margin: 0 });

// =====================================================
// 30 最後のメッセージ + CTA
// =====================================================
s = base();
s.addText("一番大事なのは", { x: M, y: 1.3, w: CW, h: 0.55, align: "center", fontFace: F, fontSize: 22, bold: true, color: GRAY, margin: 0 });
s.addText([{ text: "20年、やめないこと", options: { fontSize: 36, bold: true, color: NAVY, highlight: HL } }],
  { x: M, y: 2.0, w: CW, h: 0.9, align: "center", fontFace: F, margin: 0 });
s.addText("あなたの比率と、その理由は？", { x: M, y: 3.6, w: CW, h: 0.6, align: "center", fontFace: F, fontSize: 24, bold: true, color: NAVY, margin: 0 });
s.addShape("rect", { x: 1.5, y: 4.55, w: 4.5, h: 0.95, fill: { color: RED } });
s.addText("コメントで教えてください", { x: 1.5, y: 4.55, w: 4.5, h: 0.95, align: "center", valign: "middle", fontFace: F, fontSize: 21, bold: true, color: "FFFFFF", margin: 0 });
s.addText("高評価・チャンネル登録もお願いします", { x: M, y: 5.85, w: CW, h: 0.5, align: "center", fontFace: F, fontSize: 15, bold: true, color: GRAY, margin: 0 });

p.writeFile({ fileName: "/home/user/test-project/youtube/2026-07-28-slides-5fund.pptx" }).then(() => console.log("done", 30));
