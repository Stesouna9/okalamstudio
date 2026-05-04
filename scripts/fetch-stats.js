#!/usr/bin/env node
// fetch-stats.js — calls Apify actors fresh each run, writes data/stats.json.
// Why fresh runs vs hardcoded dataset IDs: Apify FREE plan deletes datasets after 7 days,
// so persistent IDs eventually 404. Fresh runs cost ~$0.015 each — well within $5/mo credit.

const TOKEN = process.env.APIFY_TOKEN;
if (!TOKEN) {
  console.error('ERROR: Missing APIFY_TOKEN secret.');
  console.error('Go to GitHub repo → Settings → Secrets → Actions → add APIFY_TOKEN');
  process.exit(1);
}

const ACTORS = {
  youtube:   'streamers~youtube-channel-scraper',
  instagram: 'apify~instagram-profile-scraper',
  tiktok:    'clockworks~free-tiktok-scraper'
};

const HANDLES = {
  elisa:  { ytUrl: 'https://www.youtube.com/@elisaisrunning', ig: 'elisa_is_running', tt: 'elisa.is.running' },
  pierre: { ytUrl: 'https://www.youtube.com/@TeslaBurger',    ig: 'tesla_burger',     tt: 'teslaburger1' }
};

async function runActor(actor, input) {
  const url = `https://api.apify.com/v2/acts/${actor}/run-sync-get-dataset-items?token=${TOKEN}&timeout=300`;
  const r = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(input)
  });
  if (!r.ok) {
    throw new Error(`Actor ${actor}: HTTP ${r.status} — ${(await r.text()).slice(0, 200)}`);
  }
  return r.json();
}

function calcIGEngagement(igData) {
  const posts = igData?.latestPosts || [];
  if (!posts.length || !igData?.followersCount) return null;
  const avgEng = posts.reduce((s, p) => s + (p.likesCount || 0) + (p.commentsCount || 0), 0) / posts.length;
  return parseFloat(((avgEng / igData.followersCount) * 100).toFixed(2));
}

async function main() {
  console.log('Calling Apify actors (fresh runs)...');
  const [yt, ig, tt] = await Promise.all([
    runActor(ACTORS.youtube, {
      startUrls: [{ url: HANDLES.elisa.ytUrl }, { url: HANDLES.pierre.ytUrl }],
      maxResults: 0,
      maxResultsShorts: 0,
      maxResultStreams: 0
    }),
    runActor(ACTORS.instagram, {
      usernames: [HANDLES.elisa.ig, HANDLES.pierre.ig]
    }),
    runActor(ACTORS.tiktok, {
      profiles: [HANDLES.elisa.tt, HANDLES.pierre.tt],
      resultsPerPage: 1,
      profileSorting: 'latest',
      excludePinnedPosts: false
    })
  ]);
  console.log(`  YT items=${yt.length}, IG items=${ig.length}, TT items=${tt.length}`);

  const elisaYT  = yt.find(c => /elisa/i.test(c.channelName || c.channelUsername || c.channelUrl || ''));
  const pierreYT = yt.find(c => /tesla|burger/i.test(c.channelName || c.channelUsername || c.channelUrl || ''));
  const elisaIG  = ig.find(c => /elisa/i.test(c.username || ''));
  const pierreIG = ig.find(c => /tesla|burger/i.test(c.username || ''));
  const elisaTT  = tt.find(c => /elisa/i.test(c.authorMeta?.name || c.authorMeta?.nickName || ''));
  const pierreTT = tt.find(c => /tesla|burger/i.test(c.authorMeta?.name || c.authorMeta?.nickName || ''));

  const fs = await import('fs');
  let prev = {};
  try { prev = JSON.parse(fs.readFileSync('data/stats.json', 'utf8')); } catch {}

  const stats = {
    updated_at: new Date().toISOString(),
    elisa: {
      youtube: elisaYT ? {
        subscribers: elisaYT.numberOfSubscribers,
        views:       elisaYT.channelTotalViews,
        videos:      elisaYT.numberOfVideos,
        noxScore:    prev.elisa?.youtube?.noxScore ?? null,
        engagement:  prev.elisa?.youtube?.engagement ?? null,
        avgViewsPerVideo: elisaYT.channelTotalViews && elisaYT.numberOfVideos
          ? Math.round(elisaYT.channelTotalViews / elisaYT.numberOfVideos)
          : (prev.elisa?.youtube?.avgViewsPerVideo ?? null)
      } : prev.elisa?.youtube ?? null,
      instagram: elisaIG ? {
        followers:  elisaIG.followersCount,
        posts:      elisaIG.postsCount,
        verified:   elisaIG.verified ?? true,
        engagement: calcIGEngagement(elisaIG) ?? prev.elisa?.instagram?.engagement ?? null
      } : prev.elisa?.instagram ?? null,
      tiktok: elisaTT ? {
        followers: elisaTT.authorMeta?.fans,
        likes:     elisaTT.authorMeta?.heart,
        videos:    elisaTT.authorMeta?.video,
        engagement: prev.elisa?.tiktok?.engagement ?? null,
        avgViewsPerVideo: prev.elisa?.tiktok?.avgViewsPerVideo ?? null,
        topVideoViews: prev.elisa?.tiktok?.topVideoViews ?? null
      } : prev.elisa?.tiktok ?? null
    },
    pierre: {
      youtube: pierreYT ? {
        subscribers: pierreYT.numberOfSubscribers,
        views:       pierreYT.channelTotalViews,
        videos:      pierreYT.numberOfVideos,
        noxScore:    prev.pierre?.youtube?.noxScore ?? null,
        engagement:  prev.pierre?.youtube?.engagement ?? null,
        avgViewsPerVideo: pierreYT.channelTotalViews && pierreYT.numberOfVideos
          ? Math.round(pierreYT.channelTotalViews / pierreYT.numberOfVideos)
          : (prev.pierre?.youtube?.avgViewsPerVideo ?? null)
      } : prev.pierre?.youtube ?? null,
      instagram: pierreIG ? {
        followers:  pierreIG.followersCount,
        posts:      pierreIG.postsCount,
        verified:   pierreIG.verified ?? false,
        engagement: calcIGEngagement(pierreIG) ?? prev.pierre?.instagram?.engagement ?? null,
        avgViewsPerPost: prev.pierre?.instagram?.avgViewsPerPost ?? null
      } : prev.pierre?.instagram ?? null,
      tiktok: pierreTT ? {
        followers: pierreTT.authorMeta?.fans,
        likes:     pierreTT.authorMeta?.heart,
        videos:    pierreTT.authorMeta?.video,
        engagement: prev.pierre?.tiktok?.engagement ?? null,
        avgViewsPerVideo: prev.pierre?.tiktok?.avgViewsPerVideo ?? null
      } : prev.pierre?.tiktok ?? null
    }
  };

  fs.mkdirSync('data', { recursive: true });
  fs.writeFileSync('data/stats.json', JSON.stringify(stats, null, 2));

  // Append snapshot to history (keep last 90 days, dedupe same-day)
  let history = [];
  try { history = JSON.parse(fs.readFileSync('data/stats-history.json', 'utf8')); } catch {}
  const today = stats.updated_at.slice(0, 10);
  history = history.filter(h => h.date !== today);
  history.push({
    date: today,
    elisa: {
      yt: stats.elisa.youtube?.subscribers ?? null,
      ytViews: stats.elisa.youtube?.views ?? null,
      ig: stats.elisa.instagram?.followers ?? null,
      tt: stats.elisa.tiktok?.followers ?? null,
    },
    pierre: {
      yt: stats.pierre.youtube?.subscribers ?? null,
      ytViews: stats.pierre.youtube?.views ?? null,
      ig: stats.pierre.instagram?.followers ?? null,
      tt: stats.pierre.tiktok?.followers ?? null,
    },
  });
  const cutoff = new Date(Date.now() - 90 * 86400000).toISOString().slice(0, 10);
  history = history.filter(h => h.date >= cutoff).sort((a, b) => a.date.localeCompare(b.date));
  fs.writeFileSync('data/stats-history.json', JSON.stringify(history, null, 2));

  console.log('✓ data/stats.json updated at', stats.updated_at);
  console.log('✓ data/stats-history.json —', history.length, 'snapshots');
  console.log('  Elisa  YT:', stats.elisa.youtube?.subscribers, 'subs |', stats.elisa.youtube?.views, 'views');
  console.log('  Elisa  IG:', stats.elisa.instagram?.followers, 'followers');
  console.log('  Elisa  TT:', stats.elisa.tiktok?.followers, 'followers');
  console.log('  Pierre YT:', stats.pierre.youtube?.subscribers, 'subs |', stats.pierre.youtube?.views, 'views');
  console.log('  Pierre IG:', stats.pierre.instagram?.followers, 'followers');
  console.log('  Pierre TT:', stats.pierre.tiktok?.followers, 'followers');
}

main().catch(err => { console.error(err); process.exit(1); });
