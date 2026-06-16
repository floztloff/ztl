#!/bin/bash
# Script de push GitHub — le token sera injecté
# Ne pas versionner ce fichier

TOKEN="$1"
REPO="floztloff/ztl"
BRANCH="main"

cd /workspace/ztl
git remote set-url origin "https://oauth2:${TOKEN}@github.com/${REPO}.git"
git push -u origin "${BRANCH}"
