#!/usr/bin/env node
// fetch-stats.js — fetches Apify datasets and writes data/stats.json
// Run via GitHub Actions daily; token stored as repo secret APIFY_TOKEN

const TOKEN = process.env.APIFY_TOKEN;
if (!TOKEN) {
  console.error('ERROR: Missing APIFY_TOKEN secret.');
  console.error('Go to GitHub repo → Settings → Secrets → Actions → add APIFY_TOKEN');
  process.exit(1);
}

const DATASETS = {
  youtube:   'srx5Ltfgea7cquMCE',
  instagram: 'lZsYaugPwWnpk8I3D',
  tiktok:    'nfjxw3C1rIr1vVDzC'
};

async function fetchDS(id) {
  const url = `https://api.apify.com/v2/datasets/${id}/items?token=${TOKEN}&clean=true&limit=20`;
  const r = await fetch(url);
  if (!r.ok) throw new Error(`Dataset ${id}: HTTP ${r.status}`);
  return r.json();
}

function calcIGEngagement(igData) {
  const posts = igData?.latestPosts || [];
  if (!posts.length || !igData?.followersCount) return null;
  const avgEng = posts.reduce((s, p) => s + (p.likesCount || 0) + (p.commentsCount || 0), 0) / posts.length;
  return parseFloat(((avgEng / igData.followersCount) * 100).toFixed(2));
}

async function main() {
  console.log('Fetching Apify datasets...');
  const [yt, ig, tt] = await Promise.all([
    fetchDS(DATASETS.youtube),
    fetchDS(DATASETS.instagram),
    fetchDS(DATASETS.tiktok)
  ]);

  // Elisa = elisa_is_running, Pierre = tesla_burger
  const elisaYT  = yt.find(c => /elisa/i.test(c.channelName || ''));
  const pierreYT = yt.find(c => !/elisa/i.test(c.channelName || ''));
  const elisaIG  = ig.find(c => /elisa/i.test(c.username || ''));
  const pierreIG = ig.find(c => !/elisa/i.test(c.username || ''));
  const elisaTT  = tt.find(c => /elisa/i.test(c.authorMeta?.nickName || ''));
  const pierreTT = tt.find(c => !/elisa/i.test(c.authorMeta?.nickName || ''));

  // Current stats.json to use as fallback for missing fields
  let prev = {};
  try {
    const fs = await import('fs');
    prev = JSON.parse(fs.readFileSync('data/stats.json', 'utf8'));
  } catch { /* no previous file */ }

  const stats = {
    updated_at: new Date().toISOString(),
    elisa: {
      youtube: elisaYT ? {
        subscribers: elisaYT.numberOfSubscribers,
        views:       elisaYT.channelTotalViews,
        videos:      elisaYT.numberOfVideos,
        noxScore:    elisaYT.noxScore ?? prev.elisa?.youtube?.noxScore ?? null
      } : prev.elisa?.youtube ?? null,
      instagram: elisaIG ? {
        followers:  elisaIG.followersCount,
        posts:      elisaIG.postsCount,
        verified:   elisaIG.verified ?? true,
        engagement: calcIGEngagement(elisaIG) ?? prev.elisa?.instagram?.engagement ?? null
      } : prev.elisa?.instagram ?? { followers: 12760, posts: 1998, verified: true, engagement: null },
      tiktok: elisaTT ? {
        followers: elisaTT.authorMeta?.fans,
        likes:     elisaTT.authorMeta?.heart,
        videos:    elisaTT.authorMeta?.video,
        noxScore:  elisaTT.noxScore ?? prev.elisa?.tiktok?.noxScore ?? null
      } : prev.elisa?.tiktok ?? null
    },
    pierre: {
      youtube: pierreYT ? {
        subscribers: pierreYT.numberOfSubscribers,
        views:       pierreYT.channelTotalViews,
        videos:      pierreYT.numberOfVideos,
        noxScore:    pierreYT.noxScore ?? prev.pierre?.youtube?.noxScore ?? null
      } : prev.pierre?.youtube ?? null,
      instagram: pierreIG ? {
        followers:  pierreIG.followersCount,
        posts:      pierreIG.postsCount,
        verified:   pierreIG.verified ?? false,
        engagement: calcIGEngagement(pierreIG) ?? prev.pierre?.instagram?.engagement ?? null
      } : prev.pierre?.instagram ?? null,
      tiktok: pierreTT ? {
        followers: pierreTT.authorMeta?.fans,
        likes:     pierreTT.authorMeta?.heart,
        videos:    pierreTT.authorMeta?.video,
        noxScore:  pierreTT.noxScore ?? prev.pierre?.tiktok?.noxScore ?? null
      } : prev.pierre?.tiktok ?? null
    }
  };

  const fs = await import('fs');
  fs.mkdirSync('data', { recursive: true });
  fs.writeFileSync('data/stats.json', JSON.stringify(stats, null, 2));

  console.log('✓ data/stats.json updated at', stats.updated_at);
  console.log('  Elisa  YT:', stats.elisa.youtube?.subscribers, 'subs |', stats.elisa.youtube?.views, 'views');
  console.log('  Elisa  IG:', stats.elisa.instagram?.followers, 'followers');
  console.log('  Elisa  TT:', stats.elisa.tiktok?.followers, 'followers');
  console.log('  Pierre YT:', stats.pierre.youtube?.subscribers, 'subs |', stats.pierre.youtube?.views, 'views');
  console.log('  Pierre IG:', stats.pierre.instagram?.followers, 'followers');
  console.log('  Pierre TT:', stats.pierre.tiktok?.followers, 'followers');
}

main().catch(err => { console.error(err); process.exit(1); });
