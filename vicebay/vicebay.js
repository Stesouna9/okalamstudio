/* ── Vice Bay — langue, heure de la ville, radio (v1) ── */
(function(){
  const T={
    fr:{
      nav_home:'Accueil',nav_radio:'La radio',nav_city:'Quartiers',nav_game:'Le jeu',
      clock_label:'Vice Bay',
      wx:['Ciel clair, 27 °C','Brise de mer, 25 °C','Orage au large, 24 °C','Nuit tiède, 23 °C','Brume sur le marais, 21 °C'],
      home_kicker:'Office du tourisme · 1986',
      home_title:'Vice Bay',
      home_sub:'Cinq quartiers, cinq radios, un seul coucher de soleil. Bienvenue dans la ville qui ne s\'éteint jamais.',
      cta_radio:'📻 Allumer la radio',cta_city:'Visiter les quartiers',
      radio_label:'Vice Bay Radio',
      radio_title:'Cinq stations FM, <em>toute la nuit</em>',
      radio_p:'Des cuivres du matin sur TROPICANA au jazz de minuit de Big Lou sur VOLT : la ville tient sur une bande FM. Touche une station, elle joue tout de suite.',
      radio_all:'Toutes les stations →',
      city_label:'La ville',
      city_title:'Cinq quartiers, <em>cinq lumières</em>',
      city_p:'Du néon d\'Ocean Drive à la brume des Everglades, chaque quartier a son ciel, sa couleur et sa radio préférée.',
      post_label:'Carte postale',
      post_title:'Vice Bay, <em>en trois chiffres</em>',
      post1_t:'Stations FM',post1_p:'Entre 88.5 et 107.3. Aucune ne dort.',
      post2_t:'Couchers de soleil',post2_p:'Par jour, officiellement. Officieusement, il dure toute la nuit.',
      post3_t:'Année',post3_p:'Et elle ne compte pas changer.',
      game_kicker:'Visitez Vice Bay dans',
      game_p:'Le casse-briques néon de 1986 : 500 silhouettes de la ville à casser, cinq quartiers, et la radio toujours allumée. iPhone et Android, le 19 novembre 2026.',
      game_cta:'Découvrir VICE BREAK',discord:'💬 Rejoindre le Discord',
      foot:'Vice Bay est une ville fictive, créée par OKALAM Studio.',
      credits:'Vice Bay Radio · Musique : Kevin MacLeod (incompetech.com), CC BY 4.0 ; titres additionnels sous CC BY 3.0 via ccMixter et OpenGameArt. Voix : originales, écrites pour Vice Bay.',
      radio_kicker:'Le guide radio',
      radio_page_title:'Vice Bay Radio',
      radio_page_sub:'Le guide officiel des cinq fréquences de la ville. Écoute libre, sans inscription, sans téléchargement.',
      playlist:'À l\'antenne',jingle:'🎙 Jingle Vice Bay',soon_empty:'NEON prépare sa nouvelle programmation. Retour à l\'antenne très bientôt.',
      listen:'▶ Écouter',
      city_kicker:'Le plan de la ville',
      city_page_title:'Les quartiers',
      city_page_sub:'Cinq quartiers, une seule baie. Chacun a sa lumière, sa météo, et une station qui lui va comme un gant.',
      tune:'📻 Écouter',
      q_ocean_tag:'Plage · crépuscule',q_ocean_p:'Le front de mer. Parasols, flamants roses et voiliers au large ; les cafés restent ouverts jusqu\'à ce que le soleil revienne.',
      q_down_tag:'Art déco · or',q_down_p:'Le cœur de la ville : façades dorées, phare au bout de la jetée, et les enseignes qui s\'allument une à une à la tombée du jour.',
      q_ever_tag:'Marais · brume',q_ever_p:'Au bout des pontons, les motels du marais et leurs néons fatigués. On y vient pour la brume et les slows de minuit.',
      q_night_tag:'Autoroute · sodium',q_night_p:'La côtière, éclairée à l\'orange sodium. Capote baissée, arpèges à fond : c\'est ici que SUNSET DRIVE a été inventée.',
      q_sky_tag:'Ville · magenta',q_sky_p:'Les tours, les toits, les lunettes de soleil à minuit. La ligne d\'horizon que tout le monde met sur ses cartes postales.',
      d_off:'RADIO COUPÉE',d_on:'À L\'ANTENNE',d_pause:'EN PAUSE',d_soon:'BIENTÔT',d_pick:'Choisis une station',d_skip:'Titre suivant'
    },
    en:{
      nav_home:'Home',nav_radio:'The radio',nav_city:'Districts',nav_game:'The game',
      clock_label:'Vice Bay',
      wx:['Clear skies, 81 °F','Sea breeze, 77 °F','Storm offshore, 75 °F','Warm night, 73 °F','Mist over the marsh, 70 °F'],
      home_kicker:'Visitor bureau · 1986',
      home_title:'Vice Bay',
      home_sub:'Five districts, five radio stations, one single sunset. Welcome to the city that never switches off.',
      cta_radio:'📻 Turn on the radio',cta_city:'Tour the districts',
      radio_label:'Vice Bay Radio',
      radio_title:'Five FM stations, <em>all night long</em>',
      radio_p:'From TROPICANA\'s morning brass to Big Lou\'s midnight jazz on VOLT, the whole city fits on one FM dial. Tap a station, it plays right away.',
      radio_all:'All stations →',
      city_label:'The city',
      city_title:'Five districts, <em>five lights</em>',
      city_p:'From the neon of Ocean Drive to the mist of the Everglades, every district has its own sky, its own colour and its favourite station.',
      post_label:'Postcard',
      post_title:'Vice Bay, <em>in three numbers</em>',
      post1_t:'FM stations',post1_p:'Between 88.5 and 107.3. None of them sleeps.',
      post2_t:'Sunsets',post2_p:'Per day, officially. Unofficially, it lasts all night.',
      post3_t:'Year',post3_p:'And it has no plans to change.',
      game_kicker:'Visit Vice Bay in',
      game_p:'The 1986 neon brick breaker: 500 city silhouettes to smash, five districts, and the radio always on. iPhone and Android, November 19, 2026.',
      game_cta:'Discover VICE BREAK',discord:'💬 Join the Discord',
      foot:'Vice Bay is a fictional city, created by OKALAM Studio.',
      credits:'Vice Bay Radio · Music: Kevin MacLeod (incompetech.com), CC BY 4.0; additional tracks under CC BY 3.0 via ccMixter and OpenGameArt. Voices: original, written for Vice Bay.',
      radio_kicker:'The radio guide',
      radio_page_title:'Vice Bay Radio',
      radio_page_sub:'The official guide to the city\'s five frequencies. Free listening, no sign-up, no download.',
      playlist:'On air',jingle:'🎙 Vice Bay jingle',soon_empty:'NEON is preparing its new programming. Back on air very soon.',
      listen:'▶ Listen',
      city_kicker:'The city map',
      city_page_title:'The districts',
      city_page_sub:'Five districts, one bay. Each has its own light, its own weather, and a station that fits it like a glove.',
      tune:'📻 Listen',
      q_ocean_tag:'Beach · dusk',q_ocean_p:'The seafront. Parasols, flamingos and sailboats offshore; the cafés stay open until the sun comes back.',
      q_down_tag:'Art deco · gold',q_down_p:'The heart of the city: golden façades, a lighthouse at the end of the pier, and signs lighting up one by one at nightfall.',
      q_ever_tag:'Marsh · haze',q_ever_p:'At the end of the boardwalks, the marsh motels and their tired neon. People come for the mist and the midnight slow dances.',
      q_night_tag:'Highway · sodium',q_night_p:'The coastal road, lit in sodium orange. Top down, arpeggios up: this is where SUNSET DRIVE was invented.',
      q_sky_tag:'City · magenta',q_sky_p:'Towers, rooftops, sunglasses at midnight. The skyline everyone puts on their postcards.',
      d_off:'RADIO OFF',d_on:'ON AIR',d_pause:'PAUSED',d_soon:'SOON',d_pick:'Pick a station',d_skip:'Next track'
    }
  };
  let lang='fr';
  try{ lang=localStorage.getItem('vb-lang')||((navigator.language||'fr').slice(0,2)==='fr'?'fr':'en'); }catch(e){}
  if(!T[lang]) lang='fr';
  const t=k=>T[lang][k]??T.fr[k]??k;
  const L=o=>o&&typeof o==='object'?(o[lang]||o.fr):o;

  function applyLang(){
    document.documentElement.lang=lang;
    document.querySelectorAll('[data-t]').forEach(el=>{ el.innerHTML=t(el.dataset.t); });
    document.querySelectorAll('.vb-lang button').forEach(b=>b.classList.toggle('on',b.dataset.lang===lang));
    render(); clock(); ui();
  }
  document.querySelectorAll('.vb-lang button').forEach(b=>b.addEventListener('click',()=>{ lang=b.dataset.lang; try{localStorage.setItem('vb-lang',lang);}catch(e){} applyLang(); }));

  /* Heure de Vice Bay : l'heure du visiteur, en 1986. Météo fictive selon l'heure. */
  function clock(){
    const el=document.querySelector('.vb-status .clock'), wx=document.querySelector('.vb-status .wx'); if(!el) return;
    const d=new Date(); d.setFullYear(1986);
    const day=d.toLocaleDateString(lang==='fr'?'fr-FR':'en-US',{weekday:'short',day:'numeric',month:'short',year:'numeric'});
    const hm=String(d.getHours()).padStart(2,'0')+':'+String(d.getMinutes()).padStart(2,'0');
    el.innerHTML=day.toUpperCase()+' · <b>'+hm+'</b>';
    if(wx) wx.textContent=t('wx')[Math.floor(d.getHours()/5)%5];
  }
  setInterval(clock,20000);

  /* ── Données ── */
  let S=[], PL={};
  const base=document.body.dataset.base||'../';

  function card(s){
    return '<button class="vb-st'+(s.soon?' soon':'')+'" type="button" data-station="'+s.id+'" style="--c:'+s.color+'">'+
      '<img src="'+s.logo+'" alt="'+s.name+' '+s.freq+' FM" loading="lazy"/>'+
      '<div class="vb-st-b"><span class="vb-freq">'+s.freq.toFixed(1)+'</span><b>'+s.name+'</b><small>'+L(s.genre)+'</small><em>'+L(s.slogan)+'</em></div>'+
      '<span class="vb-play">'+(s.soon?t('d_soon'):'▶')+'</span></button>';
  }
  function fmt(x){ x=Math.max(0,Math.floor(x||0)); return Math.floor(x/60)+':'+String(x%60).padStart(2,'0'); }
  function sheet(s){
    const pl=PL[s.id]||[];
    const list=pl.length?'<ul class="vb-list">'+pl.map((it,i)=>it.type==='link'
        ?'<li class="jingle" data-i="'+i+'"><button type="button" data-play="'+s.id+'" data-i="'+i+'" aria-label="'+t('listen')+'">▶</button><span class="t">'+t('jingle')+'</span></li>'
        :'<li data-i="'+i+'"><button type="button" data-play="'+s.id+'" data-i="'+i+'" aria-label="'+t('listen')+'">▶</button><span class="t">'+it.title+'<small>'+it.artist+'</small></span><em>'+(it.seconds?fmt(it.seconds):'')+'</em></li>').join('')+'</ul>'
      :'<div class="vb-empty">'+t('soon_empty')+'</div>';
    return '<article class="vb-station" id="'+s.id+'" style="--c:'+s.color+'">'+
      '<img class="vb-station-logo" src="'+s.logo+'" alt="'+s.name+' '+s.freq+' FM" loading="lazy"/>'+
      '<div><h2>'+s.name+' <span>'+s.freq.toFixed(1)+' FM</span></h2><div class="genre">'+L(s.genre)+'</div>'+
      '<p class="slogan">'+L(s.slogan)+'</p><p class="hours">'+L(s.hours)+'</p>'+
      (pl.length?'<div class="vb-label" style="margin-top:28px;color:var(--c)">'+t('playlist')+'</div>':'')+list+'</div></article>';
  }
  function render(){
    if(!S.length) return;
    document.querySelectorAll('[data-stations]').forEach(w=>{ w.innerHTML=S.map(card).join(''); });
    document.querySelectorAll('[data-sheets]').forEach(w=>{ w.innerHTML=S.map(sheet).join(''); });
    const chips=document.querySelector('.vbd-chips');
    if(chips) chips.innerHTML=S.map(s=>'<button type="button" data-station="'+s.id+'" style="--c:'+s.color+'"><i></i>'+s.freq.toFixed(1)+'</button>').join('');
  }

  /* ── Lecteur (dock bas de page) ── */
  const dock=document.querySelector('.vbd');
  const audio=new Audio(); audio.preload='none';
  let cur=null, idx=0, offsets={}, fade=null, muted=false, volume=40;
  try{ const v=localStorage.getItem('vb-vol'); if(v!==null) volume=+v; }catch(e){}
  const st=()=>S.find(s=>s.id===cur);
  const $d=sel=>dock&&dock.querySelector(sel);

  function applyVol(){ audio.volume=muted?0:volume/100; const r=$d('.vbd-vol input'), m=$d('.vbd-vol button'); if(r) r.value=volume; if(m) m.textContent=muted||!volume?'🔇':volume<50?'🔉':'🔊'; }
  function ui(){
    if(!dock) return;
    const s=st(), on=!!s&&!audio.paused, pl=s?PL[s.id]||[]:[];
    dock.classList.toggle('on',on); dock.style.setProperty('--acc',s?s.color:'#F5E3C3');
    $d('.vbd-tog').textContent=on?'❚❚':'▶';
    $d('.vbd-now b').textContent=s?'📻 '+s.name+' · '+s.freq.toFixed(1)+' FM':'📻 VICE BAY RADIO';
    const it=pl[idx];
    $d('.vbd-now span').textContent=!s?t('d_pick'):!pl.length?t('soon_empty'):it.type==='link'?t('jingle'):it.title+' · '+it.artist;
    $d('.vbd-onair').textContent=!s?t('d_off'):!pl.length?t('d_soon'):on?t('d_on'):t('d_pause');
    dock.querySelectorAll('.vbd-chips button').forEach(b=>b.classList.toggle('on',b.dataset.station===cur));
    document.querySelectorAll('.vb-st').forEach(b=>b.classList.toggle('playing',on&&b.dataset.station===cur));
    document.querySelectorAll('.vb-list li').forEach(li=>li.classList.toggle('now',!!s&&li.closest('.vb-station').id===cur&&+li.dataset.i===idx));
    document.querySelectorAll('.vb-list li button').forEach(b=>b.textContent=(on&&b.dataset.play===cur&&+b.dataset.i===idx)?'❚❚':'▶');
  }
  function playSoft(){
    clearInterval(fade); const target=muted?0:volume/100; audio.volume=0; audio.play().catch(()=>{});
    let k=0; fade=setInterval(()=>{ k++; audio.volume=Math.min(target,target*k/12); if(k>=12) clearInterval(fade); },100);
  }
  function load(id,i){
    cur=id; const pl=PL[id]||[];
    if(!pl.length){ idx=0; audio.pause(); audio.removeAttribute('src'); return; }
    idx=((i%pl.length)+pl.length)%pl.length; audio.src=base+pl[idx].src;
    try{ localStorage.setItem('vb-station',id); }catch(e){}
  }
  function tune(id,i){
    const pl=PL[id]||[];
    if(cur===id&&i===undefined){ if(!pl.length){ ui(); return; } if(audio.paused) playSoft(); else audio.pause(); ui(); return; }
    if(cur===id&&i===idx){ if(audio.paused) playSoft(); else audio.pause(); ui(); return; }
    if(cur&&cur!==id) offsets[cur]={i:idx,t:audio.currentTime};
    if(dock){ dock.classList.remove('static'); void dock.offsetWidth; dock.classList.add('static'); }
    const o=i===undefined?offsets[id]:null;
    load(id,i!==undefined?i:o?o.i:Math.floor(Math.random()*Math.max(1,pl.length)));
    if(o&&pl.length) audio.currentTime=o.t;
    if(pl.length) playSoft();
    ui();
  }
  if(dock){
    dock.addEventListener('click',e=>{
      const b=e.target.closest('button'); if(!b) return;
      if(b.classList.contains('vbd-tog')){
        if(!cur){ let last=null; try{ last=localStorage.getItem('vb-station'); }catch(err){} tune(S.some(s=>s.id===last&&(PL[last]||[]).length)?last:'tropicana'); }
        else if(audio.paused) playSoft(); else audio.pause();
      } else if(b.classList.contains('vbd-skip')){ if(cur&&(PL[cur]||[]).length){ load(cur,idx+1); playSoft(); } }
      else if(b.parentElement.classList.contains('vbd-vol')){ muted=!muted; applyVol(); }
      else if(b.dataset.station) tune(b.dataset.station);
      ui();
    });
    const r=$d('.vbd-vol input'); if(r) r.addEventListener('input',()=>{ volume=+r.value; muted=false; try{localStorage.setItem('vb-vol',volume);}catch(e){} applyVol(); });
  }
  document.addEventListener('click',e=>{
    if(dock&&dock.contains(e.target)) return;
    const p=e.target.closest('[data-play]'); if(p){ tune(p.dataset.play,+p.dataset.i); return; }
    const c=e.target.closest('.vb-st,[data-tune]'); if(c){ e.preventDefault(); tune(c.dataset.station||c.dataset.tune); }
  });
  audio.addEventListener('ended',()=>{ const pl=PL[cur]||[]; if(!pl.length) return; load(cur,idx+1); audio.play().catch(()=>{}); ui(); });
  audio.addEventListener('timeupdate',()=>{ const bar=$d('.vbd-bar i'); if(bar) bar.style.width=(audio.duration?audio.currentTime/audio.duration*100:0)+'%'; });
  audio.addEventListener('play',ui); audio.addEventListener('pause',ui);
  applyVol();

  Promise.all([
    fetch(base+'vicebay/data/stations.json').then(r=>r.json()),
    fetch(base+'audio/stations.json').then(r=>r.json()).catch(()=>({}))
  ]).then(([meta,pl])=>{
    S=meta.stations.map(s=>({...s,logo:s.logo.replace(/^\.\.\//,base)}));
    S.forEach(s=>{ PL[s.id]=s.soon?[]:(pl[s.id]||[]); });
    render(); ui();
    if(location.hash){ const el=document.getElementById(location.hash.slice(1)); if(el) el.scrollIntoView(); }
  });
  applyLang();
})();
