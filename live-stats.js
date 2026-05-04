// live-stats.js — fetches data/stats.json + data/stats-history.json (auto-updated by GitHub Actions)
// Injects values into [data-stat] + computes 30d deltas for [data-delta].
(async () => {
  const REPO = 'Stesouna9/okalamstudio';
  const WORKFLOW = 'update-stats.yml';

  const fmt = {
    kFR: n => n == null ? '—' : n >= 1e6
      ? (n / 1e6).toFixed(1).replace('.', ',').replace(',0M', 'M') + 'M'
      : n >= 1e3
        ? (n / 1e3).toFixed(1).replace('.', ',').replace(',0K', 'K') + 'K'
        : String(n),
    numFR: n => n == null ? '—' : Math.round(n).toLocaleString('fr-FR').replace(/,/g, ' '),
    pct: n => n == null ? '—' : (typeof n === 'number' ? n.toFixed(2).replace('.', ',') : '—') + '%',
    delta: (cur, prev) => {
      if (cur == null || prev == null || prev === 0) return null;
      const diff = cur - prev;
      const sign = diff > 0 ? '+' : (diff < 0 ? '−' : '');
      const abs = Math.abs(diff);
      const num = abs >= 1000 ? (abs / 1000).toFixed(1).replace('.', ',').replace(',0', '') + 'k' : Math.round(abs);
      return { text: `${sign}${num}`, dir: diff > 0 ? 'up' : (diff < 0 ? 'down' : 'flat') };
    },
    date: iso => {
      const lang = (document.documentElement.lang || 'fr').slice(0, 2);
      const map = { fr: 'fr-FR', en: 'en-GB', ja: 'ja-JP', zh: 'zh-CN', es: 'es-ES', pt: 'pt-PT' };
      return new Date(iso).toLocaleDateString(map[lang] || 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    }
  };

  function get(obj, path) {
    return path.split('.').reduce((o, k) => o?.[k], obj);
  }

  // Map data-stat path to history field
  function mapHistoryKey(statPath) {
    // e.g. "elisa.youtube.subscribers" -> { creator: "elisa", key: "yt" }
    const [creator, platform, metric] = statPath.split('.');
    const map = {
      'youtube.subscribers': 'yt',
      'youtube.views': 'ytViews',
      'instagram.followers': 'ig',
      'tiktok.followers': 'tt',
    };
    const key = map[`${platform}.${metric}`];
    return key ? { creator, key } : null;
  }

  function findOldest30d(history) {
    if (!history?.length) return null;
    const cutoff = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);
    // Find snapshot closest to but not after cutoff
    const before = history.filter(h => h.date <= cutoff);
    if (before.length) return before[before.length - 1];
    return history[0]; // oldest available if < 30d of history
  }

  try {
    const [statsR, histR] = await Promise.all([
      fetch('data/stats.json', { cache: 'no-store' }),
      fetch('data/stats-history.json', { cache: 'no-store' }).catch(() => null),
    ]);
    if (!statsR.ok) throw new Error('stats HTTP ' + statsR.status);
    const d = await statsR.json();
    const history = histR && histR.ok ? await histR.json() : null;
    const baseline = findOldest30d(history);

    // Inject stat values
    document.querySelectorAll('[data-stat]').forEach(el => {
      const v = get(d, el.dataset.stat);
      const f = el.dataset.fmt || 'kFR';
      if (v != null && fmt[f]) el.textContent = fmt[f](v);
    });

    // Inject deltas
    if (baseline) {
      document.querySelectorAll('[data-delta]').forEach(el => {
        const m = mapHistoryKey(el.dataset.delta);
        if (!m) return;
        const cur = get(d, el.dataset.delta);
        const prev = baseline[m.creator]?.[m.key];
        const dl = fmt.delta(cur, prev);
        if (!dl) {
          el.textContent = '';
          return;
        }
        el.textContent = `${dl.text} / 30j`;
        el.classList.add('delta-' + dl.dir);
      });
    }

    // Last update timestamp
    if (d.updated_at) {
      document.querySelectorAll('[data-updated]').forEach(el => {
        el.textContent = fmt.date(d.updated_at);
      });
    }

    document.querySelectorAll('.live-dot').forEach(el => el.classList.add('on'));
    document.querySelectorAll('.live-bar').forEach(el => el.classList.add('synced'));

    // Inject workflow badge
    document.querySelectorAll('[data-workflow-badge]').forEach(el => {
      const img = document.createElement('img');
      img.src = `https://github.com/${REPO}/actions/workflows/${WORKFLOW}/badge.svg`;
      img.alt = 'GitHub Actions status';
      img.style.cssText = 'height:18px;vertical-align:middle;border-radius:4px;';
      el.appendChild(img);
    });

  } catch (e) {
    console.warn('[live-stats] fetch failed:', e.message);
    document.querySelectorAll('.live-bar').forEach(el => el.classList.add('offline'));
  }
})();
