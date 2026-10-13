// Book-specific controls run after the shared reader initializes.
$('#chartsButton small').textContent='原书截图 · 点击放大和对照';
$('#chartsButton').onclick=()=>{
 const figs=BOOK[current-1].blocks.filter(b=>b.type==='figure');
 modal('本章图表与公式','货币金融学 / 原书截图',`<p class="modal-intro">图表、表格与复杂公式保留原书截图，点击可跳转到正文。</p><div class="figure-index">${figs.map(b=>`<button class="text-button" data-open-figure="${b.id}">${escapeHTML(b.caption)} · 第 ${b.page-25} 页</button>`).join('')||'<p>本章没有独立截图。</p>'}</div>`);
};
$('#perspectivesButton strong').textContent='原书与附录';
$('#perspectivesButton small').textContent='前言、词汇表与完整 PDF';
$('#perspectivesButton').onclick=()=>modal('原书与附录','米什金 / 第九版',`<div class="money-source-menu"><button class="text-button" data-money-page="1">浏览原书（673 页）</button>${[[5,'前言'],[17,'原书目录'],[46,'第1章附录：总产出、总收入、物价水平和通货膨胀率'],[453,'第17章附录：利息平价条件'],[649,'词汇表'],[667,'致谢'],[669,'译后记']].map(([p,t])=>`<button class="text-button" data-money-page="${p}">${t}</button>`).join('')}</div>`);
function moneySourcePage(page){
 const label=page>25?`原书第 ${page-25} 页`:`书前资料 · PDF 第 ${page} 页`;
 modal(label,'货币金融学 / 原页对照',`<div class="money-page-controls"><button class="text-button" data-money-page="${Math.max(1,page-1)}" ${page===1?'disabled':''}>← 上一页</button><span>第 ${page} / 673 页</span><button class="text-button" data-money-page="${Math.min(673,page+1)}" ${page===673?'disabled':''}>下一页 →</button></div><img class="money-source-page" src="money-pages/${page}.webp" alt="${label}">`);
}
document.addEventListener('click',event=>{
 const page=event.target.closest('[data-money-page]');if(page){moneySourcePage(Number(page.dataset.moneyPage));return;}
 const img=event.target.closest('[data-money-image]');if(img)modal(img.dataset.moneyCaption,'原书截图',`<img class="money-enlarged" src="${escapeHTML(img.dataset.moneyImage)}" alt="${escapeHTML(img.dataset.moneyCaption)}">`);
});
const previousMoneyLog=$('#logButton').onclick;
$('#logButton').onclick=()=>{previousMoneyLog();$('#modalBody').insertAdjacentHTML('afterbegin','<div class="log-entry"><time>2026.10.13</time><h3>新增《货币金融学》第九版</h3><p>25章正文、原书图表截图、逐页对照；阅读进度和收藏独立保存。前言、词汇表与译后记可在“原书与附录”阅读。</p></div>');};
