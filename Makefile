.PHONY: test clean
init: ; scripts/init.sh
installer: ; scripts/build.sh
package: ; npm run package
clean: ; scripts/clean.sh
test: ; scripts/runtests.sh
doc: ; scripts/makedoc.sh
pack: clean ; tar -cvzf Calculosa.tar.gz ../Calculosa