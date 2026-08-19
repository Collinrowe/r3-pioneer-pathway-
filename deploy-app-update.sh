#!/bin/bash
# Pioneer Pathway - deploy-app-update.sh
# Run this every time Claude hands you a new app.html.
# Usage: bash deploy-app-update.sh <expected_version_number>
# Example: bash deploy-app-update.sh 63

set -e  # stop immediately on any error, don't push a half-done state

EXPECTED_VERSION="$1"
REPO_DIR="$HOME/Documents/GitHub/r3-pioneer-pathway-"

if [ -z "$EXPECTED_VERSION" ]; then
  echo "Usage: bash deploy-app-update.sh <expected_version_number>"
  echo "Example: bash deploy-app-update.sh 63"
  exit 1
fi

echo "--- Step 1: Finding the newest downloaded file ---"
LATEST=$(ls -t "$HOME"/Downloads/app*.html 2>/dev/null | head -1)
if [ -z "$LATEST" ]; then
  echo "No app*.html files found in Downloads. Did the download finish?"
  exit 1
fi
echo "Newest file: $LATEST"

echo ""
echo "--- Step 2: Moving it into the repo as app.html ---"
mv "$LATEST" "$REPO_DIR/app.html"
echo "Moved."

echo ""
echo "--- Step 3: Verifying CONTENT_VERSION ---"
cd "$REPO_DIR"
FOUND_VERSION=$(grep -o "CONTENT_VERSION=[0-9]*" app.html | head -1 | grep -o "[0-9]*")
echo "Found: CONTENT_VERSION=$FOUND_VERSION  (expected: $EXPECTED_VERSION)"

if [ "$FOUND_VERSION" != "$EXPECTED_VERSION" ]; then
  echo ""
  echo "MISMATCH. This is NOT the file you expected."
  echo "Stopping here - nothing has been committed or pushed."
  echo "Check your Downloads folder and re-run once you have the right file."
  exit 1
fi

echo "Version confirmed. Safe to commit."
echo ""
echo "--- Step 4: git status (review before committing) ---"
git status

echo ""
read -p "Does this look right? Type 'yes' to commit and push, anything else to abort: " CONFIRM
if [ "$CONFIRM" != "yes" ]; then
  echo "Aborted. No commit made."
  exit 1
fi

echo ""
echo "--- Step 5: Commit ---"
git add app.html
git commit -m "update app.html to v$EXPECTED_VERSION"

echo ""
echo "--- Step 6: Push (triggers Netlify auto-deploy) ---"
git push origin main

echo ""
echo "Done. Check the Netlify Deploys tab for the new build, then hard-refresh"
echo "r3pioneerpathway.com (Cmd+Shift+R) once it shows Published."
