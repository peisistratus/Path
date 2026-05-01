#!/usr/bin/env bash
set -euo pipefail

# Sync Obsidian vault -> repo content/ directory.
# This keeps GitHub Pages builds reproducible (CI can't access your local vault path).

VAULT_SRC="/Users/mair/clawd/Path"
REPO_ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$REPO_ROOT/content"

if [[ ! -d "$VAULT_SRC" ]]; then
  echo "Vault source not found: $VAULT_SRC" >&2
  exit 1
fi

mkdir -p "$DEST"

echo "Syncing vault -> repo"
echo "  from: $VAULT_SRC"
echo "  to:   $DEST"

# Copy markdown + attachments you want published.
# Tweak includes/excludes as desired.
rsync -av --delete \
  --exclude ".obsidian/" \
  --exclude ".trash/" \
  --exclude ".DS_Store" \
  --exclude "**/.DS_Store" \
  "$VAULT_SRC/" "$DEST/"

echo "Done. Review with: git status"
