/* Fixed preferences throughout each experiment. Both models have convex indifference curves. */
function choiceChangeValues(kind,value){
 const n=Number(value),inferior=kind==='inferior';
 const control=Math.max(inferior?1000:1,Math.min(inferior?1400:2,Number.isFinite(n)?n:inferior?1000:2));
 const income=inferior?control:1000,price=inferior?2:control;
 const pizza=inferior?(income/2-375)/2.5:income/(10+20/price);
 const pepsi=(income-10*pizza)/price;
 // Inferior-good preferences: U=(y+125)/(200-x)^2, x<200.
 // Price-change preferences: U=sqrt(x)+sqrt(y/5).
 const utility=inferior?(pepsi+125)/(200-pizza)**2:Math.sqrt(pizza)+Math.sqrt(pepsi/5);
 return {control,income,price,pizza,pepsi,utility,slope:-10/price,maxPizza:income/10,maxPepsi:income/price};
}
function choiceChangeNumber(n,precision=1){return Number(n.toFixed(precision)).toLocaleString('zh-CN');}
function choiceChangeDrawing(kind,value){
 const v=choiceChangeValues(kind,value),inferior=kind==='inferior',base=choiceChangeValues(kind,inferior?1000:2);
 const xmax=inferior?160:110,ymax=inferior?800:1100,X=x=>72+x/xmax*560,Y=y=>420-y/ymax*360;
 const changed=Math.abs(v.control-base.control)>.0001;
 const budget=(s,color,dash='')=>`<path d="M72 ${Y(s.maxPepsi)}L${X(s.maxPizza)} 420" stroke="${color}" stroke-width="3" stroke-dasharray="${dash}" fill="none"/>`;
 const curve=(s,color,dash='')=>{let d='',pen=false;for(let i=1;i<=500;i++){const x=xmax*i/500,y=inferior?s.utility*(200-x)**2-125:5*(s.utility-Math.sqrt(x))**2;const visible=y>=0&&y<=ymax&&(inferior||x<s.utility**2);if(visible){d+=`${pen?'L':'M'}${X(x).toFixed(2)} ${Y(y).toFixed(2)} `;}pen=visible;}return `<path d="${d}" stroke="${color}" stroke-width="2.5" stroke-dasharray="${dash}" fill="none"/>`;};
 const point=(s,label,color,dy)=>`<path d="M72 ${Y(s.pepsi)}H${X(s.pizza)}V420" fill="none" stroke="${color}" stroke-dasharray="4 5" opacity=".5"/><circle cx="${X(s.pizza)}" cy="${Y(s.pepsi)}" r="6" fill="${color}"/><text x="${X(s.pizza)+10}" y="${Y(s.pepsi)+dy}" fill="${color}" font-size="17">${label}</text>`;
 return `<svg viewBox="0 0 740 490" role="img" aria-label="${inferior?'收入增加与低档物品':'百事可乐降价'}：最优组合为${choiceChangeNumber(v.pizza)}个比萨饼、${choiceChangeNumber(v.pepsi)}升百事可乐"><g font-family="system-ui,sans-serif" font-size="14" fill="#5c5144"><path d="M72 40V420H670" fill="none" stroke="#786855" stroke-width="1.5"/>
 ${(inferior?[0,40,80,120,160]:[0,25,50,75,100]).map(x=>`<text x="${X(x)}" y="445" text-anchor="middle">${x}</text>`).join('')}
 ${(inferior?[200,400,600,800]:[250,500,750,1000]).map(y=>`<text x="60" y="${Y(y)+5}" text-anchor="end">${y}</text>`).join('')}
 <text x="72" y="24">百事可乐（升）</text><text x="670" y="479" text-anchor="end">比萨饼（个）</text>
 ${budget(base,'#a28c72','6 5')}${curve(base,'#a28c72','6 5')}${budget(v,'#3675ac')}${curve(v,'#318372')}
 ${changed?point(base,'原最优点','#8b765d',24):''}${point(v,changed?'新最优点':'原最优点','#318372',-14)}
 <text x="480" y="35" fill="#3675ac">${inferior?'价格不变 · 平行外移':'收入不变 · 预算线旋转'}</text></g></svg>`;
}
function choiceChangeStats(kind,value){const v=choiceChangeValues(kind,value);return `<span>比萨饼<b>${choiceChangeNumber(v.pizza)} 个</b></span><span>百事可乐<b>${choiceChangeNumber(v.pepsi)} 升</b></span><span>预算线斜率<b>${choiceChangeNumber(v.slope)}</b></span>`;}
function choiceChangeExplanation(kind,value){const v=choiceChangeValues(kind,value);if(kind==='inferior')return v.income===1000?'原收入为1000美元，最优组合是50个比萨饼和250升百事可乐。':`收入增至${v.income}美元：比萨饼增至${choiceChangeNumber(v.pizza)}个，百事可乐降至${choiceChangeNumber(v.pepsi)}升。在这个收入范围内，百事可乐是低档物品。`;return v.price===2?'百事可乐原价为每升2美元，最优组合是50个比萨饼和250升百事可乐。':`百事可乐降至每升${choiceChangeNumber(v.price,2)}美元：可购买的最大比萨饼数量仍为100个，可购买的最大百事可乐数量增至${choiceChangeNumber(v.maxPepsi)}升。最优点向左上方移动。`;}
function choiceChangeFigure(r,id){
 const inferior=r.id==='c21-b118',kind=inferior?'inferior':'price',initial=inferior?1000:2;
 return `<figure id="${id}" class="redrawn source-chart choice-change" data-choice-kind="${kind}" data-source-chart="${r.id}" data-source-panels="1"><div class="figure-heading"><strong>${inferior?'图21-8 · 低档物品':'图21-9 · 价格变动'}</strong></div><p class="choice-change-intro">${inferior?'提高收入，观察比萨饼消费增加、百事可乐消费减少。':'降低百事可乐价格，观察预算线围绕横轴截距向外旋转，以及最优点的移动。'}</p><div class="choice-change-drawing">${choiceChangeDrawing(kind,initial)}</div><div class="choice-change-legend"><span>蓝线：当前预算约束线</span><span>绿线：当前最优点的无差异曲线</span><span>虚线：原来的预算线与无差异曲线</span></div><label class="model-control"><span>${inferior?'每月收入':'百事可乐价格'}</span><input type="range" min="${inferior?1000:1}" max="${inferior?1400:2}" step="${inferior?10:.05}" value="${initial}" aria-label="${inferior?'每月收入（美元）':'百事可乐每升价格（美元）'}"><output>${initial} ${inferior?'美元':'美元/升'}</output></label><button type="button" class="text-button" data-choice-change-reset>${inferior?'恢复原收入':'恢复原价'}</button><div class="model-stats choice-change-stats">${choiceChangeStats(kind,initial)}</div><p class="choice-change-explanation">${choiceChangeExplanation(kind,initial)}</p><figcaption>${inferior?'交互示例：比萨饼每个10美元、百事可乐每升2美元，价格和偏好保持不变。此处采用使百事可乐在所示收入范围内成为低档物品的偏好；收入越高并不意味着每种物品都买得更多。':'交互示例：收入固定为1000美元，比萨饼每个10美元，偏好保持不变。此处选择与教材图示方向一致的偏好：百事可乐降价后买得更多，比萨饼买得更少；对比萨饼的总影响取决于收入效应和替代效应的大小。'} 数值用于说明原理，并非原图实测数据。</figcaption><details class="source-interactive"><summary>查看教材图形重绘对照</summary><img class="textbook-chart" src="${r.asset}" width="${r.width}" height="${r.height}" loading="lazy" alt="${r.ref} ${r.title} 教材图形重绘对照"></details></figure>`;
}
function updateChoiceChange(el,value){const kind=el.dataset.choiceKind,v=choiceChangeValues(kind,value);el.querySelector('input').value=v.control;el.querySelector('output').textContent=choiceChangeNumber(v.control,2)+(kind==='inferior'?' 美元':' 美元/升');el.querySelector('.choice-change-drawing').innerHTML=choiceChangeDrawing(kind,v.control);el.querySelector('.choice-change-stats').innerHTML=choiceChangeStats(kind,v.control);el.querySelector('.choice-change-explanation').textContent=choiceChangeExplanation(kind,v.control);}
document.addEventListener('input',e=>{const el=e.target.closest('.choice-change');if(el&&e.target.matches('input[type="range"]'))updateChoiceChange(el,e.target.value)});
document.addEventListener('click',e=>{const button=e.target.closest('[data-choice-change-reset]');if(button){const el=button.closest('.choice-change');updateChoiceChange(el,el.dataset.choiceKind==='inferior'?1000:2)}});
