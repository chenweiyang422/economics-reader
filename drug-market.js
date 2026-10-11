/* Figure 15-6: fixed textbook curves, with a movable price/output point. */
MODEL_NAMES.drugMarket='图15-6 · 药品市场';
MODEL_CONFIG.drugMarket=['从垄断产量移向竞争产量',0,100,0,'%'];
function drugMarketValues(progress=0){
 const t=Math.max(0,Math.min(100,Number(progress)||0))/100;
 const q=4+4*t,p=12-q,mc=4;
 return {t,q,p,mc,mr:12-2*q};
}
function drugMarketDiagram(progress=0){
 const {t,q,p,mc}=drugMarketValues(progress);
 const ink='#544b40',blue='#287ac8',red='#b45a60',gold='#b97819',green='#25856e',muted='#a29889';
 const X=q=>170+65*q,Y=p=>470-32*p;
 const line=(x1,y1,x2,y2,color,width=2,dash='')=>`<path d="M${X(x1)} ${Y(y1)}L${X(x2)} ${Y(y2)}" fill="none" stroke="${color}" stroke-width="${width}" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
 const text=(x,y,label,color=ink,anchor='start',size=22)=>`<text x="${x}" y="${y}" fill="${color}" text-anchor="${anchor}" font-size="${size}">${label}</text>`;
 const dot=(x,y,color,r=5)=>`<circle cx="${X(x)}" cy="${Y(y)}" r="${r}" fill="${color}"/>`;
 const phase=t===0?'垄断：MR = MC':t===1?'竞争：P = MC':'向竞争产量移动';
 const svg=`<svg class="model-svg" viewBox="0 0 1040 565" role="img" aria-label="图15-6 药品市场：${phase}，产量${q.toFixed(2)}，价格${p.toFixed(2)}" xmlns="http://www.w3.org/2000/svg">
 <g font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Arial,sans-serif">
 ${line(0,0,11.7,0,ink)}${line(0,0,0,12.7,ink)}
 ${text(160,38,'成本和收益',ink,'end')}${text(930,510,'产量',ink,'end')}${text(151,499,'O',ink,'end',20)}
 ${line(4,0,4,8,muted,1.5,'5 6')}${line(8,0,8,4,muted,1.5,'5 6')}${line(0,8,4,8,muted,1.5,'5 6')}
 ${text(154,Y(8)+7,'专利期内的价格',ink,'end',19)}${text(154,Y(4)+7,'专利到期后的价格',ink,'end',17)}
 ${text(X(4),505,'垄断产量',ink,'middle',21)}${text(X(8),505,'竞争产量',ink,'middle',21)}
 ${line(0,12,9.8,2.2,blue,3.5)}${text(X(9.8)+12,Y(2.2)+7,'需求',blue)}
 ${line(0,12,5.7,.6,red,3.5)}${text(X(5.7)+12,Y(.6)+7,'边际收益',red)}
 ${line(0,4,10,4,gold,3.5)}${text(X(10)+12,Y(4)+7,'边际成本',gold)}
 ${dot(4,8,ink)}${dot(4,4,ink)}${dot(8,4,ink)}
 ${line(0,p,q,p,green,2,'7 5')}${line(q,0,q,p,green,2,'7 5')}
 <circle cx="${X(q)}" cy="${Y(p)}" r="10" fill="white" stroke="${green}" stroke-width="3"/>
 ${dot(q,p,green,4)}${text(X(q)+17,Y(p)-15,'当前',green,'start',20)}
 ${text(750,65,phase,green,'middle',23)}
 </g></svg>`;
 return {svg,stats:[['示例产量 Q',q.toFixed(2)],['示例价格 P',p.toFixed(2)],['边际成本 MC',mc.toFixed(2)],['价格高于边际成本',(p-mc).toFixed(2)]],note:'拖动滑条，观察产量增加、价格沿需求曲线下降。左端：MR = MC；右端：P = MC。中间位置仅演示价格与产量的变化，不代表时间或竞争程度。示例采用 P = 12 − Q、MR = 12 − 2Q、MC = 4；原书没有数值刻度。'};
}
const diagramBeforeDrugMarket=diagram;
diagram=function(kind,value){return kind==='drugMarket'?drugMarketDiagram(value):diagramBeforeDrugMarket(kind,value)};
function drugMarketFigure(r,id){
 const d=drugMarketDiagram();
 return `<figure id="${id}" class="redrawn source-chart" data-source-chart="${r.id}"><div class="figure-heading"><strong>图15-6 · 药品市场</strong><span>拖动滑条观察变化</span></div><div class="inline-model" data-model="drugMarket" data-value="0"><div class="model-drawing">${d.svg}</div><label class="model-control"><span>从垄断产量移向竞争产量</span><input aria-label="从垄断产量移向竞争产量" type="range" min="0" max="100" step="1" value="0"><output>0%</output></label><button class="model-reset text-button">重置</button><div class="model-stats">${d.stats.map(([a,b])=>`<span>${a}<b>${b}</b></span>`).join('')}</div><div class="model-note">${d.note}</div></div></figure>`;
}
