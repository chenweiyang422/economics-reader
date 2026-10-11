/* Figure 15-9, adapted from the user's two-stage interactive reference. */
MODEL_NAMES.priceDiscrimination='图15-9 · 有价格歧视和无价格歧视时的福利';
MODEL_CONFIG.priceDiscrimination=['变化进度',0,100,0,'%'];
function priceDiscriminationValues(value=0){
 const progress=Math.max(0,Math.min(100,Number(value)||0));
 const f=Math.min(1,progress/50),g=Math.max(0,(progress-50)/50),q=40+40*g;
 const cs=800*(1-f),dwl=800*(1-g)**2,profit=3200-cs-dwl,total=3200-dwl;
 const stage=progress===0?'（a）统一定价':progress<50?'① 消费者剩余转为利润':progress===50?'① 原有消费者剩余全部转为利润':progress<100?'② 扩大销量，消除无谓损失':'（b）完全价格歧视';
 return {progress,f,g,q,cs,dwl,profit,total,stage};
}
function priceDiscriminationDiagram(value=0){
 const v=priceDiscriminationValues(value),{progress,f,q,stage}=v;
 const ink='#544b40',muted='#a29889',blue='#287ac8',orange='#dc892e',green='#25856e',purple='#9164b7';
 const X=q=>100+7.3*q,Y=p=>480-p*3.7;
 const line=(pts,color=ink,width=2,dash='')=>`<path d="${pts.map(([q,p],i)=>`${i?'L':'M'}${X(q)} ${Y(p)}`).join(' ')}" fill="none" stroke="${color}" stroke-width="${width}" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
 const poly=(pts,color)=>`<polygon points="${pts.map(([q,p])=>`${X(q)},${Y(p)}`).join(' ')}" fill="${color}" fill-opacity=".28"/>`;
 const text=(x,y,label,color=ink,size=22,anchor='start')=>`<text x="${x}" y="${y}" fill="${color}" font-size="${size}" text-anchor="${anchor}">${label}</text>`;
 let areas='';
 if(progress<=50){areas=poly([[0,20],[40,20],[40,60],[0,60+40*f]],blue)+poly([[0,60+40*f],[40,60],[0,100]],orange)+poly([[40,20],[80,20],[40,60]],green)}
 else areas=poly([[0,20],[q,20],[q,100-q],[0,100]],blue)+poly([[q,20],[80,20],[q,100-q]],green);
 const frontier=progress>0&&progress<50?line([[0,60+40*f],[40,60]],blue,3):progress>=50?line([[0,100],[q,100-q]],blue,4):'';
 const svg=`<svg class="model-svg" viewBox="0 0 1000 590" role="img" aria-label="图15-9，${stage}，产量${q.toFixed(1)}，利润${v.profit.toFixed(0)}，消费者剩余${v.cs.toFixed(0)}，无谓损失${v.dwl.toFixed(0)}" xmlns="http://www.w3.org/2000/svg"><title>从统一定价到完全价格歧视</title><g font-family="-apple-system,BlinkMacSystemFont,Segoe UI,Arial,sans-serif">
 ${text(100,33,'价格 / 成本 / 边际收益（示例）')}${text(950,75,stage,blue,23,'end')}
 ${areas}${line([[0,0],[100,0]],ink)}${line([[0,0],[0,110]],ink)}
 ${[0,40,80].map(n=>text(X(n),511,n,ink,20,'middle')).join('')}${[20,60,100].map(n=>text(84,Y(n)+7,n,ink,20,'end')).join('')}
 ${line([[0,100],[100,0]],ink,3)}${line([[0,20],[100,20]],ink,3)}
 ${line([[0,100],[50,0]],purple,2.5,'8 6')}${text(X(24)-50,Y(43),'MR₁',purple)}
 ${progress===0?line([[0,60],[40,60]],muted,2,'6 5')+`<circle cx="${X(40)}" cy="${Y(20)}" r="5" fill="${purple}"/>`:''}
 ${frontier}${progress===100?line([[0,100],[100,0]],purple,3,'12 5'):''}
 ${line([[q,0],[q,100-q]],muted,2,'6 5')}<circle cx="${X(q)}" cy="${Y(100-q)}" r="6" fill="${blue}"/>
 ${text(X(99),Y(20)-13,'MC = ATC',ink,21,'end')}${text(X(63),Y(48),progress===100?'D = MR₂':'需求 D',ink,23)}
 ${text(835,552,'数量（示例）',ink,22,'end')}
 </g></svg>`;
 const phase=progress<50?'先保持销量不变，让原有消费者剩余逐步转为企业利润。':progress<100?'原有消费者剩余已转为利润；继续扩大销量，把原来的无谓损失转为新增利润。':'完全价格歧视下，MR₂ 与需求曲线重合，在 MR₂ = MC 处生产；消费者剩余和无谓损失均为零。';
 return {svg,stats:[['利润',v.profit.toFixed(0)],['消费者剩余',v.cs.toFixed(0)],['无谓损失',v.dwl.toFixed(0)],['产量 Q',q.toFixed(1)],['总剩余',v.total.toFixed(0)]],note:phase+' 紫色虚线 MR₁ 保留统一定价情形作参照。中间过程为面积变化示意，不表示一种确定的最优定价制度。示例：P = 100 − Q，MR₁ = 100 − 2Q，MC = ATC = 20；原书没有数值刻度。'};
}
const diagramBeforePriceDiscrimination=diagram;
diagram=function(kind,value){return kind==='priceDiscrimination'?priceDiscriminationDiagram(value):diagramBeforePriceDiscrimination(kind,value)};
function priceDiscriminationFigure(r,id){
 const d=priceDiscriminationDiagram();
 return `<figure id="${id}" class="redrawn source-chart" data-source-chart="${r.id}"><div class="figure-heading"><strong>图15-9 · 有价格歧视和无价格歧视时的福利</strong><span>从统一定价到完全价格歧视</span></div><div class="inline-model" data-model="priceDiscrimination" data-value="0"><div style="display:flex;gap:12px;flex-wrap:wrap;margin:12px 0"><button type="button" class="primary" data-pd-play>播放变化</button><button type="button" class="text-button" data-pd-stage="0">统一定价</button><button type="button" class="text-button" data-pd-stage="50">剩余转移完成</button><button type="button" class="text-button" data-pd-stage="100">完全价格歧视</button></div><label class="model-control"><span>变化进度</span><input type="range" aria-label="价格歧视变化进度" min="0" max="100" step="1" value="0"><output>0%</output></label><div class="model-drawing">${d.svg}</div><div style="display:flex;gap:18px;flex-wrap:wrap;font-size:14px"><span style="color:#287ac8">■ 利润</span><span style="color:#b66b16">■ 消费者剩余</span><span style="color:#25856e">■ 无谓损失</span><span style="color:#9164b7">┄ 统一定价 MR₁（参照）</span></div><div class="model-stats" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(90px,1fr))">${d.stats.map(([a,b])=>`<span>${a}<b>${b}</b></span>`).join('')}</div><button class="model-reset text-button" type="button">重置</button><div class="model-note">${d.note}</div></div></figure>`;
}
// Each main/sidebar/modal figure has independent playback and slider state.
const priceDiscriminationPlayers=new Map();
function stopPriceDiscrimination(el){
 const state=priceDiscriminationPlayers.get(el);if(state)cancelAnimationFrame(state.raf);
 priceDiscriminationPlayers.delete(el);
 const button=el.querySelector('[data-pd-play]');if(button)button.textContent=Number(el.dataset.value)>=100?'重新播放':'播放变化';
}
function playPriceDiscrimination(el){
 if(priceDiscriminationPlayers.has(el)){stopPriceDiscrimination(el);return}
 const start=Number(el.dataset.value)>=100?0:Number(el.dataset.value);
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){updateModel(el,start<50?50:100);stopPriceDiscrimination(el);return}
 updateModel(el,start);const state={raf:0,started:null};priceDiscriminationPlayers.set(el,state);el.querySelector('[data-pd-play]').textContent='暂停';
 function tick(time){
  if(!el.isConnected||document.hidden||(el.closest('dialog')&&!el.closest('dialog').open)){stopPriceDiscrimination(el);return}
  if(state.started===null)state.started=time;
  const progress=Math.min(100,start+(time-state.started)/120);
  if(Math.round(progress)!==Number(el.dataset.value))updateModel(el,progress);
  if(progress>=100){stopPriceDiscrimination(el);return}
  state.raf=requestAnimationFrame(tick);
 }
 state.raf=requestAnimationFrame(tick);
}
document.addEventListener('input',e=>{const el=e.target.closest('[data-model="priceDiscrimination"]');if(el){stopPriceDiscrimination(el);el.querySelector('[data-pd-play]').textContent=Number(e.target.value)>=100?'重新播放':'播放变化'}},true);
document.addEventListener('click',e=>{
 const el=e.target.closest('[data-model="priceDiscrimination"]');if(!el)return;
 if(e.target.closest('[data-pd-play]'))playPriceDiscrimination(el);
 const preset=e.target.closest('[data-pd-stage]');if(preset){stopPriceDiscrimination(el);updateModel(el,Number(preset.dataset.pdStage));stopPriceDiscrimination(el)}
 if(e.target.closest('.model-reset')){stopPriceDiscrimination(el);el.querySelector('[data-pd-play]').textContent='播放变化'}
},true);
function stopAllPriceDiscrimination(){for(const el of [...priceDiscriminationPlayers.keys()])stopPriceDiscrimination(el)}
window.addEventListener('pagehide',stopAllPriceDiscrimination);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAllPriceDiscrimination()});
