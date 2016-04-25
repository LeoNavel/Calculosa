#!/bin/sh

rm -rf documentation/devdoc
node_modules/.bin/jsdoc -c scripts/conf.json
cp resources/icon1024.png documentation/devdoc/