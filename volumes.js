const VOLUME = ['macro','money'].includes(new URLSearchParams(location.search).get('volume')) ? new URLSearchParams(location.search).get('volume') : 'micro';
const CHAPTER_OFFSET = VOLUME === 'macro' ? 22 : 0;
const VOLUME_NAME = VOLUME === 'money' ? '货币金融学' : VOLUME === 'macro' ? '宏观经济学' : '微观经济学';
for (const name of ['micro', 'macro', 'money']) {
  const tab = document.getElementById(name + 'Tab');
  tab.classList.toggle('top-active', name === VOLUME);
  if (name === VOLUME) tab.setAttribute('aria-current', 'page');
}
document.querySelector('.catalog-head .muted').textContent = (VOLUME === 'money' ? 25 : VOLUME === 'macro' ? 14 : 22) + ' 章';
document.querySelector('.brand').href = '?volume=' + VOLUME;
document.querySelector('.edition').textContent=VOLUME==='money'?'第 9 版':'第 8 版';
document.body.dataset.volume=VOLUME;
const scripts = [
  ...(VOLUME === 'money' ? ['money-data.js','money-book.js'] : VOLUME === 'macro' ? ['macro-data.js', 'macro-book.js'] : ['data.js', 'book.js']),
  'learning.js', ...(VOLUME === 'macro' ? ['macro-learning.js'] : []),
  'diagrams.js', ...(VOLUME === 'macro' ? ['macro-diagrams.js', 'macro-figures.js'] : []),
  ...(VOLUME === 'micro' ? ['drug-market.js','price-discrimination.js','entry-exit.js','income-comparison.js','income-choice.js','choice-changes.js','demand-derivation.js','giffen-choice.js'] : []),
  'figure-references.js', 'source-chart-data.js', 'source-charts.js',
  'reading-panels-data.js', 'reading-repairs.js', 'curve-controls.js',
  'formulas.js', 'practice-data.js', 'practice.js', 'reader-utils.js', 'concept-terms.js', 'chapter-covers.js', ...(VOLUME==='money'?['money-adapter.js']:[]), 'app.js', ...(VOLUME==='money'?['money-ui.js']:[])
];
// Fetch dependencies concurrently while preserving execution order. No document.write.
let loadFailed = false;
const content = document.getElementById('content');
content.setAttribute('aria-busy', 'true');
for (const src of scripts) {
  const script = document.createElement('script');
  script.async = false;
  script.src = src + '?v=2.3-money-pages-20261013';
  script.onerror = () => {
    loadFailed = true;
    content.removeAttribute('aria-busy');
    content.innerHTML = '<div class="load-status" role="alert"><p>教材加载失败，请检查网络连接后重试。</p><button class="primary" id="reloadReader">重新加载</button></div>';
    document.getElementById('reloadReader').onclick = () => location.reload();
  };
  if (src === 'app.js') script.onload = () => { if (!loadFailed) content.removeAttribute('aria-busy'); };
  document.head.append(script);
}
