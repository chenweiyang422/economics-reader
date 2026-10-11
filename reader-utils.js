/* Shared, DOM-independent reader state and search helpers. */
const ReaderUtils = (() => {
  function preferences(raw, count) {
    let value;
    try { value = JSON.parse(raw); } catch {}
    const p = value && typeof value === 'object' && !Array.isArray(value) ? value : {};
    const chapters = list => Array.isArray(list) ? [...new Set(list.filter(n => Number.isInteger(n) && n >= 1 && n <= count))] : [];
    const object = v => v && typeof v === 'object' && !Array.isArray(v) ? v : {};
    return {...p, read: chapters(p.read), saved: chapters(p.saved),
      chapter: Number.isInteger(p.chapter) && p.chapter >= 1 && p.chapter <= count ? p.chapter : 1,
      section: typeof p.section === 'string' ? p.section : '',
      answers: object(p.answers), positions: object(p.positions),
      sectionsRead: Array.isArray(p.sectionsRead) ? p.sectionsRead.filter(s => typeof s === 'string') : []};
  }
  function route(hash, offset, count) {
    const match = /^#chapter-(\d+)(?:\/([^/]*))?$/.exec(hash);
    if (!match) return null;
    const chapter = Number(match[1]) - offset;
    if (chapter < 1 || chapter > count) return null;
    try { return {chapter, anchor: decodeURIComponent(match[2] || '')}; } catch { return null; }
  }
  function searchIndex(sections, joins, blocks) {
    const tails = new Set(Object.values(joins).flat());
    return sections.map(list => list.flatMap(section => [
      {id: section.id, section: section.title, text: section.title},
      ...section.blocks.filter(b => b.type !== 'figure' && !tails.has(b.id)).map(b => ({
        id: b.id, section: section.title,
        text: (b.text || '') + (joins[b.id] || []).map(id => blocks.get(id)?.text || '').join('')
      }))
    ]).map(entry => ({...entry, lower: entry.text.toLowerCase()})));
  }
  function search(entries, query, limit = 4) {
    const hits = entries.filter(e => e.lower.includes(query));
    return {total: hits.length, hits: hits.slice(0, limit)};
  }
  return {preferences, route, searchIndex, search};
})();
