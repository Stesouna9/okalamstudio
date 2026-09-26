# Plan de communication VICE BREAK — sortie du 19 novembre 2026

Document de travail, source de vérité pour toute la com et la pub du jeu. Créé le 26/09/2026. À mettre à jour à chaque décision (case cochée, chiffre, date). Lire `HANDOFF_VICEBREAK.md` avant : les interdits et les dates publiques y font foi.

---

## 0. Résumé en dix lignes

- **Le jeu** : Vice Break, casse-briques néon « borne d'arcade de 1986 », 500 niveaux-silhouettes, 5 quartiers, Vice Bay Radio (5 stations FM). iOS + Android, gratuit, jetons (5 offerts par jour, 2 par pub, achats intégrés).
- **La date** : jeudi 19 novembre 2026, le même jour que GTA VI. C'est toute la stratégie : on ne rivalise pas, on se glisse dans la journée la plus attendue du jeu vidéo depuis dix ans.
- **Le message** : *« Le 19 novembre, le monde entier attend qu'un téléchargement se termine. Le temps qu'il finisse, tu auras Vice Break. »*
- **La règle d'or** : « GTA », « Rockstar », « Vice City » n'apparaissent **nulle part** en pub ni sur les stores. Seule la phrase d'hommage du site est autorisée. On surfe sur la vague par le **ciblage**, le **timing** et les **codes visuels** (néon, palmiers, 1986), jamais par le nom.
- **Le budget** : 100 € engagés début novembre. Ça n'achète pas des installs (un install de jeu mobile en France coûte 1 à 3 €), ça achète des **pré-inscriptions et un test de créas**. Tout le reste est organique et gratuit.
- **Le levier gratuit n° 1** : la **pré-inscription Google Play** et la **pré-commande App Store**, ouvertes dès que la fiche est prête (objectif : 15 octobre). Tout le trafic d'octobre et novembre y est envoyé.
- **Le levier gratuit n° 2** : **Vice Bay Radio** comme contenu. Les jingles, les slogans et les voix sont du contenu TikTok/Reels prêt à l'emploi. Ce n'est pas une pub pour un casse-briques, c'est une radio de 1986 qui a un jeu dedans.
- **Le calendrier** : 26/09 → 15/10 préparation (fiches stores, kit presse, 10 créas), 15/10 → 1/11 organique + presse, 1/11 → 19/11 pub payante + compte à rebours, 19/11 → 30/11 lancement + relances.
- **Les KPI** : pré-inscriptions, emails collectés, installs J1 / J7, coût par pré-inscription, note store.
- **Décisions à prendre** (section 11) : plateforme pub principale, compte Meta Business, formulaire email sur le site, visuels à produire.

---

## 1. Cadre et contraintes

| Sujet | Règle | Source |
|---|---|---|
| Date publique | 19 novembre 2026, iOS + Android | HANDOFF |
| Envoi en validation stores | 1er novembre (interne, ne pas afficher) | HANDOFF |
| Radio dans le 1.0 | Décision le 12 octobre. Avant : dire « Vice Bay Radio » comme produit, jamais « la radio dans le jeu » | HANDOFF |
| NEON 103.5 | Hors antenne jusqu'au 5 octobre (nouvelle programmation) | commit d057341 |
| Mots interdits | « GTA », « Rockstar », « Vice City » : jamais dans l'app, les fiches stores, **ni dans aucune publicité** | HANDOFF + politique pub Meta/Google/TikTok sur les marques tierces |
| Hommage | Une seule phrase, sur le site uniquement : « le même jour que Grand Theft Auto VI », avec la mention légale déjà en pied de page | HANDOFF |
| Prix | Aucun prix affiché tant que rien n'est en vente | MONETISATION.md |
| Casting | Aucun nom de comédien publié sans accord signé | HANDOFF |
| Budget pub | 100 €, engagés début novembre | Gabriel, 26/09 |

### Pourquoi la règle « pas de nom » est aussi une règle de pub

Meta, Google Ads et TikTok Ads refusent ou retirent les annonces qui utilisent une marque tierce, avec ou sans plainte de l'ayant droit. Une annonce refusée fin novembre, c'est un budget de 100 € bloqué le jour où il compte. Apple retire aussi les fiches App Store dont les métadonnées citent un autre jeu. Le nom de GTA ne sert donc à rien ici : le ciblage fait le travail (voir 5.2).

---

## 2. Positionnement et message

### 2.1 L'idée centrale

Le 19 novembre, des dizaines de millions de personnes vont lancer un téléchargement de 100 Go et attendre. Vice Break est **le jeu qu'on joue pendant ce temps-là** : 90 secondes la partie, même ville néon, même année 1986, même palmiers, mais dans la poche et tout de suite.

On ne dit jamais « GTA ». On dit **« le gros téléchargement »**, **« ce jeudi-là »**, **« la journée la plus longue de l'année »**. Le public comprend tout seul, et c'est plus fort qu'un nom : c'est un clin d'œil, pas une contrefaçon.

### 2.2 Les trois promesses (à garder dans cet ordre partout)

1. **Immédiat** : 90 secondes la partie, un téléchargement léger, ça se joue dans une file d'attente.
2. **1986, pour de vrai** : borne d'arcade, néon, 500 silhouettes de Vice Bay dessinées à la main, 5 stations FM avec des voix.
3. **Généreux** : gratuit, 20 parties offertes par jour, jamais coupé en pleine partie.

### 2.3 Accroches validées (à réutiliser telles quelles)

- *Le temps que ton téléchargement se termine, tu auras Vice Break.* (déjà sur le site)
- *Ce jeudi-là, tout le monde attend. Toi, tu joues.*
- *Vice Bay, 1986. Une raquette, une balle, cinq radios, toute la nuit.*
- *Le gros jeu, c'est pour le soir. Vice Break, c'est pour la file d'attente.*
- *Insère un jeton. Le soleil se couche sur Vice Bay.*
- *500 silhouettes à casser. Un seul coucher de soleil.*
- Vice Bay Radio : *Le soleil se lève sur 88.5.* / *102.7, le soleil tombe, pas vous.* / *Le groove n'attend pas. Big Lou non plus.*

### 2.4 Ce qu'on ne dit pas

- Pas de comparaison de qualité, jamais de moquerie du « gros jeu » : on est un hommage, pas un troll.
- Pas de « clone », « like », « inspiré de ».
- Pas de prix, pas de « pay to win », pas de promesse sur la radio avant le 12 octobre.
- Pas de « bientôt sur PC/console » ni de fonctionnalité pas encore dans le 1.0.

---

## 3. Cibles

| Cible | Qui | Où les trouver | Message prioritaire |
|---|---|---|---|
| **A. Les impatients** (cœur de cible) | 18-40 ans, France puis monde, joueurs console qui attendent le 19/11, souvent nostalgiques de 2002 | Reddit, TikTok, YouTube, Discord de communautés jeu vidéo, ciblage d'intérêt Meta | Immédiat + 1986 |
| **B. Les synthwave / outrun** | 25-45 ans, esthétique néon, musique, illustrations rétro | r/outrun, r/synthwave, comptes Instagram d'illustration rétro, playlists | Vice Bay Radio + visuels |
| **C. Les joueurs mobiles casual** | 25-55 ans, jouent dans les transports, aiment les jeux « une main » | Recherche stores, Google Play pré-inscription, Apple Search Ads | Généreux + immédiat |
| **D. Les relais** | Journalistes indé, créateurs YouTube/TikTok jeu vidéo et rétro, podcasteurs | Email direct, DM, kit presse | Exclusivité, angle « sortir le même jour que… » (hors pub, en off) |

Langues : **français d'abord** (les voix radio sont en français, le site est en FR), **anglais ensuite** (stores et 1 créa vidéo sous-titrée). Le site existe en 6 langues, mais la pub payante reste FR + EN.

---

## 4. Canaux et actions

### 4.1 Stores (gratuit, prioritaire)

- [ ] **Google Play** : ouvrir la pré-inscription dès que la fiche est validée (objectif 15/10, au plus tard le 1/11). La pré-inscription installe automatiquement le jeu le 19/11 chez tous les inscrits : c'est notre « jour J » garanti. Prévoir une **récompense de pré-inscription** (10 jetons, un skin de raquette « Pré-inscrit 1986 »).
- [ ] **App Store** : ouvrir la pré-commande (jusqu'à 180 jours avant, donc possible dès maintenant côté délai, mais la fiche doit être complète). Même récompense.
- [ ] **ASO** (voir section 7) : titre, sous-titre, mots-clés, 8 captures, 1 vidéo de prévisualisation de 15 à 30 s.
- [ ] Demander la mise en avant « Nouveautés » aux deux stores via le formulaire éditorial (App Store : 6 à 8 semaines avant, donc **maintenant** ; Google Play : formulaire de contact éditorial). Chances faibles, coût nul.

### 4.2 Site okalamstudio.com (gratuit)

- [ ] Le bouton « Être prévenu de la sortie » renvoie aujourd'hui vers `contact.html` : **il faut un vrai champ email** (Brevo, Buttondown ou Mailchimp gratuit). Sans ça, tout le trafic d'octobre est perdu.
- [ ] Ajouter les boutons « Pré-inscrire sur Google Play » et « Pré-commander sur l'App Store » dès qu'ils existent, en haut de `vicebreak.html`, sous le compte à rebours.
- [ ] Page kit presse `presse-vicebreak.html` (ou dossier `/press/`) : logo, 8 captures, 2 clés visuelles, vidéo, fiche d'info, contact. Lien direct depuis les emails presse.
- [ ] UTM sur tous les liens sortants (voir 9).

### 4.3 Réseaux (gratuit, 3 posts par semaine à partir du 15/10)

Compte existant : Instagram `@okalamstudio.com`. À créer : **TikTok `@vicebreakgame`** (ou `@vicebayradio`), et YouTube (Shorts) sur la chaîne du studio. Un seul compte « jeu » par plateforme, le studio reste en signature.

Ligne éditoriale en trois rubriques :
1. **« Insère un jeton »** : une silhouette de niveau par post (palmier, flamant, cabriolet…), 10 s de gameplay vertical, le néon qui s'allume. Le format le plus simple et le plus répétable.
2. **« Vice Bay Radio »** : un jingle, un slogan, une pub fictive de la ville, sur une image fixe animée (le cadran). Les sons peuvent devenir des **sons TikTok réutilisables**.
3. **« Coulisses 1986 »** : comment un niveau est dessiné brique par brique, le casting des voix (sans noms tant que non signés), la borne.

Hashtags : `#VICEBREAK #ViceBay #synthwave #outrun #retrogaming #casse-briques #breakout #arcade #1986 #jeumobile #indiegame #mobilegame #néon`. Jamais `#GTA6`, `#GTAVI`, `#ViceCity` (visibles publiquement, contredisent la règle, et servent de base à une plainte).

### 4.4 Communautés (gratuit, demande du temps, fort rendement)

- **Reddit** : r/jeuxvideo, r/AndroidGaming, r/iosgaming, r/IndieGaming, r/outrun, r/synthwave, r/Breakout (petit), r/gamedev (post-mortem après sortie). Un post honnête « je suis un dev solo, voilà mon jeu » avec une vidéo, en respectant les règles d'auto-promo de chaque sub. Poster 2 subs par jour maximum, répondre à tous les commentaires.
- **Discord** : serveurs synthwave FR, serveurs jeu vidéo FR, serveur Rétro. Chercher les salons « vos projets ».
- **Forums** : jeuxvideo.com (forum Jeux mobiles).
- **Itch / IndieDB** : fiche du jeu, c'est référencé par Google et repris par des newsletters.

### 4.5 Presse et créateurs (gratuit, envoi le 20/10 puis relance le 5/11)

Cibles FR : Gamekult, jeuxvideo.com, Canard PC, JV Tech, Frandroid (rubrique apps), iPhon.fr, iGeneration, Gamergen, ActuGaming, Journal du Geek. Cibles EN : Pocket Gamer, AppAdvice, Droid Gamers, Indie Games Plus, Rock Paper Shotgun (angle « la sortie dans l'ombre du 19 novembre »), Pocket Tactics, 148Apps, Android Police, 9to5Mac. TouchArcade a fermé en septembre 2024 et Pocket Gamer FR est en pause depuis novembre 2025 : ne plus les cibler. Contacts dans `COM_VICEBREAK_CONTACTS.md`.

Créateurs : 20 chaînes YouTube et TikTok FR jeu vidéo / rétro / synthwave de 5 k à 100 k abonnés. On leur propose l'accès anticipé (TestFlight / test interne Play) et un **code créateur** dans le jeu (10 jetons) : ça donne quelque chose à offrir à leur audience.

Template d'email en section 8.

### 4.6 Publicité payante (100 €, début novembre)

Voir section 5.

---

## 5. Budget publicitaire : 100 €

### 5.1 Ce que 100 € achètent, sans se mentir

| Plateforme | Coût observé (jeu mobile, France, 2026) | Ce que ça donne pour 100 € |
|---|---|---|
| Meta (Instagram Reels + Stories) | CPM 4 à 8 €, CPC 0,30 à 0,80 € | 12 000 à 25 000 impressions, 150 à 300 clics, **30 à 80 pré-inscriptions** |
| TikTok Ads | CPM 2 à 5 € mais clics peu qualifiés, minimum de campagne 20 €/jour en général | 20 000 à 40 000 vues, peu de conversions |
| Google App Campaigns | CPI 1 à 3 € en France pour un casual | **30 à 80 installs**, mais pas avant que l'app soit en ligne |
| Apple Search Ads | CPT 0,50 à 1,50 € sur des mots-clés « casse-briques », « breakout » | 70 à 150 taps, installs très qualifiés, uniquement après le 19/11 |
| Reddit Ads | CPM 1 à 3 €, subreddit ciblables | 30 000 à 60 000 impressions, ciblage très précis (r/outrun) |

Conclusion : **100 € ne feront pas la sortie**. Ils servent à **(a)** savoir laquelle de nos créas marche, **(b)** gonfler les pré-inscriptions pour que le jour J compte, **(c)** être présent dans le feed des impatients la semaine du 19.

### 5.2 Répartition recommandée

| Poste | Montant | Quand | Objectif | Ciblage |
|---|---|---|---|---|
| **Test de créas Meta** | 30 € | 3 au 9 novembre | Comparer 3 vidéos, garder la meilleure | France, 18-40, intérêts : jeux vidéo, rétro-gaming, synthwave, arcade, PlayStation, Xbox (Meta autorise le ciblage par intérêt de marque, pas la mention dans l'annonce). Objectif de campagne : trafic vers la pré-inscription. |
| **Campagne de pré-inscription Meta** | 40 € | 12 au 18 novembre | Pré-inscriptions Google Play + pré-commandes App Store | Même audience, uniquement la créa gagnante, plus une audience « similaire » des visiteurs du site si le pixel est posé. |
| **Reddit Ads** | 15 € | 12 au 19 novembre | Présence dans r/outrun, r/synthwave, r/AndroidGaming, r/iosgaming | Ciblage par subreddit, format image + titre honnête. |
| **Réserve jour J** | 15 € | 19 au 21 novembre | Booster le post organique qui marche le mieux le jour de la sortie | Meta, boost du post, France + Belgique + Suisse + Québec. |

Alternative si Gabriel préfère une seule plateforme : **100 € sur Meta**, 30 € de test puis 70 € sur la créa gagnante, du 5 au 19 novembre. C'est le choix le plus simple à piloter et le seul qui donne une audience « similaire » réutilisable.

À ne pas faire avec ce budget : Google App Campaigns (le minimum utile est plutôt 300 à 500 €), TikTok Ads (minimum journalier trop élevé pour 100 € étalés), influence payante (un créateur à 10 k abonnés demande déjà 100 à 300 €).

### 5.3 Préparation obligatoire avant le 1er novembre

- [ ] Compte Meta Business + compte publicitaire vérifié (le paiement peut prendre 48 h à être accepté, ne pas le faire le 2 novembre).
- [ ] Pixel Meta sur `vicebreak.html` (ou au minimum des UTM propres).
- [ ] Compte Reddit Ads (approbation 1 à 3 jours).
- [ ] 3 vidéos verticales 9:16 de 15 s (section 6), 1 image 1:1 et 1 image 4:5 pour les Stories/feed.
- [ ] Lien de pré-inscription Google Play et lien de pré-commande App Store actifs (sinon la campagne pointe sur la page site avec le champ email).

---

## 6. Créas à produire

Toutes verticales 9:16 (1080×1920), 15 s maximum, texte incrusté lisible sans le son, sous-titres FR, version EN pour 2 d'entre elles. Musique : les titres CC BY de Vice Bay Radio (crédit dans la description).

| # | Titre de travail | Contenu | Accroche à l'écran | Rubrique |
|---|---|---|---|---|
| 1 | **Le téléchargement** | Une barre de progression qui n'avance pas (générique, sans logo), coupe sur une partie de Vice Break qui se termine en 90 s, retour à la barre : toujours à 3 %. | *Ce jeudi-là, tout le monde attend. Toi, tu joues.* | Impatients |
| 2 | **La silhouette** | Une silhouette de flamant qui se révèle brique par brique, néon qui s'allume, dernière brique, coucher de soleil. | *500 silhouettes à casser.* | Insère un jeton |
| 3 | **Le cadran** | Le cadran FM qui passe de 88.5 à 107.3, 2 s de chaque station avec le jingle et le slogan. | *Cinq stations. Toute la nuit.* | Vice Bay Radio |
| 4 | **La borne** | Écran GAME OVER, INSÉRER UN JETON, CRÉDITS 04, puis la partie repart. | *20 parties offertes par jour. Jamais coupé.* | Généreux |
| 5 | **Le quartier** | 5 s par quartier (Ocean Drive crépuscule, Downtown or, Everglades brume, Night Highway sodium, Skyline magenta). | *Vice Bay, 1986. Une seule source de lumière.* | Insère un jeton |
| 6 | **Big Lou** | Une pub fictive de la ville lue par la voix de VOLT, image fixe du logo VOLT animé. | *Le groove n'attend pas.* | Vice Bay Radio |
| 7 | **Le niveau 500** | Teaser mystère, 3 s de silhouette floue, « dernier coucher de soleil sur Miami ». À sortir le 17/11. | *Le niveau 500. Personne ne l'a vu.* | Coulisses |
| 8 | **Brique par brique** | Time-lapse du dessin d'un niveau dans l'éditeur. | *Chaque niveau, dessiné à la main.* | Coulisses |

Les créas 1, 2 et 3 sont les trois candidates du test Meta (section 5.2). Formats dérivés : une image 1:1 par créa (arrêt sur image + accroche), un GIF pour Reddit et la presse.

Statique de référence (déjà utilisable) : le logo Vice Bay Radio `img/vicebay_radio.png`, les 5 logos station, les captures de `vicebreak.html`.

---

## 7. Fiches stores (ASO), version de travail

**Titre** (30 car.) : `Vice Break : casse-briques néon`
**Sous-titre / phrase courte** (30 / 80 car.) : `Borne d'arcade 1986, 500 niveaux` / `Casse-briques néon : 500 silhouettes de Vice Bay, 5 radios FM, 90 secondes la partie.`

**Mots-clés App Store** (100 car.) : `casse-briques,breakout,arcade,néon,rétro,synthwave,1986,brick,ball,jeton,radio,80s,pixel,miami`
(« miami » est un nom de lieu, autorisé ; toujours pas « vice city ».)

**Description longue** (structure) :
1. Une phrase : *Une raquette, une balle, un mur de néon. Vice Bay, 1986.*
2. Les 500 silhouettes et les 5 saisons de briques.
3. Les 5 quartiers et leur météo.
4. Vice Bay Radio (formulation « produit » tant que le 12/10 n'a pas tranché).
5. La borne : 1 jeton = 1 partie = 3 balles, 20 parties offertes par jour, jamais coupé en pleine partie.
6. Power-ups, sauvegarde cloud.
7. Mention : *création originale d'OKALAM Studio, hommage aux années 80. Vice Bay est une ville fictive.* (sans nommer les marques tierces, la fiche store n'est pas le site)

**Captures** (8, dans cet ordre) : menu Ocean Drive → partie Pélican → niveau réussi → choix du niveau → cadran radio → borne GAME OVER → 5 quartiers → « 20 parties offertes par jour ». Chaque capture avec un bandeau texte de 4 mots maximum.

**Vidéo de prévisualisation** : la créa 2 (silhouette) allongée à 25 s.

---

## 8. Email presse et créateurs (template)

Objet : *Vice Break, un casse-briques de 1986 qui sort le 19 novembre (oui, ce jeudi-là)*

> Bonjour [Prénom],
>
> Je m'appelle Gabriel, je fais OKALAM Studio, un studio indépendant. Le 19 novembre, je sors Vice Break sur iOS et Android : un casse-briques néon façon borne d'arcade de 1986, 500 niveaux qui dessinent chacun une silhouette de la ville (palmier, flamant, cabriolet…), cinq quartiers avec leur météo, et cinq stations FM fictives avec de vraies voix.
>
> Oui, c'est le même jour que le gros jeu que tout le monde attend. C'est voulu : Vice Break, c'est le jeu qu'on joue pendant que le téléchargement se termine. 90 secondes la partie, gratuit, 20 parties offertes par jour.
>
> Le kit presse (captures, vidéo, logos, fiche) est ici : [lien]. Un accès anticipé TestFlight / Play est disponible, il suffit de me répondre.
>
> Merci pour votre temps,
> Gabriel, OKALAM Studio, support@okalamstudio.com

Envoi le **20 octobre** (fiches stores en ligne), relance le **5 novembre** avec le lien de pré-inscription, dernier envoi le **18 novembre** au soir avec les liens stores (« disponible demain matin »).

Note : dans un email privé, « le gros jeu que tout le monde attend » suffit et reste élégant. Si un journaliste demande, on confirme à l'oral. On ne l'écrit pas dans le communiqué.

---

## 9. Mesure

- **UTM** sur chaque lien : `?utm_source=instagram&utm_medium=organic&utm_campaign=vb_launch` (source : instagram, tiktok, reddit, presse, meta_ads, reddit_ads ; medium : organic, paid, email).
- **Tableau de bord** hebdo (une ligne par semaine, dans ce fichier, section 12) : pré-inscriptions Play, pré-commandes App Store, emails collectés, abonnés TikTok / Instagram, dépenses, coût par pré-inscription.
- **Après le 19/11** : installs J1, J7, rétention J1 / J7 (Play Console et App Store Connect), note moyenne, pays.
- **Seuils** : si le coût par pré-inscription Meta dépasse 2 €, on arrête la créa et on passe à la suivante. Si Reddit ne donne pas 1 % de clics, on bascule les 15 € sur Meta.

---

## 10. Rétro-planning

| Date | Jalon | Responsable / statut |
|---|---|---|
| 26/09 | Ce plan. Ouvrir les comptes TikTok et Meta Business. | Gabriel |
| 30/09 | Formulaire email en place sur `vicebreak.html`. | site |
| 05/10 | NEON 103.5 revient à l'antenne, post « la cinquième station ». | Vice Bay Studio |
| 12/10 | Décision radio dans le 1.0. Adapter toutes les formulations. | Gabriel |
| 15/10 | Fiches stores complètes, pré-inscription Play + pré-commande App Store ouvertes, boutons sur le site, kit presse en ligne. | Gabriel + site |
| 15/10 → 19/11 | 3 posts par semaine (Insère un jeton / Vice Bay Radio / Coulisses). | Gabriel |
| 20/10 | Envoi presse + créateurs n° 1, accès anticipé. | Gabriel |
| 25/10 | Créas 1 à 6 terminées. Comptes pub approuvés, moyen de paiement validé. | Gabriel |
| 01/11 | Envoi en validation stores (interne). Premier post Reddit. | Gabriel |
| 03/11 → 09/11 | Test Meta 30 € sur créas 1, 2, 3. | pub |
| 05/11 | Relance presse n° 2 avec pré-inscription. | Gabriel |
| 10/11 | Choix de la créa gagnante. Compte à rebours quotidien sur Instagram/TikTok (J-9…). | Gabriel |
| 12/11 → 18/11 | Campagne Meta 40 € + Reddit 15 €. | pub |
| 17/11 | Teaser niveau 500. | Gabriel |
| 18/11 soir | Email « disponible demain », dernier envoi presse, post « J-1 ». | Gabriel |
| **19/11** | **Sortie.** Post de lancement 8 h, story toutes les 3 h, réponses à tous les commentaires, boost 15 €. | Gabriel |
| 20/11 → 22/11 | Boost du meilleur post. Post « merci » avec le nombre d'installs si bon. | pub |
| 26/11 | Post-mortem sur r/gamedev et ici (section 12). | Gabriel |

---

## 11. Décisions à prendre par Gabriel

1. **Meta seul (100 €) ou Meta + Reddit (85 + 15) ?** Recommandation : Meta + Reddit, Reddit étant le seul endroit où r/outrun se cible au subreddit près.
2. **Nom du compte TikTok** : `@vicebreakgame` ou `@vicebayradio` ? Recommandation : `@vicebayradio`, la radio vit après le jeu et c'est le contenu le plus partageable.
3. **Récompense de pré-inscription** : 10 jetons ? Un skin ? Doit être faisable dans le 1.0 (MONETISATION.md à mettre à jour).
4. **Outil email** : Brevo (gratuit jusqu'à 300 envois/jour, RGPD FR) ou Buttondown. Recommandation : Brevo.
5. **Accès anticipé** : TestFlight public + test interne Play, ou seulement sur demande ?
6. **Angle « le gros téléchargement »** (créa 1) : validé ou trop proche de la ligne ? Il ne nomme rien, ne montre aucun logo, et reste un hommage. Recommandation : validé.
7. **Version EN** : quelles créas (recommandation : 1 et 3) ?

---

## 12. Journal de bord (à remplir chaque semaine)

| Semaine | Pré-insc. Play | Pré-cmd App Store | Emails | Abonnés IG / TikTok | Dépensé | Coût / pré-insc. | Notes |
|---|---|---|---|---|---|---|---|
| 26/09 | 0 | 0 | 0 | — / — | 0 € | — | Plan créé. |

---

_Créé le 2026-09-26. Prochaine révision : 12/10 (décision radio) puis 15/10 (fiches stores)._
