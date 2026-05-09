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
  git remote add origin https://github.com/dabaiInJesus/convertTools.git
else
  # Ensure remote is configured
  git remote set-url origin https://github.com/dabaiInJesus/convertTools.git 2>/dev/null || git remote add origin https://github.com/dabaiInJesus/convertTools.git
fi

git add .
git commit -m "deploy: $(date)"
git push -f origin gh-pages

cd ..
echo "✅ Done! Your site will be live at: https://dabaiInJesus.github.io/convertTools/"
