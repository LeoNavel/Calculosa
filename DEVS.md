# Developer's manual
## NodeJS instalation
```
$ brew install nodejs nodejs-legacy npm # for Mac
$ apt-get install nodejs npm # for Ubunut
```
## Initialization
_Note: NodeJS with npm required_
```
$ make init
```
Then you can run the application
```
$ npm start
```
## Packaging application
Make packages for all supported platforms.
```
$ make package
```
Make custom package.
```
$ electron-packager app --platform=<darwin|win32|linux|all> --arch=<x64|ia32|all> --out=packages/
```
## Creating installer on MacOS X
First you need to have installed several packages for making installer for Windows and Linux.  
### For Windows installer
```
$ brew install Caskroom/cask/xquartz wine mono
```
### For Linux installer
```
$ brew install ruby gnu-tar libicns graphicsmagick
$ gem install fpm
```
Create installers for all supported platforms.
```
$ make build
```
## Managing JS dependencies
_Note: Run this in the app folder where [bower.json](app/bower.json) file should be included._
_Recommendation: Install first `bower` globally with `npm install -g bower bower-installer`_
```
$ bower install <package-name> --save
$ bower-installer
```

## Running Tests
```
$ make test
```

## Cleaning
Running `make clean` will remove all locale installed nodeJS modules, bower components, created packages and installer.