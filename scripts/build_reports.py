#!/usr/bin/env python3
"""Build PDF reports for Elisa and Pierre from data/stats.json + creators.json."""

import json
from pathlib import Path
from datetime import datetime
from reportlab.lib.pagesizes import A4
from reportlab.lib.units import mm
from reportlab.lib.colors import HexColor, white, black
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, PageBreak, Table, TableStyle,
    Image, KeepTogether, Frame, PageTemplate, NextPageTemplate, BaseDocTemplate
)
from reportlab.lib.styles import ParagraphStyle, getSampleStyleSheet
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.pdfgen import canvas as canvas_mod
from reportlab.platypus.flowables import HRFlowable

ROOT = Path(__file__).resolve().parent.parent
STATS = json.loads((ROOT / 'data' / 'stats.json').read_text())
CREATORS = json.loads((ROOT / 'data' / 'creators.json').read_text())
OUT = ROOT / 'reports'
OUT.mkdir(exist_ok=True)


def fmt_num(n):
    if n is None: return '—'
    if n >= 1_000_000:
        return f"{n/1_000_000:.1f}M".replace('.0M', 'M').replace('.', ',')
    if n >= 1_000:
        return f"{n/1_000:.1f}k".replace('.0k', 'k').replace('.', ',')
    return f"{n:,}".replace(',', ' ')


def fmt_int(n):
    if n is None: return '—'
    return f"{int(n):,}".replace(',', ' ')


def fmt_pct(p):
    if p is None: return '—'
    return f"{p:.2f}%".replace('.', ',')


def fmt_date(iso):
    return datetime.fromisoformat(iso.replace('Z', '+00:00')).strftime('%d %B %Y')


THEMES = {
    'elisa': {
        'primary': HexColor('#ff8c1a'),
        'primary_dark': HexColor('#c2580a'),
        'primary_light': HexColor('#ffb95c'),
        'gold': HexColor('#ffce5b'),
        'bg_card': HexColor('#fff8ee'),
        'bg_strip': HexColor('#fef0dc'),
        'text': HexColor('#1a0f05'),
        'muted': HexColor('#8a7763'),
        'border': HexColor('#f0d4a8'),
    },
    'pierre': {
        'primary': HexColor('#3b82f6'),
        'primary_dark': HexColor('#1d4ed8'),
        'primary_light': HexColor('#93c5fd'),
        'gold': HexColor('#60a5fa'),
        'bg_card': HexColor('#eff6ff'),
        'bg_strip': HexColor('#dbeafe'),
        'text': HexColor('#0a1628'),
        'muted': HexColor('#5b6b85'),
        'border': HexColor('#bfdbfe'),
    },
}


def make_styles(theme):
    return {
        'h1': ParagraphStyle('h1', fontName='Helvetica-Bold', fontSize=32, textColor=theme['text'], leading=36, spaceAfter=4),
        'tagline': ParagraphStyle('tagline', fontName='Helvetica-Oblique', fontSize=11, textColor=theme['muted'], leading=14, spaceAfter=14),
        'h2': ParagraphStyle('h2', fontName='Helvetica-Bold', fontSize=18, textColor=theme['primary_dark'], leading=22, spaceBefore=20, spaceAfter=8),
        'h3': ParagraphStyle('h3', fontName='Helvetica-Bold', fontSize=13, textColor=theme['text'], leading=16, spaceBefore=10, spaceAfter=4),
        'eye': ParagraphStyle('eye', fontName='Helvetica-Bold', fontSize=8, textColor=theme['primary'], leading=10, spaceAfter=4),
        'body': ParagraphStyle('body', fontName='Helvetica', fontSize=10, textColor=theme['text'], leading=14, spaceAfter=6),
        'muted': ParagraphStyle('muted', fontName='Helvetica', fontSize=9, textColor=theme['muted'], leading=12),
        'tip': ParagraphStyle('tip', fontName='Helvetica-Oblique', fontSize=9.5, textColor=theme['primary_dark'], leading=13, spaceBefore=4, spaceAfter=8, leftIndent=10, borderPadding=6),
        'big_num': ParagraphStyle('big_num', fontName='Helvetica-Bold', fontSize=24, textColor=theme['primary'], leading=28, alignment=TA_CENTER),
        'small_lbl': ParagraphStyle('small_lbl', fontName='Helvetica', fontSize=7.5, textColor=theme['muted'], leading=10, alignment=TA_CENTER),
        'cover_handle': ParagraphStyle('cover_handle', fontName='Helvetica', fontSize=10, textColor=theme['muted'], leading=14, alignment=TA_LEFT),
        'pill_text': ParagraphStyle('pill', fontName='Helvetica-Bold', fontSize=8, textColor=theme['primary_dark'], leading=10, alignment=TA_CENTER),
    }


def stat_box(value_str, label, theme):
    """Returns a single stat cell flowable."""
    styles = make_styles(theme)
    inner = [
        Paragraph(value_str, styles['big_num']),
        Paragraph(label, styles['small_lbl']),
    ]
    t = Table([[inner]], colWidths=[40*mm], rowHeights=[28*mm])
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), theme['bg_card']),
        ('BOX', (0, 0), (-1, -1), 0.6, theme['border']),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 6),
        ('RIGHTPADDING', (0, 0), (-1, -1), 6),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
    ]))
    return t


def make_stat_grid(stats, theme, cols=4):
    """stats = [(value, label), ...]"""
    cells = [stat_box(v, l, theme) for v, l in stats]
    rows = []
    for i in range(0, len(cells), cols):
        chunk = cells[i:i+cols]
        while len(chunk) < cols:
            chunk.append('')
        rows.append(chunk)
    col_w = (170*mm) / cols
    t = Table(rows, colWidths=[col_w]*cols, hAlign='LEFT')
    t.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 2),
        ('RIGHTPADDING', (0, 0), (-1, -1), 2),
        ('TOPPADDING', (0, 0), (-1, -1), 4),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4),
    ]))
    return t


def kv_table(rows, theme):
    """Two-column key/value table."""
    data = [[Paragraph(f'<b>{k}</b>', make_styles(theme)['body']),
             Paragraph(v, make_styles(theme)['body'])] for k, v in rows]
    t = Table(data, colWidths=[60*mm, 110*mm], hAlign='LEFT')
    t.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('LINEBELOW', (0, 0), (-1, -2), 0.3, theme['border']),
        ('BACKGROUND', (0, 0), (0, -1), theme['bg_strip']),
    ]))
    return t


def benchmark_table(rows, theme):
    """4-col: metric / creator / market / verdict"""
    styles = make_styles(theme)
    header = [Paragraph(f'<b>{c}</b>', styles['body']) for c in ['Métrique', 'Créateur', 'Marché FR', 'Verdict']]
    body = [[Paragraph(r[0], styles['body']),
             Paragraph(f'<b>{r[1]}</b>', styles['body']),
             Paragraph(r[2], styles['muted']),
             Paragraph(f"<font color='#16a34a'><b>{r[3]}</b></font>", styles['body'])] for r in rows]
    t = Table([header] + body, colWidths=[55*mm, 35*mm, 35*mm, 45*mm], hAlign='LEFT', repeatRows=1)
    t.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), theme['primary']),
        ('TEXTCOLOR', (0, 0), (-1, 0), white),
        ('VALIGN', (0, 0), (-1, -1), 'MIDDLE'),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('LINEBELOW', (0, 0), (-1, -1), 0.3, theme['border']),
        ('ROWBACKGROUNDS', (0, 1), (-1, -1), [theme['bg_card'], white]),
    ]))
    return t


def cover_page(creator_key, theme, story):
    styles = make_styles(theme)
    creators_data = {
        'elisa': CREATORS['elisa-running'],
        'pierre': CREATORS['tesla-burger'],
    }
    c = creators_data[creator_key]
    photo_path = ROOT / 'imgs' / ('elisa-photo.jpg' if creator_key == 'elisa' else 'pierre-photo.jpg')

    # Title eye
    eye_text = ('CRÉATRICE FRANÇAISE · RUNNING' if creator_key == 'elisa'
                else 'CRÉATEUR FRANÇAIS · TECH & VE')
    story.append(Paragraph(eye_text, styles['eye']))
    story.append(Spacer(1, 4))

    # Big name + photo side by side
    name = c['name']
    tagline = c['tagline']

    photo = None
    if photo_path.exists():
        photo = Image(str(photo_path), width=45*mm, height=45*mm)

    name_block = [
        Paragraph(name, styles['h1']),
        Paragraph(tagline, styles['tagline']),
        Paragraph('<b>Handles:</b>', styles['body']),
        Paragraph(f"YouTube: {c['handle_youtube']}<br/>"
                  f"Instagram: {c['handle_instagram']}<br/>"
                  f"TikTok: {c['handle_tiktok']}", styles['cover_handle']),
    ]

    if photo:
        cover_t = Table([[name_block, photo]], colWidths=[110*mm, 60*mm])
    else:
        cover_t = Table([[name_block, '']], colWidths=[170*mm, 0*mm])
    cover_t.setStyle(TableStyle([
        ('VALIGN', (0, 0), (-1, -1), 'TOP'),
        ('LEFTPADDING', (0, 0), (-1, -1), 0),
        ('RIGHTPADDING', (0, 0), (-1, -1), 0),
    ]))
    story.append(cover_t)
    story.append(Spacer(1, 16))

    # Niche pills as horizontal flow
    color_hex = '#' + theme['primary_dark'].hexval()[2:]
    niche_pills_html = '  '.join([f'<font color="{color_hex}"><b>· {n}</b></font>' for n in c['niche']])
    pills_para = Paragraph(niche_pills_html, styles['body'])
    pills_box = Table([[pills_para]], colWidths=[170*mm])
    pills_box.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), theme['bg_strip']),
        ('LEFTPADDING', (0, 0), (-1, -1), 12),
        ('RIGHTPADDING', (0, 0), (-1, -1), 12),
        ('TOPPADDING', (0, 0), (-1, -1), 8),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 8),
        ('BOX', (0, 0), (-1, -1), 0.6, theme['border']),
    ]))
    story.append(pills_box)
    story.append(Spacer(1, 14))

    # Hero stats
    s = STATS[creator_key]
    yt = s['youtube']
    ig = s['instagram']
    tt = s['tiktok']

    if creator_key == 'elisa':
        hero_stats = [
            (fmt_int(ig['followers']), 'Abonnés Instagram ✓'),
            (fmt_num(yt['subscribers']), 'Abonnés YouTube'),
            (fmt_num(yt['views']), 'Vues YouTube cumulées'),
            (fmt_num(tt.get('topVideoViews', 0)), 'Top viral TikTok'),
        ]
    else:
        hero_stats = [
            (fmt_num(yt['subscribers']), 'Abonnés YouTube'),
            (fmt_int(ig['followers']), 'Abonnés Instagram'),
            (fmt_num(yt['views']), 'Vues YouTube cumulées'),
            (fmt_int(yt['avgViewsPerVideo']), 'Vues / vidéo (moy)'),
        ]

    story.append(Paragraph('<b>Snapshot</b> — chiffres clés', styles['eye']))
    story.append(make_stat_grid(hero_stats, theme))
    story.append(Spacer(1, 16))

    # Auto-update note
    updated_note = f"<i>Données mises à jour automatiquement via GitHub Actions + Apify · Dernier sync: {fmt_date(STATS['updated_at'])}</i>"
    story.append(Paragraph(updated_note, styles['muted']))


def platforms_section(creator_key, theme, story):
    styles = make_styles(theme)
    s = STATS[creator_key]
    yt = s['youtube']
    ig = s['instagram']
    tt = s['tiktok']

    story.append(Paragraph('01 · Plateformes en détail', styles['h2']))
    story.append(HRFlowable(width='100%', thickness=1, color=theme['border']))
    story.append(Spacer(1, 8))

    # YouTube
    story.append(Paragraph('▶ YouTube', styles['h3']))
    yt_rows = [
        ('Abonnés', fmt_int(yt['subscribers'])),
        ('Vues totales cumulées', fmt_int(yt['views'])),
        ('Vues moyennes par vidéo', fmt_int(yt['avgViewsPerVideo'])),
        ('Engagement moyen', fmt_pct(yt['engagement'])),
    ]
    if yt.get('noxScore'):
        yt_rows.append(('Score NoxInfluencer (sur 10)', f"{yt['noxScore']}/10"))
    story.append(kv_table(yt_rows, theme))
    yt_explain = (
        f"<b>Lecture:</b> {fmt_int(yt['avgViewsPerVideo'])} vues moyennes par vidéo "
        f"= chaque contenu touche {fmt_int(yt['avgViewsPerVideo'])} personnes en moyenne. "
        f"Engagement {fmt_pct(yt['engagement'])} (likes+comm. / vues) — "
        + (f"<b>au-dessus du benchmark FR (2-3%)</b>." if yt['engagement'] > 3 else "dans la moyenne marché.")
    )
    story.append(Spacer(1, 4))
    story.append(Paragraph(yt_explain, styles['tip']))

    # Instagram
    story.append(Paragraph('📷 Instagram' + (' ✓ Vérifié' if ig.get('verified') else ''), styles['h3']))
    ig_rows = [
        ('Abonnés', fmt_int(ig['followers'])),
        ('Publications', fmt_int(ig['posts'])),
        ('Compte vérifié', '✓ Oui (badge bleu)' if ig.get('verified') else 'Non'),
        ('Engagement', fmt_pct(ig['engagement'])),
    ]
    if ig.get('avgViewsPerPost'):
        ig_rows.append(('Vues moyennes par post', fmt_int(ig['avgViewsPerPost'])))
    story.append(kv_table(ig_rows, theme))
    if creator_key == 'elisa':
        ig_explain = (
            "<b>Lecture:</b> Compte vérifié (badge bleu) = top 5% des créateurs FR. "
            "Engagement bien au-dessus du benchmark IG France (1-3%). "
            "Communauté active, pas une audience scrolling passive."
        )
    else:
        ig_explain = (
            f"<b>Lecture:</b> {fmt_int(ig.get('avgViewsPerPost', 0))} vues moyennes par post pour "
            f"{fmt_int(ig['followers'])} abonnés = ratio reach/follower "
            f"<b>×{ig.get('avgViewsPerPost', 0)/max(ig['followers'],1):.1f}</b>. "
            "Posts touchent largement au-delà de la communauté directe (effet algo Reels)."
        )
    story.append(Spacer(1, 4))
    story.append(Paragraph(ig_explain, styles['tip']))

    # TikTok
    story.append(Paragraph('🎵 TikTok', styles['h3']))
    tt_rows = [
        ('Abonnés', fmt_int(tt['followers'])),
        ('Vidéos publiées', fmt_int(tt['videos'])),
        ('Likes cumulés', fmt_int(tt['likes'])),
        ('Vues moyennes / vidéo', fmt_int(tt['avgViewsPerVideo'])),
        ('Engagement', fmt_pct(tt['engagement'])),
    ]
    if tt.get('topVideoViews'):
        tt_rows.append(('Top vidéo virale', fmt_num(tt['topVideoViews']) + ' vues'))
    story.append(kv_table(tt_rows, theme))
    tt_explain = (
        f"<b>Lecture:</b> {fmt_int(tt['avgViewsPerVideo'])} vues/vidéo avec "
        f"{fmt_int(tt['followers'])} abonnés = contenu sur la For You Page (TikTok pousse au-delà de la communauté). "
        + (f"Top vidéo à <b>{fmt_num(tt['topVideoViews'])} vues</b> prouve un viral cap déjà atteint." if tt.get('topVideoViews', 0) > 100000 else "")
    )
    story.append(Spacer(1, 4))
    story.append(Paragraph(tt_explain, styles['tip']))


def benchmark_section(creator_key, theme, story):
    styles = make_styles(theme)
    s = STATS[creator_key]

    story.append(PageBreak())
    story.append(Paragraph('02 · Benchmark vs marché FR', styles['h2']))
    story.append(HRFlowable(width='100%', thickness=1, color=theme['border']))
    story.append(Spacer(1, 8))
    story.append(Paragraph(
        "Comparaison des chiffres du créateur face aux standards du marché créateurs France. "
        "Sources: NoxInfluencer (YouTube), benchmarks IG/TT publics 2025-2026.",
        styles['body']))
    story.append(Spacer(1, 8))

    yt = s['youtube']
    ig = s['instagram']
    tt = s['tiktok']

    rows = [
        ('Engagement YouTube', fmt_pct(yt['engagement']), '2-3%',
         '+' + str(round((yt['engagement']/2.5 - 1)*100)) + '%' if yt['engagement'] > 2.5 else '—'),
        ('Engagement Instagram', fmt_pct(ig['engagement']), '1-3%',
         'au-dessus' if ig['engagement'] > 3 else 'dans la moyenne'),
        ('Engagement TikTok', fmt_pct(tt['engagement']), '4-6%',
         'au-dessus' if tt['engagement'] > 6 else 'dans la moyenne'),
        ('Vues moyennes YT', fmt_int(yt['avgViewsPerVideo']), '2 000-5 000',
         '+' + str(round(yt['avgViewsPerVideo']/3500*100 - 100)) + '%'),
        ('Compte IG vérifié', '✓ Oui' if ig.get('verified') else '✗ Non',
         '~5% créateurs', 'Top 5%' if ig.get('verified') else 'Standard'),
    ]
    story.append(benchmark_table(rows, theme))


def value_section(creator_key, theme, story):
    styles = make_styles(theme)

    story.append(Spacer(1, 18))
    story.append(Paragraph('03 · Pourquoi cette audience pour les marques', styles['h2']))
    story.append(HRFlowable(width='100%', thickness=1, color=theme['border']))
    story.append(Spacer(1, 8))

    if creator_key == 'elisa':
        props = [
            ('Audience CSP+ 35-54',
             "58% de la communauté entre 35 et 54 ans. Pouvoir d'achat élevé — "
             "idéal pour équipement premium, nutrition sport, services santé, services payants."),
            ('Niche running française pure',
             "88% audience FR. Ciblage marketing simple : pas de waste sur audiences hors-cible."),
            ('Compte vérifié + 100% recommandé',
             "Verified IG ✓. 15 reviews Facebook 100% positives. Crédibilité immédiate, "
             "zéro risque réputationnel pour la marque."),
            ('Viral cap prouvé à 3,7M vues',
             "Une vidéo TikTok à 3,7M de vues prouve qu'un contenu sponsorisé peut "
             "scaler bien au-delà du nominal. Upside non-quantifiable mais démontré."),
        ]
        verticals = [
            'Chaussures running', 'Apparel technique', 'Nutrition sport', 'Récupération',
            'Apps fitness/GPS', 'Montres connectées', 'Santé/bien-être 35+',
            'Évènements (dossards)', 'Ostéo · kiné · physio', 'Suppléments magnésium',
            'Hydratation isotonique', 'Coaching sportif',
        ]
    else:
        props = [
            ('Niche tech & VE ultra-qualifiée',
             "Audience tech-savvy avec intention d'achat élevée. Pouvoir d'achat premium "
             "(VE = ticket moyen 30-60k€). Aucun waste sur audience hors-cible."),
            ('Reach disproportionné vs base',
             "12k abonnés mais 18,8M vues YouTube cumulées + 39k vues moyennes / vidéo. "
             "L'algorithme YT pousse les vidéos vers les acheteurs actifs hors communauté directe."),
            ('Référence française VE',
             "Pierre cité dans des comparatifs constructeur, invité conférences. "
             "Crédibilité éditoriale: review = endorsement."),
            ('Pipeline solaire + tech maison',
             "Diversification au-delà du VE pure: solaire résidentiel, batteries, smart home. "
             "Cross-sell naturel pour marques énergie / domotique."),
        ]
        verticals = [
            'Constructeurs VE', 'Bornes de recharge', 'Batteries & solaire',
            'Smart home', 'Outils tech (apps, GPS)', 'Assurance auto VE',
            'Pneus & accessoires', 'Audio embarqué', 'Énergie verte',
            'Domotique', 'Stations solaires portables', 'Comparateurs énergie',
        ]

    for h, p in props:
        story.append(Paragraph(f'<b>→ {h}</b>', styles['h3']))
        story.append(Paragraph(p, styles['body']))
        story.append(Spacer(1, 6))

    story.append(Spacer(1, 10))
    story.append(Paragraph('Verticales naturellement compatibles', styles['h3']))
    pills_html = '  '.join([f'· <b>{v}</b>' for v in verticals])
    story.append(Paragraph(pills_html, styles['body']))


def process_section(creator_key, theme, story):
    styles = make_styles(theme)
    story.append(PageBreak())
    story.append(Paragraph('04 · Process partenariat', styles['h2']))
    story.append(HRFlowable(width='100%', thickness=1, color=theme['border']))
    story.append(Spacer(1, 8))

    steps = [
        ('1. Brief',
         "Brief campagne reçu par mail. Objectifs, KPIs, dates clés. Échange écrit ou call 30 min pour aligner attentes."),
        ('2. Devis & contrat',
         "Devis sous 48h ouvrées. Contrat type OKALAM Studio (livrables, droits image, exclusivité, calendrier)."),
        ('3. Production',
         "Réception produit/asset. Tournage et montage par le créateur. Validation marque avant publication finale."),
        ('4. Reporting',
         "Stats J+7 et J+30: reach, engagement, clics, code promo. Capture screenshots et données fournies."),
    ]
    for h, p in steps:
        story.append(Paragraph(f'<b>{h}</b>', styles['h3']))
        story.append(Paragraph(p, styles['body']))
        story.append(Spacer(1, 4))

    story.append(Spacer(1, 12))
    story.append(Paragraph('Contact', styles['h3']))
    story.append(Paragraph(
        "<b>Email:</b> partnerships@okalamstudio.com<br/>"
        "<b>Site:</b> https://okalamstudio.com<br/>"
        "<b>Réponse:</b> 24h ouvrées",
        styles['body']))


def header_footer(canv, doc, theme):
    canv.saveState()
    # Top accent bar
    canv.setFillColor(theme['primary'])
    canv.rect(0, A4[1] - 6*mm, A4[0], 6*mm, stroke=0, fill=1)
    # Footer
    canv.setFillColor(theme['muted'])
    canv.setFont('Helvetica', 8)
    canv.drawString(20*mm, 12*mm, f"OKALAM Studio · Document confidentiel · partnerships@okalamstudio.com")
    canv.drawRightString(A4[0] - 20*mm, 12*mm, f"Page {doc.page}")
    canv.restoreState()


def build(creator_key):
    theme = THEMES[creator_key]
    name_label = 'Elisa is running' if creator_key == 'elisa' else 'Tesla Burger (Pierre)'
    out_path = OUT / f"mediakit-{creator_key}-{datetime.now().strftime('%Y%m%d')}.pdf"

    doc = SimpleDocTemplate(
        str(out_path),
        pagesize=A4,
        leftMargin=20*mm, rightMargin=20*mm,
        topMargin=18*mm, bottomMargin=18*mm,
        title=f"Media Kit — {name_label} × OKALAM Studio",
        author='OKALAM Studio',
        subject=f'Media Kit créateur {name_label}',
    )

    story = []
    cover_page(creator_key, theme, story)
    story.append(PageBreak())
    platforms_section(creator_key, theme, story)
    benchmark_section(creator_key, theme, story)
    value_section(creator_key, theme, story)
    process_section(creator_key, theme, story)

    doc.build(
        story,
        onFirstPage=lambda c, d: header_footer(c, d, theme),
        onLaterPages=lambda c, d: header_footer(c, d, theme),
    )
    print(f"[ok] {out_path}  ({out_path.stat().st_size/1024:.1f} KB)")
    return out_path


if __name__ == '__main__':
    build('elisa')
    build('pierre')
