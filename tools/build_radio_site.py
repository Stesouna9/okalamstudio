"""Construit radio/ (site Vice Bay Radio) à partir de vicebay-assets/ et img/.

Usage : python3 tools/build_radio_site.py
Écrit radio/data.js (stations, pubs, commerces) et les images optimisées dans radio/img/.
Les sons restent servis depuis https://okalamstudio.com/audio/ (jamais dupliqués).
"""
import json, os, re
from PIL import Image

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
A = os.path.join(ROOT, 'vicebay-assets')
OUT = os.path.join(ROOT, 'radio')
IMG = os.path.join(OUT, 'img')
os.makedirs(IMG, exist_ok=True)

STATIONS = [  # ordre du cadran, source : _docs/HANDOFF_VICEBREAK.md
    ('tropicana', 'TROPICANA', 88.5, 'LATIN · SALSA · CUIVRES', 'Le soleil se lève sur 88.5.', '#2BB3A3',
     'Léo', "Soixante ans, à l'antenne depuis midi, toujours faim, un sandwich jamais loin. Son ennemi juré : le pélican de la jetée, qui lui vole tout.",
     "Sixty years old, on air since noon, always hungry, never far from a sandwich. His sworn enemy: the pier pelican, who steals everything."),
    ('emotion', 'EMOTION', 98.3, 'SLOWS · BALLADES · SAXO', 'Éteignez la lumière. Le cœur passe en fréquence modulée.', '#4DD0E1',
     'Lara', "Elle parle bas, à une seule personne : celle qui rentre seule en voiture sous la pluie. Motel, promenade mouillée, dédicaces sans nom.",
     "She talks low, to one person only: whoever is driving home alone in the rain. Motels, wet boardwalks, nameless dedications."),
    ('sunset', 'SUNSET DRIVE', 102.7, 'SYNTHWAVE · ROUTE · ARPÈGES', '102.7, le soleil tombe, pas vous.', '#F2B33D',
     'Johnny Sunset', "Coude à la portière, sourire dans la voix, jamais pressé. Il n'a jamais vérifié une info de sa vie et ça ne l'a jamais gêné.",
     "Elbow out the window, a smile in his voice, never in a hurry. He has never fact-checked anything in his life and it never bothered him."),
    ('neon', 'NEON', 103.5, 'CHIPTUNE · 8-BIT · MUSIQUE DE JEU', 'Insérez une pièce et ça repart.', '#FF2E88',
     'Gérard', "Gérant de la salle d'arcade Pixel Palace : 41 machines, minuit, personne devant. Il parle aux machines autant qu'aux auditeurs.",
     "Manager of the Pixel Palace arcade: 41 cabinets, midnight, nobody playing. He talks to the machines as much as to the listeners."),
    ('volt', 'VOLT', 107.3, 'SOFT JAZZ · SOUL · CLASSIQUES AMÉRICAINS', 'Le groove n\'attend pas. Big Lou non plus.', '#FF7A3D',
     'Big Lou', "Quarante ans de clubs, voix rauque, perpétuellement énervé. Il insulte les morceaux, jamais les gens, et menace toujours d'en passer un pire.",
     "Forty years of clubs, gravel voice, permanently annoyed. He insults the songs, never the people, and always threatens to play a worse one."),
]
GENRE_EN = {'tropicana': 'LATIN · SALSA · BRASS', 'emotion': 'SLOW JAMS · BALLADS · SAX', 'sunset': 'SYNTHWAVE · ROAD · ARPEGGIOS',
            'neon': 'CHIPTUNE · 8-BIT · GAME MUSIC', 'volt': 'SOFT JAZZ · SOUL · AMERICAN CLASSICS'}
SLOGAN_EN = {'tropicana': 'The sun rises on 88.5.', 'emotion': 'Turn off the light. The heart goes FM.',
             'sunset': '102.7, the sun goes down, you don\'t.', 'neon': 'Insert a coin and it starts again.',
             'volt': 'The groove won\'t wait. Neither will Big Lou.'}

# quartier de chaque commerce : vicebay-assets/ENSEIGNES.md
quartier = {}
for m in re.finditer(r'^### (.+?)\s+\((\w+),', open(os.path.join(A, 'ENSEIGNES.md'), encoding='utf-8').read(), re.M):
    quartier[m.group(1).strip()] = m.group(2)

scripts = json.load(open(os.path.join(A, 'stations_scripts.json'), encoding='utf-8'))
old = json.load(open(os.path.join(ROOT, 'audio', 'stations.json'), encoding='utf-8'))
tracks = json.load(open(os.path.join(A, 'tracks.json'), encoding='utf-8'))


def slug(name):
    return re.sub(r'[^a-z0-9]', '', name.lower())


def img(src, dst, width, fmt='WEBP', q=80):
    im = Image.open(src)
    if im.width > width:
        im = im.resize((width, round(im.height * width / im.width)), Image.LANCZOS)
    if fmt == 'JPEG':
        im = im.convert('RGB')
    im.save(os.path.join(IMG, dst), fmt, quality=q, method=6) if fmt == 'WEBP' else im.save(os.path.join(IMG, dst), fmt, quality=q, optimize=True, progressive=True)


stations, ads = [], []
for sid, name, f, genre, slogan, color, host, bio, bio_en in STATIONS:
    texts = scripts[sid]['texts']
    jingles = [t['text'] for t in texts if t['section'] == 'A'][:3]
    for t in texts:
        if t['section'] == 'C' and t['label'].startswith('LA PUB'):
            shop = t['label'].split('·', 1)[1].strip()
            ads.append({'id': slug(shop), 'shop': shop, 'station': sid, 'q': quartier.get(shop, ''), 'text': t['text']})
    live = [{'src': 'https://okalamstudio.com/' + x['src'], 'title': x['title'], 'artist': x['artist'], 'type': x['type']} for x in old.get(sid, [])]
    stations.append({'id': sid, 'name': name, 'f': f, 'genre': genre, 'genre_en': GENRE_EN[sid], 'slogan': slogan,
                     'slogan_en': SLOGAN_EN[sid], 'c': color, 'host': host, 'bio': bio, 'bio_en': bio_en, 'jingles': jingles,
                     'live': live, 'catalog': [{'t': x['title'], 'a': x['artist'], 'l': x['license']} for x in tracks.get(sid, [])],
                     'logo': 'img/st_%s.webp' % sid})
    img(os.path.join(ROOT, 'img', 'radio_%s.png' % sid), 'st_%s.webp' % sid, 360)

for ad in ads:
    img(os.path.join(A, 'logos', ad['id'] + '_logo.png'), 'logo_%s.webp' % ad['id'], 420)
    ad['logo'] = 'img/logo_%s.webp' % ad['id']

for src, dst in [('vicebay_artwork_1_boulevard', 'art_beach'), ('vicebay_artwork_2_downtown_rain', 'art_downtown'),
                 ('vicebay_artwork_3_motel_marais', 'art_highway')]:
    img(os.path.join(A, 'artworks', src + '.png'), dst + '.jpg', 1600, 'JPEG', 78)
    img(os.path.join(A, 'artworks', src + '.png'), dst + '_s.jpg', 800, 'JPEG', 74)
img(os.path.join(ROOT, 'img', 'vicebay_radio.png'), 'vicebay_radio.webp', 720)
img(os.path.join(ROOT, 'img', 'vicebay_radio_1x1.png'), 'og.jpg', 1080, 'JPEG', 80)
Image.open(os.path.join(ROOT, 'img', 'vicebay_radio_1x1.png')).convert('RGB').resize((180, 180), Image.LANCZOS).save(os.path.join(IMG, 'icon.png'))

with open(os.path.join(OUT, 'data.js'), 'w', encoding='utf-8') as fh:
    fh.write('// Généré par tools/build_radio_site.py — ne pas modifier à la main.\n')
    fh.write('window.VBR=' + json.dumps({'stations': stations, 'ads': ads}, ensure_ascii=False, separators=(',', ':')) + ';\n')
print(len(stations), 'stations,', len(ads), 'pubs')
