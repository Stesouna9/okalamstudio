// ── OKALAM Studio — Shared JS ──────────────────────────────────

// Scroll nav
const nav = document.querySelector('.ok-nav');
if(nav) window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// ── Dropdown menu ──
const menuBtn = document.querySelector('.ok-nav-menu-btn');
const dropdown = document.querySelector('.ok-nav-dropdown');
const overlay = document.querySelector('.ok-nav-overlay');

function closeMenu(){
  if(!menuBtn||!dropdown) return;
  menuBtn.classList.remove('open');
  dropdown.classList.remove('open');
  if(overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}
function openMenu(){
  if(!menuBtn||!dropdown) return;
  menuBtn.classList.add('open');
  dropdown.classList.add('open');
  if(overlay) overlay.classList.add('open');
  document.body.style.overflow = 'hidden';
}

if(menuBtn){
  menuBtn.addEventListener('click', () => {
    menuBtn.classList.contains('open') ? closeMenu() : openMenu();
  });
}
if(overlay) overlay.addEventListener('click', closeMenu);

// Close on nav link click
document.querySelectorAll('.ok-nav-dropdown .ok-nav-link, .ok-nav-dropdown .ok-nav-cta').forEach(l =>
  l.addEventListener('click', closeMenu)
);

// Set active nav link
const path = location.pathname;
document.querySelectorAll('.ok-nav-link').forEach(l => {
  const href = l.getAttribute('href');
  if(!href) return;
  const page = href.split('/').pop();
  if(page === '' && (path === '/' || path.endsWith('index.html'))) l.classList.add('active');
  else if(page && path.endsWith(page)) l.classList.add('active');
});

// Scroll reveal
const obs = new IntersectionObserver(entries => {
  entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => obs.observe(el));

// Particles canvas (shared)
function initParticles(canvasId){
  const cv = document.getElementById(canvasId);
  if(!cv) return;
  const cx = cv.getContext('2d');
  const resize = () => { cv.width = innerWidth; cv.height = innerHeight; };
  resize(); window.addEventListener('resize', resize);
  const pts = Array.from({length:60}, () => ({
    x: Math.random()*innerWidth, y: Math.random()*innerHeight,
    r: Math.random()*1.2+.3,
    vx: (Math.random()-.5)*.1, vy: -Math.random()*.2-.04,
    o: Math.random()*.25+.06
  }));
  (function loop(){
    cx.clearRect(0,0,cv.width,cv.height);
    pts.forEach(p => {
      cx.beginPath(); cx.arc(p.x,p.y,p.r,0,Math.PI*2);
      cx.fillStyle=`rgba(141,234,255,${p.o})`; cx.fill();
      p.x+=p.vx; p.y+=p.vy;
      if(p.y<-10){ p.y=cv.height+10; p.x=Math.random()*cv.width; }
      if(p.x<-10) p.x=cv.width+10;
      if(p.x>cv.width+10) p.x=-10;
    });
    requestAnimationFrame(loop);
  })();
}
initParticles('ok-particles');

// ── TRANSLATIONS ──────────────────────────────────────────────
const T = {
  en: {
    // NAV
    nav_studio:'Studio', nav_projects:'Projects', nav_collabs:'Collaborations',
    nav_games:'Games', nav_contact:'Contact',
    // FOOTER
    footer_tagline:'Independent creative studio. Always moving.',
    footer_nav:'Navigation', footer_contact:'Contact',
    footer_home:'Home', footer_copy:'© 2026 OKALAM Studio. All rights reserved.',
    // STUDIO PAGE
    studio_hero_label:'About',
    studio_hero_title:'The <span class="accent-word">Studio</span>',
    studio_hero_sub:'An independent creative lab at the intersection of technology, games and storytelling.',
    studio_manifeste_label:'Manifesto',
    studio_manifeste_quote:'We are a <em>creative anthill</em> — always building, experimenting, creating.',
    studio_manifeste_p1:'OKALAM Studio was born from a simple conviction: the best ideas don\'t belong to large structures. They emerge from obsession, freedom, and the courage to not fit in a box.',
    studio_manifeste_p2:'We build apps we want to use. We create games we want to play. We experiment with AI because it fascinates us — not because it\'s trendy.',
    studio_manifeste_p3:'Independent studio. Zero compromise. Always in motion.',
    studio_v1_title:'Curiosity', studio_v1_desc:'We explore first. Decide later. Every project starts with a sincere question.',
    studio_v2_title:'Movement', studio_v2_desc:'We prefer an imperfect prototype over a perfect plan. Action creates clarity.',
    studio_v3_title:'Intention', studio_v3_desc:'Every pixel, every line of code, every word is there for a reason.',
    studio_v4_title:'Honesty', studio_v4_desc:'We say what we do. We do what we say. No empty marketing.',
    studio_pillars_label:'What we do',
    studio_pillars_title:'The 4 dimensions of the studio',
    studio_p1_name:'Mobile apps', studio_p1_desc:'Native iOS experiences designed for daily life. Every interaction earned. Every pixel intentional.',
    studio_p2_name:'Narrative games', studio_p2_desc:'Universes where every choice matters. Stories you play, not just watch.',
    studio_p3_name:'AI & Automation', studio_p3_desc:'AI as a creative amplifier, not a shortcut. We experiment what machines and humans can build together.',
    studio_p4_name:'Creative tech', studio_p4_desc:'Interactive web experiences, mini-tools, experiments. If it\'s digital and interesting, we try it.',
    studio_ai_label:'Our position on AI',
    studio_ai_text:'We use AI as a tool — <em>never as a replacement</em> for human creativity. Sound and visuals are always created with real artists.',
    studio_ai_sub:'AI helps us move faster, prototype smarter, think bigger. But the soul of each project — the music, the art, the feeling — comes from real people, real hands, a real vision.',
    studio_cta_title:'Ready to work together?',
    studio_cta_sub:'A project, an idea, a collaboration — we\'re here.',
    studio_cta_projects:'See our projects',
    studio_cta_contact:'Contact us',
    // PROJECTS PAGE
    proj_hero_label:'Our projects',
    proj_hero_title:'What we\'re <span class="accent-word">building</span>',
    proj_hero_sub:'Two ideas under development — built with care, released when they\'re ready.',
    proj_status:'In development',
    proj_vd_desc:'One question. Every day. For everyone. A social app that connects people through daily micro-votes and shared opinions.',
    proj_vd_f1:'<strong>One daily question</strong> — carefully chosen, always relevant',
    proj_vd_f2:'<strong>Opinion discovery</strong> — see how the world answers, by country, age, profile',
    proj_vd_f3:'<strong>Authentic community</strong> — no algorithm, no toxicity, just points of view',
    proj_vd_f4:'<strong>Multilingual from day one</strong> — designed for a global audience',
    proj_vd_inprogress:'Project under development. Not yet available. The release will be announced on our channels.',
    proj_lt_desc:'A pocket RPG running in real time. Time passing in your life is time passing in the game — day, night, sleep, exploration. Your character lives with you.',
    proj_lt_f1:'<strong>Real time</strong> — the game runs continuously, even when you\'re not playing',
    proj_lt_f2:'<strong>Biomes & exploration</strong> — desert, mountain, and other environments to traverse',
    proj_lt_f3:'<strong>Full RPG system</strong> — Endurance, Combat, Luck, levels, XP, adventure journal',
    proj_lt_f4:'<strong>Natural rhythm</strong> — sleep and day/night cycles are part of the gameplay',
    proj_lt_inprogress:'Functional prototype being finalized. The release will be announced on our channels.',
    proj_more_label:'What\'s next?',
    proj_more_title:'More ideas brewing',
    proj_more_desc:'The studio never sleeps. VoteDay and Little ToT are just the beginning.',
    proj_more_cta:'Got an idea? Let\'s talk',
    // COLLABS PAGE
    c_sub:'OKALAM Studio supports a small number of independent creators — structurally, professionally, honestly.',
    c_what_label:'What we are',
    c_what_lead:'An independent studio that <em>actually helps</em> creators look professional.',
    c_what_p1:'In addition to developing its own digital projects, OKALAM Studio supports a carefully selected group of independent creators in their professional development.',
    c_what_p2:'This is not management. This is not an influence agency. It\'s a structured, human, tailor-made support — designed for creators who want to take their activity seriously without losing their authenticity.',
    c_what_p3:'We work in depth, not in volume. We select the profiles we work with carefully.',
    c_v1_t:'Independent & human', c_v1_d:'No big agency vibes. We work close, honest and real — with creators who share our values.',
    c_v2_t:'Structured & credible', c_v2_d:'Professional presentation for brands. Media kits, stats, formats — everything a brand needs to say yes.',
    c_v3_t:'Elegant & specific', c_v3_d:'Custom approach for each creator. No generic templates, no copy-paste strategy.',
    c_serv_label:'What we do', c_serv_title:'Concrete support',
    c_s1_t:'Professional media kit', c_s1_d:'A polished, structured, up-to-date private page you send to brands — clean, readable, credible.',
    c_s2_t:'Stats & metrics', c_s2_d:'Your YouTube, Instagram and TikTok stats formatted clearly. Auto-updated for YouTube.',
    c_s3_t:'Partnership strategy', c_s3_d:'Identifying compatible brands, approach, rate framing, negotiation support.',
    c_s4_t:'Positioning & image', c_s4_d:'Reformulating your editorial universe so brands instantly understand who you are.',
    c_cr_label:'Supported creators', c_cr_title:'Two profiles, two universes',
    c_cr_note:'Full media kits are available on request. <strong>You are a brand?</strong> Contact us to receive the private access link.',
    c_p1_niche:'Tech · EVs · Energy', c_p1_title:'Creator #1 — Tech & Electric Vehicles',
    c_p1_desc:'Real-world tests, unboxing and deep dives into EVs and solar energy. A community of tech enthusiasts and early adopters.',
    c_p1_btn:'Request media kit →',
    c_p2_niche:'Running · Sport · Lifestyle', c_p2_title:'Creator #2 — Running & Sport',
    c_p2_desc:'Running, sharing and motivation since 2011. An authentic channel, a loyal community around accessible sport for all levels.',
    c_p2_btn:'Request media kit →',
    c_b_label:'For brands', c_b_title:'Let\'s talk about your next partnership.',
    c_b_sub:'Send us a message to receive full media kits, detailed stats and discuss available formats. We reply within 48h.',
    c_bc1_t:'Real stats', c_bc1_d:'Auto-updated YouTube data. Transparent, clean, trustworthy.',
    c_bc2_t:'Niche audiences', c_bc2_d:'Engaged communities. Tech early adopters and sport enthusiasts.',
    c_bc3_t:'Fast response', c_bc3_d:'We reply within 48h. Private media kits sent on request.',
    // CONTACT PAGE
    ct_hero_label:'Contact',
    ct_hero_title:'We <span class="accent-word">reply</span>',
    ct_hero_sub:'A project, an idea, a collaboration — or just a question. We\'re here.',
    ct_direct_label:'Reach us directly',
    ct_direct_title:'Two emails, two topics',
    ct_ch1_label:'Support & general', ct_ch1_desc:'Questions about the studio, our projects, user feedback.',
    ct_ch2_label:'Partnerships & brands', ct_ch2_desc:'Creator collaborations, media kit requests, sponsoring.',
    ct_ch3_label:'GitHub', ct_ch3_desc:'Source code and public projects.',
    ct_form_title:'Send us a message',
    ct_form_sub:'Fill in this form or write us directly by email — we reply to everything.',
    ct_lbl_firstname:'First name', ct_lbl_email:'Email',
    ct_lbl_subject:'Subject', ct_opt_none:'Choose a subject...',
    ct_opt_project:'A project or idea', ct_opt_collab:'Creator collaboration',
    ct_opt_brand:'Brand partnership / sponsoring', ct_opt_kit:'Media kit request',
    ct_opt_other:'Other',
    ct_lbl_message:'Message', ct_ph_message:'Tell us what you have in mind...',
    ct_btn_send:'Send message',
    ct_note:'By submitting this form, you agree to be contacted by email.',
    ct_success_title:'Message sent!', ct_success_sub:'Thanks for your message. We\'ll reply within 48h.',
    ct_faq_label:'FAQ', ct_faq_title:'Frequently asked questions',
    ct_faq1_q:'Do you take freelance projects?', ct_faq1_a:'OKALAM Studio focuses on its own projects and supporting selected creators. We don\'t take classic freelance missions for now.',
    ct_faq2_q:'How does creator support work?', ct_faq2_a:'We select a small number of profiles. We work on image, brand presentation, media kits and partnership strategy. It\'s custom, not volume.',
    ct_faq3_q:'I\'m a brand, how do I get a media kit?', ct_faq3_a:'Email partnerships@okalamstudio.com specifying the creator you\'re interested in. We send the private access link within 24h.',
    ct_faq4_q:'When do VoteDay and Little ToT launch?', ct_faq4_a:'Both projects are in development. No announced date yet. Announcements will be made on our channels and this site.',
  },
  fr: {
    nav_studio:'Studio', nav_projects:'Projets', nav_collabs:'Collaborations',
    nav_games:'Jeux', nav_contact:'Contact',
    footer_tagline:'Studio créatif indépendant. Toujours en mouvement.',
    footer_nav:'Navigation', footer_contact:'Contact',
    footer_home:'Accueil', footer_copy:'© 2026 OKALAM Studio. Tous droits réservés.',
    studio_hero_label:'À propos',
    studio_hero_title:'Le <span class="accent-word">Studio</span>',
    studio_hero_sub:'Un lab créatif indépendant à l\'intersection de la technologie, du jeu et de la narration.',
    studio_manifeste_label:'Manifeste',
    studio_manifeste_quote:'Nous sommes une <em>fourmilière créative</em> — toujours en train de construire, d\'expérimenter, de créer.',
    studio_manifeste_p1:'OKALAM Studio est né d\'une conviction simple : les meilleures idées n\'appartiennent pas aux grandes structures. Elles émergent de l\'obsession, de la liberté, et du courage de ne pas rentrer dans une case.',
    studio_manifeste_p2:'On construit des applications que l\'on voudrait utiliser. On crée des jeux que l\'on voudrait jouer. On expérimente avec l\'IA parce que ça nous passionne — pas parce que c\'est à la mode.',
    studio_manifeste_p3:'Studio indépendant. Zéro compromis. Tout en mouvement.',
    studio_v1_title:'Curiosité', studio_v1_desc:'On explore d\'abord. On décide ensuite. Chaque projet commence par une question sincère.',
    studio_v2_title:'Mouvement', studio_v2_desc:'On préfère un prototype imparfait à un plan parfait. L\'action crée la clarté.',
    studio_v3_title:'Intention', studio_v3_desc:'Chaque pixel, chaque ligne de code, chaque mot est là pour une raison.',
    studio_v4_title:'Honnêteté', studio_v4_desc:'On dit ce qu\'on fait. On fait ce qu\'on dit. Pas de marketing vide.',
    studio_pillars_label:'Ce qu\'on fait',
    studio_pillars_title:'Les 4 dimensions du studio',
    studio_p1_name:'Apps mobiles', studio_p1_desc:'Des expériences iOS natives pensées pour la vie quotidienne. Chaque interaction méritée. Chaque pixel intentionnel.',
    studio_p2_name:'Jeux narratifs', studio_p2_desc:'Des univers où chaque choix a du poids. Des histoires que l\'on joue, pas que l\'on regarde.',
    studio_p3_name:'IA & Automatisation', studio_p3_desc:'L\'IA comme amplificateur créatif, pas comme raccourci. On expérimente ce que les machines et les humains peuvent construire ensemble.',
    studio_p4_name:'Tech créative', studio_p4_desc:'Des expériences web interactives, des mini-outils, des expériences. Si c\'est digital et intéressant, on essaie.',
    studio_ai_label:'Notre position sur l\'IA',
    studio_ai_text:'Nous utilisons l\'IA comme outil — <em>jamais comme remplaçant</em> de la créativité humaine. Le son et le visuel sont toujours créés avec de vrais artistes.',
    studio_ai_sub:'L\'IA nous aide à aller plus vite, prototyper plus intelligemment, penser plus grand. Mais l\'âme de chaque projet — la musique, l\'art, le ressenti — vient de vraies personnes, de vraies mains, d\'une vraie vision.',
    studio_cta_title:'Prêt à travailler ensemble ?',
    studio_cta_sub:'Un projet, une idée, une collaboration — on est là.',
    studio_cta_projects:'Voir nos projets',
    studio_cta_contact:'Nous contacter',
    proj_hero_label:'Nos projets',
    proj_hero_title:'Ce qu\'on <span class="accent-word">construit</span>',
    proj_hero_sub:'Deux idées en cours de développement — construites avec soin, publiées quand elles sont prêtes.',
    proj_status:'En développement',
    proj_vd_desc:'Une question. Chaque jour. Pour tout le monde. Une app sociale qui connecte les gens à travers des micro-votes quotidiens et des opinions partagées.',
    proj_vd_f1:'<strong>Une question quotidienne</strong> — soigneusement choisie, toujours pertinente',
    proj_vd_f2:'<strong>Découverte d\'opinions</strong> — voir comment le monde répond, par pays, âge, profil',
    proj_vd_f3:'<strong>Communauté authentique</strong> — pas d\'algorithme, pas de toxicité, juste des points de vue',
    proj_vd_f4:'<strong>Multilingue dès le départ</strong> — conçu pour une audience mondiale',
    proj_vd_inprogress:'Projet en cours de développement. Pas encore disponible. La sortie sera annoncée sur nos réseaux.',
    proj_lt_desc:'Un RPG de poche en temps réel. Le temps qui passe dans ta vie est le temps qui passe dans le jeu — jour, nuit, sommeil, exploration. Ton personnage vit avec toi.',
    proj_lt_f1:'<strong>Temps réel</strong> — le jeu tourne en permanence, même quand tu ne joues pas',
    proj_lt_f2:'<strong>Biomes & exploration</strong> — désert, montagne, et d\'autres environnements à traverser',
    proj_lt_f3:'<strong>Système RPG complet</strong> — Endurance, Combat, Chance, niveaux, XP, journal d\'aventure',
    proj_lt_f4:'<strong>Rythme naturel</strong> — le sommeil, les cycles jour/nuit font partie du gameplay',
    proj_lt_inprogress:'Prototype fonctionnel en cours de finition. La sortie sera annoncée sur nos réseaux.',
    proj_more_label:'Et après ?',
    proj_more_title:'D\'autres idées en gestation',
    proj_more_desc:'Le studio ne dort jamais. VoteDay et Little ToT ne sont que le début.',
    proj_more_cta:'Vous avez une idée ? Parlons-en',
    c_sub:'OKALAM Studio accompagne un petit nombre de créateurs indépendants — structurellement, professionnellement, honnêtement.',
    c_what_label:'Ce que nous sommes',
    c_what_lead:'Un studio indépendant qui <em>aide vraiment</em> les créateurs à paraître professionnels.',
    c_what_p1:'En plus de développer ses propres projets digitaux, OKALAM Studio accompagne un groupe sélectionné de créateurs indépendants dans leur développement professionnel.',
    c_what_p2:'Ce n\'est pas du management. Ce n\'est pas une agence d\'influence. C\'est un accompagnement structuré, humain, sur-mesure — conçu pour les créateurs qui veulent prendre leur activité au sérieux sans perdre leur authenticité.',
    c_what_p3:'On travaille en profondeur, pas en volume. On sélectionne soigneusement les profils avec qui on travaille.',
    c_v1_t:'Indépendant & humain', c_v1_d:'Pas de grande agence. On travaille proche, honnête et vrai — avec des créateurs qui partagent nos valeurs.',
    c_v2_t:'Structuré & crédible', c_v2_d:'Présentation professionnelle pour les marques. Media kits, stats, formats — tout ce qu\'une marque a besoin pour dire oui.',
    c_v3_t:'Élégant & spécifique', c_v3_d:'Approche sur-mesure pour chaque créateur. Pas de templates génériques, pas de stratégie copier-coller.',
    c_serv_label:'Ce qu\'on fait', c_serv_title:'Accompagnement concret',
    c_s1_t:'Media kit professionnel', c_s1_d:'Une page privée soignée, structurée, à jour que vous envoyez aux marques — propre, lisible, crédible.',
    c_s2_t:'Stats & métriques', c_s2_d:'Vos stats YouTube, Instagram et TikTok formatées clairement. Mise à jour auto pour YouTube.',
    c_s3_t:'Stratégie partenariat', c_s3_d:'Identifier les marques compatibles, approche, cadrage tarifaire, aide à la négociation.',
    c_s4_t:'Positionnement & image', c_s4_d:'Reformuler votre univers éditorial pour que les marques comprennent instantanément qui vous êtes.',
    c_cr_label:'Créateurs accompagnés', c_cr_title:'Deux profils, deux univers',
    c_cr_note:'Les media kits complets sont disponibles sur demande. <strong>Vous êtes une marque ?</strong> Contactez-nous pour recevoir le lien d\'accès privé.',
    c_p1_niche:'Tech · VE · Énergie', c_p1_title:'Créateur #1 — Tech & Véhicules Électriques',
    c_p1_desc:'Tests réels, unboxing et plongées dans les VE et l\'énergie solaire. Une communauté de passionnés tech et d\'early adopters.',
    c_p1_btn:'Demander le media kit →',
    c_p2_niche:'Running · Sport · Lifestyle', c_p2_title:'Créateur #2 — Running & Sport',
    c_p2_desc:'Running, partage et motivation depuis 2011. Une chaîne authentique, une communauté fidèle autour du sport accessible à tous les niveaux.',
    c_p2_btn:'Demander le media kit →',
    c_b_label:'Pour les marques', c_b_title:'Parlons de votre prochain partenariat.',
    c_b_sub:'Envoyez-nous un message pour recevoir les media kits complets, les stats détaillées et discuter des formats disponibles. On répond sous 48h.',
    c_bc1_t:'Stats réelles', c_bc1_d:'Données YouTube auto-mises à jour. Transparentes, propres, fiables.',
    c_bc2_t:'Audiences de niche', c_bc2_d:'Communautés engagées. Early adopters tech et passionnés de sport.',
    c_bc3_t:'Réponse rapide', c_bc3_d:'On répond sous 48h. Media kits privés envoyés sur demande.',
    ct_hero_label:'Contact',
    ct_hero_title:'On vous <span class="accent-word">répond</span>',
    ct_hero_sub:'Un projet, une idée, une collaboration — ou juste une question. On est là.',
    ct_direct_label:'Nous joindre directement',
    ct_direct_title:'Deux emails, deux sujets',
    ct_ch1_label:'Support & général', ct_ch1_desc:'Questions sur le studio, nos projets, retours utilisateurs.',
    ct_ch2_label:'Partenariats & marques', ct_ch2_desc:'Collaborations créateurs, demandes de media kits, sponsoring.',
    ct_ch3_label:'GitHub', ct_ch3_desc:'Code source et projets publics.',
    ct_form_title:'Envoyez-nous un message',
    ct_form_sub:'Remplissez ce formulaire ou écrivez-nous directement par email — on répond à tout.',
    ct_lbl_firstname:'Prénom', ct_lbl_email:'Email',
    ct_lbl_subject:'Sujet', ct_opt_none:'Choisir un sujet...',
    ct_opt_project:'Un projet ou une idée', ct_opt_collab:'Collaboration créateur',
    ct_opt_brand:'Partenariat marque / sponsoring', ct_opt_kit:'Demande de media kit',
    ct_opt_other:'Autre',
    ct_lbl_message:'Message', ct_ph_message:'Dites-nous ce que vous avez en tête...',
    ct_btn_send:'Envoyer le message',
    ct_note:'En envoyant ce formulaire, vous acceptez d\'être contacté par email.',
    ct_success_title:'Message envoyé !', ct_success_sub:'Merci pour votre message. On vous répond sous 48h.',
    ct_faq_label:'FAQ', ct_faq_title:'Questions fréquentes',
    ct_faq1_q:'Vous acceptez des missions freelance ?', ct_faq1_a:'OKALAM Studio se concentre sur ses propres projets et l\'accompagnement de créateurs sélectionnés. On n\'accepte pas de missions freelance classiques pour l\'instant.',
    ct_faq2_q:'Comment fonctionne l\'accompagnement créateurs ?', ct_faq2_a:'On sélectionne un petit nombre de profils. On travaille sur l\'image, la présentation aux marques, les media kits et la stratégie partenariat. C\'est du sur-mesure, pas du volume.',
    ct_faq3_q:'Je suis une marque, comment obtenir un media kit ?', ct_faq3_a:'Envoyez un email à partnerships@okalamstudio.com en précisant le créateur qui vous intéresse. On vous envoie le lien d\'accès privé sous 24h.',
    ct_faq4_q:'Quand sortent VoteDay et Little ToT ?', ct_faq4_a:'Les deux projets sont en cours de développement. Pas de date annoncée pour l\'instant. Les annonces se feront sur nos réseaux et sur ce site.',
  },
  ja: {
    nav_studio:'スタジオ', nav_projects:'プロジェクト', nav_collabs:'コラボ',
    nav_games:'ゲーム', nav_contact:'連絡',
    footer_tagline:'独立クリエイティブスタジオ。常に動き続ける。',
    footer_nav:'ナビゲーション', footer_contact:'お問い合わせ',
    footer_home:'ホーム', footer_copy:'© 2026 OKALAM Studio. All rights reserved.',
    studio_hero_label:'概要',
    studio_hero_title:'<span class="accent-word">スタジオ</span>について',
    studio_hero_sub:'テクノロジー、ゲーム、ストーリーテリングの交差点にある独立系クリエイティブラボ。',
    studio_manifeste_label:'マニフェスト',
    studio_manifeste_quote:'私たちは<em>クリエイティブな蟻塚</em>です — 常に作り、実験し、創造しています。',
    studio_manifeste_p1:'OKALAMスタジオはシンプルな信念から生まれました：最良のアイデアは大きな組織には属しません。それらは執着、自由、そして枠に収まらない勇気から生まれます。',
    studio_manifeste_p2:'使いたいアプリを作ります。遊びたいゲームを作ります。流行だからではなく、情熱があるからAIで実験します。',
    studio_manifeste_p3:'独立スタジオ。妥協ゼロ。常に動き続ける。',
    studio_v1_title:'好奇心', studio_v1_desc:'まず探索する。後で決める。すべてのプロジェクトは誠実な疑問から始まります。',
    studio_v2_title:'行動', studio_v2_desc:'完璧な計画より不完全なプロトタイプを好む。行動が明確さを生む。',
    studio_v3_title:'意図', studio_v3_desc:'すべてのピクセル、コードの行、言葉には理由があります。',
    studio_v4_title:'誠実さ', studio_v4_desc:'言ったことをする。したことを言う。空虚なマーケティングはしない。',
    studio_pillars_label:'私たちの仕事',
    studio_pillars_title:'スタジオの4つの柱',
    studio_p1_name:'モバイルアプリ', studio_p1_desc:'日常生活のためのネイティブiOSエクスペリエンス。',
    studio_p2_name:'ナラティブゲーム', studio_p2_desc:'すべての選択に重みがある世界。見るのではなく、プレイするストーリー。',
    studio_p3_name:'AI・自動化', studio_p3_desc:'ショートカットではなく、クリエイティブな増幅器としてのAI。',
    studio_p4_name:'クリエイティブテック', studio_p4_desc:'インタラクティブなウェブ体験、ミニツール。デジタルで面白ければ試します。',
    studio_ai_label:'AIに関する私たちの立場',
    studio_ai_text:'私たちはAIをツールとして使用します — 人間の創造性の<em>代替品としてではなく</em>。サウンドとビジュアルは常に本物のアーティストと共に作られます。',
    studio_ai_sub:'AIはより速く動き、よりスマートにプロトタイプを作り、より大きく考えるのを助けます。しかし、各プロジェクトの魂 — 音楽、アート、感覚 — は本物の人々から来ます。',
    studio_cta_title:'一緒に働きませんか？',
    studio_cta_sub:'プロジェクト、アイデア、コラボ — お気軽に。',
    studio_cta_projects:'プロジェクトを見る', studio_cta_contact:'お問い合わせ',
    proj_hero_label:'プロジェクト',
    proj_hero_title:'私たちが<span class="accent-word">作っているもの</span>',
    proj_hero_sub:'2つのアイデアが開発中 — 丁寧に作られ、準備ができたらリリース。',
    proj_status:'開発中',
    proj_vd_desc:'1つの質問。毎日。全員のために。日々のマイクロ投票と共有された意見を通じて人々をつなぐソーシャルアプリ。',
    proj_vd_f1:'<strong>毎日の質問</strong> — 丁寧に選ばれ、常に関連性がある',
    proj_vd_f2:'<strong>意見の発見</strong> — 世界がどう答えるかを見る',
    proj_vd_f3:'<strong>本物のコミュニティ</strong> — アルゴリズムなし、毒性なし',
    proj_vd_f4:'<strong>最初からマルチリンガル</strong> — グローバルな読者向けに設計',
    proj_vd_inprogress:'開発中のプロジェクト。まだ利用できません。',
    proj_lt_desc:'リアルタイムで動くポケットRPG。あなたの人生で過ぎる時間がゲームで過ぎる時間です。',
    proj_lt_f1:'<strong>リアルタイム</strong> — プレイしていなくてもゲームは動き続ける',
    proj_lt_f2:'<strong>バイオームと探索</strong> — 砂漠、山など様々な環境',
    proj_lt_f3:'<strong>完全なRPGシステム</strong> — 持久力、戦闘、運、レベル、XP',
    proj_lt_f4:'<strong>自然なリズム</strong> — 睡眠と昼夜サイクルがゲームプレイの一部',
    proj_lt_inprogress:'機能するプロトタイプを仕上げ中。',
    proj_more_label:'次は？', proj_more_title:'さらなるアイデアが育っています',
    proj_more_desc:'スタジオは眠りません。VoteDayとLittle ToTはほんの始まりです。',
    proj_more_cta:'アイデアがありますか？話しましょう',
    c_sub:'OKALAMスタジオは少数の独立系クリエイターをサポートしています。',
    c_what_label:'私たちについて', c_what_lead:'クリエイターを<em>本当に</em>プロフェッショナルに見せる独立スタジオ。',
    c_what_p1:'OKALAMスタジオは自社のデジタルプロジェクトを開発するほか、慎重に選ばれた独立系クリエイターのプロフェッショナル開発をサポートしています。',
    c_what_p2:'これはマネジメントではありません。インフルエンサー代理店でもありません。本物らしさを失わずに活動を真剣に考えたいクリエイターのための、構造化された人間的なサポートです。',
    c_what_p3:'量ではなく深さで働きます。',
    c_v1_t:'独立的＆人間的', c_v1_d:'大きな代理店の雰囲気なし。私たちの価値観を共有するクリエイターと近く、誠実に働きます。',
    c_v2_t:'構造化＆信頼性', c_v2_d:'ブランド向けのプロフェッショナルなプレゼンテーション。',
    c_v3_t:'エレガント＆特定', c_v3_d:'各クリエイターへのカスタムアプローチ。',
    c_serv_label:'私たちの活動', c_serv_title:'具体的なサポート',
    c_s1_t:'プロメディアキット', c_s1_d:'ブランドに送る洗練された構造化されたプライベートページ。',
    c_s2_t:'統計＆指標', c_s2_d:'YouTube、Instagram、TikTokの統計を明確にフォーマット。',
    c_s3_t:'パートナーシップ戦略', c_s3_d:'互換性のあるブランドの特定、アプローチ、交渉サポート。',
    c_s4_t:'ポジショニング＆イメージ', c_s4_d:'ブランドがあなたが誰であるかを即座に理解できるよう編集宇宙を再定式化。',
    c_cr_label:'サポートクリエイター', c_cr_title:'2つのプロフィール、2つの世界',
    c_cr_note:'完全なメディアキットはリクエストに応じて利用可能です。<strong>ブランドですか？</strong>プライベートアクセスリンクを受け取るにはお問い合わせください。',
    c_p1_niche:'テック・EV・エネルギー', c_p1_title:'クリエイター #1 — テック＆電気自動車',
    c_p1_desc:'EVと太陽エネルギーのリアルテスト、アンボクシング。テック愛好家のコミュニティ。',
    c_p1_btn:'メディアキットをリクエスト →',
    c_p2_niche:'ランニング・スポーツ・ライフスタイル', c_p2_title:'クリエイター #2 — ランニング＆スポーツ',
    c_p2_desc:'2011年からランニング、共有、モチベーション。すべてのレベルのアクセスしやすいスポーツ。',
    c_p2_btn:'メディアキットをリクエスト →',
    c_b_label:'ブランド向け', c_b_title:'次のパートナーシップについて話しましょう。',
    c_b_sub:'完全なメディアキット、詳細な統計を受け取り、利用可能なフォーマットについて話し合うためにメッセージをお送りください。48時間以内に返答します。',
    c_bc1_t:'実際の統計', c_bc1_d:'自動更新されたYouTubeデータ。透明で信頼性が高い。',
    c_bc2_t:'ニッチなオーディエンス', c_bc2_d:'エンゲージされたコミュニティ。テックとスポーツ愛好家。',
    c_bc3_t:'迅速な返答', c_bc3_d:'48時間以内に返答。プライベートメディアキットをリクエストに応じて送信。',
    ct_hero_label:'お問い合わせ', ct_hero_title:'ご<span class="accent-word">返答</span>します',
    ct_hero_sub:'プロジェクト、アイデア、コラボ、または質問 — お気軽に。',
    ct_direct_label:'直接ご連絡', ct_direct_title:'2つのメール、2つのトピック',
    ct_ch1_label:'サポート＆一般', ct_ch1_desc:'スタジオ、プロジェクト、ユーザーフィードバックに関する質問。',
    ct_ch2_label:'パートナーシップ＆ブランド', ct_ch2_desc:'クリエイターコラボ、メディアキットリクエスト、スポンサー。',
    ct_ch3_label:'GitHub', ct_ch3_desc:'ソースコードと公開プロジェクト。',
    ct_form_title:'メッセージを送る', ct_form_sub:'このフォームに記入するか、直接メールでご連絡ください。',
    ct_lbl_firstname:'名前', ct_lbl_email:'メール',
    ct_lbl_subject:'件名', ct_opt_none:'件名を選択...',
    ct_opt_project:'プロジェクトまたはアイデア', ct_opt_collab:'クリエイターコラボ',
    ct_opt_brand:'ブランドパートナーシップ', ct_opt_kit:'メディアキットリクエスト',
    ct_opt_other:'その他',
    ct_lbl_message:'メッセージ', ct_ph_message:'お伝えしたいことを教えてください...',
    ct_btn_send:'メッセージを送る',
    ct_note:'このフォームを送信することで、メールでの連絡に同意します。',
    ct_success_title:'送信完了！', ct_success_sub:'メッセージをありがとうございます。48時間以内に返答します。',
    ct_faq_label:'よくある質問', ct_faq_title:'よくある質問',
    ct_faq1_q:'フリーランスの仕事を受けていますか？', ct_faq1_a:'OKALAMスタジオは自社プロジェクトと選ばれたクリエイターのサポートに集中しています。現在、従来のフリーランスの仕事は受け付けていません。',
    ct_faq2_q:'クリエイターサポートはどのように機能しますか？', ct_faq2_a:'少数のプロフィールを選択します。イメージ、ブランドプレゼンテーション、メディアキット、パートナーシップ戦略に取り組みます。',
    ct_faq3_q:'ブランドですが、メディアキットを入手するにはどうすればよいですか？', ct_faq3_a:'partnerships@okalamstudio.comにメールを送り、興味のあるクリエイターを指定してください。24時間以内にプライベートアクセスリンクを送ります。',
    ct_faq4_q:'VoteDayとLittle ToTはいつリリースされますか？', ct_faq4_a:'両プロジェクトは開発中です。現在発表された日程はありません。',
  },
  zh: {
    nav_studio:'工作室', nav_projects:'项目', nav_collabs:'合作',
    nav_games:'游戏', nav_contact:'联系',
    footer_tagline:'独立创意工作室。永远在行动。',
    footer_nav:'导航', footer_contact:'联系方式',
    footer_home:'首页', footer_copy:'© 2026 OKALAM Studio. 保留所有权利。',
    studio_hero_label:'关于',
    studio_hero_title:'<span class="accent-word">工作室</span>',
    studio_hero_sub:'一个位于技术、游戏和叙事交叉点的独立创意实验室。',
    studio_manifeste_label:'宣言',
    studio_manifeste_quote:'我们是一个<em>创意蚁穴</em> — 不断建造、实验、创造。',
    studio_manifeste_p1:'OKALAM Studio诞生于一个简单的信念：最好的想法不属于大型机构。它们来自痴迷、自由和不被框住的勇气。',
    studio_manifeste_p2:'我们制作自己想用的应用。创造自己想玩的游戏。因为热情而不是时髦而实验AI。',
    studio_manifeste_p3:'独立工作室。零妥协。始终在行动。',
    studio_v1_title:'好奇心', studio_v1_desc:'先探索，后决定。每个项目从真诚的问题开始。',
    studio_v2_title:'行动', studio_v2_desc:'宁要不完美的原型也不要完美的计划。行动创造清晰。',
    studio_v3_title:'意图', studio_v3_desc:'每个像素、每行代码、每个词都有原因。',
    studio_v4_title:'诚实', studio_v4_desc:'说到做到。没有空洞的营销。',
    studio_pillars_label:'我们做什么',
    studio_pillars_title:'工作室的4个维度',
    studio_p1_name:'移动应用', studio_p1_desc:'为日常生活设计的原生iOS体验。',
    studio_p2_name:'叙事游戏', studio_p2_desc:'每个选择都有分量的世界。你玩的故事，而不只是看的。',
    studio_p3_name:'AI与自动化', studio_p3_desc:'AI作为创意放大器，而非捷径。',
    studio_p4_name:'创意科技', studio_p4_desc:'互动网络体验、小工具、实验。只要是数字的且有趣的，我们就尝试。',
    studio_ai_label:'我们对AI的立场',
    studio_ai_text:'我们将AI用作工具 — <em>绝不是人类创造力的替代品</em>。声音和视觉始终与真正的艺术家一起创作。',
    studio_ai_sub:'AI帮助我们更快行动，更智能地原型设计，更大胆地思考。但每个项目的灵魂 — 音乐、艺术、感觉 — 来自真实的人。',
    studio_cta_title:'准备好合作了吗？',
    studio_cta_sub:'一个项目、一个想法、一次合作 — 我们在这里。',
    studio_cta_projects:'查看项目', studio_cta_contact:'联系我们',
    proj_hero_label:'项目', proj_hero_title:'我们正在<span class="accent-word">建造什么</span>',
    proj_hero_sub:'两个开发中的想法 — 精心打造，准备好了就发布。',
    proj_status:'开发中',
    proj_vd_desc:'一个问题。每天。为所有人。通过日常微投票和共享意见连接人们的社交应用。',
    proj_vd_f1:'<strong>每日问题</strong> — 精心选择，始终相关',
    proj_vd_f2:'<strong>发现观点</strong> — 看世界如何回答',
    proj_vd_f3:'<strong>真实社区</strong> — 没有算法，没有毒性',
    proj_vd_f4:'<strong>从一开始就多语言</strong> — 为全球受众设计',
    proj_vd_inprogress:'项目正在开发中。尚未可用。',
    proj_lt_desc:'实时运行的口袋RPG。你生命中流逝的时间就是游戏中流逝的时间。',
    proj_lt_f1:'<strong>实时</strong> — 即使不玩游戏也在运行',
    proj_lt_f2:'<strong>生物群落和探索</strong> — 沙漠、山地等环境',
    proj_lt_f3:'<strong>完整的RPG系统</strong> — 耐力、战斗、运气、等级、经验值',
    proj_lt_f4:'<strong>自然节奏</strong> — 睡眠和昼夜循环是玩法的一部分',
    proj_lt_inprogress:'功能性原型正在完善中。',
    proj_more_label:'接下来？', proj_more_title:'更多想法正在酝酿',
    proj_more_desc:'工作室从不睡觉。VoteDay和Little ToT只是开始。',
    proj_more_cta:'有想法？聊聊吧',
    c_sub:'OKALAM Studio支持少数独立创作者 — 在结构、专业和诚实方面。',
    c_what_label:'我们是谁', c_what_lead:'一个<em>真正帮助</em>创作者看起来专业的独立工作室。',
    c_what_p1:'除了开发自己的数字项目外，OKALAM Studio还支持精心选择的独立创作者群体的职业发展。',
    c_what_p2:'这不是管理。这不是影响力机构。这是为想要认真对待活动而不失去真实性的创作者设计的结构化、人性化、量身定制的支持。',
    c_what_p3:'我们深度工作，而非数量。我们仔细选择合作的创作者。',
    c_v1_t:'独立＆人性化', c_v1_d:'没有大机构的感觉。我们与分享价值观的创作者近距离、诚实、真实地工作。',
    c_v2_t:'结构化＆可信', c_v2_d:'品牌的专业展示。媒体包、统计数据、格式。',
    c_v3_t:'优雅＆具体', c_v3_d:'每个创作者的定制方法。没有通用模板。',
    c_serv_label:'我们做什么', c_serv_title:'具体支持',
    c_s1_t:'专业媒体包', c_s1_d:'发送给品牌的精心结构化私人页面。',
    c_s2_t:'统计与指标', c_s2_d:'YouTube、Instagram和TikTok统计数据清晰格式化。',
    c_s3_t:'合作策略', c_s3_d:'识别兼容品牌、方法、定价框架、谈判支持。',
    c_s4_t:'定位与形象', c_s4_d:'重新制定您的编辑宇宙，让品牌立即了解您是谁。',
    c_cr_label:'支持的创作者', c_cr_title:'两个档案，两个宇宙',
    c_cr_note:'完整媒体包可应请求提供。<strong>您是品牌吗？</strong>联系我们以获取私人访问链接。',
    c_p1_niche:'科技·电动车·能源', c_p1_title:'创作者 #1 — 科技与电动车',
    c_p1_desc:'电动车和太阳能的真实测试、开箱和深度探讨。科技爱好者社区。',
    c_p1_btn:'请求媒体包 →',
    c_p2_niche:'跑步·运动·生活', c_p2_title:'创作者 #2 — 跑步与运动',
    c_p2_desc:'自2011年以来的跑步、分享和激励。适合所有水平的真实频道。',
    c_p2_btn:'请求媒体包 →',
    c_b_label:'品牌专区', c_b_title:'让我们谈谈您的下一个合作。',
    c_b_sub:'发送消息以获取完整媒体包、详细统计数据并讨论可用格式。我们在48小时内回复。',
    c_bc1_t:'真实统计', c_bc1_d:'自动更新的YouTube数据。透明、清晰、可信。',
    c_bc2_t:'细分受众', c_bc2_d:'参与度高的社区。科技和运动爱好者。',
    c_bc3_t:'快速响应', c_bc3_d:'48小时内回复。私人媒体包应请求发送。',
    ct_hero_label:'联系', ct_hero_title:'我们<span class="accent-word">回复</span>您',
    ct_hero_sub:'一个项目、一个想法、合作 — 或只是一个问题。我们在这里。',
    ct_direct_label:'直接联系我们', ct_direct_title:'两封邮件，两个主题',
    ct_ch1_label:'支持和一般', ct_ch1_desc:'关于工作室、项目、用户反馈的问题。',
    ct_ch2_label:'合作和品牌', ct_ch2_desc:'创作者合作、媒体包请求、赞助。',
    ct_ch3_label:'GitHub', ct_ch3_desc:'源代码和公开项目。',
    ct_form_title:'发送消息', ct_form_sub:'填写此表格或直接通过电子邮件写信给我们。',
    ct_lbl_firstname:'名字', ct_lbl_email:'电子邮件',
    ct_lbl_subject:'主题', ct_opt_none:'选择主题...',
    ct_opt_project:'项目或想法', ct_opt_collab:'创作者合作',
    ct_opt_brand:'品牌合作/赞助', ct_opt_kit:'媒体包请求',
    ct_opt_other:'其他',
    ct_lbl_message:'消息', ct_ph_message:'告诉我们您有什么想法...',
    ct_btn_send:'发送消息',
    ct_note:'提交此表格即表示您同意通过电子邮件联系。',
    ct_success_title:'消息已发送！', ct_success_sub:'感谢您的消息。我们将在48小时内回复。',
    ct_faq_label:'常见问题', ct_faq_title:'常见问题',
    ct_faq1_q:'你们接受自由职业项目吗？', ct_faq1_a:'OKALAM Studio专注于自己的项目和支持选定的创作者。目前不接受传统的自由职业任务。',
    ct_faq2_q:'创作者支持如何运作？', ct_faq2_a:'我们选择少数档案。我们致力于形象、品牌展示、媒体包和合作策略。这是定制的，而非批量的。',
    ct_faq3_q:'我是品牌，如何获取媒体包？', ct_faq3_a:'发送电子邮件至partnerships@okalamstudio.com，指定您感兴趣的创作者。我们在24小时内发送私人访问链接。',
    ct_faq4_q:'VoteDay和Little ToT何时发布？', ct_faq4_a:'两个项目都在开发中。目前尚未宣布日期。',
  },
  es: {
    nav_studio:'Estudio', nav_projects:'Proyectos', nav_collabs:'Colaboraciones',
    nav_games:'Juegos', nav_contact:'Contacto',
    footer_tagline:'Estudio creativo independiente. Siempre en movimiento.',
    footer_nav:'Navegación', footer_contact:'Contacto',
    footer_home:'Inicio', footer_copy:'© 2026 OKALAM Studio. Todos los derechos reservados.',
    studio_hero_label:'Acerca de',
    studio_hero_title:'El <span class="accent-word">Estudio</span>',
    studio_hero_sub:'Un laboratorio creativo independiente en la intersección de tecnología, juegos y narrativa.',
    studio_manifeste_label:'Manifiesto',
    studio_manifeste_quote:'Somos un <em>hormiguero creativo</em> — siempre construyendo, experimentando, creando.',
    studio_manifeste_p1:'OKALAM Studio nació de una convicción simple: las mejores ideas no pertenecen a grandes estructuras. Emergen de la obsesión, la libertad y el coraje de no encajar en una caja.',
    studio_manifeste_p2:'Construimos apps que querríamos usar. Creamos juegos que querríamos jugar. Experimentamos con IA porque nos apasiona — no porque esté de moda.',
    studio_manifeste_p3:'Estudio independiente. Cero compromisos. Siempre en movimiento.',
    studio_v1_title:'Curiosidad', studio_v1_desc:'Primero exploramos. Luego decidimos. Cada proyecto comienza con una pregunta sincera.',
    studio_v2_title:'Movimiento', studio_v2_desc:'Preferimos un prototipo imperfecto a un plan perfecto. La acción crea claridad.',
    studio_v3_title:'Intención', studio_v3_desc:'Cada píxel, cada línea de código, cada palabra está ahí por una razón.',
    studio_v4_title:'Honestidad', studio_v4_desc:'Decimos lo que hacemos. Hacemos lo que decimos. Sin marketing vacío.',
    studio_pillars_label:'Lo que hacemos',
    studio_pillars_title:'Las 4 dimensiones del estudio',
    studio_p1_name:'Apps móviles', studio_p1_desc:'Experiencias iOS nativas diseñadas para la vida cotidiana.',
    studio_p2_name:'Juegos narrativos', studio_p2_desc:'Universos donde cada elección tiene peso. Historias que juegas, no solo ves.',
    studio_p3_name:'IA y Automatización', studio_p3_desc:'La IA como amplificador creativo, no como atajo.',
    studio_p4_name:'Tech creativa', studio_p4_desc:'Experiencias web interactivas, mini-herramientas. Si es digital e interesante, lo intentamos.',
    studio_ai_label:'Nuestra posición sobre la IA',
    studio_ai_text:'Usamos la IA como herramienta — <em>nunca como sustituto</em> de la creatividad humana. El sonido y lo visual siempre se crea con artistas reales.',
    studio_ai_sub:'La IA nos ayuda a movernos más rápido, prototipar más inteligentemente, pensar más grande. Pero el alma de cada proyecto viene de personas reales.',
    studio_cta_title:'¿Listo para trabajar juntos?',
    studio_cta_sub:'Un proyecto, una idea, una colaboración — aquí estamos.',
    studio_cta_projects:'Ver proyectos', studio_cta_contact:'Contactarnos',
    proj_hero_label:'Proyectos', proj_hero_title:'Lo que estamos <span class="accent-word">construyendo</span>',
    proj_hero_sub:'Dos ideas en desarrollo — construidas con cuidado, publicadas cuando están listas.',
    proj_status:'En desarrollo',
    proj_vd_desc:'Una pregunta. Cada día. Para todos. Una app social que conecta a las personas a través de micro-votos diarios.',
    proj_vd_f1:'<strong>Una pregunta diaria</strong> — cuidadosamente elegida, siempre relevante',
    proj_vd_f2:'<strong>Descubrimiento de opiniones</strong> — ver cómo responde el mundo',
    proj_vd_f3:'<strong>Comunidad auténtica</strong> — sin algoritmo, sin toxicidad',
    proj_vd_f4:'<strong>Multilingüe desde el primer día</strong> — diseñado para audiencia global',
    proj_vd_inprogress:'Proyecto en desarrollo. Aún no disponible.',
    proj_lt_desc:'Un RPG de bolsillo en tiempo real. El tiempo que pasa en tu vida es el tiempo que pasa en el juego.',
    proj_lt_f1:'<strong>Tiempo real</strong> — el juego corre continuamente',
    proj_lt_f2:'<strong>Biomas y exploración</strong> — desierto, montaña y más',
    proj_lt_f3:'<strong>Sistema RPG completo</strong> — Resistencia, Combate, Suerte, niveles, XP',
    proj_lt_f4:'<strong>Ritmo natural</strong> — el sueño y los ciclos día/noche son parte del juego',
    proj_lt_inprogress:'Prototipo funcional en proceso de finalización.',
    proj_more_label:'¿Y después?', proj_more_title:'Más ideas en gestación',
    proj_more_desc:'El estudio nunca duerme. VoteDay y Little ToT son solo el comienzo.',
    proj_more_cta:'¿Tienes una idea? Hablemos',
    c_sub:'OKALAM Studio apoya a un pequeño número de creadores independientes.',
    c_what_label:'Lo que somos', c_what_lead:'Un estudio independiente que <em>realmente ayuda</em> a los creadores a parecer profesionales.',
    c_what_p1:'Además de desarrollar sus propios proyectos digitales, OKALAM Studio apoya a creadores independientes seleccionados en su desarrollo profesional.',
    c_what_p2:'No es gestión. No es una agencia de influencia. Es un soporte estructurado, humano y a medida.',
    c_what_p3:'Trabajamos en profundidad, no en volumen.',
    c_v1_t:'Independiente y humano', c_v1_d:'Sin grandes agencias. Trabajamos cerca, honesto y real.',
    c_v2_t:'Estructurado y creíble', c_v2_d:'Presentación profesional para marcas. Media kits, estadísticas, formatos.',
    c_v3_t:'Elegante y específico', c_v3_d:'Enfoque personalizado para cada creador.',
    c_serv_label:'Lo que hacemos', c_serv_title:'Apoyo concreto',
    c_s1_t:'Media kit profesional', c_s1_d:'Una página privada pulida y estructurada para enviar a marcas.',
    c_s2_t:'Stats y métricas', c_s2_d:'Tus estadísticas de YouTube, Instagram y TikTok formateadas claramente.',
    c_s3_t:'Estrategia de partnership', c_s3_d:'Identificar marcas compatibles, enfoque, negociación.',
    c_s4_t:'Posicionamiento e imagen', c_s4_d:'Reformular tu universo editorial para que las marcas entiendan quién eres.',
    c_cr_label:'Creadores apoyados', c_cr_title:'Dos perfiles, dos universos',
    c_cr_note:'Los media kits completos están disponibles bajo pedido. <strong>¿Eres una marca?</strong> Contáctanos para recibir el enlace de acceso privado.',
    c_p1_niche:'Tech · VE · Energía', c_p1_title:'Creador #1 — Tech y Vehículos Eléctricos',
    c_p1_desc:'Pruebas reales, unboxing y análisis de VE y energía solar.',
    c_p1_btn:'Solicitar media kit →',
    c_p2_niche:'Running · Deporte · Lifestyle', c_p2_title:'Creador #2 — Running y Deporte',
    c_p2_desc:'Running, compartir y motivación desde 2011.',
    c_p2_btn:'Solicitar media kit →',
    c_b_label:'Para marcas', c_b_title:'Hablemos de tu próximo partnership.',
    c_b_sub:'Envíanos un mensaje para recibir media kits completos y discutir los formatos disponibles. Respondemos en 48h.',
    c_bc1_t:'Stats reales', c_bc1_d:'Datos de YouTube actualizados automáticamente.',
    c_bc2_t:'Audiencias de nicho', c_bc2_d:'Comunidades comprometidas de tech y deporte.',
    c_bc3_t:'Respuesta rápida', c_bc3_d:'Respondemos en 48h. Media kits privados bajo pedido.',
    ct_hero_label:'Contacto', ct_hero_title:'Te <span class="accent-word">respondemos</span>',
    ct_hero_sub:'Un proyecto, una idea, una colaboración — aquí estamos.',
    ct_direct_label:'Contáctanos directamente', ct_direct_title:'Dos emails, dos temas',
    ct_ch1_label:'Soporte y general', ct_ch1_desc:'Preguntas sobre el estudio, proyectos, feedback de usuarios.',
    ct_ch2_label:'Partnerships y marcas', ct_ch2_desc:'Colaboraciones, media kits, patrocinios.',
    ct_ch3_label:'GitHub', ct_ch3_desc:'Código fuente y proyectos públicos.',
    ct_form_title:'Envíanos un mensaje', ct_form_sub:'Rellena este formulario o escríbenos directamente por email.',
    ct_lbl_firstname:'Nombre', ct_lbl_email:'Email',
    ct_lbl_subject:'Asunto', ct_opt_none:'Elige un asunto...',
    ct_opt_project:'Un proyecto o idea', ct_opt_collab:'Colaboración creador',
    ct_opt_brand:'Partnership de marca', ct_opt_kit:'Solicitud de media kit',
    ct_opt_other:'Otro',
    ct_lbl_message:'Mensaje', ct_ph_message:'Cuéntanos qué tienes en mente...',
    ct_btn_send:'Enviar mensaje',
    ct_note:'Al enviar este formulario, aceptas ser contactado por email.',
    ct_success_title:'¡Mensaje enviado!', ct_success_sub:'Gracias por tu mensaje. Te respondemos en 48h.',
    ct_faq_label:'FAQ', ct_faq_title:'Preguntas frecuentes',
    ct_faq1_q:'¿Aceptáis proyectos freelance?', ct_faq1_a:'OKALAM Studio se centra en sus propios proyectos. No aceptamos misiones freelance clásicas por ahora.',
    ct_faq2_q:'¿Cómo funciona el apoyo a creadores?', ct_faq2_a:'Seleccionamos pocos perfiles. Trabajamos en imagen, presentación a marcas, media kits y estrategia de partnership.',
    ct_faq3_q:'Soy una marca, ¿cómo obtengo un media kit?', ct_faq3_a:'Envía un email a partnerships@okalamstudio.com indicando el creador. Te mandamos el enlace privado en 24h.',
    ct_faq4_q:'¿Cuándo lanzan VoteDay y Little ToT?', ct_faq4_a:'Ambos proyectos están en desarrollo. Sin fecha anunciada aún.',
  },
  pt: {
    nav_studio:'Estúdio', nav_projects:'Projetos', nav_collabs:'Colaborações',
    nav_games:'Jogos', nav_contact:'Contato',
    footer_tagline:'Estúdio criativo independente. Sempre em movimento.',
    footer_nav:'Navegação', footer_contact:'Contato',
    footer_home:'Início', footer_copy:'© 2026 OKALAM Studio. Todos os direitos reservados.',
    studio_hero_label:'Sobre',
    studio_hero_title:'O <span class="accent-word">Estúdio</span>',
    studio_hero_sub:'Um laboratório criativo independente na interseção de tecnologia, jogos e narrativa.',
    studio_manifeste_label:'Manifesto',
    studio_manifeste_quote:'Somos um <em>formigueiro criativo</em> — sempre construindo, experimentando, criando.',
    studio_manifeste_p1:'OKALAM Studio nasceu de uma convicção simples: as melhores ideias não pertencem a grandes estruturas. Emergem da obsessão, liberdade e coragem de não se encaixar.',
    studio_manifeste_p2:'Construímos apps que queremos usar. Criamos jogos que queremos jogar. Experimentamos com IA porque nos apaixona — não porque está na moda.',
    studio_manifeste_p3:'Estúdio independente. Zero concessões. Sempre em movimento.',
    studio_v1_title:'Curiosidade', studio_v1_desc:'Primeiro exploramos. Depois decidimos. Cada projeto começa com uma pergunta sincera.',
    studio_v2_title:'Movimento', studio_v2_desc:'Preferimos um protótipo imperfeito a um plano perfeito. A ação cria clareza.',
    studio_v3_title:'Intenção', studio_v3_desc:'Cada pixel, cada linha de código, cada palavra está lá por um motivo.',
    studio_v4_title:'Honestidade', studio_v4_desc:'Dizemos o que fazemos. Fazemos o que dizemos. Sem marketing vazio.',
    studio_pillars_label:'O que fazemos',
    studio_pillars_title:'As 4 dimensões do estúdio',
    studio_p1_name:'Apps móveis', studio_p1_desc:'Experiências iOS nativas pensadas para o dia a dia.',
    studio_p2_name:'Jogos narrativos', studio_p2_desc:'Universos onde cada escolha tem peso. Histórias que você joga, não apenas assiste.',
    studio_p3_name:'IA & Automação', studio_p3_desc:'IA como amplificador criativo, não atalho.',
    studio_p4_name:'Tech criativa', studio_p4_desc:'Experiências web interativas, mini-ferramentas. Se é digital e interessante, tentamos.',
    studio_ai_label:'Nossa posição sobre IA',
    studio_ai_text:'Usamos IA como ferramenta — <em>nunca como substituto</em> da criatividade humana. Som e visual são sempre criados com artistas reais.',
    studio_ai_sub:'A IA nos ajuda a avançar mais rápido, prototipar de forma mais inteligente, pensar maior. Mas a alma de cada projeto vem de pessoas reais.',
    studio_cta_title:'Pronto para trabalhar juntos?',
    studio_cta_sub:'Um projeto, uma ideia, uma colaboração — estamos aqui.',
    studio_cta_projects:'Ver projetos', studio_cta_contact:'Entrar em contato',
    proj_hero_label:'Projetos', proj_hero_title:'O que estamos <span class="accent-word">construindo</span>',
    proj_hero_sub:'Duas ideias em desenvolvimento — construídas com cuidado, lançadas quando prontas.',
    proj_status:'Em desenvolvimento',
    proj_vd_desc:'Uma pergunta. Todos os dias. Para todos. Um app social que conecta pessoas através de micro-votos diários.',
    proj_vd_f1:'<strong>Uma questão diária</strong> — cuidadosamente escolhida, sempre relevante',
    proj_vd_f2:'<strong>Descoberta de opiniões</strong> — ver como o mundo responde',
    proj_vd_f3:'<strong>Comunidade autêntica</strong> — sem algoritmo, sem toxicidade',
    proj_vd_f4:'<strong>Multilíngue desde o início</strong> — projetado para audiência global',
    proj_vd_inprogress:'Projeto em desenvolvimento. Ainda não disponível.',
    proj_lt_desc:'Um RPG de bolso em tempo real. O tempo que passa na sua vida é o tempo que passa no jogo.',
    proj_lt_f1:'<strong>Tempo real</strong> — o jogo roda continuamente',
    proj_lt_f2:'<strong>Biomas e exploração</strong> — deserto, montanha e mais',
    proj_lt_f3:'<strong>Sistema RPG completo</strong> — Resistência, Combate, Sorte, níveis, XP',
    proj_lt_f4:'<strong>Ritmo natural</strong> — sono e ciclos dia/noite fazem parte do gameplay',
    proj_lt_inprogress:'Protótipo funcional sendo finalizado.',
    proj_more_label:'E depois?', proj_more_title:'Mais ideias em gestação',
    proj_more_desc:'O estúdio nunca dorme. VoteDay e Little ToT são apenas o começo.',
    proj_more_cta:'Tem uma ideia? Vamos conversar',
    c_sub:'OKALAM Studio apoia um pequeno número de criadores independentes.',
    c_what_label:'O que somos', c_what_lead:'Um estúdio independente que <em>realmente ajuda</em> criadores a parecer profissionais.',
    c_what_p1:'Além de desenvolver seus próprios projetos digitais, OKALAM Studio apoia criadores independentes cuidadosamente selecionados.',
    c_what_p2:'Não é gestão. Não é uma agência de influência. É um suporte estruturado, humano e personalizado.',
    c_what_p3:'Trabalhamos em profundidade, não em volume.',
    c_v1_t:'Independente e humano', c_v1_d:'Sem clima de grande agência. Trabalhamos próximo, honesto e real.',
    c_v2_t:'Estruturado e credível', c_v2_d:'Apresentação profissional para marcas. Media kits, stats, formatos.',
    c_v3_t:'Elegante e específico', c_v3_d:'Abordagem personalizada para cada criador.',
    c_serv_label:'O que fazemos', c_serv_title:'Suporte concreto',
    c_s1_t:'Media kit profissional', c_s1_d:'Uma página privada polida e estruturada para enviar a marcas.',
    c_s2_t:'Stats e métricas', c_s2_d:'Suas estatísticas do YouTube, Instagram e TikTok formatadas claramente.',
    c_s3_t:'Estratégia de parceria', c_s3_d:'Identificar marcas compatíveis, abordagem, negociação.',
    c_s4_t:'Posicionamento e imagem', c_s4_d:'Reformular seu universo editorial para que marcas entendam quem você é.',
    c_cr_label:'Criadores apoiados', c_cr_title:'Dois perfis, dois universos',
    c_cr_note:'Media kits completos disponíveis sob pedido. <strong>Você é uma marca?</strong> Entre em contato para receber o link de acesso privado.',
    c_p1_niche:'Tech · VE · Energia', c_p1_title:'Criador #1 — Tech e Veículos Elétricos',
    c_p1_desc:'Testes reais, unboxing e análises de VE e energia solar.',
    c_p1_btn:'Solicitar media kit →',
    c_p2_niche:'Corrida · Esporte · Lifestyle', c_p2_title:'Criador #2 — Corrida e Esporte',
    c_p2_desc:'Corrida, compartilhamento e motivação desde 2011.',
    c_p2_btn:'Solicitar media kit →',
    c_b_label:'Para marcas', c_b_title:'Vamos falar sobre sua próxima parceria.',
    c_b_sub:'Envie uma mensagem para receber media kits completos e discutir formatos disponíveis. Respondemos em 48h.',
    c_bc1_t:'Stats reais', c_bc1_d:'Dados do YouTube atualizados automaticamente.',
    c_bc2_t:'Audiências de nicho', c_bc2_d:'Comunidades engajadas de tech e esporte.',
    c_bc3_t:'Resposta rápida', c_bc3_d:'Respondemos em 48h. Media kits privados sob pedido.',
    ct_hero_label:'Contato', ct_hero_title:'Nós <span class="accent-word">respondemos</span>',
    ct_hero_sub:'Um projeto, uma ideia, uma colaboração — estamos aqui.',
    ct_direct_label:'Entre em contato', ct_direct_title:'Dois emails, dois assuntos',
    ct_ch1_label:'Suporte e geral', ct_ch1_desc:'Perguntas sobre o estúdio, projetos, feedback.',
    ct_ch2_label:'Parcerias e marcas', ct_ch2_desc:'Colaborações, media kits, patrocínios.',
    ct_ch3_label:'GitHub', ct_ch3_desc:'Código fonte e projetos públicos.',
    ct_form_title:'Envie uma mensagem', ct_form_sub:'Preencha este formulário ou escreva diretamente por email.',
    ct_lbl_firstname:'Nome', ct_lbl_email:'Email',
    ct_lbl_subject:'Assunto', ct_opt_none:'Escolha um assunto...',
    ct_opt_project:'Um projeto ou ideia', ct_opt_collab:'Colaboração criador',
    ct_opt_brand:'Parceria de marca', ct_opt_kit:'Solicitação de media kit',
    ct_opt_other:'Outro',
    ct_lbl_message:'Mensagem', ct_ph_message:'Nos diga o que tem em mente...',
    ct_btn_send:'Enviar mensagem',
    ct_note:'Ao enviar este formulário, você concorda em ser contatado por email.',
    ct_success_title:'Mensagem enviada!', ct_success_sub:'Obrigado pela sua mensagem. Respondemos em 48h.',
    ct_faq_label:'FAQ', ct_faq_title:'Perguntas frequentes',
    ct_faq1_q:'Vocês aceitam projetos freelance?', ct_faq1_a:'OKALAM Studio foca em seus próprios projetos. Não aceitamos missões freelance clássicas por ora.',
    ct_faq2_q:'Como funciona o suporte a criadores?', ct_faq2_a:'Selecionamos poucos perfis. Trabalhamos em imagem, apresentação a marcas, media kits e estratégia.',
    ct_faq3_q:'Sou uma marca, como obter um media kit?', ct_faq3_a:'Envie email para partnerships@okalamstudio.com indicando o criador. Enviamos o link privado em 24h.',
    ct_faq4_q:'Quando lançam VoteDay e Little ToT?', ct_faq4_a:'Ambos os projetos estão em desenvolvimento. Sem data anunciada ainda.',
  },
};

// ── Inject vertical flag picker ──────────────────────────────
(function injectFlags(){
  const picker = document.createElement('div');
  picker.className = 'flag-picker-sidebar';
  picker.innerHTML = `
    <button class="flag-btn-s" data-lang="en" title="English">🇬🇧</button>
    <button class="flag-btn-s" data-lang="fr" title="Français">🇫🇷</button>
    <button class="flag-btn-s" data-lang="ja" title="日本語">🇯🇵</button>
    <button class="flag-btn-s" data-lang="zh" title="中文">🇨🇳</button>
    <button class="flag-btn-s" data-lang="es" title="Español">🇪🇸</button>
    <button class="flag-btn-s" data-lang="pt" title="Português">🇵🇹</button>
  `;
  picker.querySelectorAll('.flag-btn-s').forEach(btn => {
    btn.addEventListener('click', () => applyLang(btn.getAttribute('data-lang')));
  });
  document.body.appendChild(picker);
})();

// ── Translation engine ────────────────────────────────────────
function applyLang(l) {
  if (!T[l]) l = 'en';
  localStorage.setItem('okalam_lang', l);
  document.documentElement.lang = l;
  const t = T[l];

  // Flag sidebar active state
  document.querySelectorAll('.flag-btn-s').forEach(b =>
    b.classList.toggle('active', b.getAttribute('data-lang') === l)
  );

  // Apply translations by data-i18n attribute
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.getAttribute('data-i18n');
    if (t[key] !== undefined) el.innerHTML = t[key];
  });

  // Apply placeholder translations
  document.querySelectorAll('[data-i18n-ph]').forEach(el => {
    const key = el.getAttribute('data-i18n-ph');
    if (t[key] !== undefined) el.placeholder = t[key];
  });

  // Apply value translations (select options text)
  document.querySelectorAll('[data-i18n-val]').forEach(el => {
    const key = el.getAttribute('data-i18n-val');
    if (t[key] !== undefined) el.textContent = t[key];
  });

  // Also keep index.html setLang in sync if present
  if (typeof setLang === 'function') setLang(l);
  // Apply page-specific translations (studio, projets, collabs, contact)
  if (typeof applyPageTranslations === 'function') applyPageTranslations(l);
}

// Init on page load
(function(){
  const saved = localStorage.getItem('okalam_lang');
  const browser = navigator.language.slice(0,2);
  const langs = ['en','fr','ja','zh','es','pt'];
  const active = saved || (langs.includes(browser) ? browser : 'en');
  // Wait for DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => applyLang(active));
  } else {
    applyLang(active);
  }
})();

// Legacy compat for index.html which calls sharedSetLang
function sharedSetLang(l){ applyLang(l); }
