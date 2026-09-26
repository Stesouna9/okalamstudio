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
| VOLT | 107.3 | FUNK · HIP-HOP · SOUL | « Le groove n'attend pas. Big Lou non plus. » | #FF7A3D | img/radio_volt.png |

## Logo Vice Bay Radio
`img/vicebay_radio.png` (1347×1168, fond noir, triangle synthwave, texte chrome). Déclinaisons (carré 1024, transparent, mono blanc, bandeau) en cours chez Gabriel via ChatGPT.

## Interdits partout
« GTA », « Rockstar », « Vice City » dans l'app et les fiches stores. Sur le site : seule la phrase d'hommage (même jour que GTA VI). La ville s'appelle Vice Bay. Aucun prix affiché tant que rien n'est en vente (voir MONETISATION.md, SHA à vérifier).

## Casting (ne pas publier de noms sans accord)
Gabriel = TROPICANA. EMOTION = une amie sous contrat (à ne pas nommer publiquement avant signature). Trois voix à trouver.

## Pour la page vicebreak.html
- Bloc « Vice Bay Radio » : logo, les 5 cartes station (logo, fréquence, slogan, une phrase de genre), le lecteur déjà en place.
- Compte à rebours vers le 19 novembre.
- Crédits musique : générés par `tools/build_radio.py` (CREDITS.txt) à chaque reconstruction, demander le fichier à la session Projet G.

_Mis à jour le 2026-09-26 par Vice Bay Studio._