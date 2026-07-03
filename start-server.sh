#!/bin/bash
# Starts a local static file server for the Pioneer Pathway (R3) sandbox.
# Run this, then open http://localhost:8000/r3-app-5-2-14.html
# (or r3-agent-1-0-0.html for the agent tool harness) in your browser.

DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$DIR"
echo "Serving $DIR at http://localhost:8000"
echo "Press Ctrl+C to stop."
python3 -m http.server 8000
