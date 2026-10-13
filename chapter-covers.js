const MACRO_COVER_CONTENT=[["从国内生产总值出发，理解如何衡量一个经济体的生产与收入。", "GDP 增加，是否一定意味着人们的生活变好了？", ["国内生产总值", "实际 GDP", "名义 GDP", "GDP 平减指数"]], ["用价格指数追踪生活费用，区分货币金额与实际购买力。", "同样一笔钱，在不同年份能买到同样多的东西吗？", ["消费者物价指数", "通货膨胀率", "实际利率", "购买力"]], ["探索生产率、资本与技术如何塑造一国的长期生活水平。", "为什么有些国家富裕，而另一些国家贫穷？", ["生产率", "人力资本", "技术知识", "收益递减"]], ["理解金融体系如何把储蓄转化为投资，并协调资金的供给与需求。", "政府预算赤字如何影响投资和利率？", ["国民储蓄", "投资", "可贷资金", "预算赤字"]], ["把时间与风险纳入决策，认识现值、保险和资产估值。", "今天的100元与一年后的100元，价值相同吗？", ["现值", "复利", "风险分散", "有效市场假说"]], ["辨别失业的不同来源，理解寻找工作、工资与劳动力市场制度。", "为什么经济中总会有一些人失业？", ["自然失业率", "摩擦性失业", "结构性失业", "效率工资"]], ["认识货币的职能，理解银行体系与中央银行如何影响货币供给。", "银行接受存款后，怎样影响经济中的货币数量？", ["货币", "中央银行", "准备金", "货币乘数"]], ["从货币数量论理解价格水平，并考察通货膨胀的影响与成本。", "货币数量增长，为什么可能推高物价？", ["货币数量论", "货币中性", "费雪效应", "通货膨胀税"]], ["连接商品与资本的国际流动，区分名义汇率和实际汇率。", "一国的贸易收支与储蓄、投资有什么关系？", ["净出口", "资本净流出", "实际汇率", "购买力平价"]], ["把可贷资金市场与外汇市场联系起来，分析开放经济中的政策与冲击。", "贸易限制能否改善一国的贸易余额？", ["可贷资金市场", "外汇市场", "资本外逃", "贸易政策"]], ["用总需求与总供给模型解释经济波动及短期与长期的调整。", "一次需求下降，会怎样影响产出、就业和物价？", ["总需求", "总供给", "经济衰退", "供给冲击"]], ["追踪货币与财政政策的传导，理解乘数效应、挤出效应和稳定政策。", "增加政府购买，会使总需求增加多少？", ["流动性偏好", "乘数效应", "挤出效应", "自动稳定器"]], ["借助菲利普斯曲线，考察通胀预期如何改变失业与通货膨胀的关系。", "降低通货膨胀，为什么可能伴随暂时的失业增加？", ["菲利普斯曲线", "通胀预期", "牺牲率", "理性预期"]], ["围绕六个政策争论，比较不同主张的理由、代价与适用条件。", "面对同样的经济问题，为什么政策建议会不同？", ["稳定政策", "规则与相机抉择", "政府债务", "储蓄激励"]]];
// Chapter openers share the reader's chapter metadata in both volumes.
function chapterCover(chapter, section) {
 const number=current+CHAPTER_OFFSET;
 const extra=VOLUME==='macro'?MACRO_COVER_CONTENT[current-1]:null;
 const summary=extra?extra[0]:chapter.summary,question=extra?extra[1]:chapter.question,terms=extra?extra[2]:chapter.terms;
 const palettes=[['#285c58','#b86a43'],['#355b78','#ad703d'],['#714c65','#6c7850'],['#805b32','#487772']];
 const [ink,accent]=palettes[(number-1)%palettes.length];
 const motifs=[
  '<path d="M24 180 Q100 150 218 30M24 35 Q118 88 218 180"/><circle cx="123" cy="111" r="8"/>',
  '<path d="M24 180 C60 120 90 145 119 91 S173 74 218 24"/><path d="M24 180 Q114 178 218 117"/><circle cx="119" cy="91" r="8"/>',
  '<path d="M24 32 Q52 174 218 180M24 72 Q78 188 218 210M24 5 Q74 137 218 144"/><path d="M28 201 204 22"/>',
  '<circle cx="121" cy="116" r="78"/><path d="M43 116H199M121 38V194M66 61 176 171M66 171 176 61"/><circle cx="121" cy="116" r="27"/>'
 ];
 return `<header class="chapter-cover" style="--cover-ink:${ink};--cover-accent:${accent}" aria-labelledby="chapter-cover-title">
  <div class="chapter-cover-top"><span>${VOLUME==='money'?'米什金 · 货币金融学':'经济学原理 · '+escapeHTML(VOLUME_NAME)}</span><span>${VOLUME==='money'?'第 9 版':'第 8 版'}</span></div>
  <div class="chapter-cover-art" aria-hidden="true"><svg viewBox="0 0 242 240" fill="none" stroke="currentColor" stroke-width="1.4"><path class="cover-grid" d="M24 24V216H222M24 72H222M24 120H222M24 168H222M72 24V216M120 24V216M168 24V216M216 24V216"/>${motifs[(number-1)%motifs.length]}</svg></div>
  <div class="chapter-cover-number"><span>CHAPTER</span><strong>${String(number).padStart(2,'0')}</strong></div>
  <p class="chapter-cover-part">${escapeHTML(chapter.part)}</p>
  <h1 id="chapter-cover-title">${escapeHTML(chapter.name)}</h1>
  <p class="chapter-cover-summary">${escapeHTML(summary)}</p>
  <ul class="chapter-cover-terms" aria-label="本章关键词">${terms.slice(0,4).map(t=>`<li>${escapeHTML(t)}</li>`).join('')}</ul>
  <div class="chapter-cover-question"><span>带着问题阅读</span><p>${escapeHTML(question)}</p></div>
 </header><div class="chapter-opening-label">${escapeHTML(section.title)}</div>`;
}
