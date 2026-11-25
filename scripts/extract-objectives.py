# Extracts the SY0-701 exam objectives from CompTIA's official PDF into JSON.
# Usage: pdftotext -bbox-layout sy0-701.pdf sy0-701.bbox.html && python3 scripts/extract-objectives.py sy0-701.bbox.html objectives.json
# Bullets are ordered column by column using each line's coordinates; nesting comes from the bullet glyph (• − ◦).
import re, sys, json, html
from xml.etree import ElementTree as ET

src, out = sys.argv[1], sys.argv[2]
raw = open(src, encoding='utf-8').read()
raw = re.sub(r'<!DOCTYPE[^>]*>', '', raw)
raw = raw.replace('xmlns="http://www.w3.org/1999/xhtml"', '')
root = ET.fromstring(raw)

SKIP = re.compile(r'CompTIA Security\+ SY0-701|Exam Objectives Document|Copyright ©|^\d\.0 \|')
BUL = {'•': 0, '−': 1, '◦': 2}

pages = root.findall('.//page')
lines_by_page = []
for pi, page in enumerate(pages):
    lines = []
    for line in page.iter('line'):
        words = [w.text or '' for w in line.findall('word')]
        text = ' '.join(words).strip()
        if not text: continue
        lines.append({'x': float(line.get('xMin')), 'y': float(line.get('yMin')), 't': text, 'p': pi})
    lines_by_page.append(lines)

domains = []        # {num, name}
objectives = []     # {num, title, items:[lines]}
cur = None
started = False
for pi, lines in enumerate(lines_by_page):
    if any(l['t'].startswith('ACRONYM') for l in lines): break
    heads = sorted([l for l in lines if re.fullmatch(r'\d\.\d', l['t']) and l['x'] < 45], key=lambda l: l['y'])
    used = set()
    dom = [l for l in lines if re.match(r'^\d\.0 [A-Z]', l['t']) and not SKIP.search(l['t'])]
    for d in dom:
        if not any(dd['num'] == d['t'][:3] for dd in domains):
            domains.append({'num': d['t'][:3], 'name': d['t'][4:].strip()})
    if heads: started = True
    if not started: continue
    # regions: (y_start, objective)
    regions = []
    if cur: regions.append((-1, cur))
    for h in heads:
        # title: non-bullet lines just right of the number, starting within a few points of it
        tl = sorted([l for l in lines if 45 < l['x'] < 70 and l['t'][0] not in BUL and -8 < l['y'] - h['y'] < 30
                     and not SKIP.search(l['t']) and not re.match(r'^\d\.0 ', l['t'])], key=lambda l: l['y'])
        title = []
        for l in tl:
            if title and l['y'] - prev > 18: break
            title.append(l['t']); used.add(id(l)); prev = l['y']
        cur = {'num': h['t'], 'title': ' '.join(title), 'tx': None, 'hy': h['y'], 'lines': []}
        objectives.append(cur)
        regions.append((h['y'], cur))
    for l in lines:
        if id(l) in used or SKIP.search(l['t']) or re.match(r'^\d\.0 [A-Z]', l['t']) or re.fullmatch(r'\d\.\d', l['t']): continue
        reg = None
        for y0, ob in regions:
            if l['y'] > y0 - 0.5: reg = ob
        if reg is None: continue
        reg['lines'].append(l)

def build(ob):
    ls = ob['lines']
    # title continuation lines: non-bullet lines before first bullet, close below heading, same page
    bullets = [l for l in ls if l['t'][0] in BUL]
    first_b = min((l['y'] for l in bullets if l['p'] == bullets[0]['p']), default=1e9) if bullets else 1e9
    rest = []
    for l in ls:
        rest.append(l)
    # column clustering per page
    items = []
    for p in sorted(set(l['p'] for l in rest)):
        pl = [l for l in rest if l['p'] == p]
        starts = sorted(set(round(l['x']) for l in pl if l['t'][0] in BUL))
        cols = []
        for s in starts:
            if not cols or s - cols[-1] > 40: cols.append(s)
        def col(l):
            c = 0
            for i, s in enumerate(cols):
                if l['x'] >= s - 6: c = i
            return c
        pl.sort(key=lambda l: (col(l), l['y']))
        for l in pl:
            t = l['t']
            if t[0] in BUL:
                items.append({'level': BUL[t[0]], 'text': t[1:].strip()})
            else:
                if not items: raise SystemExit(f"orphan line in {ob['num']}: {t}")
                items[-1]['text'] += ' ' + t
    return items

result = {'source': 'CompTIA Security+ SY0-701 V7 Certification Exam — Exam Objectives Document Version 7.0',
          'domains': domains, 'objectives': []}
for ob in objectives:
    result['objectives'].append({'num': ob['num'], 'title': re.sub(r'\s+', ' ', ob['title']).strip(), 'items': build(ob)})
json.dump(result, open(out, 'w'), indent=1, ensure_ascii=False)
print('domains', [(d['num'], d['name']) for d in domains])
print('objectives', len(result['objectives']))
for o in result['objectives']: print(o['num'], len(o['items']), o['title'][:90])
