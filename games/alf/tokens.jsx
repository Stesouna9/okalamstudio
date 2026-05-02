// Design tokens for Alf hi-fi
// Direction: gothique cute (Cult of the Lamb / Secret of Mana) — fonds sombres mais palettes saturées
// Aucun marron sale. Couleurs vives sur fond noir/bleu nuit.
// Alf: chartreux (gris-bleu lavande, yeux ambrés)

const PALETTES = {
  eu: {
    // Provence — pierre claire + ocre + bleu lavande, mais en mode nocturne saturé
    name: 'Maison européenne',
    subtitle: 'lvl 01 · provence',
    floor: '#e8c894',       // pierre claire chaude
    floorAlt: '#c89a5e',    // ocre
    wall: '#2a1f3a',        // bleu nuit chaud
    wallTop: '#4a3858',     // bleu lavande sombre
    accent: '#f4a83a',      // ocre solaire
    accent2: '#9a78d8',     // lavande vive
    surface: '#d4a06a',     // bois miel
    light: '#ffe8a8',       // lumière bougie chaude
    grout: '#1a1028',
    sky: '#1a1028',         // ciel nuit lavande
    mood: 'cosy',
  },
  haunt: {
    // Bleu nuit + lune blanche + accents sang
    name: 'Maison hantée',
    subtitle: 'lvl 02 · clair de lune',
    floor: '#2a3a6e',       // bleu nuit profond
    floorAlt: '#1a2858',    // bleu nuit foncé
    wall: '#0a1230',        // noir bleuté
    wallTop: '#1a2452',
    accent: '#e8e0f4',      // lune blanche/argent
    accent2: '#e83a4a',     // rouge sang
    surface: '#3a4a78',     // bleu acier
    light: '#a8c4ff',       // clair de lune
    grout: '#05081c',
    sky: '#05081c',
    mood: 'gothic',
  },
  jp: {
    // Rose sakura + indigo + papier crème
    name: 'Maison japonaise',
    subtitle: 'lvl 03 · sakura',
    floor: '#f4d8e0',       // papier crème rosé
    floorAlt: '#e8b8c8',    // sakura clair
    wall: '#1a2858',        // indigo profond
    wallTop: '#2a3a78',     // indigo
    accent: '#f48ab8',      // rose sakura saturé
    accent2: '#3a4a98',     // indigo vif
    surface: '#f8e8d8',     // papier washi
    light: '#fff0e8',       // bougie blanche
    grout: '#0a1230',
    sky: '#0a1230',
    mood: 'cosy',
  },
  ru: {
    // Bleu izba + rouge folklorique + or + bois clair
    name: 'Maison russe',
    subtitle: 'lvl 04 · izba',
    floor: '#d8b878',       // bois clair miel
    floorAlt: '#a88848',    // bois doré
    wall: '#1a3a78',        // bleu izba profond
    wallTop: '#2a5aa8',     // bleu izba
    accent: '#e83a4a',      // rouge folklorique
    accent2: '#fdc83a',     // or matriochka
    surface: '#3a78d8',     // bleu vif
    light: '#ffe8a8',       // chandelle dorée
    grout: '#0a1a48',
    sky: '#0a1a48',
    mood: 'folk',
  },
  fort: {
    // Pierre froide + bleu glacial + accents pourpres (forteresse magique)
    name: 'Forteresse',
    subtitle: 'lvl 05 · final',
    floor: '#7a98c8',       // pierre froide bleutée
    floorAlt: '#5a78a8',
    wall: '#1a1838',        // noir violet
    wallTop: '#3a3868',
    accent: '#9a4ad8',      // pourpre magique
    accent2: '#5ad8f4',     // bleu glacial
    surface: '#3a3868',     // pierre sombre
    light: '#a8c4ff',       // glow froid
    grout: '#0a0820',
    sky: '#0a0820',
    mood: 'gothic',
  },
};

// UI palette — overlays HUD on any house. Conserve bone+gold contre tous les fonds nuit
const UI = {
  ink: '#0a0820',
  ink2: '#1a1838',
  paper: '#f8e8d8',
  paperAlt: '#e8d8b8',
  line: '#2a2058',
  red: '#e83a4a',
  redDark: '#a81830',
  blood: '#6a0a1a',
  gold: '#fdc83a',
  goldDark: '#b8821a',
  bone: '#f8e8d8',
  shadow: 'rgba(0,0,0,0.6)',
  hudBg: 'rgba(10,8,32,0.82)',
  hudBg2: 'rgba(10,8,32,0.94)',
  hudBorder: '#fdc83a',
};

// Alf — chartreux: gris-bleu lavande, yeux ambrés (cohérent avec le mood gothique cute)
const ALF = {
  body: '#7a8ab8',         // gris-bleu lavande
  bodyShade: '#4a5a88',
  bodyHighlight: '#a8b8d8',
  belly: '#c8d4e8',
  ear: '#4a5a88',
  innerEar: '#f48ab8',     // rose sakura cohérent
  nose: '#5a3848',
  eye: '#fdc83a',          // ambre/or
  eyeShine: '#fff0e8',
  pupil: '#0a0820',
  outline: '#0a0820',
};

// Typography — style gothique
const FONTS = {
  display: '"Cinzel", "Cormorant SC", serif',
  body: '"Cormorant Garamond", "EB Garamond", serif',
  hud: '"VT323", "JetBrains Mono", monospace',
  pixel: '"VT323", monospace',
};

window.PALETTES = PALETTES;
window.UI = UI;
window.ALF = ALF;
window.FONTS = FONTS;
