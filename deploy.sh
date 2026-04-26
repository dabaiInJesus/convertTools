#!/bin/bash
set -e

echo "Building..."
npm run build

echo "Deploying to GitHub Pages..."
cd dist

# Initialize git if needed
if [ ! -d .git ]; then
  git init
  git checkout -b gh-pages
fi

git add .
git commit -m "deploy: $(date)"
git push -f origin gh-pages

cd ..
echo "✅ Done! Your site will be live at: https://dabaiInJesus.github.io/convertTools/"
