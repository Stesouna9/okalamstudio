// live-stats.js — fetches data/stats.json (auto-updated by GitHub Actions daily 6h UTC)
// and injects values into [data-stat] elements + updates [data-updated] timestamps.
(async () => {
  const fmt = {
    kFR: n => n == null ? '—' : n >= 1e6
      ? (n / 1e6).toFixed(1).replace('.', ',').replace(',0M', 'M') + 'M'
      : n >= 1e3
        ? (n / 1e3).toFixed(1).replace('.', ',').replace(',0K', 'K') + 'K'
        : String(n),
    numFR: n => n == null ? '—' : Math.round(n).toLocaleString('fr-FR').replace(/,/g, ' '),
    pct: n => n == null ? '—' : (typeof n === 'number' ? n.toFixed(2).replace('.', ',') : '—') + '%',
    bool: b => b ? '✓ Vérifié' : '—',
    date: iso => {
      const lang = (document.documentElement.lang || 'fr').slice(0, 2);
      const map = { fr: 'fr-FR', en: 'en-GB', ja: 'ja-JP', zh: 'zh-CN', es: 'es-ES', pt: 'pt-PT' };
      return new Date(iso).toLocaleDateString(map[lang] || 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    }
  };

  function get(obj, path) {
    return path.split('.').reduce((o, k) => o?.[k], obj);
  }

  try {
    const r = await fetch('data/stats.json', { cache: 'no-store' });
    if (!r.ok) throw new Error('HTTP ' + r.status);
    const d = await r.json();

    document.querySelectorAll('[data-stat]').forEach(el => {
      const v = get(d, el.dataset.stat);
      const f = el.dataset.fmt || 'kFR';
      if (v != null && fmt[f]) el.textContent = fmt[f](v);
    });

    if (d.updated_at) {
      document.querySelectorAll('[data-updated]').forEach(el => {
        el.textContent = fmt.date(d.updated_at);
      });
    }

    document.querySelectorAll('.live-dot').forEach(el => el.classList.add('on'));
    document.querySelectorAll('.live-bar').forEach(el => el.classList.add('synced'));
  } catch (e) {
    console.warn('[live-stats] fetch failed:', e.message);
    document.querySelectorAll('.live-bar').forEach(el => el.classList.add('offline'));
  }
})();
