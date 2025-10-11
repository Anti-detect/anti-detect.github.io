#!/usr/bin/env python3
"""
Simple SEO fixer for this static site.
- Ensures a canonical tag pointing to the GitHub Pages host for each index.html
- Ensures /assets/main.css is linked in the head
- Replaces common inline styles for images/videos with CSS classes
- Adds rel="noopener" to anchors with target="_blank"

Run from repo root: python tools/seo_fix.py
"""
from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
HOST = 'https://anti-detect.github.io'

# Process all .html files in the site, but skip assets, .github, tools folders
all_html = [p for p in ROOT.rglob('*.html')]
def is_skippable(p: Path):
    parts = [str(x).lower() for x in p.parts]
    skip_dirs = ('assets', '.github', 'tools')
    return any(d in parts for d in skip_dirs)

INDEX_FILES = sorted([p for p in all_html if not is_skippable(p)])
print(f"Found {len(INDEX_FILES)} .html files to check (excluded assets/.github/tools)")

# patterns (use triple-quoted raw strings to avoid quoting issues)
canonical_re = re.compile(r"""<link\s+rel=["']canonical["']\s+href=["']([^"']+)["']\s*/?>""", re.I)
og_url_re = re.compile(r"""<meta\s+property=["']og:url["']\s+content=["']([^"']+)["']\s*/?>""", re.I)
og_image_re = re.compile(r"""<meta\s+property=["']og:image["']\s+content=["']([^"']+)["']\s*/?>""", re.I)
link_css_re = re.compile(r"""<link\s+rel=["']stylesheet["']""")

for p in INDEX_FILES:
    try:
        s = p.read_text(encoding='utf-8')
    except Exception as e:
        print(f"Skip {p}: read error {e}")
        continue

    orig = s
    changed = False

    # 1) ensure stylesheet link in head
    if not link_css_re.search(s):
        s = s.replace('</head>', f'  <link rel="stylesheet" href="/assets/main.css" />\n</head>')
        changed = True

    # 2) ensure canonical points to the correct URL for this page
    # compute URL path
    rel_url = '/' + str(p.parent.relative_to(ROOT)).replace('\\', '/') + '/' if p.parent != ROOT else '/'
    page_url = HOST + rel_url
    if canonical_re.search(s):
        s = canonical_re.sub(f'<link rel="canonical" href="{page_url}" />', s)
        changed = True
    else:
        # insert after <head> tag
        s = s.replace('<head>', '<head>\n  <link rel="canonical" href="' + page_url + '" />')
        changed = True

    # 3) fix og:url and og:image host if they point to adblogin.com
    if 'adblogin.com' in s:
        s = s.replace('https://adblogin.com', HOST)
        changed = True

    # 4) add rel="noopener" to target="_blank" anchors if missing
    s_new = re.sub(r'(target=["\']_blank["\'])(?!\s+rel=)', r"\1 rel=\"noopener\"", s)
    if s_new != s:
        s = s_new
        changed = True

    # 5) replace known inline style patterns with class attributes
    s2 = s
    s2 = s2.replace("style='max-width:100%;margin-bottom:20px;'", "class='main-img'")
    s2 = s2.replace('style="max-width:100%;margin-bottom:20px;"', 'class="main-img"')
    s2 = s2.replace('style="max-width:90%;margin:20px 0;"', 'class="main-video"')
    s2 = s2.replace("style='max-width:90%;margin:20px 0;'", "class='main-video'")
    if s2 != s:
        s = s2
        changed = True

    if changed and s != orig:
        p.write_text(s, encoding='utf-8')
        print(f'Updated: {p}')

print('Done')
