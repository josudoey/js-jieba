export NODE_OPTIONS=--max-old-space-size=4096
brotli-pack = node scripts/brotli-pack.js
pkg-zh-tw = packages/jieba-zh-tw
pkg-zh-cn = packages/jieba-zh-cn

.PHONY: build
build: dist/jieba.js dist/jieba.emcc.js zh-tw zh-cn

.PHONY: clean
clean:
	rm -r dist packages/jieba-zh-tw/dist packages/jieba-zh-cn/dist

.PHONY: zh-tw
zh-tw: $(pkg-zh-tw)/dist/jieba.dict.br.js $(pkg-zh-tw)/dist/hmm.model.br.js $(pkg-zh-tw)/dist/idf.br.js

.PHONY: zh-cn
zh-cn: $(pkg-zh-cn)/dist/jieba.dict.br.js $(pkg-zh-cn)/dist/hmm.model.br.js $(pkg-zh-cn)/dist/idf.br.js $(pkg-zh-cn)/dist/stop.words.br.js

dist/jieba.js: dist/jieba.emcc.js node_modules
	npm run build:jieba

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

jieba-tw:
	git clone --depth=2 https://github.com/APCLab/jieba-tw.git jieba-tw 

jieba-tw/hmm_model.txt: jieba-tw
	./make_hmm.py > jieba-tw/hmm_model.txt

$(pkg-zh-tw)/dist:
	mkdir -p $(pkg-zh-tw)/dist

$(pkg-zh-tw)/dist/jieba.dict.br.js: jieba-tw $(pkg-zh-tw)/dist
	$(brotli-pack) jieba-tw/jieba/dict.txt $@

$(pkg-zh-tw)/dist/hmm.model.br.js: jieba-tw $(pkg-zh-tw)/dist
	$(brotli-pack) jieba-tw/hmm_model.txt $@

$(pkg-zh-tw)/dist/idf.br.js: jieba-tw $(pkg-zh-tw)/dist
	$(brotli-pack) jieba-tw/jieba/analyse/idf.txt $@

$(pkg-zh-cn)/dist:
	mkdir -p $(pkg-zh-cn)/dist

$(pkg-zh-cn)/dist/jieba.dict.br.js: cppjieba $(pkg-zh-cn)/dist
	$(brotli-pack) cppjieba/dict/jieba.dict.utf8 $@

$(pkg-zh-cn)/dist/hmm.model.br.js: cppjieba $(pkg-zh-cn)/dist
	$(brotli-pack) cppjieba/dict/hmm_model.utf8 $@

$(pkg-zh-cn)/dist/user.dict.br.js: cppjieba $(pkg-zh-cn)/dist
	$(brotli-pack) cppjieba/dict/user.dict.utf8 $@

$(pkg-zh-cn)/dist/stop.words.br.js: cppjieba $(pkg-zh-cn)/dist
	$(brotli-pack) cppjieba/dict/stop_words.utf8 $@