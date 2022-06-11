import assert from 'assert'
import createJieba from '../'
import {
  JiebaDict,
  HMMModel,
  UserDict,
  IDF,
  StopWords
} from 'jieba-zh-cn'

describe('jieba.zh.cn', () => {
  const jieba = createJieba(
    Buffer.from(JiebaDict),
    Buffer.from(HMMModel),
    Buffer.from(UserDict),
    Buffer.from(IDF),
    Buffer.from(StopWords)
  )

  it('cut', function () {
    assert.deepStrictEqual(
      jieba.cut('他来到了网易杭研大厦'),
      ['他', '来到', '了', '网易', '杭研', '大厦']
    )

    assert.deepStrictEqual(
      jieba.cut('他来到了网易杭研大厦', false),
      ["他", "来到", "了", "网易", "杭", "研", "大厦"]
    )
  })


  it('cutAll', function () {
    assert.deepStrictEqual(
      jieba.cutAll('我来到北京清华大学'),
      ["我", "来到", "北京", "清华", "清华大学", "华大", "大学"]
    )
  })

  it('CutForSearch', function () {
    assert.deepStrictEqual(
      jieba.cutForSearch('小明硕士毕业于中国科学院计算所，后在日本京都大学深造'),
      ["小明", "硕士", "毕业", "于", "中国", "科学", "学院", "科学院", "中国科学院", "计算", "计算所", "，", "后", "在", "日本", "京都", "大学", "日本京都大学", "深造"]
    )
  })

  it('insertUserWord', function () {
    assert.deepStrictEqual(
      jieba.cut('男默女泪'), ['男默', '女泪']
    )

    jieba.insertUserWord('男默女泪')
    assert.deepStrictEqual(
      jieba.cut('男默女泪'), ['男默女泪']
    )
  })

  it('cutForSearchWithOffset', function () {
    assert.deepStrictEqual(
      jieba.cutForSearchWithOffset('小明硕士毕业于中国科学院计算所，后在日本京都大学深造'),
      [{ "word": "小明", "offset": 0, "unicodeOffset": 0 }, { "word": "硕士", "offset": 6, "unicodeOffset": 2 }, { "word": "毕业", "offset": 12, "unicodeOffset": 4 }, { "word": "于", "offset": 18, "unicodeOffset": 6 }, { "word": "中国", "offset": 21, "unicodeOffset": 7 }, { "word": "科学", "offset": 27, "unicodeOffset": 9 }, { "word": "学院", "offset": 30, "unicodeOffset": 10 }, { "word": "科学院", "offset": 27, "unicodeOffset": 9 }, { "word": "中国科学院", "offset": 21, "unicodeOffset": 7 }, { "word": "计算", "offset": 36, "unicodeOffset": 12 }, { "word": "计算所", "offset": 36, "unicodeOffset": 12 }, { "word": "，", "offset": 45, "unicodeOffset": 15 }, { "word": "后", "offset": 48, "unicodeOffset": 16 }, { "word": "在", "offset": 51, "unicodeOffset": 17 }, { "word": "日本", "offset": 54, "unicodeOffset": 18 }, { "word": "京都", "offset": 60, "unicodeOffset": 20 }, { "word": "大学", "offset": 66, "unicodeOffset": 22 }, { "word": "日本京都大学", "offset": 54, "unicodeOffset": 18 }, { "word": "深造", "offset": 72, "unicodeOffset": 24 }]
    )
  })

  it('lookupTag', function () {
    assert.deepStrictEqual(jieba.lookupTag('拖拉机'), 'n')
    assert.deepStrictEqual(jieba.lookupTag('CEO'), 'eng')
    assert.deepStrictEqual(jieba.lookupTag('123'), 'm')
    assert.deepStrictEqual(jieba.lookupTag('。'), 'x')
  })

  it('tag', function () {
    assert.deepStrictEqual(
      jieba.tag('我是拖拉机学院手扶拖拉机专业的。不用多久，我就会升职加薪，当上CEO，走上人生巅峰。'),
      [["我", "r"], ["是", "v"], ["拖拉机", "n"], ["学院", "n"], ["手扶拖拉机", "n"], ["专业", "n"], ["的", "uj"], ["。", "x"], ["不用", "v"], ["多久", "m"], ["，", "x"], ["我", "r"], ["就", "d"], ["会", "v"], ["升职", "v"], ["加薪", "nr"], ["，", "x"], ["当上", "t"], ["CEO", "eng"], ["，", "x"], ["走上", "v"], ["人生", "n"], ["巅峰", "n"], ["。", "x"]]
    )
  })

  it('extract', function () {
    assert.deepStrictEqual(
      jieba.extract('我是拖拉机学院手扶拖拉机专业的。不用多久，我就会升职加薪，当上CEO，走上人生巅峰。', 5),
      [{ "word": "CEO", "offsets": [93], "weight": 11.739204307083542 }, { "word": "升职", "offsets": [72], "weight": 10.8561552143 }, { "word": "加薪", "offsets": [78], "weight": 10.642581114 }, { "word": "手扶拖拉机", "offsets": [21], "weight": 10.0088573539 }, { "word": "巅峰", "offsets": [111], "weight": 9.49395840471 }]
    )
  })
})
