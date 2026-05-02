# /games — Gallery of standalone mini-games

Each subfolder = one self-contained game playable at `okalamstudio.com/games/<slug>/`.
The gallery on `games.html` lists them as cards.

## Add a new game

1. **Create the folder** `games/<slug>/` with at least:
   - `index.html` — the game (HTML/CSS/JS, all-in-one is fine)
   - `thumb.svg` (or `thumb.png`/`thumb.webp`) — 16:10 thumbnail used in the gallery card

2. **Match the site style.** Copy the `:root` CSS variables from any existing game.
   Fonts: Syne (titles), DM Sans (body), Space Mono (mono). Or use your own — each
   game lives in its own folder, so it can have its own visual identity (see `games/alf/`
   which uses Cinzel + Cormorant Garamond + VT323).

3. **Add a back link** to the gallery at the top of the game:
   ```html
   <a href="../../games.html" class="back">← Galerie</a>
   ```

4. **Register the card** in `games.html` — find the `<div class="gallery-grid">` block
   and add a new `<a class="game-card">` entry:
   ```html
   <a class="game-card" href="games/<slug>/" aria-label="Jouer à <Name>">
     <img class="game-card-thumb" src="games/<slug>/thumb.svg" alt="" loading="lazy"/>
     <div class="game-card-body">
       <div class="game-card-title"><Name></div>
       <span class="game-card-tag">Genre · Tag</span>
       <p class="game-card-desc">One-line description.</p>
       <span class="game-card-cta">Jouer →</span>
     </div>
   </a>
   ```

## Conventions

- **No build step.** Vanilla HTML/CSS/JS, opens by double-clicking `index.html`.
- **No external deps.** Inline everything (or use a CDN font like the rest of the site).
- **Mobile-first.** Touch controls on `(hover:none) and (pointer:coarse)`.
- **localStorage prefix.** Use `okalam_<slug>_<key>` to avoid clashes (e.g. `okalam_alf_save`).

## Why this layout?

- Each game stays isolated → Claude Design can generate a folder, you drop it in `/games/`, ship.
- Standalone URL → easy to share a single game.
- Gallery on `games.html` is the entry point for casual visitors.
