/* Hicks decomposition: meat on x, potatoes on y. Illustrative units, not observations. */
MODEL_NAMES.giffenChoice='图21-12 · 吉芬物品：两种效应的角力';
MODEL_CONFIG.giffenChoice=['分解进度',0,100,0,'%'];
function giffenValues(value=0){
 const progress=Math.max(0,Math.min(100,Number(value)||0)),a={x:4,y:4.5},b={x:2+Math.sqrt(7.2),y:2.25+4.5/Math.sqrt(7.2)},c={x:.4,y:4.75};
 const f=Math.min(1,progress/50),g=Math.max(0,(progress-50)/50),slope=1.125+(.625-1.125)*f;
 const x=progress<=50?2+Math.sqrt(4.5/slope):b.x+(c.x-b.x)*g;
 const y=progress<=50?2.25+4.5/(x-2):b.y+(c.y-b.y)*g;
 return {progress,a,b,c,x,y,slope,sub:b.y-a.y,income:c.y-b.y,total:c.y-a.y,phase:progress===0?'原选择 A':progress<=50?'① 替代效应：A → B':'② 收入效应：B → C'};
}
function giffenDiagram(value=0){
 const v=giffenValues(value),{a,b,c,progress}=v,blue='#287ac8',red='#b95a65',green='#28846c',ink='#544b40',muted='#988c7c';
 const X=x=>110+82*x,Y=y=>440-48*y;
 const text=(x,y,t,col=ink,size=23,anchor='start')=>`<text x="${x}" y="${y}" fill="${col}" font-size="${size}" text-anchor="${anchor}">${t}</text>`;
 const line=(pts,col=ink,dash='',w=2)=>`<path d="${pts.map(([x,y],i)=>`${i?'L':'M'}${X(x)} ${Y(y)}`).join(' ')}" fill="none" stroke="${col}" stroke-width="${w}" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
 const curve=(fn,min,max,col)=>line(Array.from({length:121},(_,i)=>{const x=min+(max-min)*i/120;return [x,fn(x)]}).filter(([x,y])=>y>=0&&y<=7.3),col,'',3);
 const budget=(intercept,slope,col,dash='')=>line([[Math.max(0,(intercept-7.2)/slope),Math.min(intercept,7.2)],[Math.min(8.8,intercept/slope),Math.max(0,intercept-8.8*slope)]],col,dash);
 const point=(p,label,col,dx=10,dy=-13)=>`<circle cx="${X(p.x)}" cy="${Y(p.y)}" r="6" fill="${col}"/>${text(X(p.x)+dx,Y(p.y)+dy,label,col)}`;
 const arrow=(from,to,y,col)=>{const x1=X(from),x2=X(to),d=x2>x1?1:-1;return `<path d="M${x1} ${y}H${x2}m${-d*11} -7l${d*11} 7l${-d*11} 7" stroke="${col}" fill="none" stroke-width="3"/>`};
 const currentSub=progress<=50?v.y-a.y:v.sub,currentIncome=progress<=50?0:v.y-b.y;
 const bar=(y,label,delta,col)=>`${text(110,y+7,label,col,22)}<line x1="490" y1="${y}" x2="${490+delta*250}" y2="${y}" stroke="${col}" stroke-width="12"/>${text(790,y+7,(delta>0?'+':'')+delta.toFixed(2),col,23)}`;
 const svg=`<svg class="model-svg" viewBox="0 0 1000 780" role="img" aria-label="${v.phase}。替代效应减少土豆${(-currentSub).toFixed(2)}，收入效应增加土豆${currentIncome.toFixed(2)}。" xmlns="http://www.w3.org/2000/svg"><title>吉芬物品的替代效应与收入效应</title><g font-family="-apple-system,BlinkMacSystemFont,PingFang SC,Arial,sans-serif">
 ${text(110,35,'土豆数量（示意单位）')}${text(885,69,v.phase,progress<=50?blue:red,24,'end')}
 ${line([[0,7.3],[0,0],[8.8,0]])}${[0,2,4,6,8].map(x=>text(X(x),468,x,ink,19,'middle')).join('')}${[2,4,6].map(y=>text(92,Y(y)+6,y,ink,19,'end')).join('')}${text(850,503,'肉的数量',ink,22,'end')}
 ${text(700,112,'I₁：原效用',blue,21)}${progress>50?text(700,141,'I₂：较低效用',green,21):''}
 ${budget(9,1.125,ink)}${curve(x=>4.5/(x-2)+2.25,2.89,8.8,blue)}
 ${progress>0?budget(5,.625,green)+budget(b.y+.625*b.x,.625,red,'9 6'):''}
 ${progress>50?curve(x=>18.225/(x+5)+1.375,0,8.8,green):''}
 ${point(a,'A',ink,-25,28)}${progress>0?point(b,'B',blue,12,26):''}${progress>50?point(c,'C',green,12,-18):''}
 ${progress>0&&progress<100?`<circle cx="${X(v.x)}" cy="${Y(v.y)}" r="10" stroke="white" stroke-width="3" fill="${progress<=50?blue:red}"/>`:''}
 ${text(110,548,'灰线：原预算',ink,20)}${text(350,548,'绿线：涨价后预算',green,20)}${text(640,548,'红虚线：补偿预算',red,20)}
 ${text(110,581,'土豆消费的变化：向左减少，向右增加',muted,20)}<path d="M490 600V735" stroke="${muted}" stroke-dasharray="3 4"/>
 ${bar(620,'替代效应 A → B',currentSub,blue)}${bar(665,'收入效应 B → C',currentIncome,red)}${bar(710,'合计 A → 当前',currentSub+currentIncome,green)}${text(490,760,'0',muted,18,'middle')}
 </g></svg>`;
 const note=progress===0?'土豆价格从 1 涨到 1.8，肉价保持 1.125，收入保持 9。先看原选择 A：土豆 4.50、肉 4.00。':progress<=50?'先假想补偿购买力，保持原效用：新价格下，补偿预算与原无差异曲线相切于 B。土豆相对变贵，替代效应使土豆消费减少。B 是分析用的假想选择。':'再撤去补偿，预算线平行内移到绿色实际预算。土豆是强低档物品，购买力下降使土豆消费增加。收入效应 +0.82 超过替代效应 −0.57，最终净增 0.25，形成吉芬现象。';
 return {svg,stats:[['土豆数量',v.y.toFixed(2)],['肉的数量',v.x.toFixed(2)],['替代效应',currentSub.toFixed(2)],['收入效应','+'+currentIncome.toFixed(2)],['净变化',(v.y-a.y>=0?'+':'')+(v.y-a.y).toFixed(2)]],note:note+' 数值为教学示例；分解用于比较选择，动画过渡点不表示实际逐期决策。'};
}
const diagramBeforeGiffen=diagram;
diagram=function(kind,value){return kind==='giffenChoice'?giffenDiagram(value):diagramBeforeGiffen(kind,value)};
function giffenFigure(r,id){const d=giffenDiagram();return `<figure id="${id}" class="redrawn source-chart" data-source-chart="${r.id}"><div class="figure-heading"><strong>图21-12 · 吉芬物品</strong><span>替代效应与收入效应如何角力</span></div><div class="inline-model" data-model="giffenChoice" data-value="0"><div style="display:flex;gap:10px;flex-wrap:wrap;margin:12px 0"><button type="button" class="primary" data-giffen-play>播放变化</button><button type="button" class="text-button" data-giffen-stage="0">原选择 A</button><button type="button" class="text-button" data-giffen-stage="50">替代效应 A → B</button><button type="button" class="text-button" data-giffen-stage="100">收入效应 B → C</button></div><label class="model-control"><span>分解进度</span><input type="range" min="0" max="100" step="1" value="0" aria-label="吉芬物品效应分解进度"><output>0%</output></label><div class="model-drawing">${d.svg}</div><div class="model-stats" style="display:grid;grid-template-columns:repeat(auto-fit,minmax(85px,1fr))">${d.stats.map(([a,b])=>`<span>${a}<b>${b}</b></span>`).join('')}</div><button type="button" class="model-reset text-button">重置</button><div class="model-note">${d.note}</div></div></figure>`}

const giffenChoicePlayers=new Map();
function stopGiffenChoice(el){
 const state=giffenChoicePlayers.get(el);if(state)cancelAnimationFrame(state.raf);
 giffenChoicePlayers.delete(el);
 const button=el.querySelector('[data-giffen-play]');if(button)button.textContent=Number(el.dataset.value)>=100?'重新播放':'播放变化';
}
function playGiffenChoice(el){
 if(giffenChoicePlayers.has(el)){stopGiffenChoice(el);return}
 const start=Number(el.dataset.value)>=100?0:Number(el.dataset.value);
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){updateModel(el,start<50?50:100);stopGiffenChoice(el);return}
 updateModel(el,start);const state={raf:0,started:null};giffenChoicePlayers.set(el,state);el.querySelector('[data-giffen-play]').textContent='暂停';
 function tick(time){
  if(!el.isConnected||document.hidden||(el.closest('dialog')&&!el.closest('dialog').open)){stopGiffenChoice(el);return}
  if(state.started===null)state.started=time;
  const progress=Math.min(100,start+(time-state.started)/120);
  if(Math.round(progress)!==Number(el.dataset.value))updateModel(el,progress);
  if(progress>=100){stopGiffenChoice(el);return}
  state.raf=requestAnimationFrame(tick);
 }
 state.raf=requestAnimationFrame(tick);
}
document.addEventListener('input',e=>{const el=e.target.closest('[data-model="giffenChoice"]');if(el){stopGiffenChoice(el);el.querySelector('[data-giffen-play]').textContent=Number(e.target.value)>=100?'重新播放':'播放变化'}},true);
document.addEventListener('click',e=>{
 const el=e.target.closest('[data-model="giffenChoice"]');if(!el)return;
 if(e.target.closest('[data-giffen-play]'))playGiffenChoice(el);
 const preset=e.target.closest('[data-giffen-stage]');if(preset){stopGiffenChoice(el);updateModel(el,Number(preset.dataset.giffenStage));stopGiffenChoice(el)}
 if(e.target.closest('.model-reset')){stopGiffenChoice(el);el.querySelector('[data-giffen-play]').textContent='播放变化'}
},true);
function stopAllGiffenChoice(){for(const el of [...giffenChoicePlayers.keys()])stopGiffenChoice(el)}
window.addEventListener('pagehide',stopAllGiffenChoice);
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopAllGiffenChoice()});
