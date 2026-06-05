#!/usr/bin/env bash
# Encode video fallbacks (MP4 H.264) from source webm
# Requires: ffmpeg
# Usage: ./encode_video.sh assets/Coupon.webm

set -euo pipefail
src="$1"
name=$(basename "$src")
base=${name%.*}
outdir=$(dirname "$src")/optimized
mkdir -p "$outdir"

# MP4 H.264 fallback (good compatibility)
ffmpeg -i "$src" -c:v libx264 -crf 23 -preset medium -c:a aac -b:a 128k -movflags +faststart "$outdir/${base}.mp4"

# WebM VP9 two-pass (smaller)
ffmpeg -y -i "$src" -c:v libvpx-vp9 -b:v 0 -crf 32 -c:a libopus "$outdir/${base}-vp9.webm"

echo "Encoded videos written to $outdir"
