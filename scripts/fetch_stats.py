#!/usr/bin/env python3
"""
OKALAM Studio — Creator Stats Fetcher
Runs daily via GitHub Actions.
Fetches YouTube channel stats and updates data/creators.json.
"""

import os, json, requests
from datetime import datetime, timezone

API_KEY = os.environ.get("YOUTUBE_API_KEY")
DATA_FILE = "data/creators.json"

CHANNELS = {
    "tesla-burger": {
        "youtube_id": "UCrbI9_VkZ2ndzvgmKN3SfIw",
        "youtube_handle": "@TeslaBurger",
    },
    "elisa-running": {
        "youtube_id": None,
        "youtube_handle": "@elisaisrunning",
    },
}

def get_channel_stats(channel_id):
    url = "https://www.googleapis.com/youtube/v3/channels"
    params = {"part": "statistics,snippet", "id": channel_id, "key": API_KEY}
    resp = requests.get(url, params=params, timeout=10)
    resp.raise_for_status()
    items = resp.json().get("items", [])
    if not items:
        return {}
    stats = items[0]["statistics"]
    snippet = items[0]["snippet"]
    return {
        "subscribers": int(stats.get("subscriberCount", 0)),
        "total_views": int(stats.get("viewCount", 0)),
        "video_count": int(stats.get("videoCount", 0)),
        "title": snippet.get("title", ""),
    }

def resolve_handle_to_id(handle):
    url = "https://www.googleapis.com/youtube/v3/channels"
    params = {"part": "id", "forHandle": handle.lstrip("@"), "key": API_KEY}
    resp = requests.get(url, params=params, timeout=10)
    resp.raise_for_status()
    items = resp.json().get("items", [])
    return items[0]["id"] if items else None

def fmt(n):
    if n >= 1_000_000:
        return f"{n/1_000_000:.1f}M"
    elif n >= 1_000:
        return f"{n/1_000:.1f}k"
    return str(n)

def main():
    if not API_KEY:
        print("❌ YOUTUBE_API_KEY not set.")
        return

    existing = {}
    if os.path.exists(DATA_FILE):
        with open(DATA_FILE, "r", encoding="utf-8") as f:
            existing = json.load(f)

    now = datetime.now(timezone.utc).strftime("%Y-%m")
    updated = False

    for slug, cfg in CHANNELS.items():
        print(f"\n→ {slug}...")
        channel_id = cfg["youtube_id"]
        if not channel_id:
            channel_id = resolve_handle_to_id(cfg["youtube_handle"])
            if not channel_id:
                print("  ⚠️  Could not resolve handle.")
                continue

        try:
            stats = get_channel_stats(channel_id)
            if not stats:
                continue
            entry = existing.get(slug, {})
            entry["youtube"] = {
                "channel_id": channel_id,
                "handle": cfg["youtube_handle"],
                "url": f"https://youtube.com/{cfg['youtube_handle']}",
                "subscribers_raw": stats["subscribers"],
                "subscribers": fmt(stats["subscribers"]),
                "total_views_raw": stats["total_views"],
                "total_views": fmt(stats["total_views"]),
                "video_count": stats["video_count"],
                "title": stats["title"],
            }
            entry["last_updated_youtube"] = now
            existing[slug] = entry
            updated = True
            print(f"  ✅ {stats['title']}: {fmt(stats['subscribers'])} subs, {fmt(stats['total_views'])} views")
        except Exception as e:
            print(f"  ❌ Error: {e}")

    if updated:
        os.makedirs(os.path.dirname(DATA_FILE), exist_ok=True)
        with open(DATA_FILE, "w", encoding="utf-8") as f:
            json.dump(existing, f, ensure_ascii=False, indent=2)
        print(f"\n✅ {DATA_FILE} updated.")

if __name__ == "__main__":
    main()
