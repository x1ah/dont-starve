// Keep the initial catalog and a crawlable full code table in the published HTML.
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname,'..');
const context = vm.createContext({navigator:{language:'zh-CN'},localStorage:{getItem:()=>null}});
for (const file of ['data.js','item-details.js']) vm.runInContext(fs.readFileSync(path.join(root,file),'utf8'),context);
const app = fs.readFileSync(path.join(root,'app.js'),'utf8');
vm.runInContext(app.slice(0,app.indexOf("document.addEventListener('error'")),context);
const run = code=>vm.runInContext(code,context);
const cards = run('records.slice(0,PAGE_SIZE).map(cardHTML).join("\\n")');
const htmlPath = path.join(root,'index.html');
let index = fs.readFileSync(htmlPath,'utf8');
const staticCards = `<div id="itemGrid" class="item-grid">\n<!-- STATIC_CATALOG_START -->\n${cards}\n<!-- STATIC_CATALOG_END -->\n</div>`;
index = index.replace(/<div id="itemGrid" class="item-grid">[\s\S]*?<\/div>(?=\s*<div id="pagination")/,staticCards);
if (!index.includes('STATIC_CATALOG_START')) throw new Error('Missing catalog insertion point');
fs.writeFileSync(htmlPath,index);
const rows = run(`records.map(item => '<tr><th scope="row">'+escapeHTML(item.name.zh)+'<small>'+escapeHTML(item.name.en)+'</small></th><td><code>'+escapeHTML(item.code || t('noCode'))+'</code></td><td>'+escapeHTML(t(item.category))+'</td><td>'+escapeHTML(itemDescription(item))+'</td></tr>').join('\\n')`);
const count = run('records.length');
const title = '饥荒物品代码大全 - 完整物品代码表与用途';
const description = `饥荒及饥荒联机版 ${count} 个条目的完整物品代码表，中英文名称、分类和用途说明。返回查询工具可查看图标、属性、制作材料并一键复制控制台指令。`;
const catalog = `<!doctype html>
<html lang="zh-CN"><head>
<meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>${title}</title><meta name="description" content="${description}">
<link rel="canonical" href="https://when.run/dont-starve/catalog.html">
<meta property="og:type" content="website"><meta property="og:title" content="${title}"><meta property="og:description" content="${description}"><meta property="og:url" content="https://when.run/dont-starve/catalog.html">
<link rel="icon" href="assets/mark.svg" type="image/svg+xml"><link rel="stylesheet" href="styles.css">
<script>try { const theme = localStorage.getItem('ds-theme'); if (theme === 'light' || theme === 'dark') document.documentElement.dataset.theme = theme; } catch {}</script>
</head><body class="static-catalog">
<header class="site-header"><a class="brand" href="./"><img src="assets/mark.svg" width="38" height="38" alt=""><span><strong>饥荒代码大全</strong><small>DON’T STARVE ITEM CODES</small></span></a><a class="plain-button" href="./">返回物品查询 ↗</a></header>
<main class="page-shell"><h1>完整物品代码表</h1><p class="catalog-intro">${description}</p><p class="catalog-intro">可使用浏览器查找（Ctrl / ⌘ + F）定位名称或代码。清单包含跨版本条目，部分物品仅适用于特定版本、事件或模组。</p>
<div class="static-command-guide"><h2>饥荒控制台指令</h2><p>在游戏中按 <kbd>~</kbd> 打开控制台。联机版需要管理员权限，并切换到远程模式。</p><p><code>c_give("log", 20)</code>：将 20 个木头放入背包。<br><code>c_spawn("researchlab", 1)</code>：在地面生成科学机器。建筑与生物使用地面生成。</p><a href="./">打开查询工具，一键复制指令 ↗</a></div>
<div class="code-table-scroll"><table class="code-table"><caption>饥荒与饥荒联机版物品代码：${count} 个条目</caption><thead><tr><th scope="col">物品名称 / Name</th><th scope="col">物品代码 / Prefab</th><th scope="col">分类</th><th scope="col">用途说明</th></tr></thead><tbody>${rows}</tbody></table></div>
<footer><span>非官方玩家工具 · <a href="SOURCES.md">资料来源</a></span><a href="./">返回饥荒代码大全 ↗</a></footer></main></body></html>
`;
fs.writeFileSync(path.join(root,'catalog.html'),catalog);
fs.writeFileSync(path.join(root,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url><loc>https://when.run/dont-starve/</loc></url>
  <url><loc>https://when.run/dont-starve/catalog.html</loc></url>
</urlset>\n`);
console.log(`Rendered ${run('PAGE_SIZE')} initial cards and ${count} static code entries.`);
