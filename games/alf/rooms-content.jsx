// Room compositions — uses RoomBase + Furn + AlfSprite + enemy sprites
// Each room: type-specific layout. Houses provide palette flavor.

// Wrap an Alf at a tile position
const AlfInRoom = ({ tx: ax, ty: ay, dir = 'S', frame = 'idle' }) => (
  <g transform={`translate(${ax * TILE - 16} ${ay * TILE - 24})`}>
    <foreignObject x="0" y="0" width="64" height="64">
      <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: 64, height: 64 }}>
        <AlfSprite dir={dir} frame={frame} scale={4} />
      </div>
    </foreignObject>
  </g>
);

// Place an enemy SVG (16x16 viewBox) at tile pos
const EnemyInRoom = ({ tx: ax, ty: ay, Component, scale = 4, props = {} }) => (
  <g transform={`translate(${ax * TILE - 16} ${ay * TILE - 24})`}>
    <foreignObject x="0" y="0" width="64" height="64">
      <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: 64, height: 64 }}>
        <Component scale={scale} {...props} />
      </div>
    </foreignObject>
  </g>
);

// House-specific furniture sets — keyed by room type
// Each returns SVG children to insert into RoomBase

const Room = {
  hall: (h) => (
    <g>
      {/* welcome rug */}
      <rect x={tx(6)} y={ty(4)} width={TILE * 3} height={TILE * 1.5} fill={h.accent} stroke="#0a0608" strokeWidth="2" />
      <rect x={tx(6) + 6} y={ty(4) + 6} width={TILE * 3 - 12} height={TILE * 1.5 - 12} fill="none" stroke={h.surface} strokeWidth="1.5" strokeDasharray="3 3" />
      {/* coat rack left */}
      <Furn x={2} y={2} w={1} h={1.5} fill={h.surface} accent={h.accent2} />
      {/* table right */}
      <Furn x={11} y={2} w={1.5} h={1} fill={h.surface} />
      <PickupSpr x={11.3} y={2.2} kind="key" />
      <AlfInRoom tx={7.5} ty={5.2} />
    </g>
  ),

  living: (h, opts = {}) => (
    <g>
      {/* sofa */}
      <Furn x={1.5} y={2} w={3} h={1.2} fill={h.accent} accent={h.surface} />
      {/* coffee table */}
      <Furn x={6.5} y={4} w={2} h={1} fill={h.surface} />
      {/* fireplace */}
      <Furn x={11.5} y={1.2} w={2} h={1.5} fill={h.wall} accent={h.accent} />
      <ellipse cx={tx(12.5)} cy={ty(2)} rx="14" ry="10" fill={h.light} opacity="0.5" />
      {/* bookshelf */}
      <Furn x={11.5} y={5.5} w={2} h={1.5} fill={h.surface} accent={h.accent2} />
      {/* enemies */}
      {!opts.noEnemies && <EnemyInRoom tx={5} ty={5} Component={E_Souris} props={{ tint: h.surface }} />}
      {!opts.noEnemies && <EnemyInRoom tx={9} ty={3} Component={E_Souris} props={{ tint: h.surface }} />}
      <AlfInRoom tx={3} ty={5.5} dir="E" />
    </g>
  ),

  kitchen: (h) => (
    <g>
      {/* counters */}
      <Furn x={1.5} y={1.2} w={3} h={1} fill={h.surface} accent={h.accent} />
      <Furn x={5} y={1.2} w={1.5} h={1} fill="#7a7a78" accent="#0a0608" />
      <Furn x={7} y={1.2} w={1.5} h={1.2} fill={h.accent} accent="#fdc04a" />
      <Furn x={9} y={1.2} w={2} h={1.2} fill="#a8a8a8" accent="#5a5a5a" />
      {/* table */}
      <Furn x={5} y={4} w={5} h={1.5} fill={h.surface} accent={h.surface} />
      {/* hearts on table */}
      <PickupSpr x={5.4} y={4.2} kind="heart" />
      <PickupSpr x={7} y={4.2} kind="heart" />
      <PickupSpr x={8.5} y={4.2} kind="heart" />
      {/* stool */}
      <Furn x={4} y={4.5} w={0.6} h={0.6} fill={h.surface} />
      <AlfInRoom tx={11} ty={5} dir="W" />
    </g>
  ),

  bedroom: (h) => (
    <g>
      {/* bed */}
      <Furn x={1.5} y={2} w={3} h={2.5} fill={h.accent} accent="#fff" />
      {/* pillow */}
      <rect x={tx(1.7)} y={ty(2.2)} width={TILE * 1.2} height={TILE * 0.6} fill="#fff" stroke="#0a0608" strokeWidth="1.5" />
      {/* sleep Z's */}
      <text x={tx(2.5)} y={ty(1.5)} fill="#fff" fontFamily="VT323" fontSize="20">z z Z</text>
      {/* nightstand */}
      <Furn x={4.8} y={3} w={1} h={1} fill={h.surface} />
      {/* armoire */}
      <Furn x={11} y={1.2} w={2.5} h={2.5} fill={h.surface} accent={h.accent2} />
      <line x1={tx(12.25)} y1={ty(1.2)} x2={tx(12.25)} y2={ty(3.7)} stroke="#0a0608" strokeWidth="1.5" />
      {/* picture */}
      <Furn x={7} y={1.2} w={1.5} h={0.8} fill={h.surface} accent={h.accent} />
      {/* dream glow */}
      <ellipse cx={tx(3)} cy={ty(2.5)} rx="56" ry="20" fill={h.light} opacity="0.25" />
      <AlfInRoom tx={9} ty={5.5} dir="S" />
    </g>
  ),

  playroom: (h) => (
    <g>
      <ItemPedestal x={6.5} y={3.5} palette={h} />
      {/* rocking horse */}
      <Furn x={2} y={1.2} w={2} h={1.2} fill={h.accent} accent={h.surface} />
      {/* toy chest */}
      <Furn x={11.5} y={1.2} w={2} h={1.2} fill={h.surface} accent={h.accent2} />
      {/* ball */}
      <circle cx={tx(2.5)} cy={ty(5.5)} r="10" fill={h.accent} stroke="#0a0608" strokeWidth="2" />
      <path d={`M ${tx(2.5) - 10} ${ty(5.5)} A 10 10 0 0 1 ${tx(2.5) + 10} ${ty(5.5)}`} fill="none" stroke="#0a0608" strokeWidth="1.5" />
      {/* blocks */}
      <Furn x={11.5} y={5.5} w={0.8} h={0.8} fill={h.accent} />
      <Furn x={12.4} y={5.5} w={0.8} h={0.8} fill={h.accent2 || h.surface} />
      <Furn x={12} y={4.7} w={0.8} h={0.8} fill="#fdc04a" />
      <AlfInRoom tx={4} ty={5.5} dir="E" />
    </g>
  ),

  bathroom: (h) => (
    <g>
      {/* tub */}
      <Furn x={1.5} y={1.5} w={3} h={1.8} fill="#a8c0d0" accent="#fff" />
      <ellipse cx={tx(3)} cy={ty(2.4)} rx="32" ry="12" fill="#7ce0ff" opacity="0.4" />
      {/* sink */}
      <Furn x={11.5} y={1.5} w={2} h={1.2} fill="#d8dcd8" accent="#a8b0a8" />
      <circle cx={tx(12.5)} cy={ty(1.9)} r="6" fill="#0a0608" />
      {/* toilet */}
      <Furn x={11.5} y={4.5} w={1.5} h={1.8} fill="#e8e8e8" accent="#a8a8a8" />
      <PickupSpr x={6} y={4} kind="coin" />
      <PickupSpr x={7.5} y={4} kind="coin" />
      <PickupSpr x={9} y={4} kind="coin" />
      <AlfInRoom tx={5} ty={5.5} dir="N" />
    </g>
  ),

  shop: (h) => (
    <g>
      {/* counter */}
      <Furn x={1.5} y={3} w={11.5} h={1.2} fill={h.surface} accent="#fdc04a" />
      {/* Minou behind counter */}
      <g transform={`translate(${tx(7) - 16} ${ty(2) - 8})`}>
        <foreignObject x="0" y="0" width="64" height="64">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: 64, height: 64 }}>
            <MinouSprite scale={4} />
          </div>
        </foreignObject>
      </g>
      {/* sign */}
      <rect x={tx(5)} y={ty(0.8)} width={TILE * 5} height={TILE * 0.7} fill="#5a3010" stroke="#0a0608" strokeWidth="2" />
      <text x={tx(7.5)} y={ty(1.3)} textAnchor="middle" fill="#fdc04a" fontSize="14" fontFamily="Cinzel, serif" fontWeight="700">CHEZ MINOU</text>
      {/* items on counter */}
      <PickupSpr x={2.5} y={3.2} kind="heart" />
      <text x={tx(3)} y={ty(3.9)} textAnchor="middle" fill="#fff" fontSize="11" fontFamily="VT323">5¢</text>
      <PickupSpr x={5.5} y={3.2} kind="bomb" />
      <text x={tx(6)} y={ty(3.9)} textAnchor="middle" fill="#fff" fontSize="11" fontFamily="VT323">3¢</text>
      <g transform={`translate(${tx(8.5)} ${ty(3.2)})`}>
        <ItemPedestal x={0} y={0} palette={h} />
      </g>
      <text x={tx(9)} y={ty(3.9)} textAnchor="middle" fill="#fff" fontSize="11" fontFamily="VT323">15¢</text>
      <PickupSpr x={11.5} y={3.2} kind="key" />
      <text x={tx(12)} y={ty(3.9)} textAnchor="middle" fill="#fff" fontSize="11" fontFamily="VT323">7¢</text>
      <AlfInRoom tx={7.5} ty={6} dir="N" />
    </g>
  ),

  secret: (h) => (
    <g>
      {/* glow */}
      <radialGradient id="secretGlow"><stop offset="0" stopColor={h.light} stopOpacity="0.6" /><stop offset="1" stopColor={h.light} stopOpacity="0" /></radialGradient>
      <ellipse cx={tx(7.5)} cy={ty(4)} rx="120" ry="80" fill="url(#secretGlow)" />
      <ItemPedestal x={6.5} y={3} palette={h} />
      <PickupSpr x={3} y={4} kind="coin" />
      <PickupSpr x={4} y={4.5} kind="coin" />
      <PickupSpr x={5} y={4.2} kind="coin" />
      <PickupSpr x={11} y={4.5} kind="key" />
      <PickupSpr x={12} y={4} kind="heart" />
      <text x={tx(7.5)} y={ty(1.5)} textAnchor="middle" fill={h.light} fontSize="16" fontFamily="Cinzel" fontWeight="700">~ secrète ~</text>
      <CrackedWall side="E" />
      <AlfInRoom tx={2} ty={5} dir="E" />
    </g>
  ),

  corridor: (h) => (
    <g>
      {/* runner carpet */}
      <rect x={tx(1.2)} y={ty(3.5)} width={TILE * 12.6} height={TILE * 1.5} fill={h.accent} stroke="#0a0608" strokeWidth="2" />
      <rect x={tx(1.2) + 4} y={ty(3.5) + 4} width={TILE * 12.6 - 8} height={TILE * 1.5 - 8} fill="none" stroke={h.surface} strokeWidth="1" strokeDasharray="4 3" />
      {/* sconces */}
      <Furn x={4} y={1} w={0.5} h={0.5} fill="#fdc04a" />
      <Furn x={10} y={1} w={0.5} h={0.5} fill="#fdc04a" />
      <ellipse cx={tx(4.25)} cy={ty(1.5)} rx="20" ry="14" fill={h.light} opacity="0.35" />
      <ellipse cx={tx(10.25)} cy={ty(1.5)} rx="20" ry="14" fill={h.light} opacity="0.35" />
      <EnemyInRoom tx={9} ty={4.2} Component={E_Souris} props={{ tint: h.surface }} />
      <AlfInRoom tx={3} ty={4.2} dir="E" />
    </g>
  ),

  boss: (h) => (
    <g>
      {/* arena marks */}
      <circle cx={tx(7.5)} cy={ty(4)} r={TILE * 2.5} fill="none" stroke={h.accent} strokeWidth="2" strokeDasharray="6 4" opacity="0.6" />
      {/* boss center-top */}
      <g transform={`translate(${tx(7.5) - 96} ${ty(2.2) - 96})`}>
        <foreignObject x="0" y="0" width="192" height="192">
          <div xmlns="http://www.w3.org/1999/xhtml" style={{ width: 192, height: 192 }}>
            <E_Boss scale={6} />
          </div>
        </foreignObject>
      </g>
      {/* projectiles flying */}
      <circle cx={tx(6)} cy={ty(5)} r="5" fill="#c83020" stroke="#0a0608" strokeWidth="1.5" />
      <circle cx={tx(8)} cy={ty(5.5)} r="5" fill="#c83020" stroke="#0a0608" strokeWidth="1.5" />
      <circle cx={tx(9.5)} cy={ty(4.8)} r="5" fill="#c83020" stroke="#0a0608" strokeWidth="1.5" />
      {/* alf attacking */}
      <AlfInRoom tx={7.5} ty={6.5} dir="N" frame="attack" />
      {/* alf tears */}
      <circle cx={tx(7.5)} cy={ty(5.8)} r="3" fill={h.light} stroke="#0a0608" strokeWidth="1" />
      <circle cx={tx(7.5)} cy={ty(5.4)} r="2.5" fill={h.light} stroke="#0a0608" strokeWidth="1" />
    </g>
  ),

  // Signature rooms — unique per house
  signature_eu: (h) => (
    // EU: cave à vins
    <g>
      {/* wine racks */}
      {[1.5, 4, 6.5, 9, 11.5].map((x, i) => (
        <g key={i}>
          <Furn x={x} y={1.2} w={1.8} h={1.8} fill="#3a1a10" accent="#5a3010" />
          {Array.from({ length: 6 }).map((_, j) => (
            <circle key={j} cx={tx(x + 0.3) + (j % 3) * 14} cy={ty(1.5) + Math.floor(j / 3) * 18} r="5" fill="#1a0608" stroke="#5a3010" strokeWidth="1" />
          ))}
        </g>
      ))}
      <Furn x={6} y={4.5} w={3} h={1} fill={h.surface} />
      <PickupSpr x={6.5} y={4.5} kind="heart" />
      <PickupSpr x={8} y={4.5} kind="coin" />
      <text x={tx(7.5)} y={ty(0.7)} textAnchor="middle" fill={h.accent} fontSize="14" fontFamily="Cinzel" fontWeight="700">CAVE À VINS</text>
      <AlfInRoom tx={3} ty={5.5} />
    </g>
  ),

  signature_haunt: (h) => (
    // Haunted: salle des cercueils
    <g>
      <Furn x={2} y={1.5} w={2} h={3} fill="#1a1018" accent={h.accent} />
      <Furn x={6.5} y={1.5} w={2} h={3} fill="#1a1018" accent={h.accent} />
      <Furn x={11} y={1.5} w={2} h={3} fill="#1a1018" accent={h.accent} />
      {/* cross marks */}
      <text x={tx(3)} y={ty(2.5)} textAnchor="middle" fill={h.light} fontSize="20" fontFamily="Cinzel">†</text>
      <text x={tx(7.5)} y={ty(2.5)} textAnchor="middle" fill={h.light} fontSize="20" fontFamily="Cinzel">†</text>
      <text x={tx(12)} y={ty(2.5)} textAnchor="middle" fill={h.light} fontSize="20" fontFamily="Cinzel">†</text>
      {/* candelabra */}
      <Furn x={5.5} y={5} w={0.5} h={1} fill="#0a0608" />
      <circle cx={tx(5.75)} cy={ty(5)} r="4" fill="#fdc04a" />
      <Furn x={9} y={5} w={0.5} h={1} fill="#0a0608" />
      <circle cx={tx(9.25)} cy={ty(5)} r="4" fill="#fdc04a" />
      <EnemyInRoom tx={4.5} ty={5.5} Component={E_Fantome} />
      <text x={tx(7.5)} y={ty(0.7)} textAnchor="middle" fill={h.accent} fontSize="14" fontFamily="Cinzel" fontWeight="700">CRYPTE</text>
      <AlfInRoom tx={11} ty={5.5} dir="W" />
    </g>
  ),

  signature_jp: (h) => (
    // JP: jardin zen
    <g>
      {/* sand pattern */}
      <rect x={tx(1.5)} y={ty(1.5)} width={TILE * 12} height={TILE * 4.5} fill="#e8d8b8" />
      {Array.from({ length: 5 }).map((_, i) => (
        <line key={i} x1={tx(1.5)} x2={tx(13.5)} y1={ty(2) + i * 30} y2={ty(2) + i * 30} stroke="#a89866" strokeWidth="2" strokeDasharray="2 8" />
      ))}
      {/* rocks */}
      <ellipse cx={tx(4)} cy={ty(3)} rx="24" ry="16" fill="#5a554a" stroke="#0a0608" strokeWidth="2" />
      <ellipse cx={tx(4) - 6} cy={ty(3) - 4} rx="8" ry="5" fill="#7a7570" />
      <ellipse cx={tx(11)} cy={ty(4)} rx="20" ry="14" fill="#5a554a" stroke="#0a0608" strokeWidth="2" />
      {/* torii */}
      <Furn x={6.5} y={1.5} w={0.4} h={3.5} fill={h.accent} />
      <Furn x={8.6} y={1.5} w={0.4} h={3.5} fill={h.accent} />
      <Furn x={6} y={1.2} w={3.4} h={0.4} fill={h.accent} />
      <Furn x={6.3} y={1.6} w={2.8} h={0.3} fill={h.accent} />
      <text x={tx(7.5)} y={ty(0.7)} textAnchor="middle" fill={h.accent} fontSize="14" fontFamily="Cinzel" fontWeight="700">JARDIN ZEN</text>
      <AlfInRoom tx={7.5} ty={6} />
    </g>
  ),

  signature_ru: (h) => (
    // RU: bania (sauna)
    <g>
      {/* benches */}
      <Furn x={1.5} y={1.5} w={5} h={0.8} fill="#7a5a3a" accent="#5a3010" />
      <Furn x={1.5} y={2.5} w={5} h={0.8} fill="#7a5a3a" accent="#5a3010" />
      <Furn x={8.5} y={1.5} w={5} h={0.8} fill="#7a5a3a" accent="#5a3010" />
      <Furn x={8.5} y={2.5} w={5} h={0.8} fill="#7a5a3a" accent="#5a3010" />
      {/* stove */}
      <Furn x={6.5} y={4} w={2} h={2} fill="#5a3010" accent={h.accent2} />
      <ellipse cx={tx(7.5)} cy={ty(4)} rx="40" ry="14" fill="#fff" opacity="0.4" />
      <ellipse cx={tx(7.5)} cy={ty(3.5)} rx="30" ry="10" fill="#fff" opacity="0.3" />
      {/* steam puffs */}
      {[2, 5, 10, 13].map((x, i) => (
        <ellipse key={i} cx={tx(x)} cy={ty(0.5)} rx="14" ry="6" fill="#fff" opacity="0.4" />
      ))}
      <text x={tx(7.5)} y={ty(0.7)} textAnchor="middle" fill={h.accent} fontSize="14" fontFamily="Cinzel" fontWeight="700">BANIA</text>
      <AlfInRoom tx={4} ty={5.5} />
    </g>
  ),

  signature_fort: (h) => (
    // Fort: salle d'armes
    <g>
      {/* armor stands */}
      {[2, 5, 10, 13].map((x, i) => (
        <g key={i}>
          <Furn x={x - 0.4} y={1.2} w={0.8} h={1.5} fill="#7a7a78" accent="#5a554a" />
          <Furn x={x - 0.6} y={2.7} w={1.2} h={1.5} fill="#5a554a" accent={h.accent} />
        </g>
      ))}
      {/* weapon racks */}
      <Furn x={6.5} y={4.5} w={2} h={1.5} fill="#3a3530" accent="#0a0608" />
      <line x1={tx(7)} y1={ty(4.5)} x2={tx(7)} y2={ty(4)} stroke="#a8b0c0" strokeWidth="2" />
      <line x1={tx(7.5)} y1={ty(4.5)} x2={tx(7.5)} y2={ty(3.8)} stroke="#a8b0c0" strokeWidth="2" />
      <line x1={tx(8)} y1={ty(4.5)} x2={tx(8)} y2={ty(4)} stroke="#a8b0c0" strokeWidth="2" />
      {/* torches */}
      <ellipse cx={tx(1)} cy={ty(0.7)} rx="14" ry="20" fill="#ff8a3a" opacity="0.55" />
      <ellipse cx={tx(14)} cy={ty(0.7)} rx="14" ry="20" fill="#ff8a3a" opacity="0.55" />
      <Furn x={0.7} y={0.4} w={0.6} h={0.6} fill="#fdc04a" />
      <Furn x={13.7} y={0.4} w={0.6} h={0.6} fill="#fdc04a" />
      <text x={tx(7.5)} y={ty(0.7)} textAnchor="middle" fill={h.accent} fontSize="14" fontFamily="Cinzel" fontWeight="700">SALLE D'ARMES</text>
      <EnemyInRoom tx={7.5} ty={6.5} Component={E_Garde} />
    </g>
  ),
};

window.Room = Room;
window.AlfInRoom = AlfInRoom;
window.EnemyInRoom = EnemyInRoom;
