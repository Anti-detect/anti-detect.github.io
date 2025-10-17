# Copilot Instructions for anti-detect.github.io

Quick guide to make useful, targeted changes to this small Jekyll-based static site.

## What this repo is
- Minimal Jekyll site (see `_config.yml`). Pages and posts live in the repo — not a separate CMS.
- Multi-language site with language folders (`en`, `pt`, `ru`, `vi`, `zh`) and language-aware layout in `_layouts/default.html`.

## Key files and patterns you should know
- `_config.yml`: site config, languages, and plugins (jekyll-feed, jekyll-sitemap).
- `_layouts/default.html`: primary HTML template; language switcher and canonical/hreflang handling are implemented here.
- `_posts/`: blog posts (language subfolders). Follow file name/date conventions for Jekyll.
- `assets/`: CSS and JS used across pages. Prefer adding shared resources here instead of remote CDNs.
- `redirect-map.yml` + `tools/generate_redirects.py`: mapping of old -> new paths. The script generates simple meta-refresh HTML redirects.
- `index.html` and language subfolders: page content lives directly in these folders as standard Jekyll pages.

## Developer workflows (how to test and deploy)
- Local build: `bundle install && bundle exec jekyll serve` (see `README.md`). This launches a local server and rebuilds on change.
- CI / GitHub Pages: ensure the Actions workflow or Pages is configured to build the repo with Jekyll on `main`.
- Regenerate redirects: run `python tools/generate_redirects.py` to write static redirect pages from `redirect-map.yml`.

## Conventions and examples
- Multi-language pages: use `page.lang` front matter. Template uses `page.lang | default: site.default_lang` to determine current language and builds hreflang links in `_layouts/default.html`.
- New post: add file to `_posts/<lang>/YYYY-MM-DD-title.md` with Jekyll front matter (title, lang, canonical if needed).
- Static article page: create a folder with `index.html` (e.g., `multilogin-review-2025/index.html`).

## Small, actionable rules for PRs
- Preserve URLs: when removing or renaming pages, update `redirect-map.yml` and run `tools/generate_redirects.py` so the old links still work.
- Update SEO: remember to update `sitemap.xml`, `sitemap-full.xml`, and `rss.xml` where appropriate for new pages.
- Keep template changes minimal — the current layout includes required hreflang/canonical behavior.

## Examples from the repo
- Language switcher lives in `_layouts/default.html` and uses `site.languages` list from `_config.yml`.
- Redirect generation: `tools/generate_redirects.py` expects `redirect-map.yml` with simple `old: new` lines and generates meta-refresh pages.

## Useful checks for PR reviewers
- Build locally (`bundle exec jekyll serve`) and browse `/en/` and other language pages.
- Validate redirects by running the redirects script and opening generated HTML files.

---

If you want me to expand this with automated checks (Actions workflow, a small redirect test), tell me which you'd prefer and I can add it.
