const pptxgen = require("pptxgenjs");

const FOREST = "1B4332";
const GREEN  = "2D6A4F";
const MINT   = "95D5B2";
const GOLD   = "E9C46A";
const INK    = "1F2A24";
const MUTED  = "5F7168";
const TINT   = "EDF6F0";
const GREY   = "F2F5F3";
const WHITE  = "FFFFFF";
const PALE   = "9CC5AF";

const F = "Meiryo";

const sh = () => ({ type: "outer", color: "1B4332", blur: 8, offset: 2, angle: 90, opacity: 0.12 });

const pres = new pptxgen();
pres.layout = "LAYOUT_16x9"; // 10" x 5.625"
pres.author = "";
pres.title = "新NISA 制度の全体像と2027年改正";

// ---------- helpers ----------
function title(slide, txt, color) {
  slide.addText(txt, {
    x: 0.5, y: 0.32, w: 9.0, h: 0.72, fontSize: 32, bold: true,
    color: color || INK, fontFace: F, margin: 0, valign: "middle",
  });
}

function card(slide, x, y, w, h, fill) {
  slide.addShape(pres.ShapeType.roundRect, {
    x, y, w, h, fill: { color: fill || TINT }, rectRadius: 0.06, line: { color: fill || TINT }, shadow: sh(),
  });
}

function numCircle(slide, x, y, n, d) {
  const s = d || 0.52;
  slide.addShape(pres.ShapeType.ellipse, { x, y, w: s, h: s, fill: { color: GOLD }, line: { color: GOLD } });
  slide.addText(n, { x, y, w: s, h: s, fontSize: 15, bold: true, color: FOREST, fontFace: F, align: "center", valign: "middle", margin: 0 });
}

// =========================================================
// 1. Title
// =========================================================
let s = pres.addSlide();
s.background = { color: FOREST };
s.addShape(pres.ShapeType.ellipse, { x: 7.5, y: -1.15, w: 3.9, h: 3.9, fill: { color: GREEN }, line: { color: GREEN } });
s.addShape(pres.ShapeType.ellipse, { x: 8.85, y: 3.55, w: 1.5, h: 1.5, fill: { color: GREEN }, line: { color: GREEN } });
s.addShape(pres.ShapeType.ellipse, { x: 0.62, y: 1.32, w: 0.3, h: 0.3, fill: { color: GOLD }, line: { color: GOLD } });

s.addText("新NISA", { x: 0.6, y: 1.75, w: 7.2, h: 1.05, fontSize: 54, bold: true, color: WHITE, fontFace: F, margin: 0 });
s.addText("制度の全体像と、2027年1月からの改正点", { x: 0.62, y: 2.9, w: 7.4, h: 0.5, fontSize: 19, color: MINT, fontFace: F, margin: 0 });
s.addText("投資をこれから始める人・制度を整理したい人向けの解説資料", { x: 0.62, y: 3.45, w: 7.4, h: 0.4, fontSize: 13, color: PALE, fontFace: F, margin: 0 });
s.addText("2026年7月26日時点の制度にもとづく／出典は最終ページ", { x: 0.62, y: 4.72, w: 7.4, h: 0.35, fontSize: 11, color: PALE, fontFace: F, margin: 0 });
s.addNotes("新NISAの全体像と、2027年1月に施行される改正点をまとめた資料です。数値はすべて出典を確認したうえで記載しています。");

// =========================================================
// 2. 3行サマリー
// =========================================================
s = pres.addSlide();
title(s, "まず、3つだけ");

const sum = [
  ["01", "年360万円・生涯1,800万円まで非課税", "つみたて投資枠120万円と成長投資枠240万円を合わせて、年間360万円まで。生涯では1,800万円まで投資でき、その運用益に税金がかかりません。"],
  ["02", "期間の制限がなくなった", "非課税で持ち続けられる期間は無期限。口座を開ける期間も恒久化され、「いつまでに始めるか」を気にする必要がなくなりました。"],
  ["03", "2027年1月にさらに広がる", "0〜17歳向けのこどもNISAが新設され、売った枠の復活が当年中に早まり、つみたて投資枠の対象商品も増えます。"],
];
sum.forEach((c, i) => {
  const x = 0.5 + i * 3.1;
  card(s, x, 1.32, 2.8, 3.32);
  numCircle(s, x + 0.3, 1.62, c[0]);
  s.addText(c[1], { x: x + 0.3, y: 2.3, w: 2.2, h: 0.72, fontSize: 15, bold: true, color: FOREST, fontFace: F, margin: 0, valign: "top" });
  s.addText(c[2], { x: x + 0.3, y: 3.06, w: 2.2, h: 1.4, fontSize: 11.5, color: MUTED, fontFace: F, margin: 0, lineSpacingMultiple: 1.25, valign: "top" });
});
s.addText("※ 01・02は2024年1月から実施中の内容、03は2027年1月施行予定の改正内容です。", { x: 0.5, y: 4.82, w: 9.0, h: 0.35, fontSize: 10.5, color: MUTED, fontFace: F, margin: 0 });
s.addNotes("最初に結論を3つ。前半2つは既に動いている制度、3つ目がこれから変わる部分です。");

// =========================================================
// 3. 何が得なのか
// =========================================================
s = pres.addSlide();
title(s, "そもそも、何が得なのか");

card(s, 0.5, 1.3, 4.3, 1.5, GREY);
s.addText("課税口座（特定口座・一般口座）", { x: 0.8, y: 1.5, w: 3.7, h: 0.35, fontSize: 12, color: MUTED, fontFace: F, margin: 0 });
s.addText("20.315%", { x: 0.8, y: 1.85, w: 3.7, h: 0.75, fontSize: 40, bold: true, color: MUTED, fontFace: F, margin: 0 });

s.addText("↓", { x: 0.5, y: 2.82, w: 4.3, h: 0.4, fontSize: 20, bold: true, color: GOLD, fontFace: F, align: "center", margin: 0 });

card(s, 0.5, 3.22, 4.3, 1.5, FOREST);
s.addText("NISA口座", { x: 0.8, y: 3.42, w: 3.7, h: 0.35, fontSize: 12, color: MINT, fontFace: F, margin: 0 });
s.addText("0%", { x: 0.8, y: 3.77, w: 3.7, h: 0.75, fontSize: 40, bold: true, color: WHITE, fontFace: F, margin: 0 });

s.addText("利益が100万円出たとしたら", { x: 5.15, y: 1.35, w: 4.35, h: 0.45, fontSize: 17, bold: true, color: FOREST, fontFace: F, margin: 0 });
s.addText([
  { text: "課税口座なら、約20万3千円が税金として引かれ、手元に残るのは約79万7千円。", options: { breakLine: true } },
  { text: "NISA口座なら、100万円がそのまま残ります。", options: { breakLine: false } },
], { x: 5.15, y: 1.9, w: 4.35, h: 1.3, fontSize: 13.5, color: INK, fontFace: F, margin: 0, lineSpacingMultiple: 1.4, valign: "top" });

card(s, 5.15, 3.3, 4.35, 1.42, TINT);
s.addText([
  { text: "20.315% の内訳\n", options: { bold: true, color: FOREST, fontSize: 12, breakLine: true } },
  { text: "所得税15% + 復興特別所得税0.315% + 住民税5%", options: { color: MUTED, fontSize: 11.5, breakLine: false } },
], { x: 5.45, y: 3.5, w: 3.75, h: 1.0, fontFace: F, margin: 0, lineSpacingMultiple: 1.3, valign: "top" });

s.addText("※ 金額は税率20.315%で単純計算したもの。実際は手数料等により異なります。", { x: 0.5, y: 4.85, w: 9.0, h: 0.35, fontSize: 10.5, color: MUTED, fontFace: F, margin: 0 });
s.addNotes("NISAの本質は運用益が非課税になること。課税口座との差は税率20.315%分です。");

// =========================================================
// 4. 現行制度の全体像
// =========================================================
s = pres.addSlide();
title(s, "いまの制度（2024年1月〜）");

const frames = [
  { x: 0.5, name: "つみたて投資枠", rows: [["年間投資枠", "120万円"], ["対象商品", "金融庁の基準を満たす\n投資信託・ETF（約350本）"], ["買い方", "積立のみ"]] },
  { x: 5.15, name: "成長投資枠", rows: [["年間投資枠", "240万円"], ["対象商品", "上場株式・投資信託\nETF・REIT など"], ["買い方", "一括・積立どちらも"]] },
];
frames.forEach((f) => {
  card(s, f.x, 1.25, 4.35, 3.25);
  s.addText(f.name, { x: f.x + 0.3, y: 1.45, w: 3.75, h: 0.45, fontSize: 19, bold: true, color: FOREST, fontFace: F, margin: 0 });
  f.rows.forEach((r, i) => {
    const y = 2.05 + i * 0.78;
    s.addText(r[0], { x: f.x + 0.3, y: y, w: 1.25, h: 0.62, fontSize: 11, color: MUTED, fontFace: F, margin: 0, valign: "top" });
    s.addText(r[1], { x: f.x + 1.6, y: y, w: 2.45, h: 0.68, fontSize: 12.5, bold: true, color: INK, fontFace: F, margin: 0, lineSpacingMultiple: 1.2, valign: "top" });
  });
});

s.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 4.62, w: 9.0, h: 0.55, fill: { color: FOREST }, line: { color: FOREST }, rectRadius: 0.05 });
s.addText("2つの枠は併用できます。合わせて年間360万円まで。対象は口座を開く年の1月1日時点で18歳以上の国内居住者です。",
  { x: 0.7, y: 4.62, w: 8.6, h: 0.55, fontSize: 12, bold: true, color: WHITE, fontFace: F, margin: 0, valign: "middle" });
s.addNotes("つみたて投資枠と成長投資枠は併用可能。旧制度と違い、どちらか一方を選ぶ必要はありません。");

// =========================================================
// 5. 1,800万円の考え方
// =========================================================
s = pres.addSlide();
title(s, "生涯で1,800万円まで");

s.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 1.35, w: 9.0, h: 0.85, fill: { color: MINT }, line: { color: MINT }, rectRadius: 0.04 });
s.addText("非課税保有限度額　1,800万円", { x: 0.7, y: 1.35, w: 8.6, h: 0.85, fontSize: 16, bold: true, color: FOREST, fontFace: F, margin: 0, valign: "middle" });

s.addShape(pres.ShapeType.roundRect, { x: 0.5, y: 2.32, w: 6.0, h: 0.62, fill: { color: GOLD }, line: { color: GOLD }, rectRadius: 0.04 });
s.addText("うち成長投資枠は 1,200万円まで", { x: 0.7, y: 2.32, w: 5.6, h: 0.62, fontSize: 13, bold: true, color: FOREST, fontFace: F, margin: 0, valign: "middle" });
s.addText("つみたて投資枠だけなら\n1,800万円すべて使えます", { x: 6.7, y: 2.28, w: 2.8, h: 0.7, fontSize: 11, color: MUTED, fontFace: F, margin: 0, lineSpacingMultiple: 1.2, valign: "middle" });

const pts = [
  ["枠は「買ったときの値段」で数えます", "取得価額（簿価）で管理するため、値上がりしても使った枠が増えることはありません。"],
  ["売れば、その分の枠は戻ります", "売却した商品の簿価分だけ枠が復活します。復活は現在は翌年ですが、2027年から当年中に早まります。"],
];
pts.forEach((p, i) => {
  const y = 3.35 + i * 0.82;
  s.addShape(pres.ShapeType.ellipse, { x: 0.5, y: y + 0.06, w: 0.22, h: 0.22, fill: { color: FOREST }, line: { color: FOREST } });
  s.addText(p[0], { x: 0.92, y: y, w: 8.5, h: 0.34, fontSize: 14, bold: true, color: FOREST, fontFace: F, margin: 0 });
  s.addText(p[1], { x: 0.92, y: y + 0.34, w: 8.5, h: 0.42, fontSize: 11.5, color: MUTED, fontFace: F, margin: 0 });
});
s.addNotes("1,800万円は簿価ベースの総枠。成長投資枠は内数で1,200万円が上限です。");

// =========================================================
// 6. 旧NISAとの違い
// =========================================================
s = pres.addSlide();
title(s, "旧NISAとの違い");

const th = { fill: FOREST, color: WHITE, bold: true, fontSize: 12 };
const rows = [
  [{ text: "項目", options: th }, { text: "〜2023年（旧NISA）", options: th }, { text: "2024年〜（新NISA）", options: th }],
  ["年間投資枠", "一般120万円 または つみたて40万円", "合計360万円（120万円＋240万円）"],
  ["非課税保有期間", "一般5年／つみたて20年", "無期限"],
  ["非課税保有限度額", "実質600万円／800万円", "1,800万円（成長投資枠は1,200万円まで）"],
  ["2つの枠の併用", "できない", "できる"],
  ["口座開設期間", "期限あり（2023年で終了）", "恒久化"],
];
s.addTable(rows, {
  x: 0.5, y: 1.25, w: 9.0, colW: [2.1, 3.3, 3.6],
  rowH: 0.44, fontSize: 11.5, fontFace: F, color: INK, valign: "middle",
  border: { type: "solid", color: "DDE6E0", pt: 1 },
  fill: { color: WHITE }, margin: 0.09,
});
s.addText("旧NISAで買った分は新NISAの枠とは別扱いです。それぞれの非課税期間が終わるまで、そのまま非課税で持ち続けられます。",
  { x: 0.5, y: 4.35, w: 9.0, h: 0.6, fontSize: 12, color: INK, fontFace: F, margin: 0, valign: "top" });
s.addNotes("旧制度からの主な変更点は、枠の拡大・期間の無期限化・併用可・恒久化の4点です。");

// =========================================================
// 7. 2027年の改正
// =========================================================
s = pres.addSlide();
title(s, "2027年1月から、3つ変わります");
s.addText("令和8年度税制改正で決定した内容です（2025年12月の税制改正大綱を経て、改正法が成立）。",
  { x: 0.5, y: 1.02, w: 9.0, h: 0.34, fontSize: 11.5, color: MUTED, fontFace: F, margin: 0 });

const reforms = [
  ["01", "こどもNISAの新設", "つみたて投資枠の対象年齢が広がり、0〜17歳も利用できるようになります。年間60万円、非課税保有限度額600万円。"],
  ["02", "売った枠の復活が「当年中」に", "これまで枠の復活は翌年でしたが、売却した年のうちに使えるようになります。商品の入れ替えがしやすくなります。"],
  ["03", "つみたて投資枠の対象商品の拡充", "債券だけで運用するファンドや、地域別の株価指数に連動するファンドなどを加える方向で検討されています。"],
];
reforms.forEach((r, i) => {
  const y = 1.55 + i * 1.16;
  card(s, 0.5, y, 9.0, 1.02);
  numCircle(s, 0.78, y + 0.25, r[0]);
  s.addText(r[1], { x: 1.55, y: y + 0.14, w: 7.7, h: 0.36, fontSize: 15, bold: true, color: FOREST, fontFace: F, margin: 0 });
  s.addText(r[2], { x: 1.55, y: y + 0.5, w: 7.7, h: 0.42, fontSize: 11.5, color: MUTED, fontFace: F, margin: 0 });
});
s.addText("※ 03の対象商品の具体的な中身は、今後の政省令等で決まる部分があります。", { x: 0.5, y: 5.05, w: 9.0, h: 0.32, fontSize: 10.5, color: MUTED, fontFace: F, margin: 0 });
s.addNotes("2027年1月施行予定。特に2つ目の当年中復活は、使い勝手が大きく変わる改正です。");

// =========================================================
// 8. こどもNISA
// =========================================================
s = pres.addSlide();
title(s, "こどもNISA（2027年1月〜）");

card(s, 0.5, 1.25, 4.35, 3.55);
const specs = [["対象年齢", "0〜17歳"], ["年間投資枠", "60万円"], ["非課税保有限度額", "600万円"], ["買い方", "つみたて投資枠の対象商品を積立で"]];
specs.forEach((sp, i) => {
  const y = 1.5 + i * 0.8;
  s.addText(sp[0], { x: 0.8, y: y, w: 3.75, h: 0.3, fontSize: 11, color: MUTED, fontFace: F, margin: 0 });
  s.addText(sp[1], { x: 0.8, y: y + 0.28, w: 3.75, h: 0.42, fontSize: 15, bold: true, color: FOREST, fontFace: F, margin: 0 });
});

card(s, 5.15, 1.25, 4.35, 3.55, FOREST);
s.addText("引き出しには制限があります", { x: 5.45, y: 1.48, w: 3.75, h: 0.38, fontSize: 15, bold: true, color: GOLD, fontFace: F, margin: 0 });
s.addText([
  { text: "0〜11歳", options: { bold: true, color: WHITE, fontSize: 12, breakLine: true } },
  { text: "災害等で税務署長の確認を受けた場合のみ。\n", options: { color: MINT, fontSize: 11, breakLine: true } },
  { text: "12歳以降", options: { bold: true, color: WHITE, fontSize: 12, breakLine: true } },
  { text: "使い道が子どものためであること、子の同意書面、親権者等からの申出書の提出といった要件を満たせば引き出せます。\n", options: { color: MINT, fontSize: 11, breakLine: true } },
  { text: "18歳になったら", options: { bold: true, color: WHITE, fontSize: 12, breakLine: true } },
  { text: "成人NISAのつみたて投資枠へ自動的に移り、自由に引き出せるようになります。", options: { color: MINT, fontSize: 11, breakLine: false } },
], { x: 5.45, y: 1.95, w: 3.75, h: 2.7, fontFace: F, margin: 0, lineSpacingMultiple: 1.22, valign: "top" });

s.addText("ジュニアNISAと違い、非課税で持てる期間に制限はありません。0歳から始めれば18年間の長期運用ができます。",
  { x: 0.5, y: 4.92, w: 9.0, h: 0.35, fontSize: 11.5, color: INK, fontFace: F, margin: 0 });
s.addNotes("こどもNISAは払出し制限が肝。教育資金など子どものための支出には12歳以降に対応できます。");

// =========================================================
// 9. 注意点
// =========================================================
s = pres.addSlide();
title(s, "注意しておきたいこと");

const cautions = [
  ["損失は税務上いっさい救済されない", "NISA口座の損失は、特定口座や一般口座の利益との損益通算も、翌年以降への繰越控除もできません。"],
  ["元本は保証されない", "非課税なのは「利益が出たとき」の話です。値下がりすれば元本を割り込むこともあります。"],
  ["復活する枠は簿価の分だけ", "値上がりして売っても、戻ってくるのは買ったときの値段の分。増えた分の枠は戻りません。"],
  ["成長投資枠には対象外の商品がある", "整理・監理銘柄、信託期間20年未満、毎月分配型、デリバティブを用いた一定の投資信託などは除かれています。"],
];
cautions.forEach((c, i) => {
  const x = 0.5 + (i % 2) * 4.65;
  const y = 1.3 + Math.floor(i / 2) * 1.82;
  card(s, x, y, 4.35, 1.68);
  s.addText(c[0], { x: x + 0.3, y: y + 0.2, w: 3.75, h: 0.5, fontSize: 13.5, bold: true, color: FOREST, fontFace: F, margin: 0, valign: "top" });
  s.addText(c[1], { x: x + 0.3, y: y + 0.72, w: 3.75, h: 0.82, fontSize: 11, color: MUTED, fontFace: F, margin: 0, lineSpacingMultiple: 1.25, valign: "top" });
});
s.addNotes("特に損益通算・繰越控除ができない点は、課税口座との明確な違いです。");

// =========================================================
// 10. まとめ
// =========================================================
s = pres.addSlide();
s.background = { color: FOREST };
s.addShape(pres.ShapeType.ellipse, { x: 8.2, y: -0.9, w: 2.9, h: 2.9, fill: { color: GREEN }, line: { color: GREEN } });
title(s, "まとめ", WHITE);

const wrap = [
  "年間360万円・生涯1,800万円まで、運用益に税金がかからない",
  "非課税期間は無期限、口座開設期間も恒久化された",
  "つみたて投資枠と成長投資枠は併用でき、枠は売却すれば戻る",
  "2027年1月からこどもNISAが加わり、枠の復活も当年中に早まる",
];
wrap.forEach((w, i) => {
  const y = 1.42 + i * 0.72;
  s.addShape(pres.ShapeType.ellipse, { x: 0.55, y: y + 0.1, w: 0.2, h: 0.2, fill: { color: GOLD }, line: { color: GOLD } });
  s.addText(w, { x: 1.0, y: y, w: 8.4, h: 0.45, fontSize: 15, color: WHITE, fontFace: F, margin: 0, valign: "middle" });
});
s.addText("制度はあくまで「箱」です。中に何を入れるか、いくらなら続けられるかは別の話。",
  { x: 0.55, y: 4.5, w: 8.9, h: 0.4, fontSize: 12, italic: true, color: GOLD, fontFace: F, margin: 0 });
s.addNotes("制度の枠組みと、実際に何をいくら買うかは別問題である点を最後に補足します。");

// =========================================================
// 11. 出典
// =========================================================
s = pres.addSlide();
title(s, "出典");

const srcs = [
  "金融庁「つみたて投資枠対象商品」　fsa.go.jp/policy/nisa2/products/",
  "金融庁「令和8年度税制改正について」（2025年12月）　fsa.go.jp/news/r7/sonota/20251226-2/01.pdf",
  "国税庁 タックスアンサー No.1535「NISA制度」　nta.go.jp/taxes/shiraberu/taxanswer/shotoku/1535.htm",
  "大和総研「2027年1月開始『こどもNISA』の概要」（2026年5月26日）",
  "日本経済新聞「NISAつみたて枠、18歳未満は600万円上限 12歳で引き出し可能」",
  "楽天証券・松井証券・SBI証券・野村證券 各NISA解説ページ（2026年7月26日閲覧）",
];
srcs.forEach((t, i) => {
  const y = 1.3 + i * 0.44;
  s.addShape(pres.ShapeType.ellipse, { x: 0.55, y: y + 0.11, w: 0.14, h: 0.14, fill: { color: GOLD }, line: { color: GOLD } });
  s.addText(t, { x: 0.92, y: y, w: 8.5, h: 0.38, fontSize: 11.5, color: INK, fontFace: F, margin: 0, valign: "middle" });
});

card(s, 0.5, 4.15, 9.0, 1.0, TINT);
s.addText([
  { text: "確認方法について　", options: { bold: true, color: FOREST, fontSize: 11, breakLine: false } },
  { text: "本資料の作成環境からは金融庁等の一次資料に直接アクセスできなかったため、一次資料の内容を引用した検索結果と、複数の金融機関・シンクタンクの解説を突き合わせて数値を確認しています。重要な判断に使う場合は、金融庁および国税庁の原典をご確認ください。", options: { color: MUTED, fontSize: 11, breakLine: false } },
], { x: 0.8, y: 4.3, w: 8.4, h: 0.75, fontFace: F, margin: 0, lineSpacingMultiple: 1.25, valign: "top" });
s.addNotes("数値の確認方法と、原典参照のお願い。");

pres.writeFile({ fileName: process.argv[2] || "shin-nisa-2026.pptx" }).then((f) => console.log("wrote", f));
