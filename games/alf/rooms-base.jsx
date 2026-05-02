// Pixel-art rooms — top-down 3/4 Isaac-style
// Each room rendered in a fixed viewport; tile-based via SVG <rect>
// House palettes drive color variation

const TILE = 32; // logical px per tile
const ROOM_W = 15; // tiles wide
const ROOM_H = 9; // tiles tall

// Helper — wall + floor + door layout
const RoomBase = ({ palette, doors = ['N', 'S', 'E', 'W'], floorPattern = 'planks', children, dim = 0 }) => {
  const W = ROOM_W * TILE;
  const H = ROOM_H * TILE;
  const wallTh = TILE; // 1 tile thick
  const floorX = wallTh, floorY = wallTh;
  const floorW = W - 2 * wallTh;
  const floorH = H - 2 * wallTh;
  const doorSize = TILE * 1.2;

  return (
    <svg width="100%" viewBox={`0 0 ${W} ${H}`} style={{ display: 'block', imageRendering: 'pixelated', shapeRendering: 'crispEdges' }}>
      {/* floor base */}
      <rect x={floorX} y={floorY} width={floorW} height={floorH} fill={palette.floor} />

      {/* floor pattern */}
      {floorPattern === 'planks' && Array.from({ length: 7 }).map((_, i) => (
        <line key={i} x1={floorX} x2={floorX + floorW} y1={floorY + (i + 1) * (floorH / 7)} y2={floorY + (i + 1) * (floorH / 7)} stroke={palette.grout} strokeWidth="1.5" opacity="0.55" />
      ))}
      {floorPattern === 'planks' && Array.from({ length: 30 }).map((_, i) => {
        const row = i % 7;
        const offset = row % 2 ? 0 : floorW / 5;
        const x = floorX + ((i * 60) + offset) % floorW;
        const y = floorY + row * (floorH / 7);
        return <line key={'p' + i} x1={x} x2={x} y1={y} y2={y + floorH / 7} stroke={palette.grout} strokeWidth="1" opacity="0.4" />;
      })}
      {floorPattern === 'tile' && (
        <g opacity="0.6">
          {Array.from({ length: 8 }).map((_, i) => (
            <line key={'v' + i} x1={floorX + (i + 1) * (floorW / 9)} x2={floorX + (i + 1) * (floorW / 9)} y1={floorY} y2={floorY + floorH} stroke={palette.grout} strokeWidth="1" />
          ))}
          {Array.from({ length: 5 }).map((_, i) => (
            <line key={'h' + i} x1={floorX} x2={floorX + floorW} y1={floorY + (i + 1) * (floorH / 6)} y2={floorY + (i + 1) * (floorH / 6)} stroke={palette.grout} strokeWidth="1" />
          ))}
        </g>
      )}
      {floorPattern === 'tatami' && (
        <g>
          {Array.from({ length: 6 }).map((_, i) => {
            const cw = floorW / 3;
            const ch = floorH / 2;
            const x = floorX + (i % 3) * cw;
            const y = floorY + Math.floor(i / 3) * ch;
            return (
              <g key={i}>
                <rect x={x + 4} y={y + 4} width={cw - 8} height={ch - 8} fill={palette.floorAlt} stroke="#2a1d10" strokeWidth="2" />
                <rect x={x + 6} y={y + 6} width={cw - 12} height={ch - 12} fill="none" stroke={palette.accent} strokeWidth="2" />
              </g>
            );
          })}
        </g>
      )}
      {floorPattern === 'stone' && (
        <g opacity="0.85">
          {Array.from({ length: 60 }).map((_, i) => {
            const col = i % 10;
            const row = Math.floor(i / 10);
            const offset = row % 2 ? 18 : 0;
            const sw = floorW / 10;
            const sh = floorH / 6;
            return (
              <rect key={i} x={floorX + col * sw + offset - (offset && col === 9 ? sw : 0)} y={floorY + row * sh} width={sw - 2} height={sh - 2} fill={i % 3 === 0 ? palette.floorAlt : palette.floor} stroke={palette.grout} strokeWidth="1" />
            );
          })}
        </g>
      )}
      {floorPattern === 'parquet' && (
        <g opacity="0.7">
          {Array.from({ length: 24 }).map((_, i) => {
            const col = i % 6;
            const row = Math.floor(i / 6);
            const sw = floorW / 6;
            const sh = floorH / 4;
            return (
              <rect key={i} x={floorX + col * sw} y={floorY + row * sh} width={sw - 1} height={sh - 1} fill={i % 2 === 0 ? palette.floor : palette.floorAlt} stroke={palette.grout} strokeWidth="0.8" />
            );
          })}
        </g>
      )}

      {/* walls */}
      {/* top wall (with depth) */}
      <rect x={0} y={0} width={W} height={wallTh} fill={palette.wallTop} />
      <rect x={0} y={wallTh - 6} width={W} height={6} fill={palette.wall} />
      {/* bottom wall */}
      <rect x={0} y={H - wallTh} width={W} height={wallTh} fill={palette.wall} />
      {/* side walls */}
      <rect x={0} y={0} width={wallTh} height={H} fill={palette.wall} />
      <rect x={W - wallTh} y={0} width={wallTh} height={H} fill={palette.wall} />
      {/* wall stones for fortress / haunt */}
      {(palette.mood === 'gothic') && (
        <g opacity="0.6">
          {Array.from({ length: 15 }).map((_, i) => (
            <line key={i} x1={i * (W / 15)} x2={i * (W / 15)} y1={0} y2={wallTh} stroke={palette.grout} strokeWidth="1.5" />
          ))}
          <line x1="0" x2={W} y1={wallTh / 2} y2={wallTh / 2} stroke={palette.grout} strokeWidth="1" />
        </g>
      )}

      {/* doors */}
      {doors.includes('N') && (
        <g>
          <rect x={W / 2 - doorSize / 2} y={0} width={doorSize} height={wallTh + 2} fill={palette.floor} />
          <rect x={W / 2 - doorSize / 2} y={0} width={doorSize} height={4} fill="#0a0608" />
          <rect x={W / 2 - doorSize / 2 - 4} y={0} width={4} height={wallTh} fill={palette.accent2 || palette.accent} />
          <rect x={W / 2 + doorSize / 2} y={0} width={4} height={wallTh} fill={palette.accent2 || palette.accent} />
        </g>
      )}
      {doors.includes('S') && (
        <g>
          <rect x={W / 2 - doorSize / 2} y={H - wallTh - 2} width={doorSize} height={wallTh + 2} fill={palette.floor} />
          <rect x={W / 2 - doorSize / 2 - 4} y={H - wallTh} width={4} height={wallTh} fill={palette.accent2 || palette.accent} />
          <rect x={W / 2 + doorSize / 2} y={H - wallTh} width={4} height={wallTh} fill={palette.accent2 || palette.accent} />
        </g>
      )}
      {doors.includes('E') && (
        <g>
          <rect x={W - wallTh - 2} y={H / 2 - doorSize / 2} width={wallTh + 2} height={doorSize} fill={palette.floor} />
          <rect x={W - wallTh} y={H / 2 - doorSize / 2 - 4} width={wallTh} height={4} fill={palette.accent2 || palette.accent} />
          <rect x={W - wallTh} y={H / 2 + doorSize / 2} width={wallTh} height={4} fill={palette.accent2 || palette.accent} />
        </g>
      )}
      {doors.includes('W') && (
        <g>
          <rect x={0} y={H / 2 - doorSize / 2} width={wallTh + 2} height={doorSize} fill={palette.floor} />
          <rect x={0} y={H / 2 - doorSize / 2 - 4} width={wallTh} height={4} fill={palette.accent2 || palette.accent} />
          <rect x={0} y={H / 2 + doorSize / 2} width={wallTh} height={4} fill={palette.accent2 || palette.accent} />
        </g>
      )}

      {/* contents */}
      {children}

      {/* vignette / lighting overlay */}
      {dim > 0 && (
        <rect x={0} y={0} width={W} height={H} fill="rgba(0,0,0,0.4)" style={{ mixBlendMode: 'multiply' }} />
      )}
      {palette.mood === 'gothic' && (
        <radialGradient id="gloom" cx="0.5" cy="0.5" r="0.6">
          <stop offset="0.3" stopColor="rgba(0,0,0,0)" />
          <stop offset="1" stopColor="rgba(0,0,0,0.55)" />
        </radialGradient>
      )}
      {palette.mood === 'gothic' && (
        <rect x={0} y={0} width={W} height={H} fill="url(#gloom)" pointerEvents="none" />
      )}
    </svg>
  );
};

// Room contents helpers — positions in tile coords
const tx = (x) => x * TILE;
const ty = (y) => y * TILE;

// Furniture: simple pixel-art rect
const Furn = ({ x, y, w, h, fill, accent, label }) => (
  <g>
    <rect x={tx(x)} y={ty(y)} width={w * TILE} height={h * TILE} fill="#0a0608" />
    <rect x={tx(x) + 2} y={ty(y) + 2} width={w * TILE - 4} height={h * TILE - 4} fill={fill} />
    {accent && <rect x={tx(x) + 4} y={ty(y) + 4} width={w * TILE - 8} height={6} fill={accent} />}
  </g>
);

// Pickup (coin/heart/key)
const PickupSpr = ({ x, y, kind = 'coin' }) => {
  const cx = tx(x) + TILE / 2;
  const cy = ty(y) + TILE / 2;
  if (kind === 'coin') return (
    <g>
      <circle cx={cx} cy={cy + 6} r="6" fill="rgba(0,0,0,0.4)" />
      <circle cx={cx} cy={cy} r="7" fill="#fdc04a" stroke="#0a0608" strokeWidth="1.5" />
      <text x={cx} y={cy + 3} textAnchor="middle" fill="#8a5a10" fontSize="10" fontFamily="VT323, monospace" fontWeight="bold">¢</text>
    </g>
  );
  if (kind === 'heart') return (
    <g transform={`translate(${cx} ${cy})`}>
      <ellipse cx="0" cy="8" rx="6" ry="1.5" fill="rgba(0,0,0,0.4)" />
      <path d="M 0 6 C -8 0, -8 -6, -4 -6 C -1 -6, 0 -3, 0 -2 C 0 -3, 1 -6, 4 -6 C 8 -6, 8 0, 0 6 Z" fill="#c83020" stroke="#0a0608" strokeWidth="1.5" />
      <path d="M -3 -4 C -4 -3, -4 -1, -3 0" fill="none" stroke="#ff8070" strokeWidth="1" />
    </g>
  );
  if (kind === 'key') return (
    <g transform={`translate(${cx} ${cy})`}>
      <ellipse cx="0" cy="6" rx="5" ry="1.5" fill="rgba(0,0,0,0.4)" />
      <circle cx="-3" cy="0" r="4" fill="#fdc04a" stroke="#0a0608" strokeWidth="1.5" />
      <circle cx="-3" cy="0" r="1.5" fill="#0a0608" />
      <rect x="0" y="-1" width="6" height="2" fill="#fdc04a" stroke="#0a0608" strokeWidth="1" />
      <rect x="4" y="1" width="2" height="2" fill="#fdc04a" stroke="#0a0608" strokeWidth="1" />
    </g>
  );
  if (kind === 'bomb') return (
    <g transform={`translate(${cx} ${cy})`}>
      <ellipse cx="0" cy="7" rx="6" ry="1.5" fill="rgba(0,0,0,0.4)" />
      <circle cx="0" cy="0" r="6" fill="#1a1a1a" stroke="#0a0608" strokeWidth="1.5" />
      <circle cx="-2" cy="-2" r="1.5" fill="#5a5a5a" />
      <line x1="3" y1="-4" x2="6" y2="-7" stroke="#5a3010" strokeWidth="1.5" />
      <circle cx="6" cy="-7" r="1.5" fill="#fdc04a" />
    </g>
  );
  return null;
};

// Item on pedestal
const ItemPedestal = ({ x, y, palette }) => (
  <g>
    <rect x={tx(x) - 4} y={ty(y) + 8} width={TILE + 8} height={TILE - 4} fill="#0a0608" />
    <rect x={tx(x)} y={ty(y) + 12} width={TILE} height={TILE - 12} fill={palette.surface} />
    <rect x={tx(x)} y={ty(y) + 12} width={TILE} height={4} fill={palette.accent} />
    {/* glow */}
    <ellipse cx={tx(x) + TILE / 2} cy={ty(y)} rx="22" ry="14" fill={palette.light} opacity="0.35" />
    {/* item — generic gem */}
    <g transform={`translate(${tx(x) + TILE / 2} ${ty(y) - 4})`}>
      <polygon points="-6,-4 0,-10 6,-4 0,6" fill="#fdc04a" stroke="#0a0608" strokeWidth="1.5" />
      <polygon points="-4,-3 0,-7 4,-3 0,3" fill="#fff5b0" />
      <line x1="-2" y1="-1" x2="2" y2="-1" stroke="#fff" strokeWidth="0.6" />
    </g>
  </g>
);

// Cracked wall
const CrackedWall = ({ side = 'E' }) => {
  if (side === 'E') return (
    <g>
      <rect x={ROOM_W * TILE - TILE} y={(ROOM_H * TILE) / 2 - 24} width={TILE} height={48} fill="#0a0608" />
      <rect x={ROOM_W * TILE - TILE + 4} y={(ROOM_H * TILE) / 2 - 22} width={TILE - 8} height={44} fill="#3a2a1c" />
      <line x1={ROOM_W * TILE - TILE / 2} y1={(ROOM_H * TILE) / 2 - 20} x2={ROOM_W * TILE - 6} y2={(ROOM_H * TILE) / 2} stroke="#0a0608" strokeWidth="1.5" />
      <line x1={ROOM_W * TILE - TILE / 2} y1={(ROOM_H * TILE) / 2} x2={ROOM_W * TILE - 4} y2={(ROOM_H * TILE) / 2 + 18} stroke="#0a0608" strokeWidth="1.5" />
    </g>
  );
  return null;
};

window.RoomBase = RoomBase;
window.Furn = Furn;
window.PickupSpr = PickupSpr;
window.ItemPedestal = ItemPedestal;
window.CrackedWall = CrackedWall;
window.tx = tx;
window.ty = ty;
window.TILE = TILE;
window.ROOM_W = ROOM_W;
window.ROOM_H = ROOM_H;
