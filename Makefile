export NODE_OPTIONS=--max-old-space-size=4096
.PHONY: build
build: dist/jieba.js dist/jieba.emcc.js dist/dict.zh-tw.js dist/dict.zh-cn.js

.PHONY: clean
clean:
	rm -r dist

dist/jieba.js: dist/jieba.emcc.js node_modules
	npm run build:jieba

dist/dict.zh-tw.js: jieba-tw/hmm_model.txt node_modules
	npm run build:dict:zh-tw

dist/dict.zh-cn.js: cppjieba node_modules
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

node_modules:
	npm i

cppjieba:
	git clone --depth=2 --branch=master https://github.com/yanyiwu/cppjieba.git cppjieba

jieba-tw/hmm_model.txt: jieba-tw
	./webpack/dict/zh-tw/make_hmm.py > jieba-tw/hmm_model.txt

jieba-tw:
	git clone --depth=2 https://github.com/APCLab/jieba-tw.git jieba-tw 
