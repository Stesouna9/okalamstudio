// Screens — titre, pause, inventaire, game over, victoire, transition, mood board, style guide
// Tous avec prompts manette PS5

const TitleScreen = ({ palette }) => (
  <div style={{
    width: '100%', height: '100%', position: 'relative', overflow: 'hidden',
    background: `radial-gradient(ellipse at 50% 40%, ${palette.floor}, ${palette.sky} 70%)`,
    display: 'grid', placeItems: 'center',
  }}>
    {/* ambient particles */}
    {Array.from({ length: 40 }).map((_, i) => (
      <div key={i} style={{
        position: 'absolute', width: 2, height: 2, background: '#fdc04a',
        opacity: 0.4 + Math.random() * 0.5,
        left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
        boxShadow: '0 0 4px #fdc04a',
      }} />
    ))}
    <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
      <div style={{ fontFamily: FONTS.display, fontSize: 110, color: '#f4ecd8', letterSpacing: 12, fontWeight: 900, textShadow: '0 0 40px #c83020, 6px 6px 0 #0a0608, -2px -2px 0 #c83020', lineHeight: 1 }}>ALF</div>
      <div style={{ fontFamily: FONTS.body, fontSize: 22, fontStyle: 'italic', color: '#fdc04a', marginTop: 6, letterSpacing: 4, textShadow: '2px 2px 0 #0a0608' }}>~ les neuf maisons d'un chat ~</div>

      <div style={{ margin: '32px auto', display: 'inline-block' }}>
        <AlfSprite dir="S" frame="idle" scale={6} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: FONTS.display, fontSize: 22, alignItems: 'center', marginTop: 16 }}>
        <div style={{ color: '#fdc04a', textShadow: '3px 3px 0 #0a0608', letterSpacing: 3 }}>▸ NOUVELLE PARTIE</div>
        <div style={{ color: '#a89878', letterSpacing: 2 }}>continuer la run</div>
        <div style={{ color: '#a89878', letterSpacing: 2 }}>options</div>
        <div style={{ color: '#a89878', letterSpacing: 2 }}>quitter</div>
      </div>
    </div>
    <div style={{ position: 'absolute', bottom: 18, left: 0, right: 0, display: 'flex', justifyContent: 'center', gap: 24, fontFamily: FONTS.pixel, fontSize: 16, color: '#a89878' }}>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><PSBtn kind="cross" /> valider</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}><PSBtn kind="circle" /> retour</span>
      <span>· clavier: ESPACE / ÉCHAP</span>
    </div>
  </div>
);

const PauseScreen = ({ children }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    {children}
    <div style={{ position: 'absolute', inset: 0, background: 'rgba(10,6,8,0.75)', backdropFilter: 'blur(4px)', display: 'grid', placeItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontFamily: FONTS.display, fontSize: 56, color: '#fdc04a', letterSpacing: 10, textShadow: '4px 4px 0 #0a0608' }}>PAUSE</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: FONTS.display, fontSize: 22, marginTop: 24, color: '#f4ecd8' }}>
          <div style={{ color: '#fdc04a' }}>▸ reprendre</div>
          <div>inventaire</div>
          <div>carte de la maison</div>
          <div>options</div>
          <div style={{ color: '#c83020' }}>abandonner la run</div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 28, fontFamily: FONTS.pixel, fontSize: 14, color: '#a89878' }}>
          <span><PSBtn kind="cross" /> sélection</span>
          <span><PSBtn kind="circle" /> reprendre</span>
        </div>
      </div>
    </div>
  </div>
);

const InventoryScreen = () => (
  <div style={{ width: '100%', height: '100%', background: 'linear-gradient(180deg, #1a1008, #2a1a14)', padding: 28, fontFamily: FONTS.body, color: '#f4ecd8', position: 'relative' }}>
    <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 20 }}>
      <div style={{ fontFamily: FONTS.display, fontSize: 36, color: '#fdc04a', letterSpacing: 6, textShadow: '3px 3px 0 #0a0608' }}>INVENTAIRE</div>
      <div style={{ fontFamily: FONTS.pixel, fontSize: 16, color: '#a89878' }}>maison · européenne · pièce 03/12</div>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 24 }}>
      {/* col 1 — Alf + stats */}
      <div>
        <div style={{ fontFamily: FONTS.pixel, fontSize: 14, color: '#fdc04a', letterSpacing: 2, marginBottom: 8 }}>★ ALF</div>
        <div style={{ background: '#0a0608', border: '2px solid #fdc04a', padding: 18, display: 'grid', placeItems: 'center' }}>
          <AlfSprite dir="S" frame="idle" scale={7} />
        </div>
        <div style={{ marginTop: 16, fontFamily: FONTS.body, fontSize: 16, lineHeight: 1.7 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>PV</span><span>4.5 / 6</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>vitesse</span><span style={{ color: '#7ae8a8' }}>×1.2</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>dégâts</span><span style={{ color: '#7ae8a8' }}>3.5</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>cadence</span><span>0.4s</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>portée</span><span>4.0</span></div>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>chance</span><span>12%</span></div>
        </div>
      </div>

      {/* col 2 — passive items grid */}
      <div>
        <div style={{ fontFamily: FONTS.pixel, fontSize: 14, color: '#fdc04a', letterSpacing: 2, marginBottom: 8 }}>★ ITEMS PASSIFS · 7</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6 }}>
          {['❖', '✦', '⚡', '×2', '☘', '◈', '✤', '', '', '', '', '', '', '', ''].map((t, i) => (
            <div key={i} style={{
              aspectRatio: '1/1', background: t ? '#3a2818' : 'transparent',
              border: t ? '2px solid #fdc04a' : '2px dashed #5a4030',
              display: 'grid', placeItems: 'center', color: '#fdc04a',
              fontFamily: FONTS.pixel, fontSize: 22,
            }}>{t}</div>
          ))}
        </div>
        <div style={{ marginTop: 14, padding: 12, background: '#0a0608', border: '2px solid #fdc04a', fontSize: 14, lineHeight: 1.6 }}>
          <div style={{ fontFamily: FONTS.display, fontSize: 18, color: '#fdc04a' }}>Griffes affûtées</div>
          <div style={{ color: '#a89878', fontStyle: 'italic' }}>+1 dégâts à chaque attaque rapprochée.</div>
        </div>
      </div>

      {/* col 3 — active item + minou hint */}
      <div>
        <div style={{ fontFamily: FONTS.pixel, fontSize: 14, color: '#fdc04a', letterSpacing: 2, marginBottom: 8 }}>★ ACTIF</div>
        <div style={{ background: '#0a0608', border: '2px solid #fdc04a', padding: 16, display: 'flex', gap: 16, alignItems: 'flex-start' }}>
          <ItemSlot size={72} label="RAGE" cooldown={0} />
          <div>
            <div style={{ fontFamily: FONTS.display, fontSize: 22, color: '#fdc04a' }}>Rage féline</div>
            <div style={{ color: '#a89878', fontSize: 14, marginTop: 4, lineHeight: 1.5 }}>
              +200% dégâts pendant 3s. Cooldown 12s.<br />
              Active avec <PSBtn kind="square" size={18} /> ou <kbd style={{ fontFamily: FONTS.pixel, padding: '0 4px', background: '#3a2818', border: '1px solid #fdc04a' }}>CTRL</kbd>.
            </div>
          </div>
        </div>

        <div style={{ marginTop: 20, fontFamily: FONTS.pixel, fontSize: 14, color: '#fdc04a', letterSpacing: 2, marginBottom: 8 }}>★ ITEMS COLLECTÉS</div>
        <div style={{ fontSize: 14, lineHeight: 1.6, color: '#d8c8a8' }}>
          <div>· run · 04:32 · 2 maisons</div>
          <div>· pièces visitées · 28 / 60</div>
          <div>· coffres ouverts · 4</div>
          <div>· secrets trouvés · 1</div>
        </div>
      </div>
    </div>
    <div style={{ position: 'absolute', bottom: 18, right: 28, display: 'flex', gap: 18, fontFamily: FONTS.pixel, fontSize: 14, color: '#a89878' }}>
      <span><PSBtn kind="circle" /> fermer</span>
      <span>· TAB / ÉCHAP</span>
    </div>
  </div>
);

const FullMapScreen = ({ palette }) => (
  <div style={{ width: '100%', height: '100%', background: 'rgba(10,6,8,0.92)', backdropFilter: 'blur(2px)', padding: 36, color: '#f4ecd8', fontFamily: FONTS.body, position: 'relative' }}>
    <div style={{ fontFamily: FONTS.display, fontSize: 32, color: '#fdc04a', letterSpacing: 4, textShadow: '3px 3px 0 #0a0608' }}>{palette.name}</div>
    <div style={{ fontFamily: FONTS.pixel, fontSize: 14, color: '#a89878', marginBottom: 20 }}>étage 1 · 8 / 12 pièces · 1 / 1 secret</div>
    <div style={{ display: 'flex', gap: 36, alignItems: 'flex-start' }}>
      <div style={{ transform: 'scale(3)', transformOrigin: 'top left' }}>
        <MiniMap />
      </div>
      <div style={{ marginLeft: 320, fontFamily: FONTS.body, fontSize: 16, lineHeight: 1.8 }}>
        <div style={{ fontFamily: FONTS.pixel, fontSize: 14, color: '#fdc04a', letterSpacing: 2, marginBottom: 10 }}>LÉGENDE</div>
        <Legend swatch="#fdc04a" label="pièce courante" />
        <Legend swatch="#5a4030" label="pièce visitée" />
        <Legend swatch="rgba(255,255,255,0.05)" border="#0a0608" label="non visitée" />
        <Legend swatch="#c83020" label="grenier (boss)" />
        <Legend swatch="#3a78c8" label="marchand (Minou)" />
        <Legend swatch="rgba(154,74,190,0.4)" label="salle secrète" />
      </div>
    </div>
    <div style={{ position: 'absolute', bottom: 18, left: 36, right: 36, display: 'flex', justifyContent: 'space-between', fontFamily: FONTS.pixel, fontSize: 14, color: '#a89878' }}>
      <span><PSBtn kind="triangle" /> fermer · M</span>
      <span>{`run 04:32 · ennemis vaincus 47`}</span>
    </div>
  </div>
);

const Legend = ({ swatch, border = '#0a0608', label }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
    <span style={{ width: 16, height: 16, background: swatch, border: `1.5px solid ${border}` }} />
    <span>{label}</span>
  </div>
);

const TransitionScreen = ({ from = 'Maison hantée', to = 'Maison japonaise', n = 3 }) => (
  <div style={{ width: '100%', height: '100%', background: '#0a0608', display: 'grid', placeItems: 'center', color: '#f4ecd8', position: 'relative', overflow: 'hidden' }}>
    {Array.from({ length: 30 }).map((_, i) => (
      <div key={i} style={{ position: 'absolute', width: 1, height: 1, background: '#fdc04a', left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: Math.random(), boxShadow: '0 0 3px #fdc04a' }} />
    ))}
    <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
      <div style={{ fontFamily: FONTS.pixel, fontSize: 16, color: '#a89878', letterSpacing: 6 }}>NIVEAU {n} TERMINÉ</div>
      <div style={{ fontFamily: FONTS.display, fontSize: 38, color: '#5a4030', textDecoration: 'line-through', marginTop: 16, letterSpacing: 4 }}>{from}</div>
      <div style={{ fontFamily: FONTS.pixel, fontSize: 24, color: '#fdc04a', margin: '20px 0' }}>↓</div>
      <div style={{ fontFamily: FONTS.display, fontSize: 64, color: '#fdc04a', letterSpacing: 6, textShadow: '0 0 30px #c83020, 4px 4px 0 #0a0608', fontWeight: 700 }}>{to}</div>
      <div style={{ marginTop: 30, display: 'inline-block' }}>
        <AlfSprite dir="N" frame="walk1" scale={5} />
      </div>
      <div style={{ fontFamily: FONTS.pixel, fontSize: 16, color: '#a89878', marginTop: 20, letterSpacing: 2 }}><PSBtn kind="cross" /> entrer</div>
    </div>
    <div style={{ position: 'absolute', bottom: 14, left: 14, right: 14, display: 'flex', justifyContent: 'space-between', fontFamily: FONTS.pixel, fontSize: 13, color: '#5a4030' }}>
      <span>temps · 04:32</span><span>pièces · 28</span><span>boss vaincus · 2</span>
    </div>
  </div>
);

const GameOverScreen = () => (
  <div style={{ width: '100%', height: '100%', background: 'radial-gradient(ellipse at 50% 50%, #1a0608, #0a0608)', display: 'grid', placeItems: 'center', color: '#f4ecd8', position: 'relative' }}>
    <div style={{ textAlign: 'center' }}>
      <div style={{ display: 'inline-block', transform: 'rotate(180deg)' }}>
        <AlfSprite dir="S" frame="idle" scale={6} />
      </div>
      <div style={{ fontFamily: FONTS.display, fontSize: 80, color: '#c83020', letterSpacing: 10, textShadow: '0 0 30px #5a0a0a, 5px 5px 0 #0a0608', marginTop: 20, fontWeight: 900 }}>R.I.P. ALF</div>
      <div style={{ fontFamily: FONTS.body, fontSize: 20, fontStyle: 'italic', color: '#a89878', marginTop: 8 }}>il restait 8 vies</div>
      <div style={{ marginTop: 24, fontFamily: FONTS.pixel, fontSize: 14, color: '#5a4030', lineHeight: 2 }}>
        maison atteinte · russe (lvl 4)<br />
        pièces visitées · 41 / 60<br />
        items collectés · 9 · pièces · 87
      </div>
      <div style={{ display: 'flex', gap: 24, justifyContent: 'center', marginTop: 28, fontFamily: FONTS.display, fontSize: 22 }}>
        <span style={{ color: '#fdc04a' }}>▸ recommencer</span>
        <span style={{ color: '#5a4030' }}>menu principal</span>
      </div>
    </div>
    <div style={{ position: 'absolute', bottom: 18, left: 0, right: 0, textAlign: 'center', fontFamily: FONTS.pixel, fontSize: 14, color: '#5a4030' }}>
      <PSBtn kind="cross" /> recommencer · <PSBtn kind="triangle" /> menu
    </div>
  </div>
);

const VictoryScreen = () => (
  <div style={{ width: '100%', height: '100%', background: 'radial-gradient(ellipse at 50% 50%, #4a3818, #1a0e08)', display: 'grid', placeItems: 'center', color: '#f4ecd8', position: 'relative', overflow: 'hidden' }}>
    {/* gold particles */}
    {Array.from({ length: 50 }).map((_, i) => (
      <div key={i} style={{ position: 'absolute', width: 2, height: 2, background: '#fdc04a', left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, opacity: Math.random(), boxShadow: '0 0 6px #fdc04a' }} />
    ))}
    <div style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
      <div style={{ fontFamily: FONTS.display, fontSize: 96, color: '#fdc04a', letterSpacing: 12, textShadow: '0 0 40px #fdc04a, 5px 5px 0 #0a0608', fontWeight: 900 }}>VICTOIRE</div>
      <div style={{ fontFamily: FONTS.body, fontStyle: 'italic', fontSize: 22, color: '#f4ecd8', marginTop: 8 }}>Alf a vaincu le maître de la forteresse.</div>
      <div style={{ margin: '24px auto', display: 'inline-block' }}>
        <AlfSprite dir="S" frame="idle" scale={6} />
      </div>
      <div style={{ fontFamily: FONTS.pixel, fontSize: 22, color: '#fdc04a', letterSpacing: 4, marginTop: 4 }}>★ ★ ★</div>
      <div style={{ fontFamily: FONTS.pixel, fontSize: 14, color: '#a89878', marginTop: 18, lineHeight: 1.8 }}>
        run terminée · <span style={{ color: '#fdc04a' }}>28:14</span><br />
        sans dégâts au boss final · 0 mort
      </div>
    </div>
    <div style={{ position: 'absolute', bottom: 18, left: 0, right: 0, textAlign: 'center', fontFamily: FONTS.pixel, fontSize: 14, color: '#a89878' }}>
      <PSBtn kind="cross" /> continuer · new game+ débloqué
    </div>
  </div>
);

window.TitleScreen = TitleScreen;
window.PauseScreen = PauseScreen;
window.InventoryScreen = InventoryScreen;
window.FullMapScreen = FullMapScreen;
window.TransitionScreen = TransitionScreen;
window.GameOverScreen = GameOverScreen;
window.VictoryScreen = VictoryScreen;
