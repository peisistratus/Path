# Astro site (Axis notes)

This folder is a new static site layer for peisistratus.com.

## Content source of truth
- Write in Obsidian vault: /Users/mair/clawd/Path
- Sync into this repo's `content/` folder before building/deploying.

## Local dev
```bash
cd astro-site
npm run dev
```

## Build
```bash
cd astro-site
npm run build
```

## Deploy (GitHub Pages)
Workflow should build `astro-site` and publish `astro-site/dist`.

## Sync content
Use `../scripts/sync_obsidian_vault.sh`.
