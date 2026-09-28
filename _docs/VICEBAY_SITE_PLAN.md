# Vice Bay — site univers (plan) · 28/09/2026

Objectif : un site à part, très beau, où l'on retrouve **tout l'univers** du jeu : la ville, les 5 stations, les animateurs, les 25 fausses marques et leurs pubs, la radio en écoute. Sert la sortie (19/11/2026), la pub (1/11), Reddit/Discord, et reste après comme « lore » du studio.

## 1. Décisions à prendre (Gabriel)
| # | Question | Proposition |
|---|----------|-------------|
| 1 | Adresse | `vicebay.okalamstudio.com` (sous-domaine, Pages, gratuit) — ou `vicebayradio.com` (~12 €/an, plus mémorisable, cohérent avec @vicebayradio TikTok) |
| 2 | Musique en clair | Radio complète en écoute (voix comprises) — c'est la pub du jeu. Pas de téléchargement. Fichiers servis depuis Hetzner, jamais dans git. |
| 3 | Langues | FR + EN au lancement (comme okalamstudio.com), autres plus tard |
| 4 | Ton | « Site touristique de Vice Bay 1986 » : on fait comme si la ville existait (office du tourisme, pages jaunes, guide radio). Le jeu n'apparaît qu'en bas (« Visitez Vice Bay dans VICE BREAK »). |

## 2. Architecture (repo GitHub `okalamstudio/vicebay`, GitHub Pages)
```
/                 Accueil : artwork plein écran, radio dock, « Bienvenue à Vice Bay »
/radio            Les 5 stations : logo, fréquence, animateur, playlist, écoute
/radio/<station>  Fiche station : bio animateur, extraits voix, titres, jingles
/annuaire         Les 25 commerces (grille de logos, filtre par quartier)
/annuaire/<id>    Fiche commerce : logo, enseigne on/off, pub audio, script, quartier
/quartiers        Plage · Centre-ville · Autoroute · Marais · Skyline (carte stylisée)
/pubs             Toutes les fausses pubs audio, avec texte et « vue dans le jeu »
/jeu              VICE BREAK : captures, App Store / Play, Discord, TestFlight
/presse           Kit presse : artworks, logos, textes (zip)
```
Statique (HTML/CSS/JS, pas de framework), lecteur `.vbr` réutilisé, data en JSON (`data/stations.json`, `data/commerces.json`, `data/pubs.json`) générée depuis le repo ViceBreak (`docs/ENSEIGNES.md`, `tools/studio/*.json`) par un script `tools/export_site.py` → aucune double saisie.

## 3. Direction artistique
- Palette du jeu : nuit `#0B0A1E`, sable `#F5E3C3`, néon rose `#FF2E88`, turquoise `#1FB7A6`, or `#E5B84B`, orange sodium `#FFA630`, vert marais `#3E7C4F`.
- Typo : Orbitron (titres), DM Sans (texte), Space Mono (fréquences).
- Chaque quartier a sa teinte (déjà définie dans ENSEIGNES.md) → la page change de couleur selon le quartier.
- Artworks ChatGPT (3 générés le 28/09 : boulevard sunset, centre-ville pluie, motel marais) en héros de page ; logos des 24 commerces en grille « pages jaunes ».
- Détails : enseignes qui s'allument au survol (`_on`/`_off`), grésillement radio entre stations, heure de Vice Bay en haut (fuseau fictif), météo fictive.

## 4. Contenu à produire
| Contenu | Source | État |
|---------|--------|------|
| 24 logos commerces | ChatGPT (28/09) | générés, à récupérer sur disque |
| Enseignes on/off | dérivées des logos (script PIL : lueur/gris) | à faire |
| 3 artworks | ChatGPT (28/09) | générés, à récupérer |
| Bios animateurs (5) | tools/studio PAGE_TEXT + voix.html | à rédiger (10 lignes chacun) |
| Fiches commerces (25) | ENSEIGNES.md + textes pubs | à rédiger (3 lignes + pub) |
| Pubs audio | /studio Hetzner (voix Gabriel + Melvin NEON) | en cours |
| Playlists | tracks.json / drops.json | export auto |
| Textes FR/EN | Claude | à faire |

## 5. Technique
- Audio : `https://voix.2-28-122-50.sslip.io/radio/<fichier>` déjà servi avec Range → réutiliser, ajouter un vrai sous-domaine `radio.okalamstudio.com` (Caddy/nginx sur Hetzner) + CORS.
- Analytics : même pixel/UTM que le plan COM (section 6 de COM_VICEBREAK.md).
- Open Graph par page (logo du commerce en image) → partages Reddit/Discord jolis.
- SEO : « Vice Bay », noms des commerces, « radio fictive 1986 ».

## 6. Bot Discord « 📻 Vice Bay Radio »
- Salon vocal par station (ou un seul salon + commande `/station neon`).
- Bot Python (discord.py[voice] + ffmpeg) sur Hetzner, service systemd, lit les mêmes playlists que le jeu (tracks.json + drops.json → voix entre les morceaux).
- Commandes : `/station`, `/now` (titre en cours), `/stations`.
- Jeton : le bot existant (`~/.discord/vicebay_bot_token`) suffit, ajouter l'intent voix.

## 7. Calendrier proposé
| Quand | Quoi |
|-------|------|
| 29/09 – 2/10 | Récup logos/artworks, enseignes on/off, export JSON, squelette site |
| 3 – 6/10 | Pages radio + annuaire + quartiers, textes FR/EN |
| 7 – 8/10 | Bot Discord radio |
| 9/10 | Mise en ligne v1 (privée), relecture Gabriel |
| 15/10 | v1 publique, annonce Discord + Reddit |
| 1/11 | Site = page d'atterrissage des pubs |

Effort : ~4 jours de Claude, ~2 h de Gabriel (décisions, relecture, achat domaine éventuel).

## 8. État — v1 radio (28/09)
En attendant le repo `okalamstudio/vicebay` et le choix d'adresse (décision 1), la v1 vit dans `vicebay/` de ce repo → `okalamstudio.com/vicebay/`, en `noindex`, non liée depuis le menu (relecture privée). Déplaçable telle quelle : les chemins passent par `data-base`.
- `index.html` : héros « Office du tourisme 1986 », 5 cartes station jouables, 5 quartiers, carte postale, bloc VICE BREAK en bas.
- `radio.html` : fiche par station (`#tropicana`…), playlist cliquable, crédits CC BY.
- `quartiers.html` : 5 quartiers, chacun relié à une station.
- `vicebay.js` : FR/EN, heure de Vice Bay (heure locale en 1986) + météo fictive, dock radio (dernière station mémorisée).
- Données : `vicebay/data/stations.json` (fréquences, slogans FR/EN d'après HANDOFF, VOLT = soft jazz/soul) + playlists `audio/stations.json`.
- Manque (sources pas dans ce repo) : annuaire des 25 commerces, pubs, bios animateurs, artworks, audio Hetzner.
