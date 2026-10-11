const VOLUME = new URLSearchParams(location.search).get('volume') === 'macro' ? 'macro' : 'micro';
const CHAPTER_OFFSET = VOLUME === 'macro' ? 22 : 0;
const VOLUME_NAME = VOLUME === 'macro' ? '宏观经济学' : '微观经济学';
for (const name of ['micro', 'macro']) {
  const tab = document.getElementById(name + 'Tab');
  tab.classList.toggle('top-active', name === VOLUME);
  if (name === VOLUME) tab.setAttribute('aria-current', 'page');
}
document.querySelector('.catalog-head .muted').textContent = (VOLUME === 'macro' ? 14 : 22) + ' 章';
document.querySelector('.brand').href = '?volume=' + VOLUME;
const scripts = [
  ...(VOLUME === 'macro' ? ['macro-data.js', 'macro-book.js'] : ['data.js', 'book.js']),
  'learning.js', ...(VOLUME === 'macro' ? ['macro-learning.js'] : []),
  'diagrams.js', ...(VOLUME === 'macro' ? ['macro-diagrams.js', 'macro-figures.js'] : []),
  ...(VOLUME === 'micro' ? ['drug-market.js','price-discrimination.js','entry-exit.js'] : []),
  'figure-references.js', 'source-chart-data.js', 'source-charts.js',
  'reading-panels-data.js', 'reading-repairs.js', 'curve-controls.js',
  'formulas.js', 'practice-data.js', 'practice.js', 'reader-utils.js', 'app.js'
];
// Fetch dependencies concurrently while preserving execution order. No document.write.
let loadFailed = false;
const content = document.getElementById('content');
content.setAttribute('aria-busy', 'true');
for (const src of scripts) {
  const script = document.createElement('script');
  script.async = false;
  script.src = src + '?v=2.2-price-discrimination';
  script.onerror = () => {
    loadFailed = true;
    content.removeAttribute('aria-busy');
    content.innerHTML = '<div class="load-status" role="alert"><p>教材加载失败，请检查网络连接后重试。</p><button class="primary" id="reloadReader">重新加载</button></div>';
    document.getElementById('reloadReader').onclick = () => location.reload();
  };
  if (src === 'app.js') script.onload = () => { if (!loadFailed) content.removeAttribute('aria-busy'); };
  document.head.append(script);
}
