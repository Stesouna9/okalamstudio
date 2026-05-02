// Sprites — Alf + Minou + ennemis + boss
// Pixel-art style via SVG rectangles (Isaac-like top-down 3/4)
// Each sprite drawn in viewBox 0 0 32 32 unless noted

const Px = ({ x, y, c, w = 1, h = 1 }) => (
  <rect x={x} y={y} width={w} height={h} fill={c} shapeRendering="crispEdges" />
);

// ============ ALF — chartreux, top-down 3/4 ============
// 4 directions: down (S), up (N), left (W), right (E)
// Each direction: idle / walk1 / walk2 / attack
const ALF_PALETTE = ALF;

const AlfSprite = ({ dir = 'S', frame = 'idle', flash = false, scale = 6 }) => {
  const c = ALF_PALETTE;
  const out = flash ? '#fff' : c.outline;
  const body = flash ? '#ffd6d0' : c.body;
  const shade = flash ? '#ffb0a0' : c.bodyShade;
  const hi = flash ? '#fff' : c.bodyHighlight;
  const belly = flash ? '#fff' : c.belly;

  // Render as 16x16 logical pixel grid scaled
  const size = 16 * scale;

  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <AlfBody dir={dir} frame={frame} c={{ ...c, outline: out, body, bodyShade: shade, bodyHighlight: hi, belly }} />
    </svg>
  );
};

const AlfBody = ({ dir, frame, c }) => {
  // Down (facing camera) — readable signature pose
  if (dir === 'S') {
    const tailWag = frame === 'walk2' ? 1 : 0;
    const legL = frame === 'walk1' ? 1 : 0;
    const legR = frame === 'walk2' ? 1 : 0;
    return (
      <g>
        {/* shadow */}
        <ellipse cx="8" cy="14.5" rx="3.5" ry="0.8" fill="rgba(0,0,0,0.35)" />
        {/* tail */}
        <Px x={11} y={9 - tailWag} c={c.outline} />
        <Px x={12} y={8 - tailWag} c={c.outline} />
        <Px x={11} y={9 - tailWag} c={c.body} w={0.5} h={0.5} />
        {/* body */}
        <Px x={5} y={8} c={c.outline} w={6} h={1} />
        <Px x={4} y={9} c={c.outline} />
        <Px x={11} y={9} c={c.outline} />
        <Px x={5} y={9} c={c.body} w={6} h={3} />
        <Px x={4} y={9} c={c.body} h={2} />
        <Px x={11} y={9} c={c.body} h={2} />
        {/* belly */}
        <Px x={6} y={11} c={c.belly} w={4} h={1} />
        {/* legs (animated) */}
        <Px x={5} y={12} c={c.outline} />
        <Px x={5} y={12 + legL} c={c.bodyShade} />
        <Px x={6} y={12} c={c.outline} />
        <Px x={9} y={12} c={c.outline} />
        <Px x={10} y={12} c={c.outline} />
        <Px x={10} y={12 + legR} c={c.bodyShade} />
        {/* head */}
        <Px x={5} y={4} c={c.outline} w={6} h={1} />
        <Px x={4} y={5} c={c.outline} h={3} />
        <Px x={11} y={5} c={c.outline} h={3} />
        <Px x={5} y={5} c={c.body} w={6} h={3} />
        {/* ears */}
        <Px x={4} y={3} c={c.outline} />
        <Px x={4} y={4} c={c.body} />
        <Px x={11} y={3} c={c.outline} />
        <Px x={11} y={4} c={c.body} />
        <Px x={5} y={3} c={c.outline} />
        <Px x={10} y={3} c={c.outline} />
        {/* inner ear */}
        <Px x={4.3} y={3.5} c={c.innerEar} w={0.4} h={0.4} />
        <Px x={11.3} y={3.5} c={c.innerEar} w={0.4} h={0.4} />
        {/* eyes — copper */}
        <Px x={6} y={6} c={c.eye} />
        <Px x={9} y={6} c={c.eye} />
        <Px x={6.2} y={6.2} c={c.pupil} w={0.6} h={0.6} />
        <Px x={9.2} y={6.2} c={c.pupil} w={0.6} h={0.6} />
        <Px x={6.1} y={6.1} c={c.eyeShine} w={0.3} h={0.3} />
        <Px x={9.1} y={6.1} c={c.eyeShine} w={0.3} h={0.3} />
        {/* nose */}
        <Px x={7.5} y={7} c={c.nose} w={1} h={0.6} />
        {/* mouth */}
        <Px x={7} y={7.6} c={c.outline} w={0.4} h={0.3} />
        <Px x={8.6} y={7.6} c={c.outline} w={0.4} h={0.3} />
        {/* highlight */}
        <Px x={5} y={5} c={c.bodyHighlight} w={2} h={0.5} />
        {frame === 'attack' && (
          <g>
            <Px x={2} y={10} c={c.bodyHighlight} w={2} h={0.4} />
            <Px x={12} y={10} c={c.bodyHighlight} w={2} h={0.4} />
          </g>
        )}
      </g>
    );
  }

  // Up (facing away)
  if (dir === 'N') {
    const tailWag = frame === 'walk2' ? 1 : 0;
    return (
      <g>
        <ellipse cx="8" cy="14.5" rx="3.5" ry="0.8" fill="rgba(0,0,0,0.35)" />
        <Px x={4} y={4} c={c.outline} w={8} h={1} />
        <Px x={4} y={5} c={c.outline} h={3} />
        <Px x={11} y={5} c={c.outline} h={3} />
        <Px x={4} y={5} c={c.body} w={8} h={3} />
        {/* ears (back of head) */}
        <Px x={4} y={3} c={c.outline} />
        <Px x={11} y={3} c={c.outline} />
        <Px x={4} y={4} c={c.body} />
        <Px x={11} y={4} c={c.body} />
        {/* body */}
        <Px x={4} y={8} c={c.outline} w={8} h={1} />
        <Px x={4} y={9} c={c.outline} h={3} />
        <Px x={11} y={9} c={c.outline} h={3} />
        <Px x={4} y={9} c={c.body} w={8} h={3} />
        <Px x={5} y={10} c={c.bodyHighlight} w={6} h={0.5} />
        {/* tail */}
        <Px x={11 + tailWag} y={9} c={c.outline} />
        <Px x={12 + tailWag} y={8} c={c.outline} />
        {/* legs */}
        <Px x={5} y={12} c={c.outline} />
        <Px x={6} y={12} c={c.outline} />
        <Px x={9} y={12} c={c.outline} />
        <Px x={10} y={12} c={c.outline} />
      </g>
    );
  }

  // Side (E or W) — reuse and flip via transform
  const flip = dir === 'W' ? 'scale(-1,1) translate(-16,0)' : '';
  return (
    <g transform={flip}>
      <ellipse cx="8" cy="14.5" rx="3.5" ry="0.8" fill="rgba(0,0,0,0.35)" />
      {/* head right */}
      <Px x={9} y={5} c={c.outline} w={5} h={1} />
      <Px x={9} y={6} c={c.outline} h={2} />
      <Px x={14} y={6} c={c.outline} h={2} />
      <Px x={9} y={6} c={c.body} w={5} h={2} />
      {/* ear */}
      <Px x={9} y={4} c={c.outline} />
      <Px x={10} y={4} c={c.outline} />
      <Px x={11} y={4} c={c.body} w={0.5} h={0.5} />
      {/* eye */}
      <Px x={12} y={6.5} c={c.eye} w={0.8} h={0.8} />
      <Px x={12.2} y={6.7} c={c.pupil} w={0.4} h={0.4} />
      {/* nose */}
      <Px x={14} y={7} c={c.nose} w={0.6} h={0.4} />
      {/* body */}
      <Px x={3} y={8} c={c.outline} w={7} h={1} />
      <Px x={3} y={9} c={c.outline} h={3} />
      <Px x={10} y={9} c={c.outline} h={3} />
      <Px x={3} y={9} c={c.body} w={7} h={3} />
      <Px x={4} y={11} c={c.belly} w={5} h={1} />
      {/* tail */}
      <Px x={2} y={9} c={c.outline} />
      <Px x={1} y={8} c={c.outline} />
      {/* legs */}
      <Px x={4} y={12} c={c.outline} />
      <Px x={8} y={12} c={c.outline} />
    </g>
  );
};

// ============ MINOU — chat bleu marchand ============
const MinouSprite = ({ scale = 6 }) => {
  const size = 16 * scale;
  return (
    <svg width={size} height={size} viewBox="0 0 16 16" style={{ imageRendering: 'pixelated', display: 'block' }}>
      <ellipse cx="8" cy="14.5" rx="4" ry="0.8" fill="rgba(0,0,0,0.4)" />
      {/* body — sit pose */}
      <Px x={4} y={6} c="#0a0608" w={8} h={1} />
      <Px x={3} y={7} c="#0a0608" h={6} />
      <Px x={12} y={7} c="#0a0608" h={6} />
      <Px x={4} y={7} c="#3a78c8" w={8} h={6} />
      {/* ears */}
      <Px x={3} y={5} c="#0a0608" />
      <Px x={12} y={5} c="#0a0608" />
      <Px x={4} y={5} c="#3a78c8" />
      <Px x={11} y={5} c="#3a78c8" />
      {/* eyes — green */}
      <Px x={5} y={8} c="#7adc4a" />
      <Px x={9} y={8} c="#7adc4a" />
      <Px x={5.2} y={8.2} c="#0a0608" w={0.6} h={0.6} />
      <Px x={9.2} y={8.2} c="#0a0608" w={0.6} h={0.6} />
      {/* monocle */}
      <Px x={9} y={7.5} c="#fdc04a" w={1.2} h={1.2} />
      <Px x={9.3} y={7.8} c="#7adc4a" w={0.6} h={0.6} />
      {/* tie */}
      <Px x={7} y={11} c="#c83020" w={2} h={2} />
      <Px x={7.5} y={10.5} c="#c83020" w={1} h={0.5} />
      {/* nose */}
      <Px x={7.5} y={9} c="#3a2828" w={1} h={0.5} />
      {/* belly hint */}
      <Px x={6} y={12} c="#a8c0e0" w={4} h={1} />
      {/* whiskers */}
      <Px x={3} y={9} c="#fff" w={1} h={0.2} />
      <Px x={12} y={9} c="#fff" w={1} h={0.2} />
    </svg>
  );
};

window.AlfSprite = AlfSprite;
window.MinouSprite = MinouSprite;
window.Px = Px;
