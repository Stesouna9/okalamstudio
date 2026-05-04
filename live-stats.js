// live-stats.js — fetches data + injects values, animated count-up, sparkline charts.
(async () => {
  const fmt = {
    kFR: n => n == null ? '—' : n >= 1e6
      ? (n / 1e6).toFixed(1).replace('.', ',').replace(',0M', 'M') + 'M'
      : n >= 1e3
        ? (n / 1e3).toFixed(1).replace('.', ',').replace(',0K', 'K') + 'K'
        : String(Math.round(n)),
    numFR: n => n == null ? '—' : Math.round(n).toLocaleString('fr-FR').replace(/,/g, ' '),
    pct: n => n == null ? '—' : (typeof n === 'number' ? n.toFixed(2).replace('.', ',') : '—') + '%',
    delta: (cur, prev) => {
      if (cur == null || prev == null || prev === 0) return null;
      const diff = cur - prev;
      const sign = diff > 0 ? '+' : (diff < 0 ? '−' : '');
      const abs = Math.abs(diff);
      const num = abs >= 1000 ? (abs / 1000).toFixed(1).replace('.', ',').replace(',0', '') + 'k' : Math.round(abs);
      return { text: `${sign}${num}`, dir: diff > 0 ? 'up' : (diff < 0 ? 'down' : 'flat'), pct: ((diff / prev) * 100) };
    },
    date: iso => {
      const lang = (document.documentElement.lang || 'fr').slice(0, 2);
      const map = { fr: 'fr-FR', en: 'en-GB', ja: 'ja-JP', zh: 'zh-CN', es: 'es-ES', pt: 'pt-PT' };
      return new Date(iso).toLocaleDateString(map[lang] || 'fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
    }
  };

  const get = (obj, path) => path.split('.').reduce((o, k) => o?.[k], obj);

  function mapHistoryKey(statPath) {
    const [creator, platform, metric] = statPath.split('.');
    const map = {
      'youtube.subscribers': 'yt', 'youtube.views': 'ytViews',
      'instagram.followers': 'ig', 'tiktok.followers': 'tt',
    };
    const key = map[`${platform}.${metric}`];
    return key ? { creator, key } : null;
  }

  // Animated count-up: animates element textContent from 0 to target over duration ms.
  function countUp(el, target, fmtFn, duration = 1400) {
    if (target == null || isNaN(target)) {
      el.textContent = fmtFn(target);
      return;
    }
    const start = performance.now();
    const from = 0;
    const ease = t => 1 - Math.pow(1 - t, 3);
    function frame(now) {
      const t = Math.min(1, (now - start) / duration);
      const v = from + (target - from) * ease(t);
      el.textContent = fmtFn(t < 1 ? v : target);
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  // Build SVG sparkline path from array of values. Returns path string + fill area.
  function sparklinePath(values, w = 100, h = 30, pad = 2) {
    if (!values || values.length < 2) return null;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const range = max - min || 1;
    const dx = (w - pad * 2) / (values.length - 1);
    const points = values.map((v, i) => {
      const x = pad + i * dx;
      const y = pad + (h - pad * 2) * (1 - (v - min) / range);
      return [x, y];
    });
    let d = `M${points[0][0]},${points[0][1]}`;
    for (let i = 1; i < points.length; i++) {
      const [x0, y0] = points[i - 1];
      const [x1, y1] = points[i];
      const cx = (x0 + x1) / 2;
      d += ` Q${cx},${y0} ${cx},${(y0 + y1) / 2} T${x1},${y1}`;
    }
    const area = d + ` L${points[points.length - 1][0]},${h} L${points[0][0]},${h} Z`;
    return { line: d, area };
  }

  // Extract values for a creator+key from history (ordered by date)
  function extractSeries(history, creator, key) {
    return history
      .filter(h => h[creator]?.[key] != null)
      .sort((a, b) => a.date.localeCompare(b.date))
      .map(h => h[creator][key]);
  }

  function renderSparkline(svgEl, values, color, dir) {
    if (!values || values.length < 2) {
      svgEl.style.display = 'none';
      return;
    }
    const w = 120, h = 28;
    svgEl.setAttribute('viewBox', `0 0 ${w} ${h}`);
    svgEl.setAttribute('preserveAspectRatio', 'none');
    const p = sparklinePath(values, w, h, 3);
    if (!p) return;
    const gradId = 'sparkgrad-' + Math.random().toString(36).slice(2, 9);
    svgEl.innerHTML = `
      <defs>
        <linearGradient id="${gradId}" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stop-color="${color}" stop-opacity=".5"/>
          <stop offset="100%" stop-color="${color}" stop-opacity="0"/>
        </linearGradient>
      </defs>
      <path d="${p.area}" fill="url(#${gradId})"/>
      <path d="${p.line}" fill="none" stroke="${color}" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" filter="drop-shadow(0 0 6px ${color})"/>
      <circle cx="${w - 3}" cy="${(() => {
        const last = values[values.length - 1], min = Math.min(...values), max = Math.max(...values);
        return 3 + (h - 6) * (1 - (last - min) / ((max - min) || 1));
      })()}" r="2.5" fill="${color}"/>
    `;
    svgEl.classList.add('rendered', 'dir-' + dir);
  }

  try {
    const [statsR, histR] = await Promise.all([
      fetch('data/stats.json', { cache: 'no-store' }),
      fetch('data/stats-history.json', { cache: 'no-store' }).catch(() => null),
    ]);
    if (!statsR.ok) throw new Error('stats HTTP ' + statsR.status);
    const d = await statsR.json();
    const history = histR && histR.ok ? await histR.json() : [];

    // Inject stat values with optional count-up
    const numericStats = document.querySelectorAll('[data-stat]');
    const animatedTargets = new Map();
    numericStats.forEach(el => {
      const v = get(d, el.dataset.stat);
      const f = el.dataset.fmt || 'kFR';
      if (v == null || !fmt[f]) return;
      if (el.dataset.animate === 'false' || typeof v !== 'number') {
        el.textContent = fmt[f](v);
      } else {
        animatedTargets.set(el, { value: v, fmt: fmt[f] });
        el.textContent = fmt[f](0);
      }
    });

    // Trigger count-up when each animated element scrolls into view
    if (animatedTargets.size && 'IntersectionObserver' in window) {
      const io = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const data = animatedTargets.get(entry.target);
          if (!data) return;
          countUp(entry.target, data.value, data.fmt);
          animatedTargets.delete(entry.target);
          io.unobserve(entry.target);
        });
      }, { threshold: 0.3 });
      animatedTargets.forEach((_, el) => io.observe(el));
    } else {
      animatedTargets.forEach((data, el) => { el.textContent = data.fmt(data.value); });
    }

    // Render sparklines from history
    const cs = getComputedStyle(document.documentElement);
    const accent = cs.getPropertyValue('--el').trim() || cs.getPropertyValue('--cr').trim() || '#ff8c1a';
    document.querySelectorAll('[data-sparkline]').forEach(svg => {
      const m = mapHistoryKey(svg.dataset.sparkline);
      if (!m) return;
      const series = extractSeries(history, m.creator, m.key);
      const last = series[series.length - 1];
      const first = series[0];
      const dir = last > first ? 'up' : (last < first ? 'down' : 'flat');
      renderSparkline(svg, series, accent, dir);
    });

    // Inject deltas (subtle, paired with sparkline)
    if (history.length) {
      const cutoff = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10);
      const baseline = history.filter(h => h.date <= cutoff).slice(-1)[0] || history[0];
      document.querySelectorAll('[data-delta]').forEach(el => {
        const m = mapHistoryKey(el.dataset.delta);
        if (!m) return;
        const cur = get(d, el.dataset.delta);
        const prev = baseline?.[m.creator]?.[m.key];
        const dl = fmt.delta(cur, prev);
        if (!dl) { el.textContent = ''; return; }
        const arrow = dl.dir === 'up' ? '↗' : (dl.dir === 'down' ? '↘' : '→');
        el.innerHTML = `<span class="delta-arrow">${arrow}</span> ${dl.text}`;
        el.classList.add('delta-' + dl.dir);
      });
    }

    // Last update timestamp
    if (d.updated_at) {
      document.querySelectorAll('[data-updated]').forEach(el => {
        el.textContent = fmt.date(d.updated_at);
      });
    }
  } catch (e) {
    console.warn('[live-stats] fetch failed:', e.message);
  }
})();
