const Jieba = require('../dist/jieba')
const {
  JiebaDict, HMMModel, UserDict, IDF, StopWords
} = require('../dist/dict.zh-tw')

const jieba = Jieba(
  Buffer.from(JiebaDict),
  Buffer.from(HMMModel),
  Buffer.from(UserDict),
  Buffer.from(IDF),
  Buffer.from(StopWords)
)

let s = '新竹的交通大學要在2021年2月1日與台北的陽明大學合併'
console.log(s)
console.log('[demo] Cut With HMM')
let words = jieba.cut(s)
console.log(words.join('/'))

s = '新竹的交通大學要在2021年2月1日與台北的陽明大學合併'
console.log('[demo] Cut Without HMM')
words = jieba.cut(s, false)
console.log(words.join('/'))

s = '新竹的交通大學要在2021年2月1日與台北的陽明大學合併'
console.log(s)
console.log('[demo] CutAll')
words = jieba.cutAll(s)
console.log(words.join('/'))
words = jieba.cutForSearchWithOffset(s)
console.log(JSON.stringify(words))

s = '小明畢業於國立交通大學資訊科學與研究所'
console.log(s)
console.log('[demo] CutForSearch')
words = jieba.cutForSearch(s)
console.log(words.join('/'))

console.log('[demo] Insert User Word')
words = jieba.cut('梅竹錦標對抗賽')
console.log(words.join('/'))
jieba.insertUserWord('梅竹錦標對抗賽')
words = jieba.cut('梅竹錦標對抗賽')
console.log(words.join('/'))

console.log('[demo] CutForSearch Word With Offset')
words = jieba.cutForSearchWithOffset(s)
console.log(JSON.stringify(words))

console.log('[demo] Lookup Tag for Single Token')
const DemoTokens = ['摩托車', 'CEO', '123', '。']
const LookupTagres = new Map([])
for (const key of DemoTokens) {
  LookupTagres.set(key, jieba.lookupTag(key))
}
console.log(`[${Array.from(LookupTagres.entries()).map((v) => (v.join(':'))).join(', ')}]`)

console.log('[demo] Tagging')
s = '萬國商業機器公司(IBM)日前宣布在基本電腦晶片科技方面獲致重大突破，可提升未來電腦運算的速度。'
let items = jieba.tag(s)
console.log(`[${items.map((v) => (v.join(':'))).join(', ')}]`)

console.log('[demo] Keyword Extraction')
const topk = 5
items = jieba.extract(s, topk)
console.log(s)
console.log(JSON.stringify(items))
