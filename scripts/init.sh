#!/bin/sh

npm install
cd app
npm install
node_modules/bower/bin/bower install
node node_modules/bower-installer/bower-installer.js