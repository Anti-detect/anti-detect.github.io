# Copilot Instructions for anti-detect.github.io

## Project Overview
This is a static website focused on Multilogin and anti-detect browser topics. The site is organized into topic-specific folders, each containing an `index.html` for individual articles or guides. The root contains global assets and configuration files.

## Architecture & Structure
- **Content Organization:**
  - Each major topic (e.g., `multilogin-review-2025`, `multilogin-for-cpa-marketing`) is a folder with its own `index.html`.
  - The `posts/` directory contains individual articles as HTML files.
  - Shared resources (images, scripts, styles) are in `assets/`.
- **Global Files:**
  - `index.html` (homepage)
  - `data.js` (site-wide data/config)
  - `robots.txt`, `rss.xml`, `sitemap.xml`, `sitemap-full.xml` (SEO and site structure)

## Developer Workflows
- **Content Updates:**
  - Add new articles by creating a folder with an `index.html` or adding to `posts/`.
  - Update navigation or listings in `index.html` or `data.js` as needed.
- **Automation:**
  - Use `auto-push.sh` for automated git pushes (requires bash, not native to Windows PowerShell).
- **SEO & Feeds:**
  - Update `sitemap.xml`, `sitemap-full.xml`, and `rss.xml` when adding new content.

## Conventions & Patterns
- **Naming:**
  - Folder and file names are descriptive and use hyphens for separation.
  - Article folders always contain a single `index.html`.
- **HTML Structure:**
  - Articles follow a consistent HTML layout for easy styling and SEO.
- **No Build System:**
  - No static site generator or build step; all files are hand-authored HTML/JS.

## Integration Points
- **External Dependencies:**
  - Minimal; most content is static. Any JS libraries should be referenced in `assets/`.
- **Cross-Component Communication:**
  - Site-wide data or config is managed in `data.js`.

## Examples
- To add a new review for 2026:
  1. Create `multilogin-review-2026/index.html`.
  2. Update `sitemap.xml` and `rss.xml`.
  3. Optionally update navigation in `index.html` and `data.js`.

## Key Files & Directories
- `index.html` (homepage)
- `data.js` (site-wide config)
- `assets/` (shared resources)
- `posts/` (individual articles)
- Topic folders (e.g., `multilogin-review-2025/`)

---

For questions or unclear conventions, review existing topic folders and the homepage for examples. If automation is needed, consider scripting updates to SEO files.
