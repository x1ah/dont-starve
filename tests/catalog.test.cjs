const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname,'..');
function context(preferences={}) {
  const sandbox = vm.createContext({navigator:{language:'zh-CN'},localStorage:{getItem:key=>preferences[key]??null,setItem(){}}});
  vm.runInContext(fs.readFileSync(path.join(root,'data.js'),'utf8'),sandbox);
  vm.runInContext(fs.readFileSync(path.join(root,'item-details.js'),'utf8'),sandbox);
  // Load the actual catalog functions before the browser event wiring.
  const app = fs.readFileSync(path.join(root,'app.js'),'utf8');
  vm.runInContext(app.slice(0,app.indexOf("document.addEventListener('error'")),sandbox);
  return code => vm.runInContext(code,sandbox);
}
test('all nonempty prefab codes are unique and safe for generated commands',()=>{
  const run=context();
  assert.equal(run('records.filter(item=>item.code && !/^[a-z0-9_]+$/.test(item.code)).length'),0);
  assert.equal(run('byCode.size'),run('records.filter(item=>item.code).length'));
  assert.equal(run('records.filter(item=>!item.name.zh || !item.name.en).length'),0);
  assert.equal(run('records.flatMap(item=>item.uses).filter(code=>!byCode.has(code)).length'),0);
});
test('inventory commands honor the selected quantity',()=>{
  const run=context();
  assert.equal(run('state.quantity=20; commandFor(byCode.get("log"))'),'c_give("log", 20)');
  assert.equal(run('state.mode="spawn"; commandFor(byCode.get("log"))'),'c_spawn("log", 20)');
  assert.equal(run('copyValueFor(byCode.get("log"),"code")'),'log');
  assert.equal(run('commandFor(byCode.get("log"))'),'c_spawn("log", 20)');
});
test('structures, creatures, trees and effects use ground spawning',()=>{
  const run=context();
  for (const code of ['researchlab','cookpot','deerclops','evergreen','sporecloud','mushroombomb']) {
    assert.equal(run(`commandFor(byCode.get("${code}"))`),`c_spawn("${code}", 1)`);
  }
  assert.equal(run('commandFor(records.find(item=>!item.code))'),'');
});
test('common food, equipment and packed building items remain inventory items',()=>{
  const run=context();
  for (const code of ['taffy','wetgoop','spoiled_food','seafoodgumbo','armorwood','fence_gate_item']) {
    assert.equal(run(`commandFor(byCode.get("${code}"))`),`c_give("${code}", 1)`);
  }
});
test('search spans Chinese, English, aliases and crafting relationships',()=>{
  const run=context();
  for (const [query,code] of [['木头','log'],['Gold Nugget','goldnugget'],['黄金','goldnugget'],['浮木','driftwood_log'],['炼金引擎','researchlab2']]) {
    assert.equal(run(`state.query=${JSON.stringify(query)}; filteredItems().some(item=>item.code===${JSON.stringify(code)})`),true);
  }
  assert.equal(run('state.query="a-query-that-does-not-exist"; filteredItems().length'),0);
  assert.equal(run('state.query="<script>"; filteredItems().length'),0);
});
test('categories and favorites combine with the search',()=>{
  const run=context({'ds-favorites':'["log"]'});
  assert.equal(run('state.category="favorites"; filteredItems().length'),1);
  assert.equal(run('state.query="gold"; filteredItems().length'),0);
  assert.equal(run('state.category="food"; state.query=""; filteredItems().every(item=>item.category==="food")'),true);
});
test('invalid saved preferences do not break loading',()=>{
  const run=context({'ds-favorites':'null','ds-language':'bogus','ds-theme':'bogus'});
  assert.equal(run('state.favorites.size'),0);
  assert.equal(run('state.language'),'zh');
  assert.equal(run('state.theme'),'system');
});
test('known recipes and translations are present',()=>{
  const run=context();
  assert.equal(run('byCode.get("boards").recipe.find(v=>v.code==="log").amount'),4);
  assert.equal(run('byCode.get("researchlab").recipe.find(v=>v.code==="goldnugget").amount'),1);
  assert.equal(run('Object.keys(TEXT.zh).filter(key=>!TEXT.en[key]).length'),0);
});
test('quantity stays an integer within the supported range',()=>{
  const run=context();
  for (const [input,expected] of [['',1],['invalid',1],['0',1],['-3',1],['2.8',2],['999',999],['1000',999]]) {
    assert.equal(run(`normalizeQuantity(${JSON.stringify(input)})`),expected);
  }
});
test('DST stats preserve food signs, armor values and game-day units',()=>{
  const run=context();
  assert.equal(run('byCode.get("meatballs").stats.restoreHunger'),62.5);
  assert.equal(run('byCode.get("meatballs").stats.restoreHealth'),3);
  assert.equal(run('byCode.get("meatballs").stats.perishDays'),10);
  assert.equal(run('byCode.get("monstermeat").stats.restoreHealth'),-20);
  assert.equal(run('byCode.get("armorwood").stats.armor'),315);
  assert.equal(run('byCode.get("armorwood").stats.absorption'),80);
  assert.equal(run('byCode.get("deerclops").stats.health'),4000);
  assert.equal(run('byCode.get("log").stats.restoreHunger'),undefined);
  assert.equal(run('statValue("restoreHunger",62.5)'),'+62.5');
  assert.equal(run('statValue("restoreHealth",-20)'),'-20');
  assert.equal(run('statValue("absorption",80)'),'80%');
  assert.equal(run('state.language="en";statValue("perishDays",10)'),'10 game days');
});
test('local artwork references exist and metadata only enriches catalog entries',()=>{
  const run=context();
  const images=JSON.parse(run('JSON.stringify(records.filter(item=>item.image).map(item=>item.image))'));
  assert.equal(images.length,run('ITEM_DATA_SOURCE.artworkCount'));
  for(const image of images) {
    assert.match(image,/^assets\/items\/[a-z0-9_]+\.png$/);
    assert.equal(fs.readFileSync(path.join(root,image)).subarray(0,8).toString('hex'),'89504e470d0a1a0a');
  }
  assert.equal(run('Object.keys(ITEM_DETAILS).every(code=>byCode.has(code))'),true);
  assert.equal(run('records.filter(item=>item.stats).length'),run('ITEM_DATA_SOURCE.statsCount'));
  assert.equal(run('records.filter(item=>item.stats).every(item=>Object.keys(item.stats).every(key=>STAT_KEYS.includes(key)))'),true);
});
test('catalog content is available in static HTML and matches the live data',()=>{
  const run=context();
  const home=fs.readFileSync(path.join(root,'index.html'),'utf8');
  const catalog=fs.readFileSync(path.join(root,'catalog.html'),'utf8');
  assert.equal((home.match(/<article class="item-card"/g)||[]).length,run('PAGE_SIZE'));
  assert.equal((catalog.match(/<tr><th scope="row">/g)||[]).length,run('records.length'));
  for(const code of JSON.parse(run('JSON.stringify(records.filter(item=>item.code).map(item=>item.code))'))) {
    assert.ok(catalog.includes(`<td><code>${code}</code></td>`));
  }
  const structured=JSON.parse(home.match(/<script type="application\/ld\+json">\s*([\s\S]*?)<\/script>/)[1]);
  assert.equal(structured.name,'饥荒代码大全');
  assert.equal(structured.url,'https://when.run/dont-starve/');
  assert.ok(home.includes('href="catalog.html"'));
  assert.ok(fs.readFileSync(path.join(root,'sitemap.xml'),'utf8').includes('https://when.run/dont-starve/catalog.html'));
});
test('switching language keeps the original site name and updates search and share metadata together',()=>{
  const run=context();
  run(`const metaNodes={};globalThis.document={title:'',querySelector:selector=>metaNodes[selector]??=( {content:''} )};`);
  for(const language of ['zh','en']) {
    run(`state.language="${language}";updatePageMetadata()`);
    assert.match(run('document.title'),/^饥荒代码大全/);
    assert.equal(run('metaNodes[\'meta[property="og:title"]\'].content'),run('document.title'));
    assert.equal(run('metaNodes[\'meta[name="twitter:title"]\'].content'),run('document.title'));
    assert.equal(run('metaNodes[\'meta[property="og:description"]\'].content'),run('PAGE_SEO[state.language].description'));
    assert.equal(run('metaNodes[\'meta[name="description"]\'].content'),run('PAGE_SEO[state.language].description'));
  }
});
test('field notes rotate every minute, retain their translation and pause in the background',()=>{
  const run=context();
  run(`
    const noteNode = {textContent:''};
    const scheduled = new Map();
    let timerId = 0;
    globalThis.document = {hidden:false,querySelector:()=>noteNode};
    globalThis.setInterval = (callback,delay)=>{scheduled.set(++timerId,{callback,delay});return timerId;};
    globalThis.clearInterval = id=>scheduled.delete(id);
    fieldNoteIndex = 0;
    renderFieldNote();
    restartFieldNoteTimer();
  `);
  assert.equal(run('scheduled.size'),1);
  assert.equal(run('scheduled.get(fieldNoteTimer).delay'),60000);
  run('scheduled.get(fieldNoteTimer).callback()');
  assert.equal(run('fieldNoteIndex'),1);
  assert.equal(run('noteNode.textContent === FIELD_NOTES[1].zh'),true);
  run('state.language="en"; renderFieldNote()');
  assert.equal(run('noteNode.textContent === FIELD_NOTES[1].en'),true);
  run('advanceFieldNote(); restartFieldNoteTimer()');
  assert.equal(run('fieldNoteIndex'),2);
  assert.equal(run('scheduled.size'),1);
  run('document.hidden=true; restartFieldNoteTimer()');
  assert.equal(run('scheduled.size'),0);
  run('document.hidden=false; restartFieldNoteTimer()');
  assert.equal(run('scheduled.size'),1);
  run('fieldNoteIndex=FIELD_NOTES.length-1; scheduled.get(fieldNoteTimer).callback()');
  assert.equal(run('fieldNoteIndex'),0);
});
