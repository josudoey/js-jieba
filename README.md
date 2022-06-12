# js-jieba

![test workflow](https://github.com/josudoey/js-jieba/actions/workflows/action.yml/badge.svg)

js-jieba是以cppjieba透過emscripten編譯而成的函式庫，用於中文斷詞使用


## Installation
```
npm install js-jieba
```

## Quick Start

```cjs
// CommonJS (.cjs)
const createJieba = require('js-jieba')
const {
  JiebaDict, HMMModel, UserDict, IDF, StopWords
} = require('jieba-zh-tw')

const jieba = createJieba(
  JiebaDict,
  HMMModel,
  UserDict,
  IDF,
  StopWords
)

console.log(jieba.cut("結巴斷詞").join('/'))
// Output:
// 結巴/斷詞
```

```mjs
// ECMAScript (.mjs)
import createJieba from 'js-jieba'
import {
  JiebaDict, HMMModel, UserDict, IDF, StopWords
} from 'jieba-zh-tw'


const jieba = createJieba(
  JiebaDict,
  HMMModel,
  UserDict,
  IDF,
  StopWords
)

console.log(jieba.cut("結巴斷詞").join('/'))
// Output:
// 結巴/斷詞
```

```ts
// TypeScript (.ts)
import createJieba from 'js-jieba'
import {
  JiebaDict, HMMModel, UserDict, IDF, StopWords
} from 'jieba-zh-tw'

const jieba = Jieba(
  JiebaDict,
  HMMModel,
  UserDict,
  IDF,
  StopWords
)

console.log(jieba.cut("結巴斷詞").join('/'))
// Output:
// 結巴/斷詞
```

## jieba method

### cut(sentence: string, useHMM?: boolean): string[]
### cutAll(sentence: string): string[]
### cutForSearch(sentence: string, useHMM?: boolean): string[]
### cutForSearchWithOffset(sentence: string, useHMM?: boolean): Word[]
### insertUserWord(word: string): void
### tag(sentence: string): string[]
### extract(sentence: string, topk: number): Keyword[]
### lookupTag(sentence: string): string

## Demo
```
node ./example/demo-tw.js
```

輸出:
```
新竹的交通大學要在2021年2月1日與台北的陽明大學合併
[demo] Cut With HMM
新竹/的/交通/大學/要/在/2021/年/2/月/1/日/與/台北/的/陽明/大學/合併
[demo] Cut Without HMM
新竹/的/交通/大學/要/在/2/0/2/1/年/2/月/1/日/與/台北/的/陽明/大學/合併
新竹的交通大學要在2021年2月1日與台北的陽明大學合併
[demo] CutAll
新竹/的/交通/交通大/大學/要/在/2/0/2/1/年/2/月/1/日/與/台北/的/陽明/明大/大學/合併
[{"word":"新竹","offset":0,"unicodeOffset":0},{"word":"的","offset":6,"unicodeOffset":2},{"word":"交通","offset":9,"unicodeOffset":3},{"word":"大學","offset":15,"unicodeOffset":5},{"word":"要","offset":21,"unicodeOffset":7},{"word":"在","offset":24,"unicodeOffset":8},{"word":"2021","offset":27,"unicodeOffset":9},{"word":"年","offset":31,"unicodeOffset":13},{"word":"2","offset":34,"unicodeOffset":14},{"word":"月","offset":35,"unicodeOffset":15},{"word":"1","offset":38,"unicodeOffset":16},{"word":"日","offset":39,"unicodeOffset":17},{"word":"與","offset":42,"unicodeOffset":18},{"word":"台北","offset":45,"unicodeOffset":19},{"word":"的","offset":51,"unicodeOffset":21},{"word":"陽明","offset":54,"unicodeOffset":22},{"word":"大學","offset":60,"unicodeOffset":24},{"word":"合併","offset":66,"unicodeOffset":26}]
小明畢業於國立交通大學資訊科學與研究所
[demo] CutForSearch
小明/畢業/於/國立/交通/大學/資訊/科學/與/研究/研究所
[demo] Insert User Word
梅竹/錦標/對抗賽
梅竹錦標對抗賽
[demo] CutForSearch Word With Offset
[{"word":"小明","offset":0,"unicodeOffset":0},{"word":"畢業","offset":6,"unicodeOffset":2},{"word":"於","offset":12,"unicodeOffset":4},{"word":"國立","offset":15,"unicodeOffset":5},{"word":"交通","offset":21,"unicodeOffset":7},{"word":"大學","offset":27,"unicodeOffset":9},{"word":"資訊","offset":33,"unicodeOffset":11},{"word":"科學","offset":39,"unicodeOffset":13},{"word":"與","offset":45,"unicodeOffset":15},{"word":"研究","offset":48,"unicodeOffset":16},{"word":"研究所","offset":48,"unicodeOffset":16}]
[demo] Lookup Tag for Single Token
[摩托車:N, CEO:eng, 123:m, 。:x]
[demo] Tagging
[萬國:N, 商業:N, 機器:N, 公司:N, (:x, IBM:eng, ):x, 日前:N, 宣布:Vt, 在:P, 基本:A, 電腦:N, 晶片:N, 科技:N, 方面:N, 獲致:Vt, 重大:Vi, 突破:Vt, ，:x, 可:ADV, 提升:Vt, 未來:N, 電腦:N, 運算:Nv, 的:T, 速度:N, 。:x]
[demo] Keyword Extraction
萬國商業機器公司(IBM)日前宣布在基本電腦晶片科技方面獲致重大突破，可提升未來電腦運算的速度。
[{"word":"電腦","offsets":[50,110],"weight":23.35108820321911},{"word":"商業","offsets":[6],"weight":11.675544101609555},{"word":"未來","offsets":[104],"weight":11.675544101609555},{"word":"獲致","offsets":[74],"weight":11.675544101609555},{"word":"機器","offsets":[12],"weight":11.675544101609555}]
```


```
node ./example/demo-cn.js
```

輸出:

```
他来到了网易杭研大厦
[demo] Cut With HMM
他/来到/了/网易/杭研/大厦
[demo] Cut Without HMM
他/来到/了/网易/杭/研/大厦
我来到北京清华大学
[demo] CutAll
我/来到/北京/清华/清华大学/华大/大学
[{"word":"我","offset":0,"unicodeOffset":0},{"word":"来到","offset":3,"unicodeOffset":1},{"word":"北京","offset":9,"unicodeOffset":3},{"word":"清华","offset":15,"unicodeOffset":5},{"word":"华大","offset":18,"unicodeOffset":6},{"word":"大学","offset":21,"unicodeOffset":7},{"word":"清华大学","offset":15,"unicodeOffset":5}]
小明硕士毕业于中国科学院计算所，后在日本京都大学深造
[demo] CutForSearch
小明/硕士/毕业/于/中国/科学/学院/科学院/中国科学院/计算/计算所/，/后/在/日本/京都/大学/日本京都大学/深造
[demo] Insert User Word
男默/女泪
男默女泪
[demo] CutForSearch Word With Offset
[{"word":"小明","offset":0,"unicodeOffset":0},{"word":"硕士","offset":6,"unicodeOffset":2},{"word":"毕业","offset":12,"unicodeOffset":4},{"word":"于","offset":18,"unicodeOffset":6},{"word":"中国","offset":21,"unicodeOffset":7},{"word":"科学","offset":27,"unicodeOffset":9},{"word":"学院","offset":30,"unicodeOffset":10},{"word":"科学院","offset":27,"unicodeOffset":9},{"word":"中国科学院","offset":21,"unicodeOffset":7},{"word":"计算","offset":36,"unicodeOffset":12},{"word":"计算所","offset":36,"unicodeOffset":12},{"word":"，","offset":45,"unicodeOffset":15},{"word":"后","offset":48,"unicodeOffset":16},{"word":"在","offset":51,"unicodeOffset":17},{"word":"日本","offset":54,"unicodeOffset":18},{"word":"京都","offset":60,"unicodeOffset":20},{"word":"大学","offset":66,"unicodeOffset":22},{"word":"日本京都大学","offset":54,"unicodeOffset":18},{"word":"深造","offset":72,"unicodeOffset":24}]
[demo] Lookup Tag for Single Token
[拖拉机:n, CEO:eng, 123:m, 。:x]
[demo] Tagging
[我:r, 是:v, 拖拉机:n, 学院:n, 手扶拖拉机:n, 专业:n, 的:uj, 。:x, 不用:v, 多久:m, ，:x, 我:r, 就:d, 会:v, 升职:v, 加薪:nr, ，:x, 当上:t, CEO:eng, ，:x, 走上:v, 人生:n, 巅峰:n, 。:x]
[demo] Keyword Extraction
我是拖拉机学院手扶拖拉机专业的。不用多久，我就会升职加薪，当上CEO，走上人生巅峰。
[{"word":"CEO","offsets":[93],"weight":11.739204307083542},{"word":"升职","offsets":[72],"weight":10.8561552143},{"word":"加薪","offsets":[78],"weight":10.642581114},{"word":"手扶拖拉机","offsets":[21],"weight":10.0088573539},{"word":"巅峰","offsets":[111],"weight":9.49395840471}]
```

線上展示 [demo](https://josudoey.github.io/js-jieba/)

## 編譯方式

```sh
docker-compose run --rm build
```

## 相關資源
 - https://github.com/fxsjy/jieba
 - https://github.com/yanyiwu/cppjieba
 - https://github.com/APCLab/jieba-tw.git 
 - https://emscripten.org/docs/introducing_emscripten/index.html
 - https://hub.docker.com/r/trzeci/emscripten/
