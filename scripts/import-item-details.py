"""Refresh the static item artwork and DST base stats from recorded sources."""
import concurrent.futures
import json
import pathlib
import re
import time
import urllib.parse
import urllib.request

ROOT = pathlib.Path(__file__).resolve().parents[1]
ASSET_REV = '4cfd1334ca2606c4b5ccec40dff36125cc082efe'
SCRIPT_REV = '0dea2f76e0321ecc6c9faa8e1e5bdd80a5fc1b64'
ASSET_REPO = 'fankimm/dst-craft'
SCRIPT_REPO = 'taichunmin/dont-starve-together-game-scripts'
SCRIPT_PATH = 'scripts/screens/redux/scrapbookdata.lua'

def fetch(url):
    for attempt in range(3):
        try:
            req = urllib.request.Request(url, headers={'User-Agent': 'SurvivorFieldGuide/1.0 (static catalog assets)'})
            return urllib.request.urlopen(req, timeout=25).read()
        except Exception:
            if attempt == 2:
                raise
            time.sleep(1)

def stats_for(row):
    fields = {}
    for m in re.finditer(r'\b(\w+)=(?:"([^"]*)"|(-?\d+(?:\.\d+)?(?:e[+-]?\d+)?))(?=[,}])', row):
        fields[m[1]] = m[2] if m[2] is not None else float(m[3])
    stats = {}
    keys = {'stacksize':'stack', 'weapondamage':'damage', 'finiteuses':'uses', 'armor':'armor',
            'health':'health', 'planardamage':'planarDamage', 'armor_planardefense':'planarDefense'}
    for source, key in keys.items():
        if source in fields:
            stats[key] = fields[source]
    if 'damage' in fields and 'damage' not in stats:
        stats['damage'] = fields['damage']
    # WOOD and GEARS are character-specific diets, not regular survivor food.
    if fields.get('type') == 'food':
        for source, key in [('healthvalue','restoreHealth'), ('hungervalue','restoreHunger'), ('sanityvalue','restoreSanity')]:
            if source in fields:
                stats[key] = fields[source]
    for source, key, factor in [('absorb_percent','absorption',100), ('waterproofer','waterproof',100),
                                ('perishable','perishDays',1/480), ('dapperness','sanityRate',60)]:
        if source in fields:
            stats[key] = round(fields[source] * factor, 3)
    if fields.get('fueltype') == 'BURNABLE' and 'fuelvalue' in fields:
        stats['fuelSeconds'] = fields['fuelvalue']
    if fields.get('fueledrate',0) > 0 and fields.get('fueledmax',0) > 0:
        stats['durationSeconds'] = round(fields['fueledmax'] / fields['fueledrate'], 3)
    return stats, fields.get('tex','').removesuffix('.tex')

def main():
    items = json.loads((ROOT / 'data.js').read_text().split('const ITEMS = ',1)[1].strip().removesuffix(';'))
    script = fetch(f'https://raw.githubusercontent.com/{SCRIPT_REPO}/{SCRIPT_REV}/{SCRIPT_PATH}').decode()
    rows = {m[1]:m[2] for m in re.finditer(r'^\s*(\w+) = \{(.+)\},?$',script,re.M)}
    tree = json.loads(fetch(f'https://api.github.com/repos/{ASSET_REPO}/git/trees/{ASSET_REV}?recursive=1'))
    paths = {v['path'] for v in tree['tree'] if v['path'].endswith('.png')}
    details, images, wiki_titles = {}, {}, {}
    for item in items:
        code = item['code']
        if not code:
            continue
        stats, tex = stats_for(rows.get(code,''))
        if stats:
            details[code] = {'stats':stats}
        for image_code in dict.fromkeys([code,tex]):
            path = next((f'public/images/{folder}/{image_code}.png' for folder in ['game-items','bosses']
                         if f'public/images/{folder}/{image_code}.png' in paths),None)
            if path:
                images[code] = {'url':f'https://raw.githubusercontent.com/{ASSET_REPO}/{ASSET_REV}/{path}', 'page':f'https://github.com/{ASSET_REPO}/blob/{ASSET_REV}/{path}'}
                break
        if code not in images:
            title = 'File:' + item['name']['en'].replace(' ','_') + '.png'
            wiki_titles.setdefault(title,[]).append(code)
    titles = list(wiki_titles)
    for start in range(0,len(titles),40):
        query = urllib.parse.urlencode({'action':'query','titles':'|'.join(titles[start:start+40]),'prop':'imageinfo','iiprop':'url','format':'json','redirects':'1'})
        response = json.loads(fetch('https://dontstarve.wiki.gg/api.php?' + query))['query']
        title_map = {v:v for v in titles[start:start+40]}
        for change in response.get('normalized',[]) + response.get('redirects',[]):
            for original,current in title_map.items():
                if current == change['from']:
                    title_map[original] = change['to']
        pages = {v['title']:v for v in response['pages'].values()}
        for original,current in title_map.items():
            info = pages.get(current,{}).get('imageinfo',[])
            if info:
                for code in wiki_titles[original]:
                    images[code] = {'url':info[0]['url'],'page':info[0]['descriptionurl']}
    print(f'Found {len(images)} artwork files; downloading locally.',flush=True)
    target = ROOT / 'assets/items'
    target.mkdir(parents=True,exist_ok=True)
    def download(entry):
        code,source = entry
        path = target / (code + '.png')
        if not path.exists():
            data = fetch(source['url'])
            if not data.startswith(b'\x89PNG\r\n\x1a\n'):
                raise ValueError('Not PNG: ' + code)
            path.write_bytes(data)
        return code
    failures = []
    with concurrent.futures.ThreadPoolExecutor(max_workers=8) as pool:
        futures = {pool.submit(download,entry):entry[0] for entry in images.items()}
        for index,future in enumerate(concurrent.futures.as_completed(futures),1):
            code = futures[future]
            try:
                future.result()
                details.setdefault(code,{})['image'] = f'assets/items/{code}.png'
            except Exception as error:
                failures.append(code)
                print('Unavailable:',code,str(error),flush=True)
            if index % 100 == 0:
                print(f'{index}/{len(images)} processed',flush=True)
    manifest = {code:source for code,source in images.items() if code not in failures}
    (target / 'sources.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')
    meta = {'edition':'DST','scriptRevision':SCRIPT_REV,'scriptURL':f'https://github.com/{SCRIPT_REPO}/blob/{SCRIPT_REV}/{SCRIPT_PATH}',
            'assetRevision':ASSET_REV,'artworkCount':len(manifest),'statsCount':sum(bool(v.get('stats')) for v in details.values())}
    (ROOT / 'item-details.js').write_text('/* Game artwork and DST base stats: see SOURCES.md. */\nconst ITEM_DATA_SOURCE = '+json.dumps(meta)+';\nconst ITEM_DETAILS = '+json.dumps(details,ensure_ascii=False,separators=(',',':'))+';\n')
    print(json.dumps(meta),flush=True)

if __name__ == '__main__':
    main()
