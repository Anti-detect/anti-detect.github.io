#!/bin/bash
# Run this script after extracting all 100 folders into the same directory
# It will push each folder to its own GitHub repo and enable GitHub Pages

USERNAME="Anti-detect"

for dir in */ ; do
  cd "$dir"
  git init
  git checkout -b main
  git remote add origin https://github.com/$USERNAME/${dir%/}.git
  git add .
  git commit -m "Initial push for ${dir%/}"
  git push -u origin main
  cd ..
done
