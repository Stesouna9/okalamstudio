# Vice Bay Radio : site et nom de domaine (IONOS)

Créé le 28/09/2026.

## Le site
- Dossier `radio/` de ce repo, en ligne dès la fusion : **https://okalamstudio.com/radio/**
- Autonome : tous les liens sortants sont absolus (okalamstudio.com, Discord, Instagram), les sons sont lus depuis `https://okalamstudio.com/audio/`. Le dossier peut donc être déplacé tel quel dans un autre repo.
- Données générées : `python3 tools/build_radio_site.py` relit `vicebay-assets/` (scripts des stations, logos, artworks) et `audio/stations.json`, puis réécrit `radio/data.js` et `radio/img/`. À relancer après chaque nouvelle pub, logo ou morceau.
- Lien direct vers une pub (pour Reddit / Discord) : `…/radio/#pub-highwaydiner` (id = nom du commerce sans espaces).

## Nom de domaine proposé
**vicebayradio.com**, cohérent avec le compte TikTok @vicebayradio. Environ 12 €/an chez IONOS. Optionnel : **vicebayradio.fr**, redirigé vers le .com.
Disponibilité non vérifiée depuis la session : à contrôler dans l'espace IONOS au moment de l'achat.

## Branchement : deux options

### Option A : redirection (5 minutes, aucun changement de code)
IONOS → Domaines & SSL → vicebayradio.com → **Redirection** → type HTTP 301 vers `https://okalamstudio.com/radio/`.
Simple, mais la barre d'adresse affiche okalamstudio.com/radio/.

### Option B : vrai site sur vicebayradio.com (recommandé)
1. Créer le repo GitHub `vicebayradio` (public), y copier le contenu de `radio/` à la racine, ajouter un fichier `CNAME` contenant `vicebayradio.com`.
2. GitHub → repo → Settings → Pages → Source : branche `main`, dossier `/`. Custom domain : `vicebayradio.com`, cocher **Enforce HTTPS** une fois le certificat émis.
3. IONOS → Domaines & SSL → vicebayradio.com → **DNS**. Supprimer les enregistrements A / AAAA / CNAME par défaut (page de parking IONOS), puis ajouter :

| Type | Nom d'hôte | Valeur |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| AAAA | @ | 2606:50c0:8000::153 |
| AAAA | @ | 2606:50c0:8001::153 |
| AAAA | @ | 2606:50c0:8002::153 |
| AAAA | @ | 2606:50c0:8003::153 |
| CNAME | www | stesouna9.github.io |

4. Attendre la propagation (de quelques minutes à quelques heures), puis vérifier que https://vicebayradio.com affiche le site.
5. Mettre à jour l'URL `og:image` de `index.html` vers `https://vicebayradio.com/img/og.jpg`.

Plus tard, pour la radio en streaming : un sous-domaine `stream.vicebayradio.com` (A vers le serveur Hetzner) servira les fichiers audio avec CORS.
