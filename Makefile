export RUN:=umask 0022;
export NODE_OPTIONS=--max-old-space-size=4096

.PHONY: build
build: dist/jieba.js dist/jieba.emcc.js dist/dict.js

.PHONY: clean
clean:
	rm -r dist

dist/jieba.js: dist/jieba.emcc.js node_modules
	npm run build:jieba

dist/dict.js: cppjieba node_modules
	npm run build:dict:zh-cn

dist/jieba.emcc.js: cppjieba dist
	emcc \
		-O1 \
		-I./cppjieba/include \
		-I./cppjieba/deps \
		-s ALLOW_MEMORY_GROWTH=1 \
		-s 'EXTRA_EXPORTED_RUNTIME_METHODS=["ccall"]' \
		-s WASM=0 \
		--no-heap-copy \
		--closure 0 \
		-s BINARYEN_ASYNC_COMPILATION=0 \
		-s MODULARIZE=0 \
		--js-library ./emcc/library.js \
		--pre-js ./emcc/pre.js \
		--post-js ./emcc/post.js \
		--embed-file ./emcc/root@/ \
	 	./emcc/main.cpp \
		-o ./dist/jieba.emcc.js

dist:
	mkdir -p dist

node_modules: node_modules
	npm i

cppjieba:
	git clone --depth=10 --branch=master git://github.com/yanyiwu/cppjieba.git cppjieba
