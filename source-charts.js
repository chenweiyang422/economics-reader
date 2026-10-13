/* Textbook figures are keyed by identity, never inferred from a chapter/topic. */
const SOURCE_CHARTS=Object.fromEntries(TEXTBOOK_CHART_MANIFEST.entries.filter(r=>r.volume===VOLUME).map(r=>[r.id,r]));
const sourceHidden=new Set(TEXTBOOK_CHART_MANIFEST.hiddenBlocks);
for(const chapter of BOOK){
 const additions=Object.values(SOURCE_CHARTS).filter(r=>r.chapterIndex===chapter.number);
 const make=r=>({id:r.id,type:'figure',text:[r.ref,r.title].filter(Boolean).join(' · '),page:r.page,sourceFigureId:r.id});
 chapter.blocks=chapter.blocks.flatMap(b=>{
  if(sourceHidden.has(b.id))return [];
  if(TEXTBOOK_CHART_MANIFEST.textRepairs[b.id])b={...b,text:TEXTBOOK_CHART_MANIFEST.textRepairs[b.id]};
  const replacement=additions.find(r=>r.replace===b.id);
  const body=replacement?make(replacement):SOURCE_CHARTS[b.id]?{...b,type:'figure',sourceFigureId:b.id}:b;
  return [...additions.filter(r=>r.before===b.id).map(make),body,...additions.filter(r=>r.after===b.id).map(make)];
 });
 if(chapter.toc)chapter.toc=chapter.toc.filter(b=>!sourceHidden.has(b.id));
}
for(const r of Object.values(SOURCE_CHARTS))if(r.ref)FIGURE_REFERENCES[r.ref]={volume:VOLUME,id:r.id,chapter:r.chapterIndex};
const supplementaryFigure=redrawnFigure;
function textbookFigure(r,id){
 if(r.id==='c21-b150')return giffenFigure(r,id);
 if(r.id==='c21-b118'||r.id==='c21-b124')return choiceChangeFigure(r,id);
 if(r.id==='c21-b114')return incomeChoiceFigure(r,id);
 if(r.id==='c15-b124')return priceDiscriminationFigure(r,id);
 if(r.id==='c15-b78')return drugMarketFigure(r,id);
 const heading=[r.ref,r.title].filter(Boolean).join(' · ');
 let body=r.method==='table'?(r.sections?r.sections.map(s=>`<section class="table-step"><h3>${escapeHTML(s.title)}</h3>${s.rows?tableHTML(s.rows):`<p>${escapeHTML(s.text)}</p>`}</section>`).join(''):tableHTML(r.rows)):r.method==='typeset'?supplementaryFigure({...BOOK[r.chapterIndex-1].blocks.find(b=>b.id===r.id),id:r.id},r.chapterIndex):`<button class="source-chart-zoom" data-source-zoom="${r.id}" aria-label="放大${escapeHTML(heading)}"><img class="textbook-chart" src="${r.asset}?v=20261010-redraw" width="${r.width}" height="${r.height}" loading="lazy" alt="${escapeHTML(heading)}"></button>`;
 if(r.method==='typeset')return body.replace(`id="${r.id}"`,`id="${id}"`);
 if(r.verifiedModel){const modelId=id+'-verified';DIAGRAM_OVERRIDES[modelId]=r.verifiedModel;const primary=supplementaryFigure({id:modelId,text:r.title},r.chapterIndex).replace(/<div class="figure-heading">[\s\S]*?<\/div>/,'');body=primary+`<details class="source-interactive"><summary>教材图形重绘对照</summary>${body}</details>`;}
 const models={'c13-b64':'cost','c14-b48':'competitiveSupply','c14-b74':'profit','c14-b82':'fixedMarketSupply','c14-b90':'longRunSupply','c14-b99':'demandShortLongRun'};const model=models[r.id];let extra='';if(model&&!r.verifiedModel){const modelId=id+'-interactive';DIAGRAM_OVERRIDES[modelId]=model;extra=`<details class="source-interactive"><summary>交互演示（补充模型）</summary>${supplementaryFigure({id:modelId,text:r.title},r.chapterIndex)}</details>`;}
 return `<figure id="${id}" class="redrawn source-chart" data-source-chart="${r.id}" data-source-panels="${r.panels}"><div class="figure-heading"><strong>${escapeHTML(heading)}</strong></div>${body}${r.caption||r.note?`<figcaption>${escapeHTML(r.caption||r.note)}</figcaption>`:''}${extra}</figure>`;
}
redrawnFigure=function(b,n){
 const r=SOURCE_CHARTS[b.sourceFigureId||b.id];
 if(r&&b.sourcePanel!==undefined)return readingPanelFigure(r,b);
 if(r){const figure=textbookFigure(r,b.id);return b.id==='c20-b23'&&typeof incomeComparison==='function'?incomeComparison(figure):figure;}
 // Generated supplemental models have no original textbook block identity.
 if(BOOK.some(c=>c.blocks.some(original=>original.id===b.id&&original.type==='figure')))throw new Error('Unregistered textbook figure: '+b.id);
 return supplementaryFigure(b,n);
};
// A chart must match the concept; mere presence in the current section is not evidence.
function sourceForConcept(term,chapter,section){
 const inSection=(section?.blocks||[]).filter(b=>SOURCE_CHARTS[b.sourceFigureId||b.id]).map(b=>SOURCE_CHARTS[b.sourceFigureId||b.id]).filter((r,i,a)=>a.indexOf(r)===i);
 const exact={
 'micro:13:边际成本':'图13-4','micro:13:平均总成本':'图13-4','micro:13:平均可变成本':'图13-4','micro:13:平均固定成本':'图13-4',
 'micro:14:边际成本':'图14-2','micro:14:平均总成本':'图14-2','micro:14:平均可变成本':'图14-2',
 'micro:17:囚徒困境':'图17-1','micro:17:占优策略':'图17-1','micro:17:纳什均衡':'图17-1',
 'micro:21:完全替代品':'图21-5','micro:21:完全互补品':'图21-5','micro:21:收入效应':'图21-10','micro:21:替代效应':'图21-10'
 }[`${VOLUME}:${chapter}:${term}`];
 if(exact)return SOURCE_CHARTS[FIGURE_REFERENCES[exact]?.id]||null;
 const candidates=inSection.filter(r=>r.title.includes(term));
 if(candidates.length===1)return candidates[0];
 const chapterMatches=Object.values(SOURCE_CHARTS).filter(r=>r.chapterIndex===chapter&&r.title.includes(term));
 if(chapterMatches.length===1)return chapterMatches[0];
 return null;
}
document.addEventListener('click',e=>{const b=e.target.closest('[data-source-zoom]');if(!b)return;const full=SOURCE_CHARTS[b.dataset.sourceZoom];const part=b.dataset.sourcePanel===undefined?null:READING_PANEL_DATA[full.id]?.parts[Number(b.dataset.sourcePanel)];const r=part?{...full,...part,title:full.title+'（'+part.label+'）'}:full;modal([r.ref,r.title].filter(Boolean).join(' · '),'教材图表',`<div class="source-zoom-toolbar"><button class="text-button" data-figure-scale="-25" aria-label="缩小图表">−</button><output id="figureZoomValue">100%</output><button class="text-button" data-figure-scale="25" aria-label="放大图表">＋</button></div><div class="source-zoom-scroll" data-zoom="100"><img src="${r.asset}?v=20261010-redraw" width="${r.width}" height="${r.height}" alt="${escapeHTML(r.title)}"></div>`)});

document.addEventListener('click',e=>{const b=e.target.closest('[data-figure-scale]');if(!b)return;const container=document.querySelector('.source-zoom-scroll');if(!container)return;const scale=Math.max(100,Math.min(300,Number(container.dataset.zoom)+Number(b.dataset.figureScale)));container.dataset.zoom=scale;container.querySelector('img').style.width=scale+'%';document.getElementById('figureZoomValue').textContent=scale+'%'});
