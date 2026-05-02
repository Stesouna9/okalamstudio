// HUD — variation B coins (4 corners) finalisée + 2 sous-variations
// Plus écrans système

const Heart = ({ state = 'full', size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" style={{ display: 'block', imageRendering: 'pixelated' }}>
    <defs>
      <clipPath id={"hclip" + state}>
        <rect x="0" y="0" width={state === 'half' ? 8 : 16} height="16" />
      </clipPath>
    </defs>
    {/* base outline */}
    <path d="M 1 4 L 1 6 L 2 6 L 2 8 L 3 8 L 3 9 L 4 9 L 4 10 L 5 10 L 5 11 L 6 11 L 6 12 L 7 12 L 7 13 L 8 13 L 9 13 L 9 12 L 10 12 L 10 11 L 11 11 L 11 10 L 12 10 L 12 9 L 13 9 L 13 8 L 14 8 L 14 6 L 15 6 L 15 4 L 14 4 L 14 3 L 13 3 L 13 2 L 11 2 L 11 3 L 10 3 L 10 4 L 9 4 L 9 5 L 8 5 L 8 5 L 7 5 L 7 4 L 6 4 L 6 3 L 5 3 L 5 2 L 3 2 L 3 3 L 2 3 L 2 4 Z" fill="#0a0608" shapeRendering="crispEdges" />
    {state !== 'empty' && (
      <g clipPath={state === 'half' ? `url(#hclip${state})` : undefined}>
        <rect x="3" y="3" width="10" height="9" fill="#c83020" />
        <rect x="4" y="4" width="2" height="2" fill="#ff7060" />
        <rect x="5" y="3" width="1" height="1" fill="#ff7060" />
      </g>
    )}
  </svg>
);

const HeartsBar = ({ full = 4, half = 0, empty = 2 }) => (
  <div style={{ display: 'flex', gap: 2 }}>
    {Array.from({ length: full }).map((_, i) => <Heart key={'f' + i} state="full" />)}
    {Array.from({ length: half }).map((_, i) => <Heart key={'h' + i} state="half" />)}
    {Array.from({ length: empty }).map((_, i) => <Heart key={'e' + i} state="empty" />)}
  </div>
);

const ItemSlot = ({ size = 56, label = '', cooldown = 0, accent = '#fdc04a', empty = false, prompt = '' }) => (
  <div style={{
    width: size, height: size, position: 'relative',
    border: `3px solid ${UI.hudBorder}`, background: UI.hudBg2, borderRadius: 4,
    boxShadow: 'inset 0 0 0 2px #0a0608, 0 4px 0 #0a0608',
    display: 'grid', placeItems: 'center',
    fontFamily: FONTS.pixel, fontSize: 14, color: empty ? '#5a4030' : '#fff',
  }}>
    {empty ? '—' : label}
    {cooldown > 0 && (
      <div style={{ position: 'absolute', inset: 2, background: `linear-gradient(0deg, rgba(0,0,0,0.7) ${cooldown}%, transparent ${cooldown}%)`, pointerEvents: 'none' }} />
    )}
    {prompt && (
      <div style={{ position: 'absolute', bottom: -10, right: -10, width: 22, height: 22, borderRadius: '50%', background: '#0a0608', border: `2px solid ${accent}`, color: accent, fontSize: 12, fontFamily: FONTS.pixel, display: 'grid', placeItems: 'center', boxShadow: '0 2px 0 #0a0608' }}>
        {prompt}
      </div>
    )}
  </div>
);

// PS5 button glyph
const PSBtn = ({ kind = 'cross', size = 22 }) => {
  const colors = { cross: '#7ab8ff', circle: '#ff5a5a', square: '#ff7ad8', triangle: '#7ae8a8' };
  const sym = { cross: '✕', circle: '◯', square: '□', triangle: '△' };
  return (
    <span style={{
      display: 'inline-grid', placeItems: 'center',
      width: size, height: size, borderRadius: '50%',
      background: '#0a0608', border: `2px solid ${colors[kind]}`,
      color: colors[kind], fontFamily: FONTS.pixel, fontSize: size * 0.7, lineHeight: 1,
    }}>{sym[kind]}</span>
  );
};

// Coin/key/bomb pill
const ResourcePill = ({ kind = 'coin', value = 0 }) => {
  const Icon = () => {
    if (kind === 'coin') return <span style={{ display: 'inline-block', width: 14, height: 14, borderRadius: '50%', background: '#fdc04a', border: '2px solid #0a0608', boxShadow: 'inset -2px -2px 0 #b8821a' }} />;
    if (kind === 'key') return <span style={{ fontFamily: FONTS.pixel, color: '#fdc04a', fontSize: 18, lineHeight: '14px' }}>⚷</span>;
    if (kind === 'bomb') return <span style={{ display: 'inline-block', width: 12, height: 12, borderRadius: '50%', background: '#1a1a1a', border: '2px solid #0a0608' }} />;
  };
  return (
    <div style={{
      display: 'inline-flex', alignItems: 'center', gap: 8,
      padding: '4px 10px', background: UI.hudBg, border: `2px solid ${UI.hudBorder}`,
      borderRadius: 4, color: '#fff', fontFamily: FONTS.pixel, fontSize: 18, lineHeight: 1,
      boxShadow: '0 2px 0 #0a0608',
    }}>
      <Icon />
      <span>{value}</span>
    </div>
  );
};

// Mini-map
const MiniMap = ({ rows = 4, cols = 5, current = [2, 2], visited = [], boss = [3, 3], shop = [4, 2], secret = [0, 1] }) => {
  const cell = 16;
  const allVisited = visited.length ? visited : [
    [1, 1], [2, 1], [3, 1],
    [0, 2], [1, 2], [2, 2], [3, 2], [4, 2],
    [2, 3],
  ];
  return (
    <div style={{
      padding: 6, background: UI.hudBg2, border: `2px solid ${UI.hudBorder}`,
      display: 'grid', gridTemplateColumns: `repeat(${cols}, ${cell}px)`,
      gridTemplateRows: `repeat(${rows}, ${cell}px)`,
      gap: 2, boxShadow: '0 2px 0 #0a0608',
    }}>
      {Array.from({ length: rows * cols }).map((_, i) => {
        const x = i % cols, y = Math.floor(i / cols);
        const isCur = x === current[0] && y === current[1];
        const isBoss = x === boss[0] && y === boss[1];
        const isShop = x === shop[0] && y === shop[1];
        const isSecret = x === secret[0] && y === secret[1];
        const isVisited = allVisited.some(([vx, vy]) => vx === x && vy === y);
        let bg = 'rgba(255,255,255,0.05)';
        if (isVisited) bg = '#5a4030';
        if (isShop && isVisited) bg = '#3a78c8';
        if (isBoss && isVisited) bg = '#c83020';
        if (isSecret) bg = 'rgba(154,74,190,0.4)';
        if (isCur) bg = '#fdc04a';
        return <div key={i} style={{ background: bg, border: isCur ? '2px solid #fff' : '1px solid #0a0608' }} />;
      })}
    </div>
  );
};

// HUD B — Coins (default)
const HUD_Coins = ({ roomName = "Cuisine d'enfant", roomNum = '03/12', hearts = { full: 4, half: 1, empty: 2 }, accent = UI.hudBorder }) => (
  <>
    {/* TL — hearts + active item */}
    <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 12, alignItems: 'flex-start' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        <HeartsBar {...hearts} />
        <div style={{ fontFamily: FONTS.pixel, fontSize: 14, color: '#fff', textShadow: '2px 2px 0 #0a0608' }}>{hearts.full + hearts.half * 0.5}/{hearts.full + hearts.half + hearts.empty} PV</div>
      </div>
      <ItemSlot size={56} label="RAGE" cooldown={45} prompt="L1" />
    </div>

    {/* TC — room name */}
    <div style={{ position: 'absolute', top: 14, left: '50%', transform: 'translateX(-50%)', textAlign: 'center' }}>
      <div style={{ fontFamily: FONTS.display, fontSize: 26, color: '#fff', textShadow: '0 0 20px rgba(0,0,0,0.9), 3px 3px 0 #0a0608', letterSpacing: 2, fontWeight: 700 }}>
        ~ {roomName} ~
      </div>
    </div>

    {/* TR — minimap */}
    <div style={{ position: 'absolute', top: 14, right: 14, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
      <MiniMap />
      <div style={{ fontFamily: FONTS.pixel, fontSize: 14, color: accent, textShadow: '2px 2px 0 #0a0608' }}>{roomNum} · M ▭</div>
    </div>

    {/* BL — resources */}
    <div style={{ position: 'absolute', bottom: 14, left: 14, display: 'flex', gap: 8 }}>
      <ResourcePill kind="coin" value={14} />
      <ResourcePill kind="key" value={2} />
      <ResourcePill kind="bomb" value={3} />
    </div>

    {/* BR — passive items strip */}
    <div style={{ position: 'absolute', bottom: 14, right: 14, display: 'flex', gap: 4 }}>
      {['❖', '✦', '⚡', '×2', '☘'].map((t, i) => (
        <div key={i} style={{
          width: 36, height: 36, background: UI.hudBg2,
          border: `2px solid ${UI.hudBorder}`, borderRadius: 3,
          display: 'grid', placeItems: 'center', color: '#fdc04a',
          fontFamily: FONTS.pixel, fontSize: 16, boxShadow: '0 2px 0 #0a0608',
        }}>{t}</div>
      ))}
    </div>
  </>
);

// HUD B' — Coins minimal (smaller, cleaner)
const HUD_Coins_Min = ({ roomName = 'Cuisine', hearts = { full: 4, half: 1, empty: 2 } }) => (
  <>
    <div style={{ position: 'absolute', top: 12, left: 12 }}>
      <HeartsBar {...hearts} />
    </div>
    <div style={{ position: 'absolute', top: 12, left: '50%', transform: 'translateX(-50%)', fontFamily: FONTS.display, fontSize: 22, color: '#fff', textShadow: '3px 3px 0 #0a0608, 0 0 16px rgba(0,0,0,0.8)' }}>{roomName}</div>
    <div style={{ position: 'absolute', top: 12, right: 12 }}><MiniMap /></div>
    <div style={{ position: 'absolute', bottom: 12, left: 12, display: 'flex', gap: 6 }}>
      <ResourcePill kind="coin" value={14} />
      <ResourcePill kind="key" value={2} />
      <ResourcePill kind="bomb" value={3} />
    </div>
  </>
);

// HUD B'' — Coins immersif (diegetic frames)
const HUD_Coins_Diegetic = ({ roomName = 'Cuisine' }) => (
  <>
    <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(180deg, rgba(10,6,8,0.9), transparent)' }} />
    <div style={{ position: 'absolute', top: 14, left: 14, display: 'flex', gap: 10, alignItems: 'center', padding: '6px 14px', background: 'rgba(10,6,8,0.85)', borderRadius: 999, border: '1.5px solid #fdc04a' }}>
      <HeartsBar full={4} half={1} empty={2} />
      <div style={{ width: 1, height: 22, background: '#fdc04a' }} />
      <ItemSlot size={42} label="RAGE" cooldown={30} prompt="L1" />
    </div>
    <div style={{ position: 'absolute', top: 18, left: '50%', transform: 'translateX(-50%)', fontFamily: FONTS.display, fontSize: 24, color: '#f4ecd8', letterSpacing: 3, textShadow: '0 2px 0 #0a0608' }}>{roomName.toUpperCase()}</div>
    <div style={{ position: 'absolute', top: 14, right: 14 }}><MiniMap /></div>
    <div style={{ position: 'absolute', bottom: 14, left: 14, display: 'flex', gap: 14, fontFamily: FONTS.pixel, fontSize: 18, color: '#fdc04a', textShadow: '2px 2px 0 #0a0608' }}>
      <span>¢ 14</span><span>⚷ 2</span><span>● 3</span>
    </div>
    <div style={{ position: 'absolute', bottom: 14, right: 14, display: 'flex', gap: 6 }}>
      {['❖', '✦', '⚡', '×2', '☘'].map((t, i) => (
        <div key={i} style={{ width: 30, height: 30, background: 'rgba(10,6,8,0.85)', border: '1.5px solid #fdc04a', borderRadius: '50%', display: 'grid', placeItems: 'center', color: '#fdc04a', fontFamily: FONTS.pixel, fontSize: 14 }}>{t}</div>
      ))}
    </div>
  </>
);

window.Heart = Heart;
window.HeartsBar = HeartsBar;
window.ItemSlot = ItemSlot;
window.MiniMap = MiniMap;
window.ResourcePill = ResourcePill;
window.PSBtn = PSBtn;
window.HUD_Coins = HUD_Coins;
window.HUD_Coins_Min = HUD_Coins_Min;
window.HUD_Coins_Diegetic = HUD_Coins_Diegetic;
