// Controls are scoped to each figure; toggling never changes the scale or other charts.
const drawFigureWithCurves=redrawnFigure;
redrawnFigure=function(b,n){
 const html=drawFigureWithCurves(b,n),curves=[...new Map([...html.matchAll(/data-curve="([^"]+)" data-curve-label="([^"]+)" data-curve-color="([^"]+)"/g)].map(match=>[match[1],match])).values()];
 if(curves.length<3)return html;
 const controls=`<fieldset class="curve-controls"><legend>显示曲线</legend><div class="curve-options">${curves.map(([,id,label,color])=>`<label><input type="checkbox" data-toggle-curve="${id}" checked><i style="background:${color}" aria-hidden="true"></i><span>${label}</span></label>`).join('')}</div><button class="text-button" type="button" data-all-curves>全部显示</button><small class="curve-status" aria-live="polite">已显示 ${curves.length} / ${curves.length} 条曲线</small></fieldset>`;
 return html.replace('<div class="inline-model"',controls+'<div class="inline-model"');
};
function applyCurveVisibility(figure){
 const inputs=[...figure.querySelectorAll('[data-toggle-curve]')];
 for(const input of inputs)for(const group of figure.querySelectorAll('[data-curve]'))if(group.dataset.curve===input.dataset.toggleCurve){group.style.display=input.checked?'':'none';group.setAttribute('aria-hidden',String(!input.checked))}
 const status=figure.querySelector('.curve-status');if(status)status.textContent=`已显示 ${inputs.filter(i=>i.checked).length} / ${inputs.length} 条曲线${inputs.every(i=>!i.checked)?' · 可勾选上方选项恢复':''}`;
}
document.addEventListener('change',e=>{if(e.target.matches('[data-toggle-curve]'))applyCurveVisibility(e.target.closest('figure'))});
document.addEventListener('click',e=>{const button=e.target.closest('[data-all-curves]');if(!button)return;const figure=button.closest('figure');for(const input of figure.querySelectorAll('[data-toggle-curve]'))input.checked=true;applyCurveVisibility(figure)});
