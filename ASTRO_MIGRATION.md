# Astro migration notes

This repo now contains an `astro-site/` project that can replace Quartz for GitHub Pages deployment.

## Source-of-truth content
- Author in Obsidian: `/Users/mair/clawd/Path`
- Sync to repo before commit:
  ```bash
  ./scripts/sync_obsidian_vault.py
  ```

This writes URL-safe files into `content/` (spaces -> `-`, `&` -> `--and--`).

## Build locally
```bash
# 1) sync vault -> repo content/
./scripts/sync_obsidian_vault.py

# 2) run dev server
cd astro-site
npm ci
npm run dev
```

## One-command update + preview
```bash
./scripts/sync_obsidian_vault.py && (cd astro-site && npm run dev)
```

## GitHub Pages
`.github/workflows/deploy.yml` builds `astro-site` and publishes `astro-site/dist`.

## URL compatibility
We generate pages at both:
- `/<slug>/...`
- `/Path/<slug>/...`

This preserves existing `/Path/...` URLs while allowing cleaner root URLs.
