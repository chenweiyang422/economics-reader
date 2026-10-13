/* Fixed preferences U=x+100 ln(y+250); income=1000, pizza price=10.
   Interior optima throughout p in [1,2]: y=1000/p-250, x=25p. */
function demandDerivationValues(price){const p=Math.max(1,Math.min(2,Number(price)||2)),q=1000/p-250,x=25*p;return {p,q,x,u:x+100*Math.log(q+250)};}
function demandDerivationPlots(price){
 const v=demandDerivationValues(price),fmt=n=>Number(n.toFixed(1));
 const Q=q=>70+q*.6,X=x=>420-x*3.3,P=p=>420-p*132;
 const path=points=>points.map(([x,y],i)=>`${i?'L':'M'}${x.toFixed(2)} ${y.toFixed(2)}`).join(' ');
 const curve=path(Array.from({length:501},(_,i)=>{const q=i*2,x=v.u-100*Math.log(q+250);return [Q(q),X(x)];}).filter(([x,y])=>y>=90&&y<=420));
 const demand=path(Array.from({length:121},(_,i)=>{const a=demandDerivationValues(2-(2-v.p)*i/120);return [Q(a.q),P(a.p)];}));
 return `<svg viewBox="0 0 760 500" role="img" aria-label="合并图：共用百事可乐数量横轴，左轴为比萨饼数量，右轴为价格。当前最优购买${fmt(v.q)}升，以同一数量对应到${v.p.toFixed(2)}美元的需求点。"><g fill="#655742" font-family="system-ui,sans-serif" font-size="16">
 <text x="70" y="30" fill="#2b8570">比萨饼（个）</text><text x="670" y="30" text-anchor="end" fill="#a34d72">价格（美元/升）</text>
 <path d="M70 90V420H670V90" fill="none" stroke="#796c5a" stroke-width="1.5"/>
 ${[0,250,500,750,1000].map(q=>`<text x="${Q(q)}" y="448" text-anchor="middle">${q}</text>`).join('')}
 ${[0,25,50,75,100].map(x=>`<text x="58" y="${X(x)+5}" text-anchor="end" fill="#2b8570">${x}</text>`).join('')}
 ${[0,.5,1,1.5,2,2.5].map(p=>`<text x="684" y="${P(p)+5}" fill="#a34d72">${p}</text>`).join('')}
 <text x="370" y="484" text-anchor="middle">百事可乐数量（升） · 两种关系共用横轴</text>
 <path d="M70 90L${Q(500)} 420" stroke="#ab987c" stroke-dasharray="6 6" fill="none"/>
 <path d="M70 90L${Q(1000/v.p)} 420" stroke="#3476aa" stroke-width="3" fill="none"/>
 <path d="${curve}" stroke="#2b8570" stroke-width="3" fill="none"/>
 <path d="${demand}" stroke="#a34d72" stroke-width="4" fill="none"/>
 <path d="M70 ${X(v.x)}H${Q(v.q)}V420" stroke="#2b8570" stroke-dasharray="4 5" fill="none" opacity=".65"/>
 <path d="M${Q(v.q)} ${P(v.p)}H670" stroke="#a34d72" stroke-dasharray="4 5" fill="none" opacity=".65"/>
 <path d="M${Q(v.q)} ${X(v.x)-8}V${P(v.p)+10}" stroke="#a34d72" stroke-width="2" fill="none"/>
 <path d="M${Q(v.q)-5} ${P(v.p)+15}L${Q(v.q)} ${P(v.p)+7}L${Q(v.q)+5} ${P(v.p)+15}" fill="none" stroke="#a34d72" stroke-width="2"/>
 <circle cx="${Q(v.q)}" cy="${X(v.x)}" r="6" fill="#2b8570"/>
 <circle cx="${Q(v.q)}" cy="${P(v.p)}" r="6" fill="#a34d72"/>
 <text x="${Q(v.q)+12}" y="${X(v.x)+24}" fill="#2b8570">最优组合</text>
 <text x="${Q(v.q)+12}" y="${P(v.p)-15}" fill="#a34d72">需求点</text>
 <text x="${Q(v.q)-12}" y="${(X(v.x)+P(v.p))/2+5}" text-anchor="end" font-size="14">同一购买量</text>
 </g></svg>`;
}
function demandDerivationFigure(){return `<figure class="demand-derivation" id="c21-demand-derivation"><div class="figure-heading"><strong>联动演示 · 从消费者选择到需求曲线</strong></div><p>拖动滑块或点击播放：绿点表示预算线与无差异曲线相切的最优组合，箭头将同一购买量对应到紫色需求点。价格连续下降，紫点便逐步画出需求曲线。</p><div class="dd-plots">${demandDerivationPlots(2)}</div><div class="dd-legend"><span>蓝线：预算线（读左轴）</span><span>绿线：无差异曲线（读左轴）</span><span>紫线：需求曲线（读右轴）</span></div><label class="dd-control"><span>百事可乐价格</span><input type="range" min="1" max="2" step="0.01" value="2" aria-label="百事可乐价格（美元每升）"><output>2.00 美元/升</output></label><div class="dd-actions"><button type="button" class="primary" data-dd-play>播放降价过程</button><button type="button" class="text-button" data-dd-reset>重新开始</button></div><p class="dd-result" aria-live="off">每升 2.00 美元 → 最优购买 250 升 → 需求曲线上的 A 点。</p><figcaption>收入固定为1000美元，比萨饼价格固定为每个10美元，消费者偏好始终不变。无差异曲线表示偏好，预算线表示购买能力；两者相切处决定最优组合。本示例与教材的两个端点一致，中间数值由同一个偏好模型连续推导。为合并两种关系，横轴统一为百事可乐数量；左轴读比萨饼数量，右轴读百事可乐价格。绿点和紫点纵轴含义不同，由相同购买量联系。紫色轨迹展示从2美元降至当前价格的过程，灰色虚线为初始预算线。</figcaption></figure>`;}
const demandDerivationAnimations=new WeakMap();
function stopDemandDerivation(el){cancelAnimationFrame(demandDerivationAnimations.get(el));demandDerivationAnimations.delete(el);el.querySelector('[data-dd-play]').textContent='播放降价过程';}
function updateDemandDerivation(el,price){const v=demandDerivationValues(price);el.querySelector('input').value=v.p;el.querySelector('output').textContent=v.p.toFixed(2)+' 美元/升';el.querySelector('.dd-plots').innerHTML=demandDerivationPlots(v.p);el.querySelector('.dd-result').textContent=`每升 ${v.p.toFixed(2)} 美元 → 最优购买 ${Number(v.q.toFixed(1))} 升 → 需求曲线上的${v.p===2?' A 点':v.p===1?' B 点':'对应点'}。`;}
document.addEventListener('input',e=>{if(!e.target.matches('.demand-derivation input'))return;const el=e.target.closest('.demand-derivation');stopDemandDerivation(el);updateDemandDerivation(el,e.target.value);});
document.addEventListener('click',e=>{const btn=e.target.closest('[data-dd-play],[data-dd-reset]');if(!btn)return;const el=btn.closest('.demand-derivation');if(btn.hasAttribute('data-dd-reset')){stopDemandDerivation(el);updateDemandDerivation(el,2);return;}if(demandDerivationAnimations.has(el)){stopDemandDerivation(el);return;}let from=Number(el.querySelector('input').value);if(from<=1){from=2;updateDemandDerivation(el,2);}const start=performance.now();let last=0;btn.textContent='暂停';const frame=now=>{if(!el.isConnected||document.hidden){stopDemandDerivation(el);return;}const value=Math.max(1,from-(now-start)/8000);if(now-last>40||value===1){updateDemandDerivation(el,Math.round(value*100)/100);last=now;}if(value<=1){stopDemandDerivation(el);return;}demandDerivationAnimations.set(el,requestAnimationFrame(frame));};demandDerivationAnimations.set(el,requestAnimationFrame(frame));});
