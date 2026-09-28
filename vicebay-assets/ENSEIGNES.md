# Les enseignes des annonceurs dans le décor

Créé le 27/09/2026. Source des annonceurs : `tools/studio/prod.json` (clé `pubs`).

## La règle

Une enseigne est un clin d'œil, pas un élément de jeu. Elle ne coûte jamais
une balle, elle ne se vise pas, elle ne se casse pas.

- Elle vit au dernier plan, derrière tout le reste, sous la ligne du terrain.
- Elle ne s'allume **que** pendant la pub de ce commerce à la radio. Radio
  coupée : on ne voit jamais rien.
- Une seule à la fois, jamais deux.
- Seulement dans son quartier : Coconut Palace ne s'allume pas dans les marais.
- Elle monte en un fondu d'une seconde, reste le temps de la pub, s'éteint en
  une seconde. Aucun clignotement, aucun mouvement, aucune animation rapide.
- Opacité plafonnée à 0,45 et teinte mélangée au fond : elle se devine, elle
  ne se lit pas par-dessus la balle.
- Uniquement sur les niveaux de la liste ci-dessous : 49 niveaux sur 500, un
  tous les dix. Jamais sur un niveau qui présente une mécanique (le carton et
  la nouveauté ont l'écran pour eux), jamais sur un multiple de vingt.

## Les niveaux retenus

| niveau | quartier | enseigne |
|---|---|---|
| 15 | beach | Coconut Palace |
| 25 | downtown | Moonlight Cleaners |
| 35 | downtown | Blue Roses Florist |
| 45 | highway | Sunshine Motors |
| 55 | highway | Palmside Barber Shop |
| 65 | everglades | Bayou Breakdown Garage |
| 75 | everglades | Marsh Runner Tours |
| 85 | skyline | Seabreeze Terrace |
| 95 | skyline | Laser Lounge |
| 105 | skyline | Seabreeze Terrace |
| 115 | skyline | Laser Lounge |
| 125 | highway | Last Stop Motel |
| 135 | highway | Quiet Wash Laundry |
| 145 | everglades | Iron Coast Club |
| 155 | everglades | Marshline Salvage |
| 165 | downtown | Silver Cab Service |
| 175 | downtown | Golden Pawn |
| 185 | beach | Bluewave Rentals |
| 195 | beach | Marina Moon |
| 205 | downtown | Future Phone |
| 215 | downtown | Nightshift Finance |
| 225 | beach | Pixel Pier Arcade |
| 235 | beach | Coconut Palace |
| 245 | skyline | Seabreeze Terrace |
| 255 | skyline | Laser Lounge |
| 265 | everglades | Bayou Breakdown Garage |
| 275 | everglades | Marsh Runner Tours |
| 285 | highway | Sunset Garage |
| 295 | highway | Palmetto Drive-In |
| 305 | everglades | Iron Coast Club |
| 315 | everglades | Marshline Salvage |
| 325 | skyline | Seabreeze Terrace |
| 335 | skyline | Laser Lounge |
| 345 | beach | Bluewave Rentals |
| 355 | beach | Marina Moon |
| 365 | highway | Coral Motors |
| 375 | highway | Highway Diner |
| 385 | downtown | Moonlight Cleaners |
| 395 | downtown | Blue Roses Florist |
| 405 | highway | Night Owl Market |
| 415 | highway | Sunshine Motors |
| 425 | downtown | Silver Cab Service |
| 435 | downtown | Golden Pawn |
| 445 | everglades | Bayou Breakdown Garage |
| 455 | everglades | Marsh Runner Tours |
| 465 | beach | Pixel Pier Arcade |
| 475 | beach | Coconut Palace |
| 485 | skyline | Seabreeze Terrace |
| 495 | skyline | Laser Lounge |

Skyline ne compte que deux annonceurs (Seabreeze Terrace, Laser Lounge) pour
cent niveaux : ils reviennent cinq fois chacun. Deux ou trois enseignes de plus
côté skyline régleraient ça.

## Ce qu'on demande à ChatGPT

Un fichier par enseigne, **PNG avec transparence réelle** (canal alpha), rien
d'autre que l'enseigne dans l'image.

Contraintes techniques, à répéter dans chaque demande :

- PNG 32 bits, fond **entièrement transparent**. Pas de fond noir, pas de damier,
  pas de rectangle blanc, pas d'ombre portée au sol, pas de cadre, pas de marge décorative.
- Taille : 1536 × 768 px pour un panneau horizontal, 768 × 1536 px pour une
  enseigne verticale. Le trait reste lisible réduit à 20 % : pas de détail fin.
- Vue **de face**, aucune perspective, aucun angle : le décor place l'objet lui-même.
- Deux images par enseigne : une **allumée** (néon vif) et une **éteinte**
  (mêmes formes, tubes gris, aucune lueur).
- Une seule couleur d'accent, celle du quartier, plus le blanc chaud des tubes.
  Pas d'arc-en-ciel.
- Le nom du commerce écrit exactement comme dans le tableau, sans faute, en
  capitales, police large et lisible, **plus une ligne de promo reprise du
  script de la pub** quand il y en a une : c'est ce que le joueur entend au
  même moment, et c'est là que la référence se fait.
- Le prix porte le symbole dollar, avant le chiffre, à l'américaine : `$29`,
  `$7.99`. Vice Bay est une ville américaine et les pubs comptent en dollars —
  un chiffre nu ne voudrait rien dire. Le prix reste gros : c'est lui qu'on
  remarque au fond du décor.
- Rien d'autre comme texte : pas de slogan, pas de numéro de téléphone, pas
  d'adresse. Et le **logo** de la société, lui, ne porte jamais de prix.
- Pas de visage, pas de personne, pas de plaque d'immatriculation.
- **Aucune ressemblance avec une vraie marque** : ni logo, ni typographie
  signature, ni combinaison de couleurs identifiable. Si le résultat évoque une
  enseigne réelle, on le jette.
- **Aucune allusion à GTA, Rockstar ou Vice City.** La ville est Vice Bay.

Couleur d'accent par quartier :

| quartier | accent | teinte |
|---|---|---|
| beach | ocean | `#1FB7A6` |
| downtown | gold | `#E5B84B` |
| highway | sodium | `#FFA630` |
| everglades | swamp | `#3E7C4F` |
| skyline | magenta | `#FF2E88` |

Fond du jeu, pour que la lueur reste crédible dessus : nuit `#0B0A1E`,
immeubles lointains indigo `#1C1650`.

## Les demandes, une par enseigne

À coller telle quelle, une par une. Le début est commun, la fin change.

> Dessine une enseigne de commerce fictif des années 80, vue de face, style
> néon de bord de mer. **PNG à fond entièrement transparent**, aucune ombre
> portée, aucun cadre, aucun fond. Trait épais, lisible en tout petit. Une seule
> couleur d'accent : `TEINTE`. Texte exact et unique : `NOM`. Pas d'autre texte.
> Aucune ressemblance avec une marque réelle. Donne deux versions : allumée
> (néon vif, légère lueur) et éteinte (tubes gris, sans lueur). Support : SUPPORT.

### Coconut Palace  (beach, 3 niveaux)

- teinte : `#1FB7A6` (ocean)
- support : enseigne de bord de plage sur deux poteaux de bois
- l'esprit de la pub : « Le dîner qui ne s'envole pas »
- fichiers attendus : `Art/Signs/coconutpalace_on.png`, `Art/Signs/coconutpalace_off.png`

### Moonlight Cleaners  (downtown, 2 niveaux)

- teinte : `#E5B84B` (gold)
- support : enseigne verticale fixée à la façade, perpendiculaire à la rue
- l'esprit de la pub : « Vous ne savez pas quoi »
- fichiers attendus : `Art/Signs/moonlightcleaners_on.png`, `Art/Signs/moonlightcleaners_off.png`

### Blue Roses Florist  (downtown, 2 niveaux)

- teinte : `#E5B84B` (gold)
- support : enseigne verticale fixée à la façade, perpendiculaire à la rue
- l'esprit de la pub : « Des fleurs, deux raisons »
- fichiers attendus : `Art/Signs/bluerosesflorist_on.png`, `Art/Signs/bluerosesflorist_off.png`

### Sunshine Motors  (highway, 2 niveaux)

- teinte : `#FFA630` (sodium)
- support : panneau routier sur un mât unique, vu de face
- l'esprit de la pub : « Brille comme un gagnant »
- fichiers attendus : `Art/Signs/sunshinemotors_on.png`, `Art/Signs/sunshinemotors_off.png`

### Palmside Barber Shop  (highway, 1 niveau)

- teinte : `#FFA630` (sodium)
- support : panneau routier sur un mât unique, vu de face
- l'esprit de la pub : « Il fait chaud, on coupe court »
- fichiers attendus : `Art/Signs/palmsidebarbershop_on.png`, `Art/Signs/palmsidebarbershop_off.png`

### Bayou Breakdown Garage  (everglades, 3 niveaux)

- teinte : `#3E7C4F` (swamp)
- support : panneau de ponton en planches, posé bas
- l'esprit de la pub : « Beaucoup de raisons »
- fichiers attendus : `Art/Signs/bayoubreakdowngarage_on.png`, `Art/Signs/bayoubreakdowngarage_off.png`

### Marsh Runner Tours  (everglades, 3 niveaux)

- teinte : `#3E7C4F` (swamp)
- support : panneau de ponton en planches, posé bas
- l'esprit de la pub : « Calmes au coucher du soleil »
- fichiers attendus : `Art/Signs/marshrunnertours_on.png`, `Art/Signs/marshrunnertours_off.png`

### Seabreeze Terrace  (skyline, 5 niveaux)

- teinte : `#FF2E88` (magenta)
- support : enseigne de toit, lettres découpées sur une ossature d'acier
- l'esprit de la pub : « Au trente-deuxième étage »
- fichiers attendus : `Art/Signs/seabreezeterrace_on.png`, `Art/Signs/seabreezeterrace_off.png`

### Laser Lounge  (skyline, 5 niveaux)

- teinte : `#FF2E88` (magenta)
- support : enseigne de toit, lettres découpées sur une ossature d'acier
- l'esprit de la pub : « Plus pour longtemps »
- fichiers attendus : `Art/Signs/laserlounge_on.png`, `Art/Signs/laserlounge_off.png`

### Last Stop Motel  (highway, 1 niveau)

- teinte : `#FFA630` (sodium)
- support : panneau routier sur un mât unique, vu de face
- l'esprit de la pub : « Deux heures quarante du matin »
- fichiers attendus : `Art/Signs/laststopmotel_on.png`, `Art/Signs/laststopmotel_off.png`

### Quiet Wash Laundry  (highway, 1 niveau)

- teinte : `#FFA630` (sodium)
- support : panneau routier sur un mât unique, vu de face
- l'esprit de la pub : « Presque silencieuse »
- fichiers attendus : `Art/Signs/quietwashlaundry_on.png`, `Art/Signs/quietwashlaundry_off.png`

### Iron Coast Club  (everglades, 2 niveaux)

- teinte : `#3E7C4F` (swamp)
- support : panneau de ponton en planches, posé bas
- l'esprit de la pub : « Iron Coast, Everglades »
- fichiers attendus : `Art/Signs/ironcoastclub_on.png`, `Art/Signs/ironcoastclub_off.png`

### Marshline Salvage  (everglades, 2 niveaux)

- teinte : `#3E7C4F` (swamp)
- support : panneau de ponton en planches, posé bas
- l'esprit de la pub : « Sous le soleil, sous un palmier »
- fichiers attendus : `Art/Signs/marshlinesalvage_on.png`, `Art/Signs/marshlinesalvage_off.png`

### Silver Cab Service  (downtown, 2 niveaux)

- teinte : `#E5B84B` (gold)
- support : enseigne verticale fixée à la façade, perpendiculaire à la rue
- l'esprit de la pub : « Il pleut, montez »
- fichiers attendus : `Art/Signs/silvercabservice_on.png`, `Art/Signs/silvercabservice_off.png`

### Golden Pawn  (downtown, 2 niveaux)

- teinte : `#E5B84B` (gold)
- support : enseigne verticale fixée à la façade, perpendiculaire à la rue
- l'esprit de la pub : « Un objet, de l'argent »
- fichiers attendus : `Art/Signs/goldenpawn_on.png`, `Art/Signs/goldenpawn_off.png`

### Bluewave Rentals  (beach, 2 niveaux)

- teinte : `#1FB7A6` (ocean)
- support : enseigne de bord de plage sur deux poteaux de bois
- l'esprit de la pub : « Faites exactement l'inverse »
- fichiers attendus : `Art/Signs/bluewaverentals_on.png`, `Art/Signs/bluewaverentals_off.png`

### Marina Moon  (beach, 2 niveaux)

- teinte : `#1FB7A6` (ocean)
- support : enseigne de bord de plage sur deux poteaux de bois
- l'esprit de la pub : « Les enseignes du front de mer »
- fichiers attendus : `Art/Signs/marinamoon_on.png`, `Art/Signs/marinamoon_off.png`

### Future Phone  (downtown, 1 niveau)

- teinte : `#E5B84B` (gold)
- support : enseigne verticale fixée à la façade, perpendiculaire à la rue
- l'esprit de la pub : « Votre téléphone est vieux »
- fichiers attendus : `Art/Signs/futurephone_on.png`, `Art/Signs/futurephone_off.png`

### Nightshift Finance  (downtown, 1 niveau)

- teinte : `#E5B84B` (gold)
- support : enseigne verticale fixée à la façade, perpendiculaire à la rue
- l'esprit de la pub : « Parler chiffres, tard »
- fichiers attendus : `Art/Signs/nightshiftfinance_on.png`, `Art/Signs/nightshiftfinance_off.png`

### Pixel Pier Arcade  (beach, 2 niveaux)

- teinte : `#1FB7A6` (ocean)
- support : enseigne de bord de plage sur deux poteaux de bois
- l'esprit de la pub : « Pixel Pier Beach »
- fichiers attendus : `Art/Signs/pixelpierarcade_on.png`, `Art/Signs/pixelpierarcade_off.png`

### Sunset Garage  (highway, 1 niveau)

- teinte : `#FFA630` (sodium)
- support : panneau routier sur un mât unique, vu de face
- l'esprit de la pub : « Pas un petit bruit »
- fichiers attendus : `Art/Signs/sunsetgarage_on.png`, `Art/Signs/sunsetgarage_off.png`

### Palmetto Drive-In  (highway, 1 niveau)

- teinte : `#FFA630` (sodium)
- support : panneau routier sur un mât unique, vu de face
- l'esprit de la pub : « La voiture, quelqu'un, l'écran »
- fichiers attendus : `Art/Signs/palmettodrivein_on.png`, `Art/Signs/palmettodrivein_off.png`

### Coral Motors  (highway, 1 niveau)

- teinte : `#FFA630` (sodium)
- support : panneau routier sur un mât unique, vu de face
- l'esprit de la pub : « Pour les gens qui aiment conduire »
- fichiers attendus : `Art/Signs/coralmotors_on.png`, `Art/Signs/coralmotors_off.png`

### Highway Diner  (highway, 1 niveau)

- teinte : `#FFA630` (sodium)
- support : panneau routier sur un mât unique, vu de face
- l'esprit de la pub : « Faim depuis une heure cinquante-huit »
- fichiers attendus : `Art/Signs/highwaydiner_on.png`, `Art/Signs/highwaydiner_off.png`

### Night Owl Market  (highway, 1 niveau)

- teinte : `#FFA630` (sodium)
- support : panneau routier sur un mât unique, vu de face
- l'esprit de la pub : « Minuit, une heure, deux heures »
- fichiers attendus : `Art/Signs/nightowlmarket_on.png`, `Art/Signs/nightowlmarket_off.png`

## Poids

120 ko par image après passage à la moulinette, 2 Mo pour l'ensemble. Au-delà,
on réduit la taille avant d'ajouter des enseignes.

## Qui valide

Gabriel travaille chaque enseigne avec ChatGPT et la valide avant intégration.
Rien n'entre dans le jeu sans son accord, enseigne par enseigne.
