/* Money uses unique f-prefixed block ids, independent of the two Mankiw volumes. */
const baseMoneyFigure=redrawnFigure;
redrawnFigure=function(block,chapter){
 if(!block.src?.startsWith('money-figures/'))return baseMoneyFigure(block,chapter);
 return `<figure class="money-figure" id="${block.id}" data-page="${block.page}"><button class="money-image-button" data-money-image="${escapeHTML(block.src)}" data-money-caption="${escapeHTML(block.caption)}" aria-label="放大${escapeHTML(block.caption)}"><img src="${escapeHTML(block.src)}" alt="${escapeHTML(block.caption)}" width="${block.width}" height="${block.height}" loading="lazy"></button><figcaption>${escapeHTML(block.caption)}<span>原书第 ${block.page-25} 页 · <button class="text-button" data-money-page="${block.page}">对照原页</button></span></figcaption></figure>`;
};
const baseMoneyParagraph=readingParagraph;
readingParagraph=function(b){
 if(!b.id.startsWith('f'))return baseMoneyParagraph(b);
 return `<p class="money-paragraph" id="${b.id}" data-page="${b.page}">${richText(b.text)}<button class="money-source-link" data-money-page="${b.page}" aria-label="对照原书第${b.page-25}页" title="对照原书第${b.page-25}页">${b.page-25}</button>${(b.continuedPages||[]).map(page=>`<button class="money-source-link" data-money-page="${page}" title="续文原书第${page-25}页" aria-label="对照续文原书第${page-25}页">${page-25}</button>`).join('')}</p>`;
};

for(const chapter of BOOK)for(const b of chapter.blocks){
 const ref=b.caption?.match(/^[图表]\d+[.．]\d+/)?.[0];
 if(ref&&Number(ref.match(/\d+/)[0])===chapter.number)FIGURE_REFERENCES[ref.replace(/[.．]/g,'-')]={id:b.id,chapter:chapter.number,volume:'money',title:b.caption};
}
