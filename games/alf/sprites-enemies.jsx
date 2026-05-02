// Enemy sprites — pixel art top-down, 16x16 grid
// Sprites adapt to house palette via 'tint' prop (recurring Souris)

const PxE = ({ x, y, c, w = 1, h = 1 }) => (
  <rect x={x} y={y} width={w} height={h} fill={c} shapeRendering="crispEdges" />
);

const enemySvg = (children, scale = 4) => (
  <svg width={16 * scale} height={16 * scale} viewBox="0 0 16 16" style={{ imageRendering: 'pixelated', display: 'block' }}>
    <ellipse cx="8" cy="14" rx="4" ry="0.7" fill="rgba(0,0,0,0.35)" />
    {children}
  </svg>
);

// Souris — récurrent (palette varie)
const E_Souris = ({ scale = 4, tint = '#a89888' }) => enemySvg(
  <g>
    <PxE x={5} y={5} c="#0a0608" w={6} h={1} />
    <PxE x={4} y={6} c="#0a0608" h={5} />
    <PxE x={11} y={6} c="#0a0608" h={5} />
    <PxE x={5} y={6} c={tint} w={6} h={5} />
    <PxE x={5} y={11} c="#0a0608" w={6} h={1} />
    {/* ears (round) */}
    <PxE x={3} y={5} c="#0a0608" />
    <PxE x={12} y={5} c="#0a0608" />
    <PxE x={3} y={6} c={tint} />
    <PxE x={12} y={6} c={tint} />
    {/* eyes red */}
    <PxE x={6} y={7} c="#c83020" w={0.8} h={0.8} />
    <PxE x={9.2} y={7} c="#c83020" w={0.8} h={0.8} />
    {/* nose pink */}
    <PxE x={7.5} y={8.5} c="#e89090" w={1} h={0.6} />
    {/* tail */}
    <PxE x={11} y={9} c="#0a0608" />
    <PxE x={12} y={10} c="#0a0608" />
    <PxE x={13} y={11} c="#0a0608" />
  </g>, scale
);

// EU — Mouche
const E_Mouche = ({ scale = 4 }) => enemySvg(
  <g>
    <PxE x={5} y={6} c="#0a0608" w={6} h={4} />
    <PxE x={6} y={7} c="#1a1408" w={4} h={2} />
    {/* wings */}
    <PxE x={2} y={5} c="rgba(220,230,255,0.6)" w={3} h={3} />
    <PxE x={11} y={5} c="rgba(220,230,255,0.6)" w={3} h={3} />
    <PxE x={2} y={5} c="#0a0608" w={3} h={0.3} />
    <PxE x={11} y={5} c="#0a0608" w={3} h={0.3} />
    {/* eyes red */}
    <PxE x={6} y={7} c="#c83020" w={1} h={1} />
    <PxE x={9} y={7} c="#c83020" w={1} h={1} />
  </g>, scale
);

// EU — Fermier
const E_Fermier = ({ scale = 4 }) => enemySvg(
  <g>
    {/* hat */}
    <PxE x={3} y={2} c="#5a3010" w={10} h={1} />
    <PxE x={5} y={1} c="#5a3010" w={6} h={1} />
    <PxE x={4} y={3} c="#7a4a20" w={8} h={0.5} />
    {/* head */}
    <PxE x={5} y={3} c="#0a0608" w={6} h={1} />
    <PxE x={4} y={4} c="#0a0608" h={3} />
    <PxE x={11} y={4} c="#0a0608" h={3} />
    <PxE x={5} y={4} c="#d4a878" w={6} h={3} />
    <PxE x={5} y={7} c="#0a0608" w={6} h={1} />
    {/* eyes */}
    <PxE x={6} y={5} c="#0a0608" />
    <PxE x={9} y={5} c="#0a0608" />
    {/* beard */}
    <PxE x={6} y={6.5} c="#fff" w={4} h={0.5} />
    {/* body — overalls */}
    <PxE x={4} y={8} c="#0a0608" w={8} h={1} />
    <PxE x={3} y={9} c="#0a0608" h={4} />
    <PxE x={12} y={9} c="#0a0608" h={4} />
    <PxE x={4} y={9} c="#3a5a3a" w={8} h={4} />
    <PxE x={4} y={13} c="#0a0608" w={8} h={1} />
    <PxE x={6} y={9} c="#5a3010" w={4} h={1} />
    {/* fork */}
    <PxE x={13} y={4} c="#0a0608" h={6} />
    <PxE x={12} y={3} c="#7a7a78" />
    <PxE x={13} y={3} c="#7a7a78" />
    <PxE x={14} y={3} c="#7a7a78" />
  </g>, scale
);

// HAUNT — Fantôme
const E_Fantome = ({ scale = 4 }) => enemySvg(
  <g>
    <PxE x={5} y={3} c="#0a0608" w={6} h={1} />
    <PxE x={4} y={4} c="#0a0608" h={9} />
    <PxE x={11} y={4} c="#0a0608" h={9} />
    <PxE x={5} y={4} c="#d8e0e8" w={6} h={9} />
    {/* tattered bottom */}
    <PxE x={4} y={13} c="#d8e0e8" />
    <PxE x={6} y={13} c="#d8e0e8" />
    <PxE x={8} y={13} c="#d8e0e8" />
    <PxE x={10} y={13} c="#d8e0e8" />
    <PxE x={5} y={13} c="#0a0608" />
    <PxE x={7} y={13} c="#0a0608" />
    <PxE x={9} y={13} c="#0a0608" />
    <PxE x={11} y={13} c="#0a0608" />
    {/* eyes — empty cyan */}
    <PxE x={5.5} y={6} c="#7ce0ff" w={1.5} h={2} />
    <PxE x={9} y={6} c="#7ce0ff" w={1.5} h={2} />
    <PxE x={5.5} y={6} c="#0a0608" w={1.5} h={0.5} />
    <PxE x={9} y={6} c="#0a0608" w={1.5} h={0.5} />
    {/* mouth */}
    <PxE x={6} y={10} c="#0a0608" w={4} h={1} />
    <PxE x={6.5} y={10} c="#1a3040" w={3} h={0.5} />
  </g>, scale
);

// HAUNT — Squelette
const E_Squelette = ({ scale = 4 }) => enemySvg(
  <g>
    {/* skull */}
    <PxE x={5} y={2} c="#0a0608" w={6} h={1} />
    <PxE x={4} y={3} c="#0a0608" h={4} />
    <PxE x={11} y={3} c="#0a0608" h={4} />
    <PxE x={5} y={3} c="#e8e0c8" w={6} h={4} />
    <PxE x={4} y={7} c="#0a0608" w={3} h={0.5} />
    <PxE x={9} y={7} c="#0a0608" w={3} h={0.5} />
    {/* eye sockets */}
    <PxE x={5.5} y={4} c="#0a0608" w={1.2} h={1.5} />
    <PxE x={9.3} y={4} c="#0a0608" w={1.2} h={1.5} />
    <PxE x={5.7} y={4.3} c="#9a4abe" w={0.6} h={0.6} />
    <PxE x={9.5} y={4.3} c="#9a4abe" w={0.6} h={0.6} />
    {/* teeth */}
    <PxE x={6} y={6} c="#0a0608" w={4} h={0.4} />
    <PxE x={7} y={6} c="#e8e0c8" w={0.4} h={0.4} />
    <PxE x={8.5} y={6} c="#e8e0c8" w={0.4} h={0.4} />
    {/* ribs */}
    <PxE x={5} y={8} c="#0a0608" w={6} h={1} />
    <PxE x={4} y={9} c="#0a0608" h={4} />
    <PxE x={11} y={9} c="#0a0608" h={4} />
    <PxE x={5} y={9} c="#e8e0c8" w={6} h={4} />
    <PxE x={5} y={10} c="#0a0608" w={6} h={0.4} />
    <PxE x={5} y={11.5} c="#0a0608" w={6} h={0.4} />
    {/* sword */}
    <PxE x={13} y={3} c="#a8b0c0" w={0.8} h={6} />
    <PxE x={12} y={9} c="#5a3010" w={3} h={0.6} />
    <PxE x={13} y={9.5} c="#5a3010" w={0.8} h={1} />
  </g>, scale
);

// JP — Tanuki
const E_Tanuki = ({ scale = 4 }) => enemySvg(
  <g>
    {/* body */}
    <PxE x={4} y={6} c="#0a0608" w={8} h={1} />
    <PxE x={3} y={7} c="#0a0608" h={5} />
    <PxE x={12} y={7} c="#0a0608" h={5} />
    <PxE x={4} y={7} c="#7a5a3a" w={8} h={5} />
    <PxE x={4} y={12} c="#0a0608" w={8} h={1} />
    {/* belly cream */}
    <PxE x={5} y={9} c="#d8b888" w={6} h={3} />
    {/* head */}
    <PxE x={4} y={3} c="#0a0608" w={8} h={1} />
    <PxE x={3} y={4} c="#0a0608" h={2} />
    <PxE x={12} y={4} c="#0a0608" h={2} />
    <PxE x={4} y={4} c="#7a5a3a" w={8} h={2} />
    {/* ears */}
    <PxE x={3} y={2} c="#0a0608" w={2} h={1} />
    <PxE x={11} y={2} c="#0a0608" w={2} h={1} />
    <PxE x={3} y={3} c="#7a5a3a" />
    <PxE x={12} y={3} c="#7a5a3a" />
    {/* mask black around eyes */}
    <PxE x={4} y={4.5} c="#0a0608" w={2} h={1.5} />
    <PxE x={10} y={4.5} c="#0a0608" w={2} h={1.5} />
    {/* eye whites */}
    <PxE x={4.5} y={5} c="#fff" w={0.8} h={0.8} />
    <PxE x={10.5} y={5} c="#fff" w={0.8} h={0.8} />
    <PxE x={4.7} y={5.2} c="#0a0608" w={0.4} h={0.4} />
    <PxE x={10.7} y={5.2} c="#0a0608" w={0.4} h={0.4} />
    {/* nose */}
    <PxE x={7.5} y={5.5} c="#0a0608" w={1} h={0.5} />
    {/* tail thick */}
    <PxE x={12} y={8} c="#0a0608" w={2} h={3} />
    <PxE x={12.3} y={8.3} c="#7a5a3a" w={1.5} h={2.5} />
    <PxE x={12.3} y={9} c="#0a0608" w={1.5} h={0.5} />
  </g>, scale
);

// JP — Yokai
const E_Yokai = ({ scale = 4 }) => enemySvg(
  <g>
    {/* mask shape */}
    <PxE x={4} y={3} c="#0a0608" w={8} h={1} />
    <PxE x={3} y={4} c="#0a0608" h={6} />
    <PxE x={12} y={4} c="#0a0608" h={6} />
    <PxE x={4} y={4} c="#c92e2a" w={8} h={6} />
    <PxE x={4} y={10} c="#0a0608" w={2} h={1} />
    <PxE x={10} y={10} c="#0a0608" w={2} h={1} />
    {/* horns */}
    <PxE x={3} y={2} c="#0a0608" />
    <PxE x={4} y={1} c="#0a0608" />
    <PxE x={12} y={2} c="#0a0608" />
    <PxE x={11} y={1} c="#0a0608" />
    {/* eyes — yellow */}
    <PxE x={5} y={5} c="#fdc04a" w={1.5} h={1.5} />
    <PxE x={9.5} y={5} c="#fdc04a" w={1.5} h={1.5} />
    <PxE x={5.3} y={5.5} c="#0a0608" w={0.8} h={0.8} />
    <PxE x={9.7} y={5.5} c="#0a0608" w={0.8} h={0.8} />
    {/* fangs */}
    <PxE x={5.5} y={8} c="#fff" w={0.6} h={1} />
    <PxE x={9.5} y={8} c="#fff" w={0.6} h={1} />
    <PxE x={6} y={8.5} c="#0a0608" w={4} h={0.5} />
    {/* swirl mark forehead */}
    <PxE x={7.5} y={4.5} c="#0a0608" w={1} h={0.4} />
    {/* tassels */}
    <PxE x={4} y={11} c="#fdc04a" w={1} h={2} />
    <PxE x={11} y={11} c="#fdc04a" w={1} h={2} />
  </g>, scale
);

// RU — Ours
const E_Ours = ({ scale = 4 }) => enemySvg(
  <g>
    {/* body big */}
    <PxE x={3} y={5} c="#0a0608" w={10} h={1} />
    <PxE x={2} y={6} c="#0a0608" h={7} />
    <PxE x={13} y={6} c="#0a0608" h={7} />
    <PxE x={3} y={6} c="#3a2818" w={10} h={7} />
    <PxE x={3} y={13} c="#0a0608" w={10} h={1} />
    {/* belly */}
    <PxE x={5} y={9} c="#5a4030" w={6} h={4} />
    {/* head */}
    <PxE x={4} y={3} c="#0a0608" w={8} h={1} />
    <PxE x={3} y={4} c="#0a0608" />
    <PxE x={12} y={4} c="#0a0608" />
    <PxE x={4} y={4} c="#3a2818" w={8} h={1} />
    {/* ears round */}
    <PxE x={3} y={2} c="#0a0608" />
    <PxE x={12} y={2} c="#0a0608" />
    <PxE x={3.3} y={2.3} c="#3a2818" w={0.5} h={0.5} />
    <PxE x={12.3} y={2.3} c="#3a2818" w={0.5} h={0.5} />
    {/* snout */}
    <PxE x={6} y={5} c="#0a0608" w={4} h={1} />
    <PxE x={6} y={5} c="#a89878" w={4} h={1} />
    <PxE x={7.5} y={5.2} c="#0a0608" w={1} h={0.5} />
    {/* eyes */}
    <PxE x={4.5} y={4.3} c="#fdc04a" w={0.6} h={0.6} />
    <PxE x={11} y={4.3} c="#fdc04a" w={0.6} h={0.6} />
    {/* claws */}
    <PxE x={2} y={13} c="#fff" w={0.4} h={0.6} />
    <PxE x={3} y={13} c="#fff" w={0.4} h={0.6} />
    <PxE x={12.5} y={13} c="#fff" w={0.4} h={0.6} />
    <PxE x={13.5} y={13} c="#fff" w={0.4} h={0.6} />
  </g>, scale
);

// RU — Babouchka
const E_Babouchka = ({ scale = 4 }) => enemySvg(
  <g>
    {/* dress red triangle */}
    <PxE x={5} y={5} c="#0a0608" w={6} h={1} />
    <PxE x={4} y={6} c="#0a0608" h={7} />
    <PxE x={11} y={6} c="#0a0608" h={7} />
    <PxE x={5} y={6} c="#c83020" w={6} h={7} />
    <PxE x={3} y={11} c="#0a0608" h={2} />
    <PxE x={12} y={11} c="#0a0608" h={2} />
    <PxE x={3} y={11} c="#c83020" w={1} h={2} />
    <PxE x={12} y={11} c="#c83020" w={1} h={2} />
    <PxE x={3} y={13} c="#0a0608" w={10} h={0.5} />
    {/* face */}
    <PxE x={5} y={3} c="#0a0608" w={6} h={1} />
    <PxE x={4} y={4} c="#0a0608" />
    <PxE x={11} y={4} c="#0a0608" />
    <PxE x={5} y={4} c="#e8c8a0" w={6} h={2} />
    {/* headscarf */}
    <PxE x={4} y={2} c="#0a0608" w={8} h={1} />
    <PxE x={4} y={3} c="#3a78c8" w={2} h={1} />
    <PxE x={10} y={3} c="#3a78c8" w={2} h={1} />
    <PxE x={5} y={2} c="#3a78c8" w={6} h={1} />
    {/* eyes */}
    <PxE x={6} y={5} c="#0a0608" />
    <PxE x={9} y={5} c="#0a0608" />
    {/* mouth */}
    <PxE x={7} y={5.5} c="#8a3030" w={2} h={0.4} />
    {/* dolls pattern on dress */}
    <PxE x={6} y={8} c="#fdc04a" w={1} h={1} />
    <PxE x={9} y={8} c="#fdc04a" w={1} h={1} />
    <PxE x={7.5} y={10} c="#fdc04a" w={1} h={1} />
  </g>, scale
);

// FORT — Garde
const E_Garde = ({ scale = 4 }) => enemySvg(
  <g>
    {/* helmet */}
    <PxE x={4} y={2} c="#0a0608" w={8} h={1} />
    <PxE x={3} y={3} c="#0a0608" h={3} />
    <PxE x={12} y={3} c="#0a0608" h={3} />
    <PxE x={4} y={3} c="#7a7a78" w={8} h={3} />
    {/* visor slit */}
    <PxE x={5} y={4} c="#0a0608" w={6} h={0.6} />
    <PxE x={5.5} y={4.1} c="#c83020" w={1} h={0.4} />
    <PxE x={9.5} y={4.1} c="#c83020" w={1} h={0.4} />
    {/* helmet plume */}
    <PxE x={7.5} y={1} c="#c83020" w={1} h={1} />
    {/* armor body */}
    <PxE x={4} y={6} c="#0a0608" w={8} h={1} />
    <PxE x={3} y={7} c="#0a0608" h={6} />
    <PxE x={12} y={7} c="#0a0608" h={6} />
    <PxE x={4} y={7} c="#5a554a" w={8} h={6} />
    <PxE x={4} y={13} c="#0a0608" w={8} h={1} />
    {/* shield (left) */}
    <PxE x={1} y={7} c="#0a0608" w={2} h={6} />
    <PxE x={1.3} y={7.3} c="#a89878" w={1.4} h={5.4} />
    <PxE x={1.6} y={9} c="#c83020" w={0.8} h={1.5} />
    {/* spear (right) */}
    <PxE x={14} y={2} c="#0a0608" h={11} />
    <PxE x={13.5} y={2} c="#a8b0c0" w={1.2} h={1.2} />
    {/* body highlights */}
    <PxE x={5} y={8} c="#7a7a78" w={6} h={0.4} />
    <PxE x={5} y={11} c="#7a7a78" w={6} h={0.4} />
  </g>, scale
);

// FORT — Tourelle (statique)
const E_Tourelle = ({ scale = 4 }) => enemySvg(
  <g>
    {/* base */}
    <PxE x={3} y={9} c="#0a0608" w={10} h={1} />
    <PxE x={2} y={10} c="#0a0608" h={4} />
    <PxE x={13} y={10} c="#0a0608" h={4} />
    <PxE x={3} y={10} c="#3a3530" w={10} h={4} />
    <PxE x={3} y={14} c="#0a0608" w={10} h={0.5} />
    {/* rivets */}
    <PxE x={4} y={11} c="#fdc04a" w={0.5} h={0.5} />
    <PxE x={11.5} y={11} c="#fdc04a" w={0.5} h={0.5} />
    <PxE x={4} y={13} c="#fdc04a" w={0.5} h={0.5} />
    <PxE x={11.5} y={13} c="#fdc04a" w={0.5} h={0.5} />
    {/* turret head */}
    <PxE x={5} y={4} c="#0a0608" w={6} h={1} />
    <PxE x={4} y={5} c="#0a0608" h={4} />
    <PxE x={11} y={5} c="#0a0608" h={4} />
    <PxE x={5} y={5} c="#5a554a" w={6} h={4} />
    <PxE x={5} y={9} c="#0a0608" w={6} h={0.5} />
    {/* eye glow red */}
    <PxE x={6} y={6} c="#c83020" w={4} h={2} />
    <PxE x={7} y={6.5} c="#fdc04a" w={2} h={1} />
    <PxE x={7.5} y={6.5} c="#fff" w={1} h={0.6} />
    {/* cross barrels (4 dirs) */}
    <PxE x={1} y={7} c="#0a0608" w={3} h={0.6} />
    <PxE x={12} y={7} c="#0a0608" w={3} h={0.6} />
    <PxE x={7.5} y={1} c="#0a0608" w={1} h={3} />
    <PxE x={7.5} y={9.5} c="#0a0608" w={1} h={3} />
  </g>, scale
);

// BOSS — Le Maître (placeholder unique)
const E_Boss = ({ scale = 6 }) => (
  <svg width={32 * scale} height={32 * scale} viewBox="0 0 32 32" style={{ imageRendering: 'pixelated', display: 'block' }}>
    <ellipse cx="16" cy="29" rx="9" ry="1.4" fill="rgba(0,0,0,0.55)" />
    {/* crown / horns */}
    <PxE x={8} y={2} c="#0a0608" w={2} h={2} />
    <PxE x={22} y={2} c="#0a0608" w={2} h={2} />
    <PxE x={14} y={1} c="#0a0608" w={4} h={1} />
    <PxE x={14} y={2} c="#fdc04a" w={4} h={1} />
    <PxE x={15} y={2} c="#c83020" w={2} h={1} />
    {/* head/body — large hooded shape */}
    <PxE x={6} y={4} c="#0a0608" w={20} h={1} />
    <PxE x={5} y={5} c="#0a0608" h={20} />
    <PxE x={26} y={5} c="#0a0608" h={20} />
    <PxE x={6} y={5} c="#3a1a4a" w={20} h={20} />
    <PxE x={6} y={25} c="#0a0608" w={20} h={1} />
    {/* hood interior darker */}
    <PxE x={8} y={6} c="#1a0820" w={16} h={6} />
    {/* glowing eyes */}
    <PxE x={10} y={8} c="#c83020" w={3} h={3} />
    <PxE x={19} y={8} c="#c83020" w={3} h={3} />
    <PxE x={11} y={9} c="#fdc04a" w={1} h={1} />
    <PxE x={20} y={9} c="#fdc04a" w={1} h={1} />
    {/* mouth — toothy */}
    <PxE x={11} y={14} c="#0a0608" w={10} h={3} />
    <PxE x={12} y={14} c="#fff" w={1} h={1.5} />
    <PxE x={14} y={14} c="#fff" w={1} h={1.5} />
    <PxE x={16} y={14} c="#fff" w={1} h={1.5} />
    <PxE x={18} y={14} c="#fff" w={1} h={1.5} />
    <PxE x={20} y={14} c="#fff" w={1} h={1.5} />
    {/* claws (paws) bottom */}
    <PxE x={4} y={20} c="#0a0608" w={4} h={4} />
    <PxE x={4} y={20} c="#3a1a4a" w={4} h={4} />
    <PxE x={4} y={24} c="#fff" w={1} h={1} />
    <PxE x={6} y={24} c="#fff" w={1} h={1} />
    <PxE x={24} y={20} c="#0a0608" w={4} h={4} />
    <PxE x={24} y={20} c="#3a1a4a" w={4} h={4} />
    <PxE x={25} y={24} c="#fff" w={1} h={1} />
    <PxE x={27} y={24} c="#fff" w={1} h={1} />
    {/* body sigil */}
    <PxE x={14} y={19} c="#fdc04a" w={4} h={4} />
    <PxE x={15} y={20} c="#c83020" w={2} h={2} />
    {/* tattered base */}
    <PxE x={6} y={26} c="#0a0608" w={2} h={2} />
    <PxE x={10} y={26} c="#0a0608" w={2} h={2} />
    <PxE x={14} y={26} c="#0a0608" w={4} h={2} />
    <PxE x={20} y={26} c="#0a0608" w={2} h={2} />
    <PxE x={24} y={26} c="#0a0608" w={2} h={2} />
  </svg>
);

window.E_Souris = E_Souris;
window.E_Mouche = E_Mouche;
window.E_Fermier = E_Fermier;
window.E_Fantome = E_Fantome;
window.E_Squelette = E_Squelette;
window.E_Tanuki = E_Tanuki;
window.E_Yokai = E_Yokai;
window.E_Ours = E_Ours;
window.E_Babouchka = E_Babouchka;
window.E_Garde = E_Garde;
window.E_Tourelle = E_Tourelle;
window.E_Boss = E_Boss;
