#!/usr/bin/env bash
# Optimize images for web: creates WebP and AVIF variants and resized versions
# Requires: ImageMagick (convert) or cwebp, avifenc (libavif)
# Usage: ./optimize_images.sh assets/multilogin-dashboard.jpg

set -euo pipefail
src="$1"
name=$(basename "$src")
base=${name%.*}
outdir=$(dirname "$src")/optimized
mkdir -p "$outdir"

# create responsive widths
for w in 400 800 1200 1600; do
  convert "$src" -resize ${w}x -quality 85 "$outdir/${base}-${w}.jpg"
done

# create webp
for f in "$outdir"/${base}-*.jpg; do
  cwebp -q 80 "$f" -o "${f%.jpg}.webp"
done

# create avif (if avifenc available)
if command -v avifenc >/dev/null 2>&1; then
  for f in "$outdir"/${base}-*.jpg; do
    avifenc --speed 6 --min 20 --max 40 "$f" "${f%.jpg}.avif"
  done
fi

echo "Optimized images written to $outdir"
