#!/bin/sh

# adding the date variable
now=`date`

echo " -- Starting deploying at $now -- "

echo "-- INSTALLING AND BUILDING APP FOR PRODUCTION --"
npm run lint
npm run build

echo "-- ARRANGING FILES --"

# starting shopt extglob
shopt -s extglob
# removing old files in H-dist
cd H-dist/
# removing all files except for Hostinger rewrite rules and git repo files
rm -v !(".htaccess"|".git"|".gitignore")
# removing all folders 
rm -r */
# ending shopt extglob
shopt -u extglob
# coppying all files from the dist folder to current folder (H-dist)
cp -r ../dist/* ./

echo "-- PREPARING FILES FOR HOSTINGER FRAMEWORK --"
# changing index from html to php to work on Hostinger's server
mv index.html index.php

echo "-- COMMITTING CHANGES --"
# for more infor checkout this link : https://gist.github.com/lajlev/4b1d0207f87d0a8e9cf20fc78a6fd60a
# adding committing and pushing updates to the repo
git add --all
git commit -m "deploy time at: $now"
git push origin H-deployment
cd ..
echo " -- DEPLOYING FINISHED --"
