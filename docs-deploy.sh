#!/usr/bin/env sh

# abort on errors
set -e

# build
yarn docz:build

# navigate into the build output directory
cd .docz/dist

# if you are deploying to a custom domain
# echo 'www.example.com' > CNAME

git init
git remote add origin https://github.com/CyriacBr/react-split-text.git
git checkout -b gh-pages
git add -A
git commit -m 'deploy'

# if you are deploying to https://<USERNAME>.github.io
# git push -f git@github.com:<USERNAME>/<USERNAME>.github.io.git master

# if you are deploying to https://<USERNAME>.github.io/<REPO>
git push origin gh-pages -f

cd -