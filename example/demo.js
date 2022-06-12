const Jieba = require('js-jieba')
const {
  JiebaDict, HMMModel, UserDict, IDF, StopWords
} = require('jieba-zh-cn')

const jieba = Jieba(
  JiebaDict,
  HMMModel,
  UserDict,
  IDF,
  StopWords
)

let s = '他来到了网易杭研大厦'
console.log(s)
console.log('[demo] Cut With HMM')
let words = jieba.cut(s)
console.log(words.join('/'))

s = '他来到了网易杭研大厦'
console.log('[demo] Cut Without HMM')
words = jieba.cut(s, false)
console.log(words.join('/'))

s = '我来到北京清华大学'
console.log(s)
console.log('[demo] CutAll')
words = jieba.cutAll(s)
console.log(words.join('/'))
words = jieba.cutForSearchWithOffset(s)
console.log(JSON.stringify(words))

s = '小明硕士毕业于中国科学院计算所，后在日本京都大学深造'
console.log(s)
console.log('[demo] CutForSearch')
words = jieba.cutForSearch(s)
console.log(words.join('/'))

console.log('[demo] Insert User Word')
words = jieba.cut('男默女泪')
console.log(words.join('/'))
jieba.insertUserWord('男默女泪')
words = jieba.cut('男默女泪')
console.log(words.join('/'))

console.log('[demo] CutForSearch Word With Offset')
words = jieba.cutForSearchWithOffset(s)
console.log(JSON.stringify(words))

console.log('[demo] Lookup Tag for Single Token')
const DemoTokens = ['拖拉机', 'CEO', '123', '。']
const LookupTagres = new Map([])
for (const key of DemoTokens) {
  LookupTagres.set(key, jieba.lookupTag(key))
}
console.log(`[${Array.from(LookupTagres.entries()).map((v) => (v.join(':'))).join(', ')}]`)

console.log('[demo] Tagging')
s = '我是拖拉机学院手扶拖拉机专业的。不用多久，我就会升职加薪，当上CEO，走上人生巅峰。'
let items = jieba.tag(s)
console.log(`[${items.map((v) => (v.join(':'))).join(', ')}]`)

console.log('[demo] Keyword Extraction')
const topk = 5
items = jieba.extract(s, topk)
console.log(s)
console.log(JSON.stringify(items))
