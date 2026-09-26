# Notes de Gabriel — protocole de traitement

Fichier : `tools/studio/notes.json` (liste). Page : `/notes` du studio (localhost:8787). Champs : `id, date, photo (URL /notes/photo/<id>.jpg, fichier tools/studio/notes_photos/<id>.jpg — la lire avec l'outil Read pour voir la capture), kind (correctif|suggestion|changement|question), cat (radio|studio|jeu|site|pub|autre), txt, fait, statut, vu, reponse`.

Statuts : `brouillon` (Gabriel garde pour lui : NE PAS LIRE, NE PAS TRAITER, ne pas toucher) → `envoyée` (Gabriel vient de l'écrire) → `vue` (Claude a lu, `vu` = ISO date) → `en cours` → `transmise` (envoyée à une autre session) → `fait` (`fait: true`, `reponse` remplie).

Qui traite quoi :
- `radio`, `studio`, `pub`, `autre` : la session Vice Bay Studio (« Projet Radio G ») fait elle-même (studio = tools/studio/*, tools/radio_studio.py ; radio = playlist, jingles, voix, contrats ; pub = marketing.json).
- `jeu` : message CCD à la session « Projet G Vice Break » (repo vicebreak-ios) avec le texte de la note et la consigne « à appliquer sur iOS ET sur Android (repo Stesouna9/vicebreak-android) ». Si la session n'est pas ouverte, la routine fait la correction elle-même dans /Users/doclaundal/Desktop/APPLICATION/PROJET-G/ViceBreak si elle est petite et sûre, sinon `statut: en cours` + réponse « en attente de la session jeu ».
- `site` : message CCD à « OKALAM Studio SITE » ; sinon `_docs/HANDOFF_VICEBREAK.md` du repo okalamstudio.

Toujours : écrire `reponse` en français simple (ce qui a été fait, ou pourquoi ça attend), ne jamais supprimer une note, ne jamais toucher aux notes `fait`. Réponse = 1 à 3 phrases.
