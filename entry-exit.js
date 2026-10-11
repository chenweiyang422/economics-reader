/* Chapter 16.2.2: a single firm's adjustment under free entry and exit. */
function entryExitValues(mode='entry',progress=0){
 const t=Math.max(0,Math.min(100,Number(progress)||0))/100;
 const equilibrium=20+3*Math.sqrt(1600/1.5),initial=mode==='exit'?95:145;
 const a=initial+(equilibrium-initial)*t,q=(a-20)/3,p=a-q,atc=1600/q+20+.5*q,mc=20+q;
 return {t,a,initial,q,p,atc,mc,profit:(p-atc)*q};
}
function entryExitDrawing(mode,progress){
 const v=entryExitValues(mode,progress),X=q=>70+6.8*q,Y=p=>435-2*p;
 const path=(fn,color,dash='',max=90)=>`<path d="${Array.from({length:181},(_,i)=>{const q=1+max*i/180;return `${i?'L':'M'}${X(q)} ${Y(fn(q))}`}).join(' ')}" fill="none" stroke="${color}" stroke-width="3" ${dash?`stroke-dasharray="${dash}"`:''}/>`;
 const label=(q,p,text,color='#544b40')=>`<text x="${X(q)}" y="${Y(p)}" fill="${color}" font-size="18">${text}</text>`;
 const guide=(q,p)=>`<path d="M70 ${Y(p)}H${X(q)}V435" fill="none" stroke="#9c948b" stroke-dasharray="5 5"/>`;
 const loss=v.profit<-.01,color=loss?'#b96252':'#287ac8';
 return `<svg viewBox="0 0 760 500" role="img" aria-label="${mode==='entry'?'企业进入，需求左移':'企业退出，需求右移'}；进度${progress}%；经济利润${v.profit.toFixed(1)}"><defs><clipPath id="entry-exit-clip"><rect x="70" y="35" width="640" height="400"/></clipPath></defs><g font-family="system-ui,sans-serif"><g clip-path="url(#entry-exit-clip)">
 ${v.t<1?`<rect x="70" y="${Y(Math.max(v.p,v.atc))}" width="${X(v.q)-70}" height="${Math.abs(Y(v.p)-Y(v.atc))}" fill="${color}" opacity=".22"/>`:''}
 ${path(q=>v.initial-q,'#a9b8c6','5 6')}${path(q=>v.initial-2*q,'#c5b4d1','5 6')}
 ${path(q=>1600/q+20+.5*q,'#c48b2e')}${path(q=>20+q,'#25856e')}
 ${path(q=>v.a-q,'#287ac8')}${path(q=>v.a-2*q,'#9164b7')}${guide(v.q,v.p)}
 <path d="M70 ${Y(v.atc)}H${X(v.q)}" fill="none" stroke="${color}" stroke-dasharray="4 5"/>
 <circle cx="${X(v.q)}" cy="${Y(v.mc)}" r="5" fill="#9164b7"/><circle cx="${X(v.q)}" cy="${Y(v.p)}" r="6" fill="#287ac8"/>
 </g><path d="M70 35V435H710" stroke="#544b40" stroke-width="2" fill="none"/>
 ${label(0,207,'价格 / 成本 / 收益')}${label(83,-22,'产量 Q')}${label(-4,-12,'0')}
 ${label(80,107,'MC','#25856e')}${label(80,73,'ATC','#c48b2e')}${label(75,v.a-75-5,'D','#287ac8')}${label(53,v.a-106-10,'MR','#9164b7')}
 ${label(v.q,-12,'Q*')}${label(2,v.p+5,'P')}
 <text x="710" y="30" text-anchor="end" font-size="20" fill="${color}">${v.t===1?'长期均衡：P = ATC':mode==='entry'?'企业进入 → 每家企业需求左移':'企业退出 → 留存企业需求右移'}</text></g></svg>`;
}
function entryExitFigure(){return `<figure class="redrawn entry-exit" id="c16-entry-exit" aria-label="企业进入和退出的动态演示" data-mode="entry" data-progress="0"><div class="figure-heading"><strong>进入与退出：利润如何趋向零</strong><span>补充交互演示 · 单个企业</span></div><div class="entry-exit-actions"><button type="button" class="primary" data-ee-mode="entry" aria-pressed="true">盈利 → 企业进入</button><button type="button" class="text-button" data-ee-mode="exit" aria-pressed="false">亏损 → 企业退出</button></div><div class="ee-drawing"></div><div class="ee-legend"><span style="color:#287ac8">━ 需求 D</span><span style="color:#9164b7">━ 边际收益 MR</span><span style="color:#c48b2e">━ 平均总成本 ATC</span><span style="color:#25856e">━ 边际成本 MC</span><span>┄ 初始 D / MR</span></div><label class="model-control"><span>市场调整进度</span><input type="range" min="0" max="100" value="0" aria-label="进入退出调整进度"><output>0%</output></label><div class="entry-exit-actions"><button type="button" class="primary" data-ee-play>播放动画</button><button type="button" class="text-button" data-ee-reset>重置</button></div><div class="ee-stats"></div><p class="ee-explanation"></p><figcaption>阴影面积为经济利润或亏损；每一步均在 MR = MC 处选择产量，再由需求曲线确定价格。自由进入和退出最终使需求曲线与 ATC 相切，经济利润归零。曲线与数值为原理示例，进度不代表真实时间或企业数量；成本保持不变。</figcaption></figure>`}
function updateEntryExit(el,value){
 const v=entryExitValues(el.dataset.mode,value);el.dataset.progress=Math.round(v.t*100);el.querySelector('input').value=el.dataset.progress;el.querySelector('output').textContent=el.dataset.progress+'%';
 el.querySelector('.ee-drawing').innerHTML=entryExitDrawing(el.dataset.mode,Number(el.dataset.progress));
 el.querySelector('.ee-stats').innerHTML=[['价格 P',v.p],['平均总成本',v.atc],['最优产量',v.q],['经济利润',Math.abs(v.profit)<.01?0:v.profit]].map(([k,n])=>`<span>${k}<b>${n.toFixed(1)}</b></span>`).join('');
 el.querySelector('.ee-explanation').textContent=v.t===1?'需求曲线与 ATC 相切，P = ATC：经济利润为零，进入或退出的动力消失。':el.dataset.mode==='entry'?'企业有利润 → 新企业进入 → 每家已有企业的需求减少，D 与 MR 左移 → 利润面积逐渐缩小。':'企业有亏损 → 部分企业退出 → 留存企业的需求增加，D 与 MR 右移 → 亏损面积逐渐缩小。';
}
const entryExitPlayers=new Map();
function stopEntryExit(el){const frame=entryExitPlayers.get(el);if(frame!==undefined)cancelAnimationFrame(frame);entryExitPlayers.delete(el);el.querySelector('[data-ee-play]').textContent=Number(el.dataset.progress)===100?'重新播放':'播放动画'}
function playEntryExit(el){
 if(entryExitPlayers.has(el)){stopEntryExit(el);return}
 const initial=Number(el.dataset.progress)===100?0:Number(el.dataset.progress);
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){updateEntryExit(el,100);stopEntryExit(el);return}
 updateEntryExit(el,initial);el.querySelector('[data-ee-play]').textContent='暂停';let started;
 function tick(time){if(!el.isConnected||document.hidden){stopEntryExit(el);return}started??=time;const next=Math.min(100,Math.round(initial+(time-started)/80));if(next!==Number(el.dataset.progress))updateEntryExit(el,next);if(next===100){stopEntryExit(el);return}entryExitPlayers.set(el,requestAnimationFrame(tick))}
 entryExitPlayers.set(el,requestAnimationFrame(tick));
}
document.addEventListener('input',e=>{const el=e.target.closest('.entry-exit');if(el&&e.target.matches('input[type=range]')){stopEntryExit(el);updateEntryExit(el,e.target.value);stopEntryExit(el)}});
document.addEventListener('click',e=>{const el=e.target.closest('.entry-exit');if(!el)return;const mode=e.target.closest('[data-ee-mode]');if(mode){stopEntryExit(el);el.dataset.mode=mode.dataset.eeMode;for(const b of el.querySelectorAll('[data-ee-mode]')){const active=b===mode;b.setAttribute('aria-pressed',String(active));b.className=active?'primary':'text-button'}updateEntryExit(el,0);stopEntryExit(el)}if(e.target.closest('[data-ee-play]'))playEntryExit(el);if(e.target.closest('[data-ee-reset]')){stopEntryExit(el);updateEntryExit(el,0);stopEntryExit(el)}});
function stopEntryExitPlayers(){for(const el of entryExitPlayers.keys())stopEntryExit(el)}
document.addEventListener('visibilitychange',()=>{if(document.hidden)stopEntryExitPlayers()});window.addEventListener('pagehide',stopEntryExitPlayers);
// Fill initial content directly so navigation needs no observer or extra lifecycle hook.
const entryExitShell=entryExitFigure;
entryExitFigure=function(){const v=entryExitValues();return entryExitShell().replace('<div class="ee-drawing"></div>',`<div class="ee-drawing">${entryExitDrawing('entry',0)}</div>`).replace('<div class="ee-stats"></div>',`<div class="ee-stats">${[['价格 P',v.p],['平均总成本',v.atc],['最优产量',v.q],['经济利润',v.profit]].map(([k,n])=>`<span>${k}<b>${n.toFixed(1)}</b></span>`).join('')}</div>`).replace('<p class="ee-explanation"></p>','<p class="ee-explanation">企业有利润 → 新企业进入 → 每家已有企业的需求减少，D 与 MR 左移 → 利润面积逐渐缩小。</p>')};
