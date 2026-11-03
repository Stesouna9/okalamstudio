# Référencement SEO + GEO d'okalamstudio.com (03/11/2026)

Modèle : gtavifrance.com (`~/La Soso/depots/gta6-countdown/docs/GEO_IA.md`).

| IA | Index | Levier |
|---|---|---|
| ChatGPT / Copilot | Bing | Bing Webmaster + IndexNow |
| Gemini | Google | Search Console |
| Claude | Brave Search | search.brave.com/submit-url |
| Grok | X + web | posts avec lien okalamstudio.com |

Fait le 03/11 : `robots.txt` (tous robots IA autorisés, kits privés exclus), `llms.txt` (faits clés + pages + liens stores), `sitemap.xml` (lastmod), sur chaque page publique un bloc `<!-- SEO/GEO 03/11/2026 -->` (canonical, OG, Twitter, JSON-LD : Organization + WebSite sur l'accueil, MobileApplication/VideoGame par app avec liens App Store / Google Play). Clé IndexNow : fichier `<clé>.txt` à la racine.

À chaque nouvelle app ou page : ajouter son bloc SEO/GEO, une ligne dans `llms.txt` et `sitemap.xml`, puis ping IndexNow (`curl "https://api.indexnow.org/indexnow?url=<url>&key=<clé>"`). Isaac Guide : à ajouter à sa mise en ligne.
