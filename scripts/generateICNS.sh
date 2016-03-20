#!/bin/sh

# generate icns file from pngs (pngs must have alpha channel)
iconname=../resources/icon1024.png

echo $iconname

mkdir Calculosa.iconset
sips -z 16 16     $iconname --out Calculosa.iconset/icon_16x16.png
sips -z 32 32     $iconname --out Calculosa.iconset/icon_16x16@2x.png
sips -z 32 32     $iconname --out Calculosa.iconset/icon_32x32.png
sips -z 64 64     $iconname --out Calculosa.iconset/icon_32x32@2x.png
sips -z 128 128   $iconname --out Calculosa.iconset/icon_128x128.png
sips -z 256 256   $iconname --out Calculosa.iconset/icon_128x128@2x.png
sips -z 256 256   $iconname --out Calculosa.iconset/icon_256x256.png
sips -z 512 512   $iconname --out Calculosa.iconset/icon_256x256@2x.png
sips -z 512 512   $iconname --out Calculosa.iconset/icon_512x512.png
cp $iconname Calculosa.iconset/icon_512x512@2x.png
iconutil -c icns Calculosa.iconset
rm -R Calculosa.iconset
mv Calculosa.icns ../build/icon.icns