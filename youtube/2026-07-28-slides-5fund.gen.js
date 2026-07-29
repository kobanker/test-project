// 5ファンド比較・演者横スライド v3 —— 台本(最終版)準拠・テレビフリップ風
const pptxgen = require("pptxgenjs");
const p = new pptxgen();
p.defineLayout({ name: "SQ", width: 7.5, height: 7.5 });
p.layout = "SQ";

const BG="FFFFFF", NAVY="17325A", RED="D7263D", GREEN="0E7A46", HL="FFE45C",
      GRAY="6B7280", PANEL="F1F5FB", LINE="C9D4E4";
const FUND = {
  orukan:{c:"2563EB",n:"オルカン"}, sp:{c:"E67E22",n:"S&P500"},
  nas:{c:"7C3AED",n:"NASDAQ100"},   fang:{c:"DC2626",n:"FANG+"},
  jp:{c:"059669",n:"日本株"},
};
const F="BIZ UDPGothic", W=7.5, M=0.5, CW=W-2*M;

let NO=0;
// cue: 表示タイミング（台本のどのセリフで出すか）
function base(cue, chapter){
  NO++;
  const s=p.addSlide(); s.background={color:BG};
  s.addNotes(`【スライド${NO}】\n表示タイミング：${cue}\n章：${chapter||"-"}`);
  // 右下に小さくスライド番号（収録時の頭出し用・目立たせない）
  s.addText(String(NO), {x:6.85,y:7.06,w:0.4,h:0.3,align:"right",fontFace:F,fontSize:9,color:"D5DCE6",margin:0});
  return s;
}
function head(s,text,o={}){
  const a=Array.isArray(text)?text:[{text,options:{}}];
  s.addText(a.map(r=>({text:r.text,options:{fontSize:o.fs||30,bold:true,color:r.options.color||NAVY,highlight:r.options.hl?HL:undefined}})),
   {x:o.x!==undefined?o.x:M,y:o.y!==undefined?o.y:0.42,w:o.w!==undefined?o.w:CW,h:o.h||1.0,
    fontFace:F,margin:0,lineSpacingMultiple:1.12,align:o.align||"left",valign:o.valign||"top"});
}
function foot(s,t){ s.addText(t,{x:M,y:7.06,w:CW-0.5,h:0.3,fontFace:F,fontSize:10,color:GRAY,margin:0}); }
function chip(s,x,y,f,w=1.7,h=0.48,fs=15){
  s.addShape("rect",{x,y,w,h,fill:{color:f.c}});
  s.addText(f.n,{x,y,w,h,align:"center",valign:"middle",fontFace:F,fontSize:fs,bold:true,color:"FFFFFF",margin:0});
}
function srcStrip(s,t,y=6.6){
  s.addShape("rect",{x:M,y,w:CW,h:0.42,fill:{color:PANEL}});
  s.addText([{text:"出典 ",options:{bold:true,color:NAVY,fontSize:11}},{text:t,options:{color:GRAY,fontSize:11}}],
   {x:M+0.15,y,w:CW-0.3,h:0.42,valign:"middle",fontFace:F,margin:0});
}
function bigMoney(s,cap,from,to,color,note){
  s.addText(cap,{x:M,y:1.95,w:CW,h:0.5,align:"center",fontFace:F,fontSize:19,bold:true,color:GRAY,margin:0});
  s.addText(from,{x:M,y:2.6,w:CW,h:0.8,align:"center",fontFace:F,fontSize:40,bold:true,color:NAVY,margin:0});
  s.addShape("triangle",{x:3.45,y:3.62,w:0.6,h:0.5,fill:{color:GRAY},rotate:180});
  s.addText(to,{x:M,y:4.25,w:CW,h:1.3,align:"center",fontFace:F,fontSize:64,bold:true,color,margin:0});
  if(note) s.addText(note,{x:M,y:5.72,w:CW,h:0.5,align:"center",fontFace:F,fontSize:16,bold:true,color:RED,margin:0});
}
function mb(s,x,y,ok,d=0.62){
  s.addShape("ellipse",{x,y,w:d,h:d,fill:{color:ok?GREEN:RED}});
  s.addText(ok?"○":"×",{x,y,w:d,h:d,align:"center",valign:"middle",fontFace:F,fontSize:d*40,bold:true,color:"FFFFFF",margin:0});
}
// 銘柄ランキング（上位5＋残り集約）
function rankList(s,rows,accent,y0=1.85,gap=0.86,fs=22){
  rows.forEach((r,i)=>{
    const y=y0+i*gap;
    s.addShape("ellipse",{x:M,y:y+0.06,w:0.6,h:0.6,fill:{color:accent}});
    s.addText(String(i+1),{x:M,y:y+0.06,w:0.6,h:0.6,align:"center",valign:"middle",fontFace:F,fontSize:21,bold:true,color:"FFFFFF",margin:0});
    s.addText(r[0],{x:M+0.85,y,w:3.7,h:0.72,valign:"middle",fontFace:F,fontSize:fs,bold:true,color:NAVY,margin:0});
    s.addText(r[1],{x:4.9,y,w:2.1,h:0.72,valign:"middle",align:"right",fontFace:F,fontSize:fs-2,bold:true,color:GRAY,margin:0});
  });
}
let s;

/* ===== オープニング ===== */
s = base("オープニング「今回は、オルカン、S&P500…結局どれを買えばいいのか」","オープニング");
s.addText("結局、",{x:M,y:0.9,w:CW,h:0.6,align:"center",fontFace:F,fontSize:38,bold:true,color:NAVY,margin:0});
s.addText("どれ",{x:M,y:1.55,w:CW,h:1.15,align:"center",fontFace:F,fontSize:76,bold:true,color:RED,margin:0});
s.addText("を買えばいい？",{x:M,y:2.65,w:CW,h:0.7,align:"center",fontFace:F,fontSize:40,bold:true,color:NAVY,margin:0});
[FUND.orukan,FUND.sp,FUND.nas,FUND.fang,FUND.jp].forEach((f,i)=>{
  const y=3.6+i*0.63;
  s.addShape("rect",{x:1.55,y,w:4.4,h:0.54,fill:{color:f.c}});
  s.addText(f.n,{x:1.55,y,w:4.4,h:0.54,align:"center",valign:"middle",fontFace:F,fontSize:19,bold:true,color:"FFFFFF",margin:0});
});
s.addText("銀行の窓口では言いにくい本音で",{x:M,y:6.8,w:CW,h:0.45,align:"center",fontFace:F,fontSize:17,bold:true,color:GRAY,margin:0});

s = base("「この選択を間違えただけで、将来の資産が460万円少なくなったり…」","オープニング");
head(s,"間違えると、どうなるか",{fs:30});
["将来の資産が 460万円 少なくなる","同じ会社を 重ね買いしてしまう","暴落で 一番安いところで売る"].forEach((t,i)=>{
  const y=1.85+i*1.6;
  mb(s,M+0.1,y+0.28,false,0.82);
  s.addText(t,{x:M+1.25,y,w:CW-1.35,h:1.35,valign:"middle",fontFace:F,fontSize:23,bold:true,color:NAVY,margin:0,lineSpacingMultiple:1.15});
  if(i<2) s.addShape("line",{x:M,y:y+1.47,w:CW,h:0,line:{color:LINE,width:1}});
});
foot(s,"※当チャンネル試算");

s = base("「この動画を見ると、今注目されてる5本の中身とルールが分かります」","オープニング");
head(s,"この動画を見ると",{fs:32});
["5本の中身とルールが分かる","15万回の計算結果が見られる","自分の比率を自分で決められる"].forEach((t,i)=>{
  const y=1.8+i*1.35;
  mb(s,M+0.1,y+0.22,true,0.82);
  s.addText(t,{x:M+1.25,y,w:CW-1.35,h:1.18,valign:"middle",fontFace:F,fontSize:23,bold:true,color:NAVY,margin:0});
});
s.addText([{text:"商品選びの迷いが終わる",options:{fontSize:27,bold:true,color:NAVY,highlight:HL}}],
 {x:M,y:6.15,w:CW,h:0.7,align:"center",fontFace:F,margin:0});

/* ===== 受付 ===== */
s = base("マネコ「もう全部、20%ずつ買えばいいですかね？」","受付");
head(s,"全部 20%ずつ 買えばいい？",{fs:28});
[FUND.orukan,FUND.sp,FUND.nas,FUND.fang,FUND.jp].forEach((f,i)=>{
  const y=1.9+i*0.98;
  chip(s,M,y,f,2.3,0.7,17);
  s.addText("20%",{x:3.1,y,w:1.5,h:0.7,valign:"middle",fontFace:F,fontSize:26,bold:true,color:NAVY,margin:0});
});
s.addText("？",{x:5.1,y:3.4,w:1.6,h:1.6,align:"center",valign:"middle",fontFace:F,fontSize:88,bold:true,color:"E3E9F2",margin:0});

/* ===== 正直タイム ===== */
s = base("正直タイム「一番増えたファンドと、今後一番増えるファンドは違う」","正直タイム");
head(s,"ここが分かれ道",{fs:30});
s.addShape("rect",{x:M,y:1.7,w:CW,h:1.45,fill:{color:PANEL}});
s.addText("一番増えた ファンド",{x:M+0.25,y:1.7,w:CW-0.5,h:1.45,valign:"middle",fontFace:F,fontSize:26,bold:true,color:GRAY,margin:0});
s.addText("≠",{x:M,y:3.25,w:CW,h:0.7,align:"center",fontFace:F,fontSize:44,bold:true,color:RED,margin:0});
s.addShape("rect",{x:M,y:4.05,w:CW,h:1.45,fill:{color:"FFF7DC"},line:{color:"E0A800",width:2.5}});
s.addText("今後 一番増える ファンド",{x:M+0.25,y:4.05,w:CW-0.5,h:1.45,valign:"middle",fontFace:F,fontSize:26,bold:true,color:NAVY,margin:0});
s.addText([{text:"増える可能性が高いほど、",options:{fontSize:19,bold:true,color:NAVY}},{text:"減る可能性も高い",options:{fontSize:19,bold:true,color:RED,highlight:HL}}],
 {x:M,y:5.85,w:CW,h:0.6,align:"center",fontFace:F,margin:0});

/* ===== 第1章 ===== */
s = base("第1章「5本をそれぞれ一言で表すと」","第1章");
head(s,"選ぶ「思想」が違う",{fs:30});
[[FUND.orukan,"世界を丸ごと"],[FUND.sp,"米国の選抜500社"],[FUND.nas,"成長テック100社"],
 [FUND.fang,"巨大テック10社に集中"],[FUND.jp,"日本を幅広く"]].forEach((r,i)=>{
  const y=1.75+i*1.05;
  chip(s,M,y,r[0],2.0,0.64,16);
  s.addText(r[1],{x:2.75,y,w:4.25,h:0.64,valign:"middle",fontFace:F,fontSize:21,bold:true,color:NAVY,margin:0});
});

/* ===== 第2章 オルカン ===== */
s = base("第2章「ただし、世界に均等投資ではありません。米国が約64%」","第2章 オルカン");
chip(s,M,0.45,FUND.orukan,1.9,0.55,17);
head(s,"中身は？",{fs:30,x:2.55,w:4.45,valign:"middle",h:0.62});
s.addShape("pie",{x:0.85,y:1.85,w:3.6,h:3.6,fill:{color:FUND.orukan.c},angleRange:[270,270+230]});
s.addShape("pie",{x:0.85,y:1.85,w:3.6,h:3.6,fill:{color:"D8E2F2"},angleRange:[270+230,270+360]});
s.addText([{text:"米国\n",options:{fontSize:20,bold:true,color:"FFFFFF"}},{text:"64%",options:{fontSize:30,bold:true,color:"FFFFFF"}}],
 {x:0.95,y:2.9,w:2.6,h:1.25,align:"center",fontFace:F,margin:0});
s.addText("47か国\n約2,461銘柄",{x:4.6,y:2.55,w:2.5,h:1.3,fontFace:F,fontSize:18,bold:true,color:NAVY,margin:0,lineSpacingMultiple:1.25});
s.addText("情報技術だけで 約32%",{x:4.6,y:3.95,w:2.5,h:0.8,fontFace:F,fontSize:15,bold:true,color:GRAY,margin:0,lineSpacingMultiple:1.2});
s.addText([{text:"実は6割アメリカ",options:{fontSize:27,bold:true,color:NAVY,highlight:HL}}],
 {x:M,y:5.75,w:CW,h:0.6,align:"center",fontFace:F,margin:0});
srcStrip(s,"MSCI「ACWI Index Factsheet」2026年6月末");

s = base("「もし10年前に100万円投資していたら――約333万円です」","第2章 オルカン");
chip(s,M,0.45,FUND.orukan,1.9,0.55,17);
head(s,"10年前に100万円なら",{fs:24,x:2.55,w:4.45,valign:"middle",h:0.62});
bigMoney(s,"年率 約12.8%（配当込み・ドル）","100万円","333万円",FUND.orukan.c,"");
foot(s,"公表年率からの単純換算。前提は指数ごとに異なる");

s = base("「上位10銘柄はこれで、あわせると約23%です」","第2章 オルカン");
chip(s,M,0.45,FUND.orukan,1.9,0.55,17);
head(s,"上位の顔ぶれ",{fs:26,x:2.55,w:4.45,valign:"middle",h:0.62});
rankList(s,[["NVIDIA","4.55%"],["Apple","4.19%"],["Microsoft","2.59%"],["Amazon","2.27%"],["Alphabet","2.05%"]],FUND.orukan.c);
s.addText([{text:"上位10社で ",options:{fontSize:20,bold:true,color:NAVY}},{text:"約23%",options:{fontSize:28,bold:true,color:RED}}],
 {x:M,y:6.25,w:CW,h:0.6,align:"center",fontFace:F,margin:0});
foot(s,"2026年6月末時点");

s = base("「最大の強みは、どの国が勝つかを自分で当てなくていいこと」","第2章 オルカン");
chip(s,M,0.45,FUND.orukan,1.9,0.55,17);
head(s,"強みと弱み",{fs:26,x:2.55,w:4.45,valign:"middle",h:0.62});
s.addShape("rect",{x:M,y:1.55,w:CW,h:2.15,fill:{color:"E7F5EE"}});
mb(s,M+0.3,2.15,true,0.7);
s.addText("勝つ国を、\n自分で当てなくていい",{x:M+1.25,y:1.55,w:CW-1.5,h:2.15,valign:"middle",fontFace:F,fontSize:22,bold:true,color:NAVY,margin:0,lineSpacingMultiple:1.3});
s.addShape("rect",{x:M,y:3.95,w:CW,h:2.15,fill:{color:"FBE9EC"}});
mb(s,M+0.3,4.55,false,0.7);
s.addText("爆発力が出にくい\n（1位は狙わない）",{x:M+1.25,y:3.95,w:CW-1.5,h:2.15,valign:"middle",fontFace:F,fontSize:22,bold:true,color:NAVY,margin:0,lineSpacingMultiple:1.3});
s.addText("最下位にならないための商品",{x:M,y:6.35,w:CW,h:0.5,align:"center",fontFace:F,fontSize:18,bold:true,color:GRAY,margin:0});

s = base("「10年前は5割前後だった米国比率が、いまは64%」","第2章 オルカン");
head(s,"米国比率は上がり続けている",{fs:26});
s.addText("10年前",{x:0.9,y:2.3,w:2.2,h:0.5,align:"center",fontFace:F,fontSize:19,bold:true,color:GRAY,margin:0});
s.addShape("rect",{x:1.35,y:4.6-2.0,w:1.3,h:2.0,fill:{color:"C4D3EA"}});
s.addText("約50%",{x:0.9,y:4.7,w:2.2,h:0.6,align:"center",fontFace:F,fontSize:24,bold:true,color:GRAY,margin:0});
s.addText("いま",{x:4.4,y:2.3,w:2.2,h:0.5,align:"center",fontFace:F,fontSize:19,bold:true,color:NAVY,margin:0});
s.addShape("rect",{x:4.85,y:4.6-2.55,w:1.3,h:2.55,fill:{color:FUND.orukan.c}});
s.addText("64%",{x:4.4,y:4.7,w:2.2,h:0.6,align:"center",fontFace:F,fontSize:30,bold:true,color:FUND.orukan.c,margin:0});
s.addShape("line",{x:3.15,y:3.6,w:1.55,h:0,line:{color:RED,width:3,endArrowType:"triangle"}});
s.addText("「世界分散だから安心」ではない",{x:M,y:5.6,w:CW,h:0.6,align:"center",fontFace:F,fontSize:20,bold:true,color:RED,margin:0});
foot(s,"MSCI ACWI 米国比率の推移（概数）");

/* ===== 第3章 S&P500 ===== */
s = base("第3章「ただの機械選びではありません（採用の4条件）」","第3章 S&P500");
chip(s,M,0.45,FUND.sp,1.9,0.55,17);
head(s,"入るのに審査がある",{fs:26,x:2.55,w:4.45,valign:"middle",h:0.62});
["米国企業であること","時価総額 約200億ドル以上","浮動株が一定以上","黒字であること"].forEach((t,i)=>{
  const y=1.75+i*1.08;
  s.addShape("ellipse",{x:M,y:y+0.06,w:0.72,h:0.72,fill:{color:FUND.sp.c}});
  s.addText(String(i+1),{x:M,y:y+0.06,w:0.72,h:0.72,align:"center",valign:"middle",fontFace:F,fontSize:26,bold:true,color:"FFFFFF",margin:0});
  s.addText(t,{x:M+1.0,y,w:CW-1.1,h:0.85,valign:"middle",fontFace:F,fontSize:22,bold:true,color:i===3?RED:NAVY,margin:0});
});
s.addText([{text:"赤字では入れない",options:{fontSize:24,bold:true,color:NAVY,highlight:HL}}],
 {x:M,y:6.15,w:CW,h:0.6,align:"center",fontFace:F,margin:0});
srcStrip(s,"S&P ダウ・ジョーンズ・インデックス 指数メソドロジー",6.85);

s = base("「過去10年の年率リターンは約13.6%。100万円は約358万円です」","第3章 S&P500");
chip(s,M,0.45,FUND.sp,1.9,0.55,17);
head(s,"10年前に100万円なら",{fs:24,x:2.55,w:4.45,valign:"middle",h:0.62});
bigMoney(s,"年率 約13.6%","100万円","358万円",FUND.sp.c,"");

s = base("マネコ「さっきのオルカンと、ほぼ同じ顔ぶれじゃないですか」","第3章 S&P500");
head(s,[{text:"上位は",options:{}},{text:"同じ顔ぶれ",options:{hl:true}}],{fs:30});
chip(s,0.8,1.6,FUND.orukan,2.5,0.58,16);
chip(s,4.2,1.6,FUND.sp,2.5,0.58,16);
["NVIDIA","Apple","Microsoft","Amazon","Alphabet"].forEach((c,i)=>{
  const y=2.4+i*0.8;
  s.addShape("rect",{x:0.8,y,w:2.5,h:0.64,fill:{color:PANEL}});
  s.addText(c,{x:0.8,y,w:2.5,h:0.64,align:"center",valign:"middle",fontFace:F,fontSize:17,bold:true,color:NAVY,margin:0});
  s.addShape("rect",{x:4.2,y,w:2.5,h:0.64,fill:{color:PANEL}});
  s.addText(c,{x:4.2,y,w:2.5,h:0.64,align:"center",valign:"middle",fontFace:F,fontSize:17,bold:true,color:NAVY,margin:0});
  s.addText("＝",{x:3.3,y,w:0.9,h:0.64,align:"center",valign:"middle",fontFace:F,fontSize:22,bold:true,color:RED,margin:0});
});
s.addText("オルカンの6割が米国だから",{x:M,y:6.5,w:CW,h:0.5,align:"center",fontFace:F,fontSize:19,bold:true,color:NAVY,margin:0});

s = base("「上位10銘柄で約36%。情報技術は約38%」","第3章 S&P500");
chip(s,M,0.45,FUND.sp,1.9,0.55,17);
head(s,"500社でも、実態は…",{fs:24,x:2.55,w:4.45,valign:"middle",h:0.62});
s.addText("上位10銘柄が占める割合",{x:M,y:1.6,w:CW,h:0.5,align:"center",fontFace:F,fontSize:18,bold:true,color:GRAY,margin:0});
s.addShape("pie",{x:1.55,y:2.25,w:3.4,h:3.4,fill:{color:FUND.sp.c},angleRange:[270,270+130]});
s.addShape("pie",{x:1.55,y:2.25,w:3.4,h:3.4,fill:{color:"F5E3D0"},angleRange:[270+130,270+360]});
s.addText("36%",{x:5.05,y:2.9,w:1.9,h:0.8,fontFace:F,fontSize:36,bold:true,color:FUND.sp.c,margin:0});
s.addText("残り490社\nで 64%",{x:5.05,y:3.85,w:1.9,h:0.9,fontFace:F,fontSize:15,bold:true,color:GRAY,margin:0,lineSpacingMultiple:1.2});
s.addText("巨大テック数社の影響が強い500社指数",{x:M,y:6.0,w:CW,h:0.6,align:"center",fontFace:F,fontSize:18,bold:true,color:NAVY,margin:0});

/* ===== 第4章 NASDAQ100 ===== */
s = base("第4章「金融会社を除いた大型企業100社。テクノロジーが約69%」","第4章 NASDAQ100");
chip(s,M,0.45,FUND.nas,1.9,0.55,17);
head(s,"金融ぬきの成長特化",{fs:26,x:2.55,w:4.45,valign:"middle",h:0.62});
s.addShape("pie",{x:0.85,y:1.8,w:3.6,h:3.6,fill:{color:FUND.nas.c},angleRange:[270,270+248]});
s.addShape("pie",{x:0.85,y:1.8,w:3.6,h:3.6,fill:{color:"E4DBF7"},angleRange:[270+248,270+360]});
s.addText([{text:"テック\n",options:{fontSize:19,bold:true,color:"FFFFFF"}},{text:"69%",options:{fontSize:30,bold:true,color:"FFFFFF"}}],
 {x:0.95,y:2.85,w:3.4,h:1.2,align:"center",fontFace:F,margin:0});
s.addText("半導体・AI\nクラウドの\n「濃縮版」",{x:4.65,y:2.6,w:2.4,h:1.6,fontFace:F,fontSize:16,bold:true,color:NAVY,margin:0,lineSpacingMultiple:1.25});
s.addText([{text:"銀行・保険は ",options:{fontSize:21,bold:true,color:NAVY}},{text:"0社",options:{fontSize:30,bold:true,color:RED}}],
 {x:M,y:5.7,w:CW,h:0.6,align:"center",fontFace:F,margin:0});
srcStrip(s,"Nasdaq「Nasdaq-100 Factsheet」2026年6月末");

s = base("「過去10年の年率リターンは約21.2%。100万円は約684万円です」","第4章 NASDAQ100");
chip(s,M,0.45,FUND.nas,1.9,0.55,17);
head(s,"10年前に100万円なら",{fs:24,x:2.55,w:4.45,valign:"middle",h:0.62});
bigMoney(s,"年率 約21.2%","100万円","684万円",FUND.nas.c,"ただし2022年は −33%");

s = base("「上位10銘柄は、こちら」（マイクロン・AMDが上位）","第4章 NASDAQ100");
chip(s,M,0.45,FUND.nas,1.9,0.55,17);
head(s,"上位の顔ぶれ",{fs:26,x:2.55,w:4.45,valign:"middle",h:0.62});
rankList(s,[["NVIDIA","7.60%"],["Apple","6.67%"],["Micron","5.64%"],["Microsoft","4.35%"],["AMD","4.11%"]],FUND.nas.c);
s.addText("半導体の比率が明確に高い",{x:M,y:6.25,w:CW,h:0.6,align:"center",fontFace:F,fontSize:20,bold:true,color:NAVY,margin:0});
foot(s,"2026年6月末時点");

s = base("「2022年に約33%下落し、翌2023年には約54%上昇しました」","第4章 NASDAQ100");
chip(s,M,0.45,FUND.nas,1.9,0.55,17);
head(s,"この振れ幅に耐えられるか",{fs:23,x:2.55,w:4.45,valign:"middle",h:0.62});
s.addText("2022年",{x:1.0,y:1.85,w:2.2,h:0.5,align:"center",fontFace:F,fontSize:20,bold:true,color:NAVY,margin:0});
s.addShape("rect",{x:1.45,y:2.5,w:1.3,h:2.0,fill:{color:RED}});
s.addText("−33%",{x:0.85,y:4.6,w:2.5,h:0.7,align:"center",fontFace:F,fontSize:30,bold:true,color:RED,margin:0});
s.addText("2023年",{x:4.3,y:1.85,w:2.2,h:0.5,align:"center",fontFace:F,fontSize:20,bold:true,color:NAVY,margin:0});
s.addShape("rect",{x:4.75,y:2.5,w:1.3,h:2.0,fill:{color:GREEN}});
s.addText("+54%",{x:4.15,y:4.6,w:2.5,h:0.7,align:"center",fontFace:F,fontSize:30,bold:true,color:GREEN,margin:0});
s.addText("1年でこれだけ動く",{x:M,y:5.6,w:CW,h:0.6,align:"center",fontFace:F,fontSize:21,bold:true,color:NAVY,margin:0});

s = base("「2026年6月にはアステラ・ラブズ、コアウィーブ…が採用」","第4章 NASDAQ100");
chip(s,M,0.45,FUND.nas,1.9,0.55,17);
head(s,"新しく入った5社",{fs:26,x:2.55,w:4.45,valign:"middle",h:0.62});
["アステラ・ラブズ","コアウィーブ","ネビウス","ロケット・ラボ","テラダイン"].forEach((n,i)=>{
  const y=1.75+i*0.86;
  s.addShape("rect",{x:1.0,y,w:5.5,h:0.68,fill:{color:PANEL}});
  s.addText(n,{x:1.0,y,w:5.5,h:0.68,align:"center",valign:"middle",fontFace:F,fontSize:21,bold:true,color:NAVY,margin:0});
});
s.addText("AIインフラ・宇宙・半導体を早く取り込む",{x:M,y:6.2,w:CW,h:0.55,align:"center",fontFace:F,fontSize:17,bold:true,color:GRAY,margin:0});
foot(s,"2026年5月のルール改定で年4回の見直しに");

/* ===== 中間ブリッジ ===== */
s = base("マネコ「上位10銘柄が、3本ともほぼ同じです」","中間ブリッジ");
head(s,[{text:"全部買い＝",options:{}},{text:"重ね買い",options:{hl:true,color:RED}}],{fs:32});
[FUND.orukan,FUND.sp,FUND.nas].forEach((f,i)=>{
  const x=0.75+i*2.05;
  s.addShape("rect",{x,y:1.85,w:1.85,h:0.72,fill:{color:f.c}});
  s.addText(f.n,{x,y:1.85,w:1.85,h:0.72,align:"center",valign:"middle",fontFace:F,fontSize:15,bold:true,color:"FFFFFF",margin:0});
  s.addShape("line",{x:x+0.92,y:2.57,w:3.75-x-0.17+0.5,h:1.05,line:{color:GRAY,width:2.5,endArrowType:"triangle"}});
});
s.addShape("rect",{x:1.6,y:3.8,w:4.3,h:1.75,fill:{color:PANEL},line:{color:RED,width:2.5}});
s.addText("NVIDIA・Apple\nMicrosoft・Amazon…",{x:1.6,y:3.8,w:4.3,h:1.75,align:"center",valign:"middle",fontFace:F,fontSize:20,bold:true,color:NAVY,margin:0,lineSpacingMultiple:1.3});
s.addText("行き先は、同じ会社",{x:M,y:5.95,w:CW,h:0.7,align:"center",fontFace:F,fontSize:27,bold:true,color:RED,margin:0});

/* ===== 第5章 FANG+ ===== */
s = base("第5章「FANG+は、わずか10社です」","第5章 FANG+");
chip(s,M,0.45,FUND.fang,1.9,0.55,17);
head(s,"たった10社に集中",{fs:26,x:2.55,w:4.45,valign:"middle",h:0.62});
["Meta","Apple","Amazon","Netflix","Microsoft","Alphabet","Micron","NVIDIA","Palantir","Broadcom"].forEach((c,i)=>{
  const x=0.65+(i%2)*3.15, y=1.6+Math.floor(i/2)*0.9;
  s.addShape("rect",{x,y,w:2.95,h:0.74,fill:{color:i<6?FUND.fang.c:"F5A6B0"}});
  s.addText(c,{x,y,w:2.95,h:0.74,align:"center",valign:"middle",fontFace:F,fontSize:18,bold:true,color:i<6?"FFFFFF":"7A1220",margin:0});
});
s.addText([{text:"各10%ずつ　",options:{fontSize:18,bold:true,color:NAVY}},{text:"固定6社＋入替4社",options:{fontSize:17,bold:true,color:GRAY}}],
 {x:M,y:6.2,w:CW,h:0.5,align:"center",fontFace:F,margin:0});
srcStrip(s,"ICE「NYSE FANG+ Index」",6.78);

s = base("「100万円は約1,126万円。11倍です」","第5章 FANG+");
chip(s,M,0.45,FUND.fang,1.9,0.55,17);
head(s,"10年当てはめると",{fs:26,x:2.55,w:4.45,valign:"middle",h:0.62});
bigMoney(s,"年率 約27.4%（2014年〜）","100万円","1,126万円",FUND.fang.c,"");
s.addShape("rect",{x:0.75,y:5.6,w:6.0,h:1.0,fill:{color:"FBE9EC"},line:{color:RED,width:2}});
s.addText([{text:"注意　",options:{fontSize:16,bold:true,color:RED}},{text:"2017年以前は「後づけ」の数字",options:{fontSize:18,bold:true,color:NAVY}}],
 {x:0.9,y:5.6,w:5.7,h:1.0,valign:"middle",fontFace:F,margin:0});

s = base("「今年の上半期、FANG+は+2.4%。5本の中で、最下位でした」","第5章 FANG+");
head(s,[{text:"今年は",options:{}},{text:"最下位",options:{hl:true,color:RED}}],{fs:32});
[[FUND.nas,20.3],[FUND.jp,18.6],[FUND.sp,15.2],[FUND.orukan,11.3],[FUND.fang,2.4]].forEach((r,i)=>{
  const y=1.8+i*0.95, bw=(r[1]/20.3)*3.3;
  chip(s,M,y+0.06,r[0],1.8,0.54,14);
  s.addShape("rect",{x:2.5,y:y+0.06,w:Math.max(bw,0.3),h:0.54,fill:{color:r[0].c}});
  s.addText(`+${r[1]}%`,{x:2.5+Math.max(bw,0.3)+0.12,y:y+0.02,w:1.3,h:0.6,valign:"middle",fontFace:F,fontSize:19,bold:true,color:i===4?RED:NAVY,margin:0});
});
s.addText("当たる年は一番、外れる年も一番",{x:M,y:6.6,w:CW,h:0.5,align:"center",fontFace:F,fontSize:19,bold:true,color:NAVY,margin:0});
foot(s,"2026年上半期（6月末時点）");

/* ===== 第6章 日本株 ===== */
s = base("第6章「ここで、クイズです。S&P500と日本株、どっち？」","第6章 日本株");
head(s,"【クイズ】10年でより増えたのは？",{fs:25});
s.addShape("rect",{x:0.65,y:2.0,w:2.95,h:3.0,fill:{color:PANEL},line:{color:FUND.sp.c,width:3}});
s.addText("A",{x:0.65,y:2.3,w:2.95,h:0.9,align:"center",fontFace:F,fontSize:52,bold:true,color:FUND.sp.c,margin:0});
s.addText("S&P500",{x:0.65,y:3.5,w:2.95,h:0.7,align:"center",fontFace:F,fontSize:25,bold:true,color:NAVY,margin:0});
s.addShape("rect",{x:3.9,y:2.0,w:2.95,h:3.0,fill:{color:PANEL},line:{color:FUND.jp.c,width:3}});
s.addText("B",{x:3.9,y:2.3,w:2.95,h:0.9,align:"center",fontFace:F,fontSize:52,bold:true,color:FUND.jp.c,margin:0});
s.addText("日本株",{x:3.9,y:3.5,w:2.95,h:0.7,align:"center",fontFace:F,fontSize:25,bold:true,color:NAVY,margin:0});
s.addText("100万円が、より増えたのは？",{x:M,y:5.6,w:CW,h:0.6,align:"center",fontFace:F,fontSize:19,bold:true,color:GRAY,margin:0});

s = base("「正解は――日本株です」","第6章 日本株");
head(s,[{text:"正解は ",options:{}},{text:"日本株",options:{hl:true,color:GREEN}}],{fs:34});
s.addText("100万円が…",{x:M,y:1.85,w:CW,h:0.5,align:"center",fontFace:F,fontSize:19,bold:true,color:GRAY,margin:0});
chip(s,1.1,2.55,FUND.jp,2.0,0.62,17);
s.addText("405万円",{x:3.3,y:2.4,w:3.4,h:0.95,fontFace:F,fontSize:44,bold:true,color:GREEN,margin:0});
chip(s,1.1,3.95,FUND.sp,2.0,0.62,17);
s.addText("358万円",{x:3.3,y:3.85,w:3.4,h:0.85,fontFace:F,fontSize:34,bold:true,color:GRAY,margin:0});
s.addText("「日本株は増えない」は10年前の話",{x:M,y:5.45,w:CW,h:0.6,align:"center",fontFace:F,fontSize:20,bold:true,color:NAVY,margin:0});
srcStrip(s,"JPX「TOPIX Factsheet」配当込み・円 2026年6月末",6.45);

s = base("「銀行、自動車、商社、機械。米国指数とは顔ぶれが全然違う」","第6章 日本株");
chip(s,M,0.45,FUND.jp,1.9,0.55,17);
head(s,"顔ぶれが全然違う",{fs:26,x:2.55,w:4.45,valign:"middle",h:0.62});
rankList(s,[["三菱UFJ FG","3.57%"],["東京エレクトロン","2.90%"],["トヨタ自動車","2.60%"],["三井住友FG","2.44%"],["ソフトバンクG","2.05%"]],FUND.jp.c,1.85,0.86,19);
s.addText("4本と重複しない、唯一の1本",{x:M,y:6.25,w:CW,h:0.6,align:"center",fontFace:F,fontSize:20,bold:true,color:NAVY,margin:0});
foot(s,"2026年6月末時点");

s = base("「2026年10月から、次世代TOPIXへの移行が始まります」","第6章 日本株");
chip(s,M,0.45,FUND.jp,1.9,0.55,17);
head(s,"2026年10月から変わる",{fs:23,x:2.55,w:4.45,valign:"middle",h:0.62});
s.addShape("rect",{x:0.7,y:1.9,w:6.1,h:1.3,fill:{color:PANEL}});
s.addText("いま：上場していれば入る",{x:0.95,y:1.9,w:5.6,h:1.3,valign:"middle",fontFace:F,fontSize:21,bold:true,color:GRAY,margin:0});
s.addShape("triangle",{x:3.45,y:3.4,w:0.6,h:0.5,fill:{color:NAVY},rotate:180});
s.addShape("rect",{x:0.7,y:4.1,w:6.1,h:1.45,fill:{color:"E7F5EE"},line:{color:GREEN,width:2.5}});
s.addText([{text:"これから：",options:{fontSize:19,bold:true,color:GREEN}},{text:"選ばれた企業だけ",options:{fontSize:23,bold:true,color:NAVY}}],
 {x:0.95,y:4.1,w:5.6,h:1.45,valign:"middle",fontFace:F,margin:0});
s.addText("売買の少ない企業は8段階で除外",{x:M,y:5.85,w:CW,h:0.5,align:"center",fontFace:F,fontSize:17,bold:true,color:NAVY,margin:0});
srcStrip(s,"JPX「次世代TOPIXへの移行について」",6.5);

/* ===== 第7章 比較 ===== */
s = base("第7章「仮に100円を10年投資していたら、こうです」","第7章 比較");
head(s,"100円を10年入れたら",{fs:30});
[[FUND.fang,1126,true],[FUND.nas,684,false],[FUND.jp,405,false],[FUND.sp,358,false],[FUND.orukan,333,false]].forEach((r,i)=>{
  const y=1.7+i*0.98, bw=(r[1]/1126)*3.3;
  chip(s,M,y+0.05,r[0],1.8,0.55,14);
  s.addShape("rect",{x:2.5,y:y+0.05,w:bw,h:0.55,fill:{color:r[0].c}});
  s.addText([{text:`${r[1].toLocaleString()}円`,options:{fontSize:19,bold:true,color:NAVY}},{text:r[2]?" ※後づけ込み":"",options:{fontSize:11,bold:true,color:RED}}],
   {x:2.5,y:y+0.62,w:4.3,h:0.35,fontFace:F,margin:0});
});
foot(s,"公表年率から単純換算。通貨・配当の前提は指数ごとに異なる");

s = base("「ただしNASDAQ100のリスクは約22.6%。オルカンの約1.5倍」","第7章 比較");
head(s,"リターンが高い＝振れ幅も大きい",{fs:24});
s.addText("年率リスク（値動きの大きさ）",{x:M,y:1.5,w:CW,h:0.4,fontFace:F,fontSize:14,bold:true,color:GRAY,margin:0});
[[FUND.fang,30,"※仮定"],[FUND.nas,22.6,""],[FUND.sp,15.4,""],[FUND.orukan,14.7,""],[FUND.jp,13.7,""]].forEach((r,i)=>{
  const y=2.05+i*0.98, bw=(r[1]/30)*2.85;
  chip(s,M,y+0.05,r[0],1.8,0.55,14);
  s.addShape("rect",{x:2.5,y:y+0.05,w:bw,h:0.55,fill:{color:r[0].c}});
  s.addText([{text:`${r[1]}%`,options:{fontSize:18,bold:true,color:NAVY}},{text:r[2]?` ${r[2]}`:"",options:{fontSize:10.5,bold:true,color:GRAY}}],
   {x:2.5+bw+0.1,y:y+0.02,w:1.85,h:0.6,valign:"middle",fontFace:F,margin:0});
});
foot(s,"10年・各指数の公表値（FANG+は同条件未公表のため仮定30%）");

/* ===== 第8章 JPM ===== */
s = base("第8章「JPモルガンは、今後10〜15年の期待リターンを毎年公表」","第8章 JPモルガン予測");
head(s,"プロの10年予測は「逆」",{fs:30});
s.addText("J.P.モルガン 超長期市場予測 2026（円ベース）",{x:M,y:1.5,w:CW,h:0.4,fontFace:F,fontSize:14,bold:true,color:GRAY,margin:0});
[[FUND.jp,7.0],[{c:"64748B",n:"全世界"},5.2],[{c:"94A3B8",n:"米国大型"},4.9]].forEach((r,i)=>{
  const y=2.15+i*1.15, bw=(r[1]/7.0)*3.15;
  chip(s,M,y+0.08,r[0],1.8,0.62,15);
  s.addShape("rect",{x:2.5,y:y+0.08,w:bw,h:0.62,fill:{color:r[0].c}});
  s.addText(`${r[1].toFixed(1)}%`,{x:2.5+bw+0.1,y,w:1.35,h:0.78,valign:"middle",fontFace:F,fontSize:25,bold:true,color:i===0?GREEN:GRAY,margin:0});
});
s.addText([{text:"日本株が1位。米国は最下位",options:{fontSize:22,bold:true,color:NAVY,highlight:HL}}],
 {x:M,y:5.75,w:CW,h:0.6,align:"center",fontFace:F,margin:0});
srcStrip(s,"J.P.モルガン・アセット・マネジメント LTCMA 2026 日本円版",6.5);

s = base("「リスク1単位あたりの効率を出すと――」","第8章 JPモルガン予測");
head(s,"効率で見ると",{fs:30});
s.addText("将来モデルのシャープレシオ",{x:M,y:1.45,w:CW,h:0.4,fontFace:F,fontSize:14,bold:true,color:GRAY,margin:0});
[[FUND.jp,0.41],[FUND.orukan,0.29],[FUND.sp,0.27],[FUND.nas,0.23],[FUND.fang,0.17]].forEach((r,i)=>{
  const y=1.95+i*0.98, bw=(r[1]/0.41)*3.3;
  chip(s,M,y+0.05,r[0],1.8,0.55,14);
  s.addShape("rect",{x:2.5,y:y+0.05,w:bw,h:0.55,fill:{color:r[0].c}});
  s.addText(r[1].toFixed(2),{x:2.5+bw+0.12,y:y+0.02,w:1.1,h:0.6,valign:"middle",fontFace:F,fontSize:19,bold:true,color:NAVY,margin:0});
});
s.addText("リスクを取るほど効率は悪くなる前提",{x:M,y:6.85-0.05,w:CW,h:0.45,align:"center",fontFace:F,fontSize:16,bold:true,color:NAVY,margin:0});
foot(s,"");

/* ===== 第9章 モンテカルロ ===== */
s = base("第9章「例えるなら、天気予報です」","第9章 シミュレーション");
head(s,"未来を15万回つくる",{fs:32});
s.addText("たとえるなら",{x:M,y:1.9,w:CW,h:0.5,align:"center",fontFace:F,fontSize:18,bold:true,color:GRAY,margin:0});
s.addText([{text:"天気予報",options:{fontSize:48,bold:true,color:NAVY,highlight:HL}}],
 {x:M,y:2.5,w:CW,h:1.0,align:"center",fontFace:F,margin:0});
s.addText("明日の空を何千回も再現して\n雨の回数を数える",{x:M,y:3.8,w:CW,h:1.1,align:"center",fontFace:F,fontSize:20,bold:true,color:NAVY,margin:0,lineSpacingMultiple:1.35});
s.addText("これの「資産運用版」をやります",{x:M,y:5.3,w:CW,h:0.55,align:"center",fontFace:F,fontSize:18,bold:true,color:GRAY,margin:0});
foot(s,"毎月5万円×20年（元本1,200万円）・15万回 ※当チャンネル試算");

s = base("「悪いケース、真ん中、良いケースに分けました」（結果表）","第9章 シミュレーション");
head(s,"20年後の「幅」",{fs:30});
s.addText("悪い未来 ←→ 良い未来（●は真ん中）",{x:M,y:1.42,w:CW,h:0.4,fontFace:F,fontSize:14,bold:true,color:GRAY,margin:0});
const X0=2.58, XW=3.8, MAXV=5100;
[[FUND.orukan,1082,2101,4395],[FUND.sp,1040,2030,4300],[FUND.nas,880,1900,4560],
 [FUND.jp,1360,2550,5060],[FUND.fang,620,1600,4960]].forEach((r,i)=>{
  const y=2.05+i*0.92;
  chip(s,M,y+0.02,r[0],1.8,0.5,14);
  const x1=X0+(r[1]/MAXV)*XW, x2=X0+(r[3]/MAXV)*XW, xm=X0+(r[2]/MAXV)*XW;
  s.addShape("roundRect",{x:x1,y:y+0.12,w:x2-x1,h:0.3,rectRadius:0.15,fill:{color:r[0].c,transparency:55}});
  s.addShape("ellipse",{x:xm-0.12,y:y+0.15,w:0.24,h:0.24,fill:{color:r[0].c}});
  s.addText(`${r[1]}`,{x:x1-0.62,y:y+0.1,w:0.56,h:0.34,align:"right",fontFace:F,fontSize:11.5,bold:true,color:i===4?RED:GRAY,margin:0});
  s.addText(`${r[3]}`,{x:x2+0.05,y:y+0.1,w:0.75,h:0.34,fontFace:F,fontSize:12,bold:true,color:GRAY,margin:0});
});
s.addText([{text:"集中するほど、幅が広がる",options:{fontSize:21,bold:true,color:NAVY,highlight:HL}}],
 {x:M,y:6.62,w:CW,h:0.55,align:"center",fontFace:F,margin:0});
s.addText("単位：万円 ※当チャンネル試算",{x:M,y:7.14,w:CW-0.5,h:0.26,fontFace:F,fontSize:10,color:GRAY,margin:0});

s = base("マネコ「FANG+、良いと約5,000万円なのに、悪いと620万円……？」","第9章 シミュレーション");
chip(s,M,0.45,FUND.fang,1.9,0.55,17);
head(s,"夢と、現実",{fs:28,x:2.55,w:4.45,valign:"middle",h:0.62});
s.addShape("rect",{x:0.65,y:1.8,w:2.95,h:3.2,fill:{color:"E7F5EE"}});
s.addText("良い未来",{x:0.65,y:2.15,w:2.95,h:0.5,align:"center",fontFace:F,fontSize:19,bold:true,color:GREEN,margin:0});
s.addText("約5,000万",{x:0.65,y:2.95,w:2.95,h:0.8,align:"center",fontFace:F,fontSize:29,bold:true,color:GREEN,margin:0});
s.addShape("rect",{x:3.9,y:1.8,w:2.95,h:3.2,fill:{color:"FBE9EC"}});
s.addText("悪い未来",{x:3.9,y:2.15,w:2.95,h:0.5,align:"center",fontFace:F,fontSize:19,bold:true,color:RED,margin:0});
s.addText("620万",{x:3.9,y:2.95,w:2.95,h:0.8,align:"center",fontFace:F,fontSize:34,bold:true,color:RED,margin:0});
s.addText("元本1,200万が半分に",{x:3.9,y:3.95,w:2.95,h:0.45,align:"center",fontFace:F,fontSize:13,bold:true,color:RED,margin:0});
s.addText([{text:"冒頭の ",options:{fontSize:20,bold:true,color:NAVY}},{text:"460万円の差",options:{fontSize:26,bold:true,color:RED,highlight:HL}},{text:" はここ",options:{fontSize:20,bold:true,color:NAVY}}],
 {x:M,y:5.45,w:CW,h:0.65,align:"center",fontFace:F,margin:0});
foot(s,"オルカン1,082万円 vs FANG+620万円 ※当チャンネル試算");

/* ===== 第10章 ===== */
s = base("第10章「例えるなら、幕の内弁当のから揚げ増量です」","第10章 結論");
head(s,[{text:"それは分散でなく",options:{}},{text:"増量",options:{hl:true,color:RED}}],{fs:30});
s.addShape("rect",{x:0.9,y:1.8,w:5.7,h:3.2,fill:{color:"FFFFFF"},line:{color:NAVY,width:3}});
s.addText("幕の内弁当（オルカン）",{x:0.9,y:1.9,w:5.7,h:0.4,align:"center",fontFace:F,fontSize:15,bold:true,color:GRAY,margin:0});
[["ごはん","E8E4D8",NAVY],["焼き魚","D9C9A3",NAVY],["卵焼き","F5D67B",NAVY],
 ["から揚げ","C87B3B","FFFFFF"],["漬物","B7CE9E",NAVY],["から揚げ","C87B3B","FFFFFF"]].forEach((o,i)=>{
  const x=1.15+(i%3)*1.78, y=2.45+Math.floor(i/3)*1.15;
  s.addShape("rect",{x,y,w:1.62,h:1.0,fill:{color:o[1]}});
  s.addText(o[0],{x,y,w:1.62,h:1.0,align:"center",valign:"middle",fontFace:F,fontSize:15,bold:true,color:o[2],margin:0});
});
s.addText([{text:"NASDAQ100を足す ＝ ",options:{fontSize:18,bold:true,color:NAVY}},{text:"から揚げ増量",options:{fontSize:24,bold:true,color:RED}}],
 {x:M,y:5.35,w:CW,h:0.6,align:"center",fontFace:F,margin:0});
s.addText("新しいおかずは、増えていない",{x:M,y:6.05,w:CW,h:0.5,align:"center",fontFace:F,fontSize:18,bold:true,color:GRAY,margin:0});

s = base("「中央値が最も高かったのは――オルカン100%でした」","第10章 結論");
head(s,[{text:"混ぜても、",options:{}},{text:"増えなかった",options:{hl:true,color:RED}}],{fs:30});
s.addText("真ん中の未来（中央値）",{x:M,y:1.5,w:CW,h:0.4,fontFace:F,fontSize:14,bold:true,color:GRAY,margin:0});
[["オルカン100%",2101,GREEN],["90 : 10",2089,NAVY],["80 : 20",2075,NAVY],["NASDAQ100だけ",1900,RED]].forEach((r,i)=>{
  const y=2.1+i*1.05, bw=((r[1]-1700)/(2101-1700))*3.3+0.85;
  s.addText(r[0],{x:M,y:y+0.05,w:2.15,h:0.55,valign:"middle",fontFace:F,fontSize:15,bold:true,color:NAVY,margin:0});
  s.addShape("rect",{x:2.75,y:y+0.05,w:bw,h:0.55,fill:{color:r[2]}});
  s.addText(`${r[1].toLocaleString()}万`,{x:2.85,y:y+0.05,w:bw-0.2,h:0.55,valign:"middle",align:"right",fontFace:F,fontSize:16,bold:true,color:"FFFFFF",margin:0});
});
s.addText("1位はオルカン100%",{x:M,y:6.45,w:CW,h:0.55,align:"center",fontFace:F,fontSize:22,bold:true,color:GREEN,margin:0});
foot(s,"年1回リバランス・15万回 ※当チャンネル試算（軸は1,700万〜）");

s = base("「元本割れの確率も、オルカン100%の約14.3%に対して…」","第10章 結論");
head(s,"元本割れの確率",{fs:30});
[["オルカン100%",14.3,GREEN],["90 : 10",14.6,NAVY],["80 : 20",15.2,NAVY],["NASDAQ100だけ",22,RED]].forEach((r,i)=>{
  const y=1.95+i*1.15, bw=(r[1]/22)*3.05;
  s.addText(r[0],{x:M,y:y+0.08,w:2.2,h:0.62,valign:"middle",fontFace:F,fontSize:15,bold:true,color:NAVY,margin:0});
  s.addShape("rect",{x:2.8,y:y+0.08,w:bw,h:0.62,fill:{color:r[2]}});
  s.addText(`${r[1]}%`,{x:2.8+bw+0.1,y,w:1.3,h:0.78,valign:"middle",fontFace:F,fontSize:23,bold:true,color:r[2],margin:0});
});
s.addText("集中するほど、元本割れしやすい",{x:M,y:6.55,w:CW,h:0.55,align:"center",fontFace:F,fontSize:20,bold:true,color:NAVY,margin:0});
foot(s,"※当チャンネル試算");

s = base("「そこで現実的な結論は――」（4段階のテロップ）","第10章 結論");
head(s,"結論：あなたはどれ？",{fs:30});
[["数値上の最適","オルカン 100%",GREEN,false],
 ["入れるなら最良","オルカン95 ： NAS 5",NAVY,false],
 ["実用的な基本","オルカン90 ： NAS10",NAVY,true],
 ["積極型の上限","オルカン80 ： NAS20",NAVY,false]].forEach((r,i)=>{
  const y=1.7+i*1.28;
  s.addShape("rect",{x:M,y,w:CW,h:1.08,fill:{color:r[3]?"FFF7DC":PANEL},line:r[3]?{color:"E0A800",width:2.5}:{color:LINE,width:1}});
  s.addText(r[0],{x:M+0.25,y:y+0.1,w:2.6,h:0.4,fontFace:F,fontSize:14,bold:true,color:GRAY,margin:0});
  s.addText(r[1],{x:M+0.25,y:y+0.44,w:CW-0.5,h:0.56,fontFace:F,fontSize:25,bold:true,color:r[2],margin:0});
});
s.addText("比率は「リスクをどこまで使うか」の決め方",{x:M,y:6.85,w:CW-0.5,h:0.4,align:"center",fontFace:F,fontSize:13,bold:true,color:GRAY,margin:0});

/* ===== 第11章 ===== */
s = base("第11章「S&P500は、すでにオルカンを持つなら追加の必要性は高くない」","第11章 他の3本");
head(s,"他の3本はどうする？",{fs:30});
[[FUND.sp,"追加不要","米国比率を高めたいときだけ",GRAY],
 [FUND.fang,"5〜10%まで","コアにはしない",RED],
 [FUND.jp,"家計を見てから","円建てで調整したいとき",GREEN]].forEach((r,i)=>{
  const y=1.85+i*1.6;
  s.addShape("rect",{x:M,y,w:CW,h:1.35,fill:{color:PANEL}});
  chip(s,M+0.2,y+0.33,r[0],1.75,0.68,15);
  s.addText(r[1],{x:M+2.2,y:y+0.2,w:4.0,h:0.55,fontFace:F,fontSize:22,bold:true,color:r[3],margin:0});
  s.addText(r[2],{x:M+2.2,y:y+0.75,w:4.0,h:0.45,fontFace:F,fontSize:14,bold:true,color:GRAY,margin:0});
});

/* ===== 第12章 ===== */
s = base("第12章「年に1回だけ比率を確認して、元の90対10に戻す」","第12章 提案");
head(s,"マネコさんへの提案",{fs:30});
s.addShape("rect",{x:M,y:1.7,w:CW,h:1.5,fill:{color:"FFF7DC"},line:{color:"E0A800",width:2.5}});
s.addText("オルカン90 ： NASDAQ100 10",{x:M+0.2,y:1.7,w:CW-0.4,h:1.5,align:"center",valign:"middle",fontFace:F,fontSize:26,bold:true,color:NAVY,margin:0});
[["FANG+は、今は入れない",false],["年1回だけ比率を確認",true],["膨らんでいたら元に戻す",true]].forEach((r,i)=>{
  const y=3.5+i*1.05;
  mb(s,M+0.15,y+0.05,r[1],0.68);
  s.addText(r[0],{x:M+1.15,y,w:CW-1.25,h:0.78,valign:"middle",fontFace:F,fontSize:21,bold:true,color:NAVY,margin:0});
});
s.addText("上限は 80 : 20 まで",{x:M,y:6.75,w:CW-0.5,h:0.45,align:"center",fontFace:F,fontSize:17,bold:true,color:GRAY,margin:0});

/* ===== 数年後（バッドエンド） ===== */
s = base("マネコ「私は絶対、売りませんから！」のあと・数年後シーンの頭","数年後①");
s.addText("数年後",{x:M,y:0.75,w:CW,h:0.6,align:"center",fontFace:F,fontSize:22,bold:true,color:GRAY,margin:0});
head(s,"世界同時株安",{fs:38,align:"center",y:1.45});
chip(s,2.85,2.5,FUND.fang,1.8,0.55,16);
s.addText("−40%",{x:M,y:3.25,w:CW,h:1.1,align:"center",fontFace:F,fontSize:70,bold:true,color:RED,margin:0});
s.addShape("rect",{x:1.15,y:4.6,w:5.2,h:1.5,fill:{color:"FBE9EC"}});
s.addText([{text:"420万円",options:{fontSize:26,bold:true,color:GRAY}},{text:"  →  ",options:{fontSize:22,bold:true,color:GRAY}},{text:"260万円",options:{fontSize:32,bold:true,color:RED}}],
 {x:1.15,y:4.6,w:5.2,h:1.5,align:"center",valign:"middle",fontFace:F,margin:0});
s.addText("夜中に3回、残高を見てしまう",{x:M,y:6.35,w:CW-0.5,h:0.5,align:"center",fontFace:F,fontSize:17,bold:true,color:NAVY,margin:0});
foot(s,"");

s = base("マネコ「私、底で全部売りました」／「売った半年後、相場は戻った」","数年後②");
head(s,"売った人の口座だけ、戻らない",{fs:25});
s.addShape("rect",{x:M,y:1.65,w:CW,h:1.5,fill:{color:"FBE9EC"},line:{color:RED,width:2.5}});
s.addText([{text:"底で全部売却　",options:{fontSize:19,bold:true,color:RED}},{text:"260万円",options:{fontSize:30,bold:true,color:RED}}],
 {x:M+0.25,y:1.65,w:CW-0.5,h:1.5,valign:"middle",fontFace:F,margin:0});
s.addText("その半年後…",{x:M,y:3.3,w:CW,h:0.5,align:"center",fontFace:F,fontSize:18,bold:true,color:GRAY,margin:0});
s.addShape("rect",{x:M,y:3.95,w:CW,h:1.5,fill:{color:PANEL}});
s.addText([{text:"持っていれば　",options:{fontSize:19,bold:true,color:GRAY}},{text:"430万円",options:{fontSize:30,bold:true,color:NAVY}}],
 {x:M+0.25,y:3.95,w:CW-0.5,h:1.5,valign:"middle",fontFace:F,margin:0});
s.addText([{text:"相場は戻る。でも",options:{fontSize:20,bold:true,color:NAVY}},{text:"売った口座は戻らない",options:{fontSize:20,bold:true,color:RED,highlight:HL}}],
 {x:M,y:5.75,w:CW,h:0.9,align:"center",fontFace:F,margin:0,lineSpacingMultiple:1.3});
foot(s,"※演出上の想定金額");

/* ===== 教訓 ===== */
s = base("こうの解説「マネコさんの失敗は、3つありました」","解説（教訓）");
head(s,"3つの失敗",{fs:32});
[["「一番増えた」で選んだ","過去の1位＝未来の1位ではない"],
 ["耐えられる下落幅を確認しなかった","「絶対売らない」は下がる前なら言える"],
 ["底で、全部売った","損が確定するのは“売った日”"]].forEach((r,i)=>{
  const y=1.8+i*1.6;
  s.addShape("rect",{x:M,y,w:CW,h:1.38,fill:{color:"FBE9EC"}});
  s.addShape("ellipse",{x:M+0.22,y:y+0.36,w:0.66,h:0.66,fill:{color:RED}});
  s.addText(String(i+1),{x:M+0.22,y:y+0.36,w:0.66,h:0.66,align:"center",valign:"middle",fontFace:F,fontSize:24,bold:true,color:"FFFFFF",margin:0});
  s.addText(r[0],{x:M+1.1,y:y+0.18,w:CW-1.3,h:0.5,fontFace:F,fontSize:18,bold:true,color:NAVY,margin:0});
  s.addText(r[1],{x:M+1.1,y:y+0.72,w:CW-1.3,h:0.45,fontFace:F,fontSize:13,bold:true,color:GRAY,margin:0});
});

s = base("「そして教訓は、1つだけ」","解説（教訓）");
s.addText("教訓",{x:M,y:1.5,w:CW,h:0.6,align:"center",fontFace:F,fontSize:22,bold:true,color:GRAY,margin:0});
s.addText("商品選びより",{x:M,y:2.35,w:CW,h:0.9,align:"center",fontFace:F,fontSize:34,bold:true,color:NAVY,margin:0});
s.addText([{text:"最後まで持てるか",options:{fontSize:44,bold:true,color:NAVY,highlight:HL}}],
 {x:M,y:3.45,w:CW,h:1.1,align:"center",fontFace:F,margin:0});
s.addText("暴落の日に「なぜ持っているか」を\n自分の言葉で説明できること",{x:M,y:5.0,w:CW,h:1.2,align:"center",fontFace:F,fontSize:19,bold:true,color:GRAY,margin:0,lineSpacingMultiple:1.35});

s = base("「まとめると、オルカンは…」（5本の役割）","まとめ");
head(s,"5本の役割",{fs:30});
[[FUND.orukan,"自動で対応するコア"],[FUND.sp,"王道。ただし中身は同じ"],
 [FUND.nas,"AI・半導体への上乗せ"],[FUND.fang,"高リスクのサテライト"],
 [FUND.jp,"重複しない・為替なし"]].forEach((r,i)=>{
  const y=1.75+i*1.05;
  chip(s,M,y,r[0],2.0,0.64,16);
  s.addText(r[1],{x:2.75,y,w:4.25,h:0.64,valign:"middle",fontFace:F,fontSize:19,bold:true,color:NAVY,margin:0});
});

s = base("「最も大切なのは、20年間やめずに積み立てられること」","まとめ");
s.addText("一番大事なのは",{x:M,y:1.5,w:CW,h:0.55,align:"center",fontFace:F,fontSize:22,bold:true,color:GRAY,margin:0});
s.addText([{text:"20年、やめないこと",options:{fontSize:36,bold:true,color:NAVY,highlight:HL}}],
 {x:M,y:2.2,w:CW,h:0.9,align:"center",fontFace:F,margin:0});
s.addText("迷う人は オルカン100%\n少し攻めるなら 90 : 10\n上限は 80 : 20",{x:M,y:3.55,w:CW,h:1.9,align:"center",fontFace:F,fontSize:22,bold:true,color:NAVY,margin:0,lineSpacingMultiple:1.45});
s.addText("どの比率でも、続けられることが最優先",{x:M,y:5.75,w:CW,h:0.5,align:"center",fontFace:F,fontSize:16,bold:true,color:GRAY,margin:0});

/* ===== CTA ===== */
s = base("CTA「どれを、何%ずつ積み立てていますか？」","CTA");
s.addText("あなたの比率は？",{x:M,y:1.4,w:CW,h:0.85,align:"center",fontFace:F,fontSize:34,bold:true,color:NAVY,margin:0});
s.addText("どれを、何%ずつ？\nその比率にした理由は？",{x:M,y:2.5,w:CW,h:1.25,align:"center",fontFace:F,fontSize:21,bold:true,color:GRAY,margin:0,lineSpacingMultiple:1.35});
s.addShape("rect",{x:1.5,y:4.1,w:4.5,h:0.95,fill:{color:RED}});
s.addText("コメントで教えてください",{x:1.5,y:4.1,w:4.5,h:0.95,align:"center",valign:"middle",fontFace:F,fontSize:21,bold:true,color:"FFFFFF",margin:0});
s.addText("高評価・チャンネル登録もお願いします\n次回は火曜日に投稿します",{x:M,y:5.35,w:CW,h:1.0,align:"center",fontFace:F,fontSize:16,bold:true,color:GRAY,margin:0,lineSpacingMultiple:1.35});

p.writeFile({fileName:"/home/user/test-project/youtube/2026-07-28-slides-5fund.pptx"}).then(()=>console.log("slides:",NO));
