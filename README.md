# Calculosa
Simple calculator by VUT students
IVS motivation

## Contributors
* Filip Conka filip@conka.pro
* Filip Klembara leo@navel.pro
* Michal Bohus zololol3@gmail.com
* Lucia Tusimova lucka.tusimova@gmail.com

## Development installation
### Mac OS X
_Note: Homebrew required_
```
$ brew install nodejs
$ npm install -g electron-prebuilt electron-packager electron-builder
$ npm install
```
Then you can run the application
```
$ electron .
```
### Windows
Install NodeJS and add it to path.
```
> npm install -g electron-prebuilt electron-packager electron-builder
> npm install
> npm start
```
## Building application
_Note: You should **not** build in the Calculosa folder (some weird bug in electron-packager when it recursively build packages for different platforms) _
```
$ electron-packager Calculosa/ --platform=<darwin|win32|linux|all> --arch=<x64|ia32|all>
```
