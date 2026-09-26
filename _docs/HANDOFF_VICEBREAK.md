# Passation VICE BREAK → site okalamstudio.com

Écrit par la session Vice Bay Studio le 26/09/2026. Source de vérité pour la vitrine du site. Mettre à jour à chaque changement (cette session le fait), la session site lit ce fichier avant de toucher `vicebreak.html` / `projets.html`.

## Consigne de Gabriel
VICE BREAK est **la vitrine du site en ce moment**. Tout ce qui est ici doit être remis en boîte sur le site (page vicebreak.html, teaser projets.html, accueil).

## Dates publiques
- **Sortie : jeudi 19 novembre 2026**, iOS + Android, liens stores depuis le site. Mention « sort le même jour que Grand Theft Auto VI » autorisée sur le site uniquement.
- 1er novembre : envoi en validation (interne, ne pas afficher).
- La radio peut sortir du 1.0 (décision le 12 octobre) : ne pas promettre la radio « dans le jeu » avant cette date, dire « Vice Bay Radio » comme produit.

## Vice Bay Radio (le produit)
Cinq stations FM fictives de la ville de Vice Bay, musique 100 % libre (CC0 / CC BY, crédits affichés), voix de comédiens amis sous contrat. Écoutable dans le jeu et, plus tard, hors du jeu (site puis app gratuite).

| Station | Fréquence | Genre | Slogan | Couleur | Logo |
|---|---|---|---|---|---|
| TROPICANA | 88.5 | LATIN · SALSA · CUIVRES | « Le soleil se lève sur 88.5. » | #2BB3A3 | img/radio_tropicana.png |
| EMOTION | 98.3 | SLOWS · BALLADES · SAXO | « Éteignez la lumière. Le cœur passe en fréquence modulée. » | #4DD0E1 | img/radio_emotion.png |
| SUNSET DRIVE | 102.7 | SYNTHWAVE · ROUTE · ARPÈGES | « 102.7, le soleil tombe, pas vous. » | #F2B33D | img/radio_sunset.png |
| NEON | 103.5 | CHIPTUNE · 8-BIT · MUSIQUE DE JEU | « Insérez une pièce et ça repart. » | #FF2E88 | img/radio_neon.png |
| VOLT | 107.3 | SOFT JAZZ · SOUL · CLASSIQUES AMÉRICAINS | « Le groove n'attend pas. Big Lou non plus. » | #FF7A3D | img/radio_volt.png |

## Logo Vice Bay Radio
`img/vicebay_radio.png` (1347×1168, fond noir, triangle synthwave, texte chrome). Déclinaisons pub prêtes : `img/vicebay_radio_1x1.png` (1080×1080) et `img/vicebay_radio_9x16.png` (1080×1920), fond noir #000310. Transparent / mono blanc encore chez Gabriel via ChatGPT.

## Interdits partout
« GTA », « Rockstar », « Vice City » dans l'app et les fiches stores. Sur le site : seule la phrase d'hommage (même jour que GTA VI). La ville s'appelle Vice Bay. Aucun prix affiché tant que rien n'est en vente (voir MONETISATION.md, SHA à vérifier).

## Casting (ne pas publier de noms sans accord)
Gabriel = TROPICANA. EMOTION = une amie sous contrat (à ne pas nommer publiquement avant signature). Trois voix à trouver.

## Plan de communication (COM_VICEBREAK.md, session cloud « Stratégie publicitaire Vice Break », PR Stesouna9/okalamstudio#1)
Vice Bay Studio a intégré le plan (onglet 📣 PUB & ENGAGEMENT du studio, jalons COM dans PLAN). Ce que le site doit faire, dates du plan :
- **30/09** : vrai formulaire email sur vicebreak.html (aujourd'hui le bouton renvoie vers contact.html). Outil recommandé : Brevo. À valider par Gabriel.
- **15/10** : boutons pré-inscription Google Play + pré-commande App Store, kit presse en ligne (captures, logos station, logo radio, texte, GIF).
- **UTM** sur chaque lien sortant : `?utm_source=<instagram|tiktok|reddit|presse|meta_ads|reddit_ads>&utm_medium=<organic|paid|email>&utm_campaign=vb_launch`.
- Accroches validées réutilisables sur le site : « Ce jeudi-là, tout le monde attend. Toi, tu joues. » · « Vice Bay, 1986. Une raquette, une balle, cinq radios, toute la nuit. » · « 500 silhouettes à casser. Un seul coucher de soleil. »
- Hashtags : jamais #GTA6 #GTAVI #ViceCity. On dit « le gros téléchargement », « ce jeudi-là ».
- Jusqu'au 12/10 : « Vice Bay Radio » comme produit, pas « la radio dans le jeu ».
- Livrables Vice Bay Studio pour la com : 05/10 extrait NEON + visuel pour le post « la cinquième station » ; 25/10 sons des créas 3 (cadran, jingle + slogan par station) et 6 (Big Lou, voix VOLT) ; jingles/slogans en sons courts après signature des voix.

## Pour la page vicebreak.html
- Bloc « Vice Bay Radio » : logo, les 5 cartes station (logo, fréquence, slogan, une phrase de genre), le lecteur déjà en place.
- Compte à rebours vers le 19 novembre.
- Crédits musique : générés par `tools/build_radio.py` (CREDITS.txt) à chaque reconstruction, demander le fichier à la session Projet G.

_Mis à jour le 2026-09-26 par Vice Bay Studio._