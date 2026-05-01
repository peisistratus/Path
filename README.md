# Path (Peisistratus)

This repo publishes **peisistratus.com** from an Obsidian vault.

## Source of truth
- Author in Obsidian vault: `/Users/mair/clawd/Path`
- Sync vault → repo content: `./scripts/sync_obsidian_vault.py`

## Local workflow

```bash
# sync Obsidian -> repo content/
./scripts/sync_obsidian_vault.py

# run site locally
cd astro-site
npm ci
npm run dev
```

## Build

```bash
./scripts/sync_obsidian_vault.py
cd astro-site
npm ci
npm run build
```

## Deploy
GitHub Pages builds the Astro site in `astro-site/` and publishes `astro-site/dist`.

## URL compatibility
Pages are generated at both:
- `/<slug>/...`
- `/Path/<slug>/...` (legacy compatibility)

See `ASTRO_MIGRATION.md` for more details.
