#!/usr/bin/env python3
"""
Read redirect-map.yml and generate simple HTML redirect pages (meta refresh) at the old paths.
Run: python tools/generate_redirects.py
"""
from pathlib import Path
ROOT = Path(__file__).resolve().parents[1]
map_file = ROOT / 'redirect-map.yml'
if not map_file.exists():
    print('No redirect-map.yml found')
    raise SystemExit(1)

# Simple parser: lines like '/old-path/: /new-path/' (ignore comments and blank lines)
data = {}
with open(map_file, 'r', encoding='utf-8') as f:
    for raw in f:
        line = raw.strip()
        if not line or line.startswith('#'):
            continue
        if ':' in line:
            parts = line.split(':', 1)
            old = parts[0].strip()
            new = parts[1].strip()
            data[old] = new

for old, new in data.items():
    # normalize paths
    old_path = old.lstrip('/').rstrip('/')
    if old_path == '':
        old_path = 'index.html'
    out_dir = ROOT / old_path
    if out_dir.suffix == '':
        out_dir = out_dir / 'index.html'
    else:
        # ensure parent exists
        out_dir.parent.mkdir(parents=True, exist_ok=True)
    out_dir.parent.mkdir(parents=True, exist_ok=True)
    content = f'<html><head><meta http-equiv="refresh" content="0;url={new}" /></head><body>Redirecting to <a href="{new}">{new}</a></body></html>'
    out_file = out_dir if out_dir.suffix == '.html' else out_dir
    with open(out_file, 'w', encoding='utf-8') as fh:
        fh.write(content)
    print(f'Generated redirect: {out_file} -> {new}')
