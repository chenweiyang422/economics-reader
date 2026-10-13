const PARAGRAPH_JOINS={"c1-b88": ["c1-b89"], "c4-b23": ["c4-b24"], "c6-b37": ["c6-b38"], "c6-b80": ["c6-b81"], "c12-b19": ["c12-b20"], "c12-b92": ["c12-b93"], "c13-b58": ["c13-b59", "c13-b60"], "c20-b17": ["c20-b18"], "c20-b42": ["c20-b43"], "c21-b181": ["c21-b182"], "c21-b184": ["c21-b185"], "m24-b82": ["m24-b83"], "m25-b10": ["m25-b11", "m25-b12"], "m28-b91": ["m28-b92"], "m31-b92": ["m31-b93"], "m31-b95": ["m31-b96", "m31-b97"], "m31-b120": ["m31-b121"], "m31-b144": ["m31-b145"], "m33-b186": ["m33-b187"], "c1-b51": ["c1-b52"], "c6-b67": ["c6-b68"], "c9-b17": ["c9-b18"], "c16-b51": ["c16-b52"], "c21-b80": ["c21-b81"], "m23-b99": ["m23-b100"], "m33-b128": ["m33-b129"], "m34-b89": ["m34-extra90"], "m34-b136": ["m34-b138"]};

PARAGRAPH_JOINS['c3-b11']=['c3-b13'];
PARAGRAPH_JOINS['c8-b52']=['c8-b54'];
PARAGRAPH_JOINS['c15-b162']=['c15-b164'];
PARAGRAPH_JOINS['c15-b54']=['c15-b55','c15-b56'];
PARAGRAPH_JOINS['c17-b59']=['c17-b61'];
PARAGRAPH_JOINS["c18-b210"]=["c18-b211"];
PARAGRAPH_JOINS["c18-b212"]=["c18-b213"];
PARAGRAPH_JOINS["c18-b230"]=["c18-b231"];
PARAGRAPH_JOINS["c18-b234"]=["c18-b235"];
PARAGRAPH_JOINS["c18-b236"]=["c18-b237"];
PARAGRAPH_JOINS["c19-b150"]=["c19-b151"];
PARAGRAPH_JOINS["c19-b152"]=["c19-b153"];
PARAGRAPH_JOINS["c19-b164"]=["c19-b165"];
// Chapter 20: source-verified paragraph and exercise continuations.
Object.assign(PARAGRAPH_JOINS,{"c20-b93": ["c20-b94"], "c20-b99": ["c20-b100"], "c20-b184": ["c20-b185"], "c20-b188": ["c20-b193"], "c20-b191": ["c20-b192"], "c20-b199": ["c20-b200"], "c20-b211": ["c20-b212"], "c20-b213": ["c20-b214"], "c20-b215": ["c20-b216"], "c20-b217": ["c20-b218"]});
// Chapter 21: source-verified continuations, including the interrupted preference paragraph.
Object.assign(PARAGRAPH_JOINS,{"c21-b28": ["c21-b75"], "c21-b160": ["c21-b162"], "c21-b243": ["c21-b244"], "c21-b247": ["c21-b248"], "c21-b249": ["c21-b250"], "c21-b251": ["c21-b252"], "c21-b262": ["c21-b263"], "c21-b274": ["c21-b275"], "c21-b281": ["c21-b282"], "c21-b283": ["c21-b284"], "c21-b289": ["c21-b290"], "c21-b292": ["c21-b293"], "c21-b297": ["c21-b298"]});
Object.assign(PARAGRAPH_JOINS,{"c22-b16": ["c22-b25"], "c22-b184": ["c22-b185"], "c22-b225": ["c22-b226"]});
const READING_BLOCKS=new Map(BOOK.flatMap(c=>c.blocks).map(b=>[b.id,b]));
const JOINED_TAILS=new Set(Object.values(PARAGRAPH_JOINS).flat());
// Reviewed run-in headings. Keep book blocks and navigation IDs unchanged.
const PARAGRAPH_HEADINGS={
 "c2-b224": "单变量的图形",
 "c2-b225": "两个变量的图形：坐标系",
 "c2-b248": "斜率",
 "c2-b255": "原因和结果",
 "c2-b257": "忽略的变量",
 "c2-b263": "反向因果关系",
 "c4-b37": "收入",
 "c4-b39": "相关物品的价格",
 "c4-b41": "爱好",
 "c4-b42": "预期",
 "c4-b43": "买者的数量",
 "c4-b44": "总结",
 "c4-b72": "投入品价格",
 "c4-b73": "技术",
 "c4-b74": "预期",
 "c4-b75": "卖者的数量",
 "c4-b76": "总结",
 "c4-b102": "举例：由于需求移动引起的市场均衡变动",
 "c4-b107": "曲线的移动与沿着曲线的变动",
 "c4-b110": "举例：由于供给移动引起的市场均衡变动",
 "c4-b115": "举例：供给和需求都移动",
 "c4-b120": "总结",
 "c5-b9": "相近替代品的可获得性",
 "c5-b10": "必需品与奢侈品",
 "c5-b11": "市场的定义",
 "c5-b12": "时间范围",
 "c5-b57": "需求收入弹性",
 "c5-b59": "需求的交叉价格弹性",
 "c5-b116": "结论",
 "c6-b62": "第一步",
 "c6-b63": "第二步",
 "c6-b66": "第三步",
 "c6-b67": "含义",
 "c6-b74": "第一步",
 "c6-b75": "第二步",
 "c6-b78": "第三步",
 "c6-b79": "含义",
 "c8-b12": "没有税收时的福利",
 "c8-b16": "有税收时的福利",
 "c8-b18": "福利的变动",
 "c11-b30": "国防",
 "c11-b32": "基础研究",
 "c11-b36": "反贫困",
 "c11-b74": "清洁的空气和水",
 "c11-b75": "拥堵的道路",
 "c11-b103": "鱼、鲸和其他野生动物",
 "c12-b14": "个人所得税",
 "c12-b18": "工薪税",
 "c12-b19": "公司所得税",
 "c12-b21": "其他税收",
 "c12-b82": "纵向平等",
 "c12-b96": "横向平等",
 "c13-b66": "递增的边际成本",
 "c13-b67": "U形平均总成本",
 "c13-b70": "边际成本和平均总成本之间的关系",
 "c15-b129": "电影票",
 "c15-b130": "飞机票价",
 "c15-b131": "折扣券",
 "c15-b133": "财务援助",
 "c15-b134": "数量折扣",
 "c16-b43": "生产能力过剩",
 "c16-b46": "高于边际成本的价格加成",
 "c16-b71": "广告的辩护者",
 "c17-b72": "军备竞赛",
 "c17-b77": "公共资源",
 "c17-b121": "转售价格维持",
 "c17-b126": "掠夺性定价",
 "c17-b130": "搭售",
 "c18-b38": "产品价格",
 "c18-b39": "技术变革",
 "c18-b41": "其他要素的供给",
 "c18-b54": "爱好变动",
 "c18-b55": "可供选择的机会改变",
 "c18-b56": "移民",
 "c20-b54": "实物转移支付",
 "c20-b56": "经济生命周期",
 "c20-b58": "暂时收入与持久收入",
 "c21-b86": "完全替代品",
 "c21-b90": "完全互补品",
 "m25-b41": "人均物质资本",
 "m25-b43": "人均人力资本",
 "m25-b45": "人均自然资源",
 "m25-b48": "技术知识",
 "m25-b148": "导致自然资源紧张",
 "m25-b152": "稀释了资本存量",
 "m25-b157": "促进了技术进步",
 "m26-b10": "债券市场",
 "m26-b15": "股票市场",
 "m26-b29": "银行",
 "m26-b32": "共同基金",
 "m29-b106": "公开市场操作（open-market operations）",
 "m29-b109": "美联储向银行发放贷款",
 "m29-b117": "法定准备金",
 "m29-b119": "支付准备金利息",
 "m33-b63": "消费变动引起的移动",
 "m33-b65": "投资变动引起的移动",
 "m33-b68": "政府购买变动引起的移动",
 "m33-b69": "净出口变动引起的移动",
 "m33-b71": "总结",
 "m33-b94": "劳动变动引起的移动",
 "m33-extra99": "资本变动引起的移动",
 "m33-b98": "自然资源变动引起的移动",
 "m33-b100": "技术知识变动引起的移动",
 "m33-b102": "总结",
 "m33-b112": "黏性工资理论",
 "m33-b117": "黏性价格理论",
 "m33-b120": "错觉理论",
 "m33-b123": "总结",
 "m34-b17": "货币供给",
 "m34-b22": "货币需求",
 "m34-b24": "货币市场的均衡",
 "c16-b69": {
  "heading": "广告的批评者",
  "marker": " 好广告的批评者"
 }
};
function readingParagraph(b){
 if(b.type==='byline')return `<p id="${b.id}" class="news-byline">${escapeHTML(b.text)}</p>`;
 if(b.type==='news-intro'||b.id==='c20-news-intro')return `<div class="news-intro">${formulaParagraph(b)}</div>`;
 if(b.type==='news-source'||b.id==='c20-b37'||b.id==='c20-b38')return `<footer class="news-source">${formulaParagraph(b)}</footer>`;
 if(b.id==='c20-b99')return `<blockquote class="textbook-quotation" id="${b.id}"><span id="c20-b100" class="paragraph-anchor"></span>${formulaParagraph({...b,id:b.id+'-body',text:b.text+READING_BLOCKS.get('c20-b100').text})}</blockquote>`;
 if(b.type==='article-title')return `<h3 id="${b.id}" class="news-article-header">${escapeHTML(b.text)}</h3>`;
 if(b.type==='source-note')return `<p id="${b.id}" class="model-note">${escapeHTML(b.text)} <a href="chapter-17.pdf#page=${b.pdfPage}" target="_blank" rel="noopener">查看原书页 ↗</a></p>`;
 if(b.id==='c16-b33'&&typeof entryExitFigure==='function')return formulaParagraph(b)+entryExitFigure();
 if(b.id==='c16-b25'){
  const quote=READING_BLOCKS.get('c16-b26'),source=READING_BLOCKS.get('c16-b27');
  return `<aside class="cartoon-excerpt" aria-label="漫画文字"><strong class="cartoon-label">漫画文字</strong><p class="cartoon-sign" id="${b.id}">店铺招牌：${escapeHTML(b.text)}</p><blockquote id="${quote.id}"><p>${richText(quote.text)}</p></blockquote><p class="cartoon-source" id="${source.id}">${escapeHTML(source.text)}</p></aside>`;
 }
 if(b.id==='c16-b26'||b.id==='c16-b27')return '';
 if(b.id==='c15-b139'){
  const [title,body]=b.text.split('Evan Soltas');
  return `<header class="news-article-header" id="${b.id}"><h3>${escapeHTML(title.trim())}</h3><p class="news-byline">Evan Soltas</p></header>${formulaParagraph({...b,id:b.id+'-body',text:body})}`;
 }
 if(b.id==='c15-b138')return `<div class="news-intro">${formulaParagraph(b)}</div>`;
 if(b.id==='c15-b147')return `<footer class="news-source">${formulaParagraph(b)}</footer>`;
 if(JOINED_TAILS.has(b.id))return '';
 const tails=PARAGRAPH_JOINS[b.id]||[];
 const text=b.text+tails.map(id=>READING_BLOCKS.get(id)?.text||'').join('');
 const anchors=tails.map(id=>`<span id="${id}" class="paragraph-anchor"></span>`).join('');
 const config=PARAGRAPH_HEADINGS[b.id];
 if(config){
  const heading=typeof config==='string'?config:config.heading;
  const marker=typeof config==='string'?config:config.marker;
  const start=text.indexOf(marker);
  // If source wording changes, retain the paragraph rather than remove unrelated text.
  if(start>=0&&(typeof config!=='string'||start===0)){
   const end=start+marker.length;
   const intro=start?formulaParagraph({...b,id:b.id+'-intro',text:text.slice(0,start).trim()}):'';
   return `<div class="subheaded-paragraph" id="${b.id}" data-page="${b.page}">${anchors}${intro}<h4 class="paragraph-subheading">${escapeHTML(heading)}</h4>${formulaParagraph({...b,text},{id:b.id+'-body',omitPrefix:text.slice(0,end)})}</div>`;
  }
 }
 const body=formulaParagraph({...b,text});
 return tails.length?`<div class="repaired-paragraph">${anchors}${body}</div>`:body;
}

// Keep source figures intact for references; interleave their parts in reading order.
const READING_FIGURE_PLACEMENTS={
 'c14-b74':{model:'profit',after:['c14-b73','c14-b75']},
 'c14-b82':{model:'fixedMarketSupply',after:['c14-b81','c14-b81-market']},
 'c14-b90':{model:'longRunSupply',after:['c14-b88','c14-b89']},
 'c14-b99':{model:'demandShortLongRun',after:['c14-b98','c14-b100','c14-b101']}
};
function placeReadingFigures(blocks){
 const expanded=blocks.flatMap(b=>{
  if(b.id!=='c14-b81')return [b];
  const split=b.text.indexOf('市场供给量等于');
  if(split<0)return [b];
  return [{...b,text:b.text.slice(0,split)},{...b,id:b.id+'-market',text:b.text.slice(split)}];
 });
 if(typeof READING_PANEL_DATA!=='undefined'){
  const after=new Map(),moved=new Set();
  const joinedHead=new Map(Object.entries(PARAGRAPH_JOINS).flatMap(([head,tails])=>tails.map(t=>[t,head])));
  for(const [id,config] of Object.entries(READING_PANEL_DATA)){
   if(id==='c15-b124')continue; // Figure 15-9 is one continuous interactive comparison.
   const source=READING_BLOCKS.get(id);if(!source)continue;
   const anchors=config.parts.map(p=>joinedHead.get(p.after)||p.after);
   // Only move an entire figure when all its reviewed paragraph anchors exist.
   if(!expanded.some(b=>b.id===id)||!anchors.every(a=>expanded.some(b=>b.id===a)))continue;
   moved.add(id);
   config.parts.forEach((panel,index)=>{
    const anchor=anchors[index];
    after.set(anchor,[...(after.get(anchor)||[]),{...source,id:index?id+'-part-'+index:id,sourceFigureId:id,sourcePanel:index,diagramKind:panel.model}]);
   });
  }
  return expanded.flatMap(b=>moved.has(b.id)?[]:[b,...(after.get(b.id)||[])]);
 }
 const after=new Map(),moved=new Set();
 for(const [id,placement] of Object.entries(READING_FIGURE_PLACEMENTS)){
  const source=expanded.find(b=>b.id===id);
  if(!source||!placement.after.every(anchor=>expanded.some(b=>b.id===anchor)))continue;
  moved.add(id);
  placement.after.forEach((anchor,part)=>{
   const partId=part===0?id:id+'-part-'+part;
   after.set(anchor,[...(after.get(anchor)||[]),{...source,id:partId,diagramKind:placement.model+'Part'+part}]);
  });
 }
 return expanded.flatMap(b=>moved.has(b.id)?[]:[b,...(after.get(b.id)||[])]);
}

function readingPanelFigure(r,b){
 const p=READING_PANEL_DATA[r.id].parts[b.sourcePanel];
 const heading=r.ref+'（'+p.label+'）';
 const asset=`<button class="source-chart-zoom" data-source-zoom="${r.id}" data-source-panel="${b.sourcePanel}" aria-label="放大${heading}"><img class="textbook-chart" src="${p.asset}?v=20261010-redraw" width="${p.width}" height="${p.height}" loading="lazy" alt="${heading} · ${escapeHTML(r.title)}"></button>`;
 let body=asset;
 if(p.model){
  const modelId=b.id+'-reading';DIAGRAM_OVERRIDES[modelId]=p.model;
  body=supplementaryFigure({id:modelId,text:r.title,diagramKind:p.model},r.chapterIndex).replace(/<div class="figure-heading">[\s\S]*?<\/div>/,'');
 }
 return `<figure id="${b.id}" class="redrawn source-chart reading-panel" data-source-chart="${r.id}" data-source-panel="${p.label}" aria-label="${heading}"><div class="figure-heading"><strong>${heading}</strong><button class="text-button complete-figure" data-show-chart="${r.ref}" aria-label="查看${r.ref}完整图">完整图 ↗</button></div>${body}${p.note?`<figcaption>${escapeHTML(p.note)}</figcaption>`:''}</figure>`;
}
