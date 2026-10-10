'use strict';
const ICONS = {
  book:'<path d="M4 4h6a3 3 0 0 1 3 3v14a4 4 0 0 0-4-3H4Zm18 0h-6a3 3 0 0 0-3 3v14a4 4 0 0 1 4-3h5Z"/>',
  globe:'<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-5 5-5 13 0 18 5-5 5-13 0-18Z"/>',
  monitor:'<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8m-4-4v4"/>',
  sun:'<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M2 12h2m16 0h2M5 5l1.5 1.5m11 11L19 19M5 19l1.5-1.5m11-11L19 5"/>',
  moon:'<path d="M20 14A9 9 0 0 1 10 3a9 9 0 1 0 10 11Z"/>',
  github:'<path d="M9 20c-5 1-5-3-7-3m14 5v-4c0-1-.5-2-1-2 4-.5 7-2 7-6 0-2-.5-3-2-4 0-1 0-3-.5-4-2 0-4 2-4 2a13 13 0 0 0-7 0S6.5 2 4.5 2C4 3 4 5 4 6c-1.5 1-2 2-2 4 0 4 3 5.5 7 6-.5.5-1 1-1 2v4"/>',
  flame:'<path d="M13 2c1 6-5 7-4 12 2 0 4-3 4-3s6 3 6 7a7 7 0 0 1-14 0c0-6 5-9 8-16Z"/>',
  search:'<circle cx="10" cy="10" r="6.5"/><path d="m15 15 6 6"/>',
  close:'<path d="m6 6 12 12M6 18 18 6"/>',
  backpack:'<rect x="5" y="6" width="14" height="16" rx="3"/><path d="M9 6V4a3 3 0 0 1 6 0v2M5 11h14M8 16h8v4H8Zm-5-3v6m18-6v6"/>',
  ground:'<path d="M3 20h18m-9-4V3m-4 9 4 4 4-4"/>',
  minus:'<path d="M5 12h14"/>',
  plus:'<path d="M5 12h14M12 5v14"/>',
  refresh:'<path d="M20 8a8 8 0 1 0 0 8M20 3v5h-5"/>',
  terminal:'<path d="m5 6 5 6-5 6m9 0h6"/>',
  grid:'<rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>',
  materials:'<path d="m12 3 9 5v8l-9 5-9-5V8Zm0 10v8M3 8l9 5 9-5M7 5l9 5"/>',
  tools:'<path d="M14 4 7 8l3 5 7-4Z"/><path d="m12 11-7 10m12-12 3-2-3-5-3 2"/>',
  combat:'<path d="m5 21 13-13 3-6-6 3L2 18m0-6 10 10M3 21l3-3"/>',
  food:'<path d="M8 8C0 4 2 21 9 21c2-1 4-1 6 0 7 0 10-17 2-13-3 1-6 1-9 0ZM12 9V4m0 2c1-4 5-4 6-4-1 3-3 5-6 4Z"/>',
  structures:'<path d="m3 11 9-8 9 8M5 10v11h14V10M10 21v-7h4v7"/>',
  magic:'<path d="m12 2 3 7 7 3-7 3-3 7-3-7-7-3 7-3Z"/><path d="m19 2 1 3 3 1"/>',
  creatures:'<path d="M6 9V3l5 4h2l5-4v6c5 4 3 12-6 12S1 13 6 9Z"/><path d="M8 12h1m6 0h1m-6 5 2 1 2-1"/>',
  world:'<path d="m12 2-6 7h3l-6 7h6l-3 4h12l-3-4h6l-6-7h3Z"/><path d="M12 20v3"/>',
  other:'<path d="m12 3 2.5 5.5 6 .5-4.5 4 1.5 7-5.5-3.5L6.5 20 8 13 3.5 9l6-.5Z"/>',
  heart:'<path d="M20 5c-3-3-7-1-8 2-1-3-5-5-8-2-4 4 0 9 8 15 8-6 12-11 8-15Z"/>',
  copy:'<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M15 8V3H3v13h5"/>',
  chevron:'<path d="m6 9 6 6 6-6"/>',
  sort:'<path d="M4 6h16M4 12h11M4 18h6"/>',
  check:'<path d="m4 12 5 5L20 6"/>',
  left:'<path d="m14 5-7 7 7 7"/>',
  right:'<path d="m10 5 7 7-7 7"/>',
  log:'<path d="m6 19 13-6M4 8l12-5c3-1 7 8 4 10L8 20"/><ellipse cx="6" cy="14" rx="4" ry="6" transform="rotate(-20 6 14)"/><path d="m6 11 2 5M13 7l4-2m-5 5 7-3"/>',
  grass:'<path d="M12 21C10 9 6 5 4 3c0 10 5 15 8 18Zm0 0c2-12 6-16 8-18 0 10-5 15-8 18Zm0 0V3M6 21h12"/>',
  twigs:'<path d="m6 21 8-18m-4 10 9-5m-8 1-5-4m3 10-5-3"/>',
  rocks:'<path d="m3 18 3-11 8-4 7 7-1 10-11 1Z"/><path d="m6 7 5 7 10-4M11 14l-2 7m5-18-3 11"/>',
  rope:'<path d="M5 9c0-7 14-7 14 0v7c0 7-14 7-14 0Zm3-1c0-3 8-3 8 0s-8 3-8 0Zm-3 3c4 4 10 4 14 0M5 15c4 4 10 4 14 0M5 18c4 4 10 4 14 0"/>',
  boards:'<path d="m3 8 13-5 5 4-13 5Zm0 0v10l5 3 13-5V7M8 12v9m-5-9 5 3 13-5M3 15l5 3 13-5"/>'
};
const TEXT = {
  zh:{fullCatalog:'完整物品代码表',baseStats:"基础属性",dstEdition:"联机版",statsMissing:"暂未收录已核实的数值，可前往 Wiki 查看。",statsNote:"联机版基础数值；角色、技能、季节与模组可能改变实际效果。",freshFoodNote:"食物数值以新鲜状态为准，1 游戏天为 8 分钟。",statsSource:"查看属性来源",secondsUnit:"秒",daysUnit:"游戏天",perMinuteUnit:"/分钟",stat_restoreHealth:"生命恢复",stat_restoreHunger:"饥饿恢复",stat_restoreSanity:"精神恢复",stat_damage:"伤害",stat_health:"生命值",stat_absorption:"伤害吸收",stat_armor:"护甲耐久",stat_uses:"使用次数",stat_planarDamage:"位面伤害",stat_planarDefense:"位面防御",stat_sanityRate:"精神增益",stat_waterproof:"防水比例",stat_durationSeconds:"使用时长",stat_perishDays:"保质期",stat_stack:"堆叠上限",stat_fuelSeconds:"燃料时长",decreaseQuantity:'数量减一',increaseQuantity:'数量加一',noteInterval:'每分钟更新',nextNote:'换一条',refreshNote:'换一条生存笔记',copyHelp:'复制指令后，在游戏里按 ~ 打开控制台，粘贴并回车。',viewSteps:'查看步骤',itemCode:'物品代码（可选）',copyCodeItem:'仅复制 {name} 的物品代码',pasteToast:'到游戏控制台粘贴并回车',skip:'跳转到物品清单',brandSub:'生存者手册 · FIELD GUIDE',guide:'使用指南',language:'语言',theme:'外观',system:'跟随系统',light:'浅色',dark:'深色',eyebrow:'在永恒领域，做好准备再出发',heroTitle:'活下去，<br>从准备好物资开始。',heroDescription:'你的饥荒口袋百科。查找物品、了解用途，<br class="desktop-break">一键复制指令，让每一次探索都从容一点。',entries:'个收录条目',bilingual:'中英双语检索',offline:'无需登录',catalog:'探索图鉴',fieldNote:'生存笔记',fieldNoteText:'天黑前，记得备好光源。<br>查代码也别忘了添把柴。',collection:'THE SURVIVOR’S COLLECTION',copyMode:'物品放在哪里',codeOnly:'仅复制物品代码',give:'背包里',spawn:'地面上',quantity:'数量',sort:'排序',recommended:'默认排序',nameSort:'按名称排序',codeSort:'按代码排序',footer:'为每一位永恒领域的探索者而作。',sources:'资料来源',unofficial:'非官方玩家工具',all:'全部物品',materials:'材料与资源',tools:'工具与生存',combat:'武器与装备',food:'食物与料理',structures:'建筑与设施',magic:'魔法与远古',creatures:'生物与巨兽',world:'植物与地形',other:'杂物与收藏',favorites:'我的收藏',search:'搜索名称、代码或用途…',clear:'清空搜索',found:'找到 {count} 个条目',foundQuery:'找到 {count} 个匹配「{query}」的条目',hintCode:'用于自行编写指令，不能直接执行。',hintGive:'建筑和生物不能随身携带，会自动放到地面上。',hintSpawn:'物品会出现在鼠标指向的地面上。',copy:'复制指令',copied:'已复制',copyItem:'复制 {name} 的指令',favoriteItem:'收藏 {name}',unfavoriteItem:'取消收藏 {name}',spawnOnly:'地面生成',special:'特殊形态',noCode:'无独立代码',emptyTitle:'这里暂时没有发现',emptySearch:'换个名称、代码或用途，继续探索吧。',emptyFavorites:'点击物品卡片上的爱心，把常用物品收进这里。',reset:'查看全部物品',range:'第 {start}–{end} 条，共 {count} 条',previous:'上一页',next:'下一页',page:'第 {page} 页，共 {total} 页',description:'物品说明',recipe:'制作材料',uses:'可用于制作',command:'可直接粘贴的指令',wiki:'前往 Wiki 了解更多 ↗',recipeNote:'材料参考联机版游戏脚本。配方解锁条件与不同版本的差异请查阅 Wiki。',versionNote:'沿用原仓库的跨版本清单；部分条目仅适用于特定游戏版本、事件或模组。',autoSpawn:'这个物品不能随身携带，会自动放到地面上。',close:'关闭',copyFailed:'复制失败，请选中指令后手动复制。',guideTitle:'准备好，再出发。',guideSubtitle:'三步使用控制台指令',step1Title:'打开游戏控制台',step1:'按 <kbd>~</kbd>（通常是 Esc 下方的键）打开，按 <kbd>Esc</kbd> 关闭。联机版需要服务器管理员权限；在控制台中按 <kbd>Ctrl</kbd> 切换到远程模式。',step2Title:'选择位置和数量，复制指令',step2:'想随身携带，就选「背包里」；想放在世界中，就选「地面上」。填好数量后，点击物品卡片上的「复制指令」。建筑和生物会自动放到地面上。',step3Title:'粘贴指令，回到探索',step3:'把复制的指令粘贴到游戏控制台，按回车运行。物品代码、括号、引号与逗号都使用英文字符。',guideLink:'查看控制台完整说明 ↗',fallbackMaterials:'基础资源或制作材料。展开详情查看已收录的制作关联。',fallbackTools:'用于探索与生存的工具或物品。展开详情查看材料，更多使用条件见 Wiki。',fallbackCombat:'战斗与防护装备。具体伤害、耐久和角色限制请查阅 Wiki。',fallbackFood:'食物、料理或烹饪原料。食用效果与保质期请查阅 Wiki。',fallbackStructures:'世界中的建筑或设施，会放到地面上。部分设施需要额外设置才能使用。',fallbackMagic:'魔法或远古相关物品。具体效果、科技要求和适用版本请查阅 Wiki。',fallbackCreatures:'永恒领域中的生物，会出现在地面上。行为可能受地形、季节或世界状态影响。',fallbackWorld:'植物、地形或自然物件。部分物件需要合适的地形或世界状态才能正常使用。',fallbackOther:'可收集的杂物。具体用途和交易条件请查阅 Wiki。',craftedFrom:'制作材料：',usedFor:'可用于制作：'},
  en:{fullCatalog:'All item codes',baseStats:"Base stats",dstEdition:"Together",statsMissing:"Verified values are not available yet. See the Wiki for more information.",statsNote:"Base values for Together. Characters, skills, seasons and mods can change the effects.",freshFoodNote:"Food values assume fresh food. One game day is 8 minutes.",statsSource:"View stat source",secondsUnit:"sec",daysUnit:"game days",perMinuteUnit:"/min",stat_restoreHealth:"Health restored",stat_restoreHunger:"Hunger restored",stat_restoreSanity:"Sanity restored",stat_damage:"Damage",stat_health:"Health",stat_absorption:"Absorption",stat_armor:"Armor durability",stat_uses:"Uses",stat_planarDamage:"Planar damage",stat_planarDefense:"Planar defense",stat_sanityRate:"Sanity rate",stat_waterproof:"Waterproofing",stat_durationSeconds:"Use duration",stat_perishDays:"Spoilage time",stat_stack:"Stack size",stat_fuelSeconds:"Fuel duration",decreaseQuantity:'Decrease amount',increaseQuantity:'Increase amount',noteInterval:'Updates every minute',nextNote:'Next tip',refreshNote:'Show another survival tip',copyHelp:'Copy a command, press ~ in the game, then paste and press Enter.',viewSteps:'Show steps',itemCode:'Item code (optional)',copyCodeItem:'Copy only the item code for {name}',pasteToast:'Paste into the game console and press Enter',skip:'Skip to item catalog',brandSub:'THE SURVIVOR’S FIELD GUIDE',guide:'How to use',language:'Language',theme:'Appearance',system:'System',light:'Light',dark:'Dark',eyebrow:'A LITTLE PREPARATION GOES A LONG WAY',heroTitle:'Stay alive.<br>Come prepared.',heroDescription:'Your pocket guide to the Constant. Find items, learn their uses,<br class="desktop-break">and copy commands for your next adventure.',entries:'catalog entries',bilingual:'Bilingual search',offline:'No sign-in needed',catalog:'EXPLORE THE GUIDE',fieldNote:'A field note',fieldNoteText:'Pack a light before nightfall.<br>And don’t forget to fuel the fire.',collection:'THE SURVIVOR’S COLLECTION',copyMode:'Where should it go?',codeOnly:'Copy item code only',give:'In my inventory',spawn:'On the ground',quantity:'Amount',sort:'Sort items',recommended:'Default order',nameSort:'By item name',codeSort:'By prefab code',footer:'Made for every explorer of the Constant.',sources:'Sources',unofficial:'Unofficial fan tool',all:'All items',materials:'Materials',tools:'Tools & survival',combat:'Weapons & armor',food:'Food & cooking',structures:'Structures',magic:'Magic & ancient',creatures:'Creatures & giants',world:'Plants & terrain',other:'Trinkets & curios',favorites:'My favorites',search:'Search names, prefab codes or uses…',clear:'Clear search',found:'{count} entries to explore',foundQuery:'{count} results for “{query}”',hintCode:'For writing your own commands. This code cannot run by itself.',hintGive:'Structures and creatures cannot be carried and will go on the ground automatically.',hintSpawn:'Items will appear on the ground at your cursor’s position.',copy:'Copy command',copied:'Copied',copyItem:'Copy command for {name}',favoriteItem:'Favorite {name}',unfavoriteItem:'Unfavorite {name}',spawnOnly:'Ground only',special:'Special form',noCode:'No standalone code',emptyTitle:'Nothing discovered here yet',emptySearch:'Try another name, prefab code or use and keep exploring.',emptyFavorites:'Tap a heart on an item card to keep your go-to items here.',reset:'Explore all items',range:'{start}–{end} of {count} entries',previous:'Previous page',next:'Next page',page:'Page {page} of {total}',description:'Field notes',recipe:'Crafting ingredients',uses:'Used to craft',command:'Ready-to-paste command',wiki:'Explore this item on the Wiki ↗',recipeNote:'Ingredients reference Together game scripts. Check the Wiki for unlock requirements and version differences.',versionNote:'The original catalog spans game versions. Some entries require a specific version, event or mod.',autoSpawn:'This item cannot be carried and will go on the ground automatically.',close:'Close',copyFailed:'Copy failed. Select the command and copy it manually.',guideTitle:'A little preparation.',guideSubtitle:'Console commands in three steps',step1Title:'Open the game console',step1:'Press <kbd>~</kbd> (usually below Esc) to open it and <kbd>Esc</kbd> to close. Together requires server admin rights; press <kbd>Ctrl</kbd> in the console to switch to remote mode.',step2Title:'Choose a destination and amount, then copy',step2:'Choose “In my inventory” to carry items or “On the ground” to place them in the world. Set the amount, then click “Copy command” on an item card. Structures and creatures go on the ground automatically.',step3Title:'Paste, then keep exploring',step3:'Paste the command into the game console and press Enter. Prefab codes, parentheses, quotation marks and commas use English characters.',guideLink:'Read the full console guide ↗',fallbackMaterials:'A resource or crafting material. Open its details for available crafting connections.',fallbackTools:'A tool or survival item. See its details for ingredients and the Wiki for usage conditions.',fallbackCombat:'Combat or protective equipment. Check the Wiki for damage, durability and character requirements.',fallbackFood:'A food, prepared dish or cooking ingredient. Check the Wiki for food values and spoilage.',fallbackStructures:'A world structure or facility. Spawn it on the ground; some structures need additional setup.',fallbackMagic:'A magical or ancient item. Check the Wiki for effects, research requirements and version availability.',fallbackCreatures:'A creature of the Constant. Spawn it on the ground; behavior may depend on terrain, season or world state.',fallbackWorld:'A plant, terrain piece or natural object. Some require suitable terrain or world conditions.',fallbackOther:'A collectible curiosity. See the Wiki for its uses and trading conditions.',craftedFrom:'Crafted from: ',usedFor:'Used to craft: '}
};
const PAGE_SEO = {
  zh: {title:'饥荒代码大全 - 物品代码查询、属性与控制台指令',description:'饥荒代码大全：查询饥荒及饥荒联机版物品代码、真实图标、基础属性和制作材料。支持中英文搜索，一键复制 c_give、c_spawn 控制台指令，快速将物品放入背包或生成到地面。',locale:'zh_CN'},
  en: {title:'饥荒代码大全 | Don’t Starve Item Codes & Console Commands',description:'Look up Don’t Starve and Don’t Starve Together item codes, game icons, base stats and crafting ingredients. Search in English or Chinese and copy c_give or c_spawn console commands.',locale:'en_US'}
};
function updatePageMetadata() {
  const meta = PAGE_SEO[state.language];
  document.title = meta.title;
  for (const selector of ['meta[name="description"]','meta[property="og:description"]','meta[name="twitter:description"]']) $(selector).content = meta.description;
  for (const selector of ['meta[property="og:title"]','meta[name="twitter:title"]']) $(selector).content = meta.title;
  $('meta[property="og:locale"]').content = meta.locale;
}
const CATEGORIES = ['all','materials','tools','combat','food','structures','magic','creatures','world','other','favorites'];
const PAGE_SIZE = 24;
const NOTE_INTERVAL_MS = 60_000;
const FIELD_NOTES = [
  {zh:'天黑前，记得备好光源。查代码也别忘了添把柴。',en:'Pack a light before nightfall. And don’t forget to fuel the fire.'},
  {zh:'木头既能添柴，也能精炼成木板。建造基地前，记得备上一些。',en:'Logs fuel your fire and can be refined into Boards. Keep some ready for your base.'},
  {zh:'地下的荧光果能为提灯和矿工帽补充燃料。探索前，检查一下光源。',en:'Cave Light Bulbs refuel Lanterns and Miner Hats. Check your lights before exploring.'},
  {zh:'蜘蛛丝不只用于衣物，也能制作捕虫网、钓竿和帐篷。',en:'Silk is useful for more than clothing: craft Bug Nets, Fishing Rods and Tents with it.'},
  {zh:'冰箱能延缓食物腐烂。收获丰盛时，把易坏的食物先存起来。',en:'Ice Boxes slow food spoilage. Store perishable food after a good harvest.'},
  {zh:'用铲子挖起草丛和树苗，可以把常用资源搬到基地附近。',en:'Dig up Grass Tufts and Saplings with a Shovel to move resources closer to your base.'},
  {zh:'热能石可以在热源旁升温、在冷源旁降温，帮助应对寒冬和炎夏。',en:'Warm a Thermal Stone near a fire or cool it near a cold source to prepare for harsh seasons.'},
  {zh:'噩梦燃料是魔法制作的常用材料，也能为部分魔法装备补充燃料。',en:'Nightmare Fuel is used in magical recipes and to refuel some magical equipment.'},
  {zh:'烹饪锅需要放入四份材料。搭配食材，能做出不同的料理。',en:'A Crock Pot takes four ingredients. Different combinations produce different dishes.'},
  {zh:'种下松果可以补种常青树。取走木材，也记得给森林留下新的生长机会。',en:'Plant Pine Cones to grow new Evergreens. Leave the forest a chance to grow back.'}
];
let fieldNoteIndex = Math.floor(Math.random() * FIELD_NOTES.length);
let fieldNoteTimer;
function nextFieldNoteIndex(index) { return (index + 1) % FIELD_NOTES.length; }
function renderFieldNote() { $('#fieldNoteText').textContent = FIELD_NOTES[fieldNoteIndex][state.language]; }
function advanceFieldNote() { fieldNoteIndex = nextFieldNoteIndex(fieldNoteIndex); renderFieldNote(); }
function restartFieldNoteTimer() {
  clearInterval(fieldNoteTimer);
  fieldNoteTimer = undefined;
  if (!document.hidden) fieldNoteTimer = setInterval(advanceFieldNote, NOTE_INTERVAL_MS);
}
function normalizeQuantity(value) { return Math.max(1, Math.min(999, Math.floor(Number(value) || 1))); }
function renderQuantityControls() {
  $('#quantityDecrease').disabled = state.quantity <= 1;
  $('#quantityIncrease').disabled = state.quantity >= 999;
}
function updateQuantity(value, normalizeInput = true) {
  state.quantity = normalizeQuantity(value);
  if (normalizeInput) $('#quantity').value = state.quantity;
  renderItems();
}
const dropdowns = [];
function syncDropdowns() { dropdowns.forEach(dropdown => dropdown.sync()); }
const $ = selector => document.querySelector(selector);
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const icon = name => `<svg class="icon" viewBox="0 0 24 24" aria-hidden="true">${ICONS[name] || ICONS.materials}</svg>`;
function readPreference(key, fallback) { try { return localStorage.getItem(key) ?? fallback; } catch { return fallback; } }
function savePreference(key, value) { try { localStorage.setItem(key, value); } catch {} }
let savedFavorites;
try { savedFavorites = JSON.parse(readPreference('ds-favorites','[]')); } catch { savedFavorites = []; }
const savedLang = readPreference('ds-language','');
const state = {
  language:['zh','en'].includes(savedLang) ? savedLang : ((navigator.language || 'zh').startsWith('zh') ? 'zh' : 'en'),
  theme:['system','light','dark'].includes(readPreference('ds-theme','system')) ? readPreference('ds-theme','system') : 'system',
  category:'all', query:'', mode:'give', quantity:1, sort:'default', page:1,
  favorites:new Set(Array.isArray(savedFavorites) ? savedFavorites.filter(v => typeof v === 'string') : []), detail:null
};
const records = ITEMS.map((item,index) => ({...item,...ITEM_DETAILS[item.code],id:item.code || `special-${index}`}));
const byId = new Map(records.map(item => [item.id,item]));
const byCode = new Map(records.filter(item => item.code).map(item => [item.code,item]));
function t(key,values={}) { return Object.entries(values).reduce((text,[name,value]) => text.replaceAll(`{${name}}`,String(value)), TEXT[state.language][key] || key); }
function itemName(item) { return item.name[state.language]; }
const STAT_KEYS = ['restoreHealth','restoreHunger','restoreSanity','damage','health','absorption','armor','uses','planarDamage','planarDefense','sanityRate','waterproof','durationSeconds','perishDays','stack','fuelSeconds'];
function itemArtwork(item) {
  const fallback = icon(item.category);
  return `<span class="item-fallback" ${item.image ? 'hidden' : ''}>${fallback}</span>${item.image ? `<img class="item-art" src="${escapeHTML(item.image)}" alt="" loading="lazy" decoding="async" width="64" height="64">` : ''}`;
}
function statEntries(item) { return STAT_KEYS.filter(key => item.stats?.[key] !== undefined).map(key => [key,item.stats[key]]); }
function statValue(key,value) {
  const numeric = typeof value === 'number';
  const formatted = numeric ? new Intl.NumberFormat(state.language === 'zh' ? 'zh-CN' : 'en',{maximumFractionDigits:5}).format(value) : String(value);
  const signed = numeric && value > 0 && (key.startsWith('restore') || key === 'sanityRate') ? '+' + formatted : formatted;
  if (['absorption','waterproof'].includes(key)) return signed + '%';
  if (['fuelSeconds','durationSeconds'].includes(key)) return signed + ' ' + t('secondsUnit');
  if (key === 'perishDays') return signed + ' ' + t('daysUnit');
  if (key === 'sanityRate') return signed + t('perMinuteUnit');
  return signed;
}
function statsHTML(item,compact=false) {
  const entries = statEntries(item);
  if (!entries.length) return compact ? '' : `<p class="detail-note">${t('statsMissing')}</p>`;
  const rows = (compact ? entries.slice(0,3) : entries).map(([key,value]) => `<div><dt>${t('stat_' + key)}</dt><dd class="${typeof value === 'number' && value < 0 ? 'stat-negative' : ''}">${escapeHTML(statValue(key,value))}</dd></div>`).join('');
  if (compact) return `<dl class="card-stats" aria-label="${t('baseStats')}">${rows}</dl>`;
  return `<section class="item-attributes" aria-label="${t('baseStats')}"><div class="attributes-heading"><p class="detail-label">${t('baseStats')}</p><span>${t('dstEdition')}</span></div><dl class="detail-stats">${rows}</dl><p class="detail-note">${t('statsNote')}${item.stats.restoreHunger !== undefined ? ' ' + t('freshFoodNote') : ''}</p><a class="stats-source" href="${ITEM_DATA_SOURCE.scriptURL}" target="_blank" rel="noopener noreferrer">${t('statsSource')} ↗</a></section>`;
}
function itemDescription(item) {
  if (item.description) return item.description[state.language];
  if (item.recipe.length) return t('craftedFrom') + item.recipe.map(ingredient => `${ingredient.name[state.language]} ×${ingredient.amount}`).join(' · ');
  if (item.uses.length) return t('usedFor') + item.uses.map(code => itemName(byCode.get(code))).join(' · ');
  return t(`fallback${item.category[0].toUpperCase()}${item.category.slice(1)}`);
}
function commandFor(item) {
  if (!item.code) return '';
  return `c_${state.mode === 'give' && item.inventory ? 'give' : 'spawn'}("${item.code}", ${state.quantity})`;
}
function copyValueFor(item, format = 'command') { return format === 'code' ? item.code : commandFor(item); }
function normalized(value) { return String(value).normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(); }
function filteredItems() {
  const terms = normalized(state.query).trim().split(/\s+/).filter(Boolean);
  let result = records.filter(item => {
    if (state.category === 'favorites' ? !state.favorites.has(item.id) : state.category !== 'all' && item.category !== state.category) return false;
    const haystack = normalized([item.name.zh,item.name.en,item.code,...item.aliases,itemDescription(item),t(item.category),...item.recipe.map(v => `${v.name.zh} ${v.name.en}`),...item.uses.map(c => `${byCode.get(c).name.zh} ${byCode.get(c).name.en}`)].join(' '));
    return terms.every(term => haystack.includes(term));
  });
  if (state.sort !== 'default') result.sort((a,b) => (state.sort === 'code' ? a.code : itemName(a)).localeCompare(state.sort === 'code' ? b.code : itemName(b),state.language === 'zh' ? 'zh-CN' : 'en'));
  return result;
}
function renderCategories() {
  $('#categories').innerHTML = CATEGORIES.map(category => {
    const count = category === 'all' ? records.length : category === 'favorites' ? records.filter(item => state.favorites.has(item.id)).length : records.filter(item => item.category === category).length;
    return `<button class="category-button ${state.category === category ? 'active' : ''}" data-category="${category}" aria-pressed="${state.category === category}">${icon(category === 'all' ? 'grid' : category === 'favorites' ? 'heart' : category)}<span>${t(category)}</span><span class="category-count">${count}</span></button>`;
  }).join('');
  $('#categories').setAttribute('aria-label',t('catalog'));
}
function cardHTML(item) {
  const favorite = state.favorites.has(item.id);
  const cmd = commandFor(item);
  return `<article class="item-card" data-item="${item.id}"><div class="card-top"><div class="item-symbol" data-category="${item.category}">${itemArtwork(item)}</div><div class="item-heading"><button class="item-title" data-detail="${item.id}" title="${escapeHTML(itemName(item))}">${escapeHTML(itemName(item))}</button><span class="item-subtitle">${escapeHTML(item.name[state.language === 'zh' ? 'en' : 'zh'])}</span></div><button class="favorite-button" data-favorite="${item.id}" aria-label="${escapeHTML(t(favorite ? 'unfavoriteItem' : 'favoriteItem',{name:itemName(item)}))}" aria-pressed="${favorite}">${icon('heart')}</button></div><p class="item-description">${escapeHTML(itemDescription(item))}</p>${statsHTML(item,true)}<div class="item-tags"><span>${t(item.category)}</span>${!item.code ? `<span class="spawn-tag">${t('special')}</span>` : !item.inventory ? `<span class="spawn-tag">${t('spawnOnly')}</span>` : ''}</div><div class="card-code"><code title="${escapeHTML(cmd || t('noCode'))}">${escapeHTML(cmd || t('noCode'))}</code><button class="copy-button" data-copy="${item.id}" aria-label="${escapeHTML(t('copyItem',{name:itemName(item)}))}" ${!item.code ? 'disabled' : ''}>${icon('copy')}<span>${t('copy')}</span></button></div></article>`;
}
function renderItems() {
  renderQuantityControls();
  const results = filteredItems();
  const pages = Math.max(1,Math.ceil(results.length/PAGE_SIZE));
  state.page = Math.min(state.page,pages);
  $('#catalogTitle').textContent = t(state.category);
  $('#resultCount').textContent = t(state.query ? 'foundQuery' : 'found',{count:results.length,query:state.query});
  $('#modeHint').textContent = t(state.mode === 'give' ? 'hintGive' : 'hintSpawn');
  $('#clearSearch').hidden = !state.query;
  const start = (state.page-1)*PAGE_SIZE;
  $('#itemGrid').innerHTML = results.length ? results.slice(start,start+PAGE_SIZE).map(cardHTML).join('') : `<div class="empty-state">${icon(state.category === 'favorites' ? 'heart' : 'search')}<strong>${t('emptyTitle')}</strong><div>${t(state.category === 'favorites' && !state.query ? 'emptyFavorites' : 'emptySearch')}</div><button data-reset>${t('reset')}</button></div>`;
  $('#pagination').innerHTML = results.length ? `<span>${t('range',{start:start+1,end:Math.min(start+PAGE_SIZE,results.length),count:results.length})}</span><div class="pagination-controls"><button data-page="previous" aria-label="${t('previous')}" ${state.page===1 ? 'disabled' : ''}>${icon('left')}</button><span class="page-current">${state.page} / ${pages}</span><button data-page="next" aria-label="${t('next')}" ${state.page===pages ? 'disabled' : ''}>${icon('right')}</button></div>` : '';
}
function renderLanguage() {
  document.documentElement.lang = state.language === 'zh' ? 'zh-CN' : 'en';
  updatePageMetadata();
  document.querySelectorAll('[data-i18n]').forEach(element => { element.innerHTML = t(element.dataset.i18n); });
  $('#languageSelect').value = state.language;
  $('#guideButton').setAttribute('aria-label',t('guide'));
  $('#searchInput').placeholder = t('search');
  $('#searchInput').setAttribute('aria-label',t('search'));
  $('#clearSearch').setAttribute('aria-label',t('clear'));
  $('#languageSelect').setAttribute('aria-label',t('language'));
  $('#themeSelect').setAttribute('aria-label',t('theme'));
  $('#quantity').setAttribute('aria-label',t('quantity'));
  $('#quantityDecrease').setAttribute('aria-label',t('decreaseQuantity'));
  $('#quantityIncrease').setAttribute('aria-label',t('increaseQuantity'));
  $('#refreshNote').setAttribute('aria-label',t('refreshNote'));
  $('#sortSelect').setAttribute('aria-label',t('sort'));
  $('.segmented').setAttribute('aria-label',t('copyMode'));
  $('#totalCount').textContent = records.length.toLocaleString(state.language === 'zh' ? 'zh-CN' : 'en');
  renderCategories(); renderItems(); syncDropdowns(); renderFieldNote();
  if ($('#detailDialog').open) renderDetail(byId.get(state.detail));
  if ($('#guideDialog').open) renderGuide();
}
function applyTheme() {
  if (state.theme === 'system') delete document.documentElement.dataset.theme;
  else document.documentElement.dataset.theme = state.theme;
  $('#themeSelect').value = state.theme;
  syncDropdowns();
  $('meta[name="theme-color"]').content = getComputedStyle(document.documentElement).getPropertyValue('--bg').trim();
}
let toastTimer;
function showToast(message) {
  clearTimeout(toastTimer);
  $('#toast').textContent = message;
  $('#toast').classList.add('visible');
  toastTimer = setTimeout(() => $('#toast').classList.remove('visible'),3000);
}
async function copyText(text) {
  try { if (navigator.clipboard?.writeText) { await navigator.clipboard.writeText(text); return; } } catch {}
  const field = document.createElement('textarea');
  field.value = text; field.style.cssText = 'position:fixed;left:-9999px;top:0;';
  const container = document.querySelector('dialog[open]') || document.body;
  container.append(field);
  const active = document.activeElement;
  field.focus(); field.select();
  let copied = false;
  try { copied = document.execCommand('copy'); } finally { field.remove(); active?.focus(); }
  if (!copied) throw new Error('Clipboard unavailable');
}
async function copyItem(id,button,format = 'command') {
  const item = byId.get(id);
  if (!item?.code) return;
  const cmd = copyValueFor(item,format);
  const copyLabel = format === 'code' ? 'codeOnly' : 'copy';
  try {
    await copyText(cmd);
    if (button.isConnected) { button.innerHTML = `${icon('check')}<span>${t('copied')}</span>`; setTimeout(() => { if (button.isConnected) button.innerHTML = `${icon('copy')}<span>${t(copyLabel)}</span>`; },1800); }
    showToast(`${t('copied')} · ${format === 'code' ? cmd : t('pasteToast')}`);
  } catch {
    showToast(t('copyFailed'));
    const codeElement = button.parentElement.querySelector('code');
    if (codeElement) { const selection = window.getSelection(); const range = document.createRange(); range.selectNodeContents(codeElement); selection.removeAllRanges(); selection.addRange(range); }
  }
}
function dialogHeader(title,subtitle,kicker) { return `<div class="dialog-header"><div><p class="section-kicker">${escapeHTML(kicker)}</p><h2 id="${kicker === 'FIELD GUIDE' ? 'guideTitle' : 'detailTitle'}">${escapeHTML(title)}</h2><div class="dialog-subtitle">${escapeHTML(subtitle)}</div></div><button class="icon-button" data-close aria-label="${t('close')}">${icon('close')}</button></div>`; }
function renderDetail(item) {
  if (!item) return;
  const wikiQuery = item.officialName ? item.name.en : item.code || item.name.zh;
  $('#detailContent').innerHTML = `${dialogHeader(itemName(item),item.name[state.language === 'zh' ? 'en' : 'zh'],t(item.category))}<div class="detail-overview"><div class="item-symbol detail-symbol">${itemArtwork(item)}</div><p class="detail-description">${escapeHTML(itemDescription(item))}</p></div>${statsHTML(item)}${item.recipe.length ? `<p class="detail-label">${t('recipe')}</p><div class="ingredients">${item.recipe.map(ing => `<span class="ingredient">${escapeHTML(ing.name[state.language])} × ${ing.amount}</span>`).join('')}</div><p class="detail-note">${t('recipeNote')}</p>` : ''}${item.uses.length ? `<p class="detail-label">${t('uses')}</p><div class="ingredients">${item.uses.map(code => `<button class="ingredient" data-detail="${code}">${escapeHTML(itemName(byCode.get(code)))}</button>`).join('')}</div>` : ''}<p class="detail-label">${t('command')}</p><div class="detail-command"><code>${escapeHTML(commandFor(item) || t('noCode'))}</code><button class="copy-button" data-copy="${item.id}" ${!item.code ? 'disabled' : ''}>${icon('copy')}<span>${t('copy')}</span></button></div>${state.mode==='give' && !item.inventory && item.code ? `<p class="detail-note">${t('autoSpawn')}</p>` : ''}<a class="detail-source" href="https://dontstarve.wiki.gg/wiki/Special:Search?search=${encodeURIComponent(wikiQuery)}" target="_blank" rel="noopener noreferrer">${t('wiki')}</a><p class="detail-note">${t('versionNote')}</p>${item.code ? `<p class="detail-label">${t('itemCode')}</p><div class="prefab-copy"><code>${escapeHTML(item.code)}</code><button class="copy-button secondary-copy" data-copy="${item.id}" data-copy-format="code" aria-label="${escapeHTML(t('copyCodeItem',{name:itemName(item)}))}">${icon('copy')}<span>${t('codeOnly')}</span></button></div><p class="detail-note">${t('hintCode')}</p>` : ''}`;
}
function openDetail(id) {
  const item = byId.get(id);
  if (!item) return;
  state.detail = id; renderDetail(item);
  if (!$('#detailDialog').open) $('#detailDialog').showModal();
}
function renderGuide() {
  $('#guideContent').innerHTML = `${dialogHeader(t('guideTitle'),t('guideSubtitle'),'FIELD GUIDE')}${[1,2,3].map(i => `<div class="guide-step"><span class="step-number">${i}</span><div><h3>${t(`step${i}Title`)}</h3><p>${t(`step${i}`)}</p>${i===2 ? '<code>c_give("log", 20)<br>c_spawn("researchlab", 1)</code>' : ''}</div></div>`).join('')}<a class="detail-source" href="https://dontstarve.wiki.gg/wiki/Console/Don%27t_Starve_Together_Commands" target="_blank" rel="noopener noreferrer">${t('guideLink')}</a><p class="detail-note">${t('versionNote')}</p>`;
}
function resetFilters() { state.category='all'; state.query=''; state.page=1; $('#searchInput').value=''; renderCategories(); renderItems(); }
document.addEventListener('error',event => {
  const image = event.target;
  if (image instanceof HTMLImageElement && image.classList.contains('item-art')) {
    image.hidden = true;
    image.previousElementSibling.hidden = false;
  }
},true);
document.addEventListener('click',event => {
  const button = event.target.closest('button');
  if (!button) {
    const card = event.target.closest('.item-card[data-item]');
    if (card && !event.target.closest('a,input,select,textarea') && window.getSelection()?.isCollapsed !== false) openDetail(card.dataset.item);
    return;
  }
  if (button.disabled) return;
  if (button.dataset.category) { state.category=button.dataset.category; state.page=1; renderCategories(); renderItems(); }
  else if (button.dataset.mode) { state.mode=button.dataset.mode; document.querySelectorAll('[data-mode]').forEach(element => element.setAttribute('aria-pressed',element.dataset.mode===state.mode)); renderItems(); }
  else if (button.dataset.favorite) { const id=button.dataset.favorite; state.favorites.has(id) ? state.favorites.delete(id) : state.favorites.add(id); savePreference('ds-favorites',JSON.stringify([...state.favorites])); renderCategories(); renderItems(); }
  else if (button.dataset.copy) copyItem(button.dataset.copy,button,button.dataset.copyFormat);
  else if (button.dataset.detail) openDetail(button.dataset.detail);
  else if (button.dataset.page) { state.page+=button.dataset.page==='next' ? 1 : -1; renderItems(); $('#catalog').scrollIntoView({behavior:'smooth',block:'start'}); }
  else if (button.hasAttribute('data-reset')) resetFilters();
  else if (button.hasAttribute('data-close')) button.closest('dialog').close();
});
$('#searchInput').addEventListener('input',event => { state.query=event.target.value.trim(); state.page=1; renderItems(); });
$('#clearSearch').addEventListener('click',() => { state.query=''; state.page=1; $('#searchInput').value=''; renderItems(); $('#searchInput').focus(); });
$('#quantity').addEventListener('input',event => updateQuantity(event.target.value, false));
$('#quantity').addEventListener('change',() => updateQuantity(state.quantity));
$('#quantity').addEventListener('blur',() => updateQuantity(state.quantity));
$('#quantity').addEventListener('keydown',event => {
  if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
    event.preventDefault();
    updateQuantity(state.quantity + (event.key === 'ArrowUp' ? 1 : -1));
  }
});
$('#quantityDecrease').addEventListener('click',() => updateQuantity(state.quantity - 1));
$('#quantityIncrease').addEventListener('click',() => updateQuantity(state.quantity + 1));
$('#refreshNote').addEventListener('click',() => { advanceFieldNote(); restartFieldNoteTimer(); });
document.addEventListener('visibilitychange',restartFieldNoteTimer);
$('#sortSelect').addEventListener('change',event => { state.sort=event.target.value; state.page=1; renderItems(); });
$('#languageSelect').addEventListener('change',event => { state.language=event.target.value; savePreference('ds-language',state.language); renderLanguage(); });
$('#themeSelect').addEventListener('change',event => { state.theme=event.target.value; savePreference('ds-theme',state.theme); applyTheme(); });
matchMedia('(prefers-color-scheme: dark)').addEventListener('change',() => { if(state.theme==='system') applyTheme(); });
$('#guideButton').addEventListener('click',() => { renderGuide(); $('#guideDialog').showModal(); });
for (const dialog of document.querySelectorAll('dialog')) {
  dialog.addEventListener('click',event => { if (event.target===dialog) { const rect=dialog.getBoundingClientRect(); if (event.clientX<rect.left || event.clientX>rect.right || event.clientY<rect.top || event.clientY>rect.bottom) dialog.close(); } });
}
document.addEventListener('keydown',event => {
  const editing = ['INPUT','TEXTAREA','SELECT'].includes(document.activeElement.tagName) || document.activeElement.isContentEditable;
  if (event.key==='/' && !editing && !document.querySelector('dialog[open]') && !event.ctrlKey && !event.metaKey && !event.altKey) { event.preventDefault(); $('#searchInput').focus(); }
  if (event.key==='Escape' && document.activeElement===$('#searchInput')) { state.query=''; state.page=1; $('#searchInput').value=''; renderItems(); }
});
document.querySelectorAll('[data-icon]').forEach(element => { element.innerHTML=icon(element.dataset.icon); });
dropdowns.push(
  createDropdown($('#languageSelect'), { label: () => t('language'), icon: () => 'globe' }),
  createDropdown($('#themeSelect'), {
    label: () => t('theme'), icon: value => ({system: 'monitor', light: 'sun', dark: 'moon'}[value]),
    description: value => value === 'system' ? (state.language === 'zh' ? '与设备外观保持一致' : 'Match your device appearance') : ''
  }),
  createDropdown($('#sortSelect'), { label: () => t('sort'), icon: () => 'sort' })
);
renderLanguage(); applyTheme(); restartFieldNoteTimer();
