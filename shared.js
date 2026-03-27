// ── OKALAM Studio — Shared JS ──────────────────────────────────

// Scroll nav
const nav = document.querySelector('.ok-nav');
if(nav) window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
const hamburger = document.querySelector('.ok-nav-hamburger');
const links = document.querySelector('.ok-nav-links');
if(hamburger && links){
  hamburger.addEventListener('click', () => {
    links.classList.toggle('open');
    hamburger.classList.toggle('open');
  });
  links.querySelectorAll('.ok-nav-link, .ok-nav-cta').forEach(l =>
    l.addEventListener('click', () => links.classList.remove('open'))
  );
}

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
