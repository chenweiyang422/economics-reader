function normalizePracticeAnswer(value){return String(value).normalize('NFKC').trim().replace(/[，,\s]/g,'').replace(/−|–/g,'-').toLowerCase()}
function gradePracticeField(field,value){
 const text=normalizePracticeAnswer(value);if(!text)return null;
 if(typeof field.answer==='string')return [field.answer,...field.aliases].some(a=>normalizePracticeAnswer(a)===text);
 const match=text.match(/^([+-]?(?:\d+(?:\.\d*)?|\.\d+))(.*)$/);if(!match)return false;
 let number=Number(match[1]),unit=match[2];const wanted=normalizePracticeAnswer(field.unit);
 if(unit){
  if(wanted.startsWith('万美元')){if(/^(美元|美元\/辆|美金|美金\/辆)$/.test(unit))number/=10000;else if(!/^(万|万美元|万美元\/辆)$/.test(unit))return false}
  else if(wanted.startsWith('美元')){if(!['美元','美元/天','美金',wanted].includes(unit))return false}
  else if(unit!==wanted)return false;
 }
 return Number.isFinite(number)&&Math.abs(number-field.answer)<=(field.tolerance??1e-8)+1e-9;
}
function practiceHTML(b){
 const item=PRACTICE_ITEMS[b.id],saved=prefs.practiceAnswers?.[b.id]||[];
 const fields=item.fields||[];
 const form=fields.length?`<form class="practice-form" data-practice-form="${b.id}">${fields.map((f,i)=>`<div class="practice-field"><label for="answer-${b.id}-${i}">${escapeHTML(f.label)}</label><div class="practice-input-row"><input id="answer-${b.id}-${i}" data-practice-field="${i}" type="text" ${typeof f.answer==='number'?'inputmode="decimal"':''} autocomplete="off" value="${escapeHTML(saved[i]||'')}" aria-describedby="feedback-${b.id}-${i}" placeholder="填写答案"><span>${escapeHTML(f.unit)}</span></div><div id="feedback-${b.id}-${i}" class="practice-feedback" aria-live="polite"></div></div>`).join('')}<button class="primary" type="submit">检查答案</button><span class="practice-hint">按标注单位填写；离开输入框或按回车自动判断</span></form>`:'';
 let plot='';if(item.plot)plot=practicePlot(item.plot);else if(item.model){const d=diagram(item.model);plot=`<div class="practice-plot ${item.model==='cost'?'practice-cost':''}">${d.svg.replaceAll('plot-'+item.model,'practice-'+b.id)}<small>参考示意图 · 坐标为模型示意值，结合上方解析阅读</small></div>`}
 return `<section class="practice-card" id="${b.id}"><div class="practice-kind">${fields.length?'填空 / 计算':''}${fields.length&&(item.model||item.plot)?' · ':''}${item.model||item.plot?'绘图与解释':fields.length?'':'简答'}</div><div class="practice-stem">${richText(item.stem||b.text)}</div>${form}<details class="practice-answer"><summary>查看参考答案与解析</summary><p>${escapeHTML(item.answer)}</p>${plot}<small class="practice-hint">依据教材知识点整理的参考答案，非出版社标准答案。</small></details></section>`;
}
function checkPractice(form){
 const id=form.dataset.practiceForm,item=PRACTICE_ITEMS[id];prefs.practiceAnswers??={};
 const inputs=[...form.querySelectorAll('[data-practice-field]')];prefs.practiceAnswers[id]=inputs.map(x=>x.value);persist();
 for(const input of inputs){const field=item.fields[+input.dataset.practiceField],result=gradePracticeField(field,input.value),feedback=form.querySelector('#'+input.getAttribute('aria-describedby'));input.setAttribute('aria-invalid',String(result===false));feedback.className='practice-feedback '+(result===null?'empty':result?'correct':'incorrect');feedback.textContent=result===null?'请填写答案':result?'✓ 正确':'✕ 暂不正确，请检查数值、单位或符号；可展开参考解析。'}
}
document.addEventListener('submit',e=>{if(e.target.matches('[data-practice-form]')){e.preventDefault();checkPractice(e.target)}});
document.addEventListener('change',e=>{if(e.target.matches('[data-practice-field]'))checkPractice(e.target.closest('form'))});
document.addEventListener('input',e=>{if(!e.target.matches('[data-practice-field]'))return;const form=e.target.closest('form'),id=form.dataset.practiceForm;prefs.practiceAnswers??={};prefs.practiceAnswers[id]=[...form.querySelectorAll('input')].map(x=>x.value);persist();e.target.removeAttribute('aria-invalid');const feedback=form.querySelector('#'+e.target.getAttribute('aria-describedby'));feedback.textContent='';feedback.className='practice-feedback'});
function practicePlot(kind){
 const blue='#3185ef',gold='#d99532',green='#289d83';
 function chart(title,xlabel,ylabel,xmax,ymax,series,points=[]){
  const X=x=>55+x/xmax*480,Y=y=>290-y/ymax*235;
  const paths=series.map(([label,color,pts])=>`<polyline points="${pts.map(([x,y])=>X(x)+','+Y(y)).join(' ')}" fill="none" stroke="${color}" stroke-width="2.5"/>`).join('');
  return `<div class="practice-plot"><strong>${title}</strong><svg viewBox="0 0 600 345" role="img" aria-label="${title}"><path d="M55 45V290H545" fill="none" stroke="#91a0b1"/>${[0,.25,.5,.75,1].map(t=>`<text x="${X(t*xmax)}" y="310" text-anchor="middle" font-size="11">${+(t*xmax).toFixed(1)}</text><text x="46" y="${Y(t*ymax)+4}" text-anchor="end" font-size="11">${+(t*ymax).toFixed(1)}</text>`).join('')}${paths}${points.map(([x,y,label])=>`<circle cx="${X(x)}" cy="${Y(y)}" r="4" fill="${green}"/><text x="${X(x)+6}" y="${Y(y)-8}" font-size="11">${label}</text>`).join('')}<text x="55" y="25" font-size="12">${ylabel}</text><text x="535" y="334" text-anchor="end" font-size="12">${xlabel}</text></svg><div class="practice-legend">${series.map(([label,color])=>`<span style="color:${color}">━ ${label}</span>`).join('')}</div></div>`;
 }
 if(kind==='production')return chart('生产函数','种子（袋）','小麦（蒲式耳）',3,6,[['边际产量递减',blue,[[0,0],[1,3],[2,5],[3,6]]]])+chart('总成本曲线','小麦（蒲式耳）','总成本（美元）',6,300,[['总成本',gold,[[0,0],[3,100],[5,200],[6,300]]]]);
 if(kind==='budget')return chart('收入1000美元的预算约束','比萨饼（个）','百事可乐（瓶）',100,200,[['P = 200 − 2Q',blue,[[0,200],[100,0]]]]);
 if(kind==='ppf')return chart('食物与衣服的生产可能性：示例','食物','衣服',100,100,[['原边界',blue,[[0,90],[90,0]]],['旱灾后',gold,[[0,90],[55,0]]]],[[40,50,'有效率'],[20,25,'无效率'],[75,75,'当前不可行']]);
 if(kind==='trade')return chart('生产与贸易后的消费：示例','鱼','椰子',10,100,[['生产边界',blue,[[0,80],[8,0]]],['以1鱼换12椰子的交易线',gold,[[0,96],[8,0]]]],[[5,36,'贸易后消费']]);
 if(kind==='demand')return chart('比萨饼需求表对应曲线','月需求量（个）','价格（元）',40,40,[['需求',blue,[[10,30],[20,20],[30,10]]]]);
 if(kind==='supply')return chart('比萨饼供给表对应曲线','月供给量（个）','价格（元）',40,40,[['供给',gold,[[10,10],[20,20],[30,30]]]]);
 if(kind==='shock')return chart('有利供给冲击：成本下降','真实产出 Y','物价水平 P',120,120,[['总需求 AD',blue,[[0,110],[110,0]]],['原短期总供给',gold,[[0,20],[100,120]]],['成本下降后',green,[[0,0],[120,120]]]],[[45,65,'原均衡'],[55,55,'新均衡']]);
 if(kind==='marketChanges')return chart('原料涨价：供给左移','比萨饼数量','价格',100,100,[['需求',blue,[[0,90],[100,10]]],['原供给',gold,[[0,10],[100,90]]],['新供给',green,[[0,30],[87.5,100]]]],[[50,50,'原均衡'],[37.5,60,'新均衡']])+chart('替代品降价：需求左移','比萨饼数量','价格',100,100,[['原需求',blue,[[0,90],[100,10]]],['新需求',green,[[0,70],[87.5,0]]],['供给',gold,[[0,10],[100,90]]]],[[50,50,'原均衡'],[37.5,40,'新均衡']]);
 if(kind==='phillipsMove')return chart('预期既定：紧缩需求政策的短期权衡','失业率（%）','通胀率（%）',10,10,[['短期菲利普斯曲线',blue,[[0,10],[10,0]]]],[[3,7,'紧缩前'],[7,3,'紧缩后']]);
 if(kind==='substitution')return chart('比萨饼涨价：示例 I=80，价格从1升至2','比萨饼','百事可乐',85,120,[['原预算',blue,[[0,80],[80,0]]],['涨价后预算',gold,[[0,80],[40,0]]],['保持原效用的补偿预算',green,[[0,113.137],[56.5685,0]]]],[[40,40,'原最优'],[28.284,56.569,'补偿点'],[20,40,'新最优']]);
 return '';
}
