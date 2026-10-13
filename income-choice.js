/* Figure 21-7: fixed prices and preferences, changing income only. */
function incomeChoiceValues(income){
 const value=Number(income),m=Math.max(1000,Math.min(2000,Number.isFinite(value)?value:1000));
 return {income:m,pizza:m/20,pepsi:m/4,maxPizza:m/10,maxPepsi:m/2};
}
function incomeChoiceDrawing(income){
 const v=incomeChoiceValues(income),X=x=>72+x*2.8,Y=y=>420-y*.35;
 const budget=(m,color,dash='')=>`<path d="M${X(0)} ${Y(m/2)}L${X(m/10)} ${Y(0)}" fill="none" stroke="${color}" stroke-width="3" stroke-dasharray="${dash}"/>`;
 const curve=(m,color,dash='')=>{const k=m*m/80,points=[];for(let x=Math.max(1,k/1050);x<=205;x+=.8)points.push(`${points.length?'L':'M'}${X(x).toFixed(2)} ${Y(k/x).toFixed(2)}`);return `<path d="${points.join(' ')}" fill="none" stroke="${color}" stroke-width="2.5" stroke-dasharray="${dash}"/>`};
 const point=(x,y,label,color,dy)=>`<path d="M72 ${Y(y)}H${X(x)}V420" stroke="${color}" stroke-dasharray="4 5" opacity=".55" fill="none"/><circle cx="${X(x)}" cy="${Y(y)}" r="6" fill="${color}"/><text x="${X(x)+12}" y="${Y(y)+dy}" fill="${color}" font-size="17">${label}</text>`;
 return `<svg viewBox="0 0 740 490" role="img" aria-label="收入${v.income}美元，最优组合为${v.pizza}个比萨饼和${v.pepsi}升百事可乐。预算线保持平行。"><g font-family="system-ui,sans-serif" font-size="14" fill="#5c5144"><path d="M72 40V420H670" fill="none" stroke="#786855" stroke-width="1.5"/>
 ${[0,50,100,150,200].map(x=>`<text x="${X(x)}" y="445" text-anchor="middle">${x}</text>`).join('')}
 ${[250,500,750,1000].map(y=>`<path d="M68 ${Y(y)}h4" stroke="#786855"/><text x="60" y="${Y(y)+5}" text-anchor="end">${y}</text>`).join('')}
 <text x="72" y="24">百事可乐（升）</text><text x="670" y="479" text-anchor="end">比萨饼（个）</text>
 ${budget(1000,'#a28c72','6 5')}${curve(1000,'#a28c72','6 5')}
 ${v.income>1000?`<path d="M${X(50)} ${Y(250)}L${X(v.pizza)} ${Y(v.pepsi)}" stroke="#ba8654" stroke-dasharray="3 5"/>`:''}
 ${budget(v.income,'#3675ac')}${curve(v.income,'#318372')}
 ${v.income>1000?point(50,250,'原最优点','#8b765d',23):''}${point(v.pizza,v.pepsi,v.income>1000?'新最优点':'原最优点','#318372',-13)}
 <text x="490" y="35" fill="#3675ac">价格不变 · 斜率不变</text></g></svg>`;
}
function incomeChoiceStats(income){const v=incomeChoiceValues(income);return `<span>比萨饼<b>${v.pizza} 个</b></span><span>百事可乐<b>${v.pepsi} 升</b></span><span>预算线斜率<b>−5</b></span>`;}
function incomeChoiceFigure(r,id){return `<figure id="${id}" class="redrawn source-chart income-choice" data-source-chart="${r.id}" data-source-panels="1"><div class="figure-heading"><strong>图21-7 · 收入增加</strong></div><p class="income-choice-intro">拖动收入滑动条，观察预算约束线和最优消费组合的变化。</p><div class="income-choice-drawing">${incomeChoiceDrawing(1000)}</div><div class="income-choice-legend"><span>蓝线：当前预算约束线</span><span>绿线：当前最优点的无差异曲线</span><span>虚线：原来的预算线与无差异曲线</span></div><label class="model-control"><span>每月收入</span><input type="range" min="1000" max="2000" step="20" value="1000" aria-label="每月收入（美元）"><output>1000 美元</output></label><button type="button" class="text-button" data-income-choice-reset>恢复原收入</button><div class="model-stats income-choice-stats">${incomeChoiceStats(1000)}</div><p class="income-choice-explanation">收入为原来的1000美元，最优组合是50个比萨饼和250升百事可乐。</p><figcaption>交互示例：比萨饼每个10美元，百事可乐每升2美元；偏好用 U = 比萨饼数量 × 百事可乐数量表示。两者均为正常物品。收入增加使预算线平行外移，最优点移向更高的无差异曲线，两种物品的消费量都增加。偏好保持不变；图中的数值用于说明原理。</figcaption><details class="source-interactive"><summary>查看教材图形重绘对照</summary><img class="textbook-chart" src="${r.asset}" width="${r.width}" height="${r.height}" loading="lazy" alt="图21-7 收入增加：教材图形重绘对照"></details></figure>`;}
function updateIncomeChoice(el,income){const v=incomeChoiceValues(income);el.querySelector('input').value=v.income;el.querySelector('output').textContent=v.income+' 美元';el.querySelector('.income-choice-drawing').innerHTML=incomeChoiceDrawing(v.income);el.querySelector('.income-choice-stats').innerHTML=incomeChoiceStats(v.income);el.querySelector('.income-choice-explanation').textContent=v.income===1000?'收入为原来的1000美元，最优组合是50个比萨饼和250升百事可乐。':`收入增加${v.income-1000}美元，预算线平行外移；最优组合变为${v.pizza}个比萨饼和${v.pepsi}升百事可乐。`;}
document.addEventListener('input',e=>{const el=e.target.closest('.income-choice');if(el&&e.target.matches('input[type="range"]'))updateIncomeChoice(el,e.target.value)});
document.addEventListener('click',e=>{const button=e.target.closest('[data-income-choice-reset]');if(button)updateIncomeChoice(button.closest('.income-choice'),1000)});
