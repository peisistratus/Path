#!/usr/bin/env python3
"""Sync Obsidian vault -> repo content/ with URL-safe paths.

Why:
- Astro content collections require URL-safe slugs.
- We also want to preserve existing Quartz/Pages URLs (hyphenated paths).

Rules (adjust as needed):
- spaces -> '-'
- '&' -> '--and--'
- collapse repeated '-'

This is intentionally conservative: it copies only a subset of file types.
"""

from __future__ import annotations

import os
import re
import shutil
from pathlib import Path

VAULT_SRC = Path(os.environ.get("PEIS_VAULT_SRC") or "/Users/mair/clawd/Path").resolve()
REPO_ROOT = Path(__file__).resolve().parent.parent
DEST = (REPO_ROOT / "content").resolve()

ALLOW_EXT = {
    ".md",
    ".mdx",
    ".png",
    ".jpg",
    ".jpeg",
    ".gif",
    ".svg",
    ".webp",
    ".pdf",
    ".canvas",
}

EXCLUDE_DIRS = {".obsidian", ".trash"}


def slugify_piece(name: str) -> str:
    name = name.replace("&", "--and--")
    name = name.replace(" ", "-")
    name = re.sub(r"-+", "-", name)
    return name


def should_copy(p: Path) -> bool:
    if p.is_dir():
        return False
    if p.suffix.lower() not in ALLOW_EXT:
        return False
    parts = set(p.parts)
    if parts & EXCLUDE_DIRS:
        return False
    if p.name == ".DS_Store":
        return False
    return True


def main() -> None:
    if not VAULT_SRC.exists():
        raise SystemExit(f"Vault source not found: {VAULT_SRC}")

    # Clear dest
    if DEST.exists():
        shutil.rmtree(DEST)
    DEST.mkdir(parents=True, exist_ok=True)

    copied = 0
    for src in VAULT_SRC.rglob("*"):
        if src.is_dir() and src.name in EXCLUDE_DIRS:
            # skip subtree
            continue
        if not should_copy(src):
            continue

        rel = src.relative_to(VAULT_SRC)
        # slugify each path segment
        rel2 = Path(*[slugify_piece(x) for x in rel.parts])
        dst = DEST / rel2
        dst.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(src, dst)
        copied += 1

    print(f"Synced {copied} files")


if __name__ == "__main__":
    main()
