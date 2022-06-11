import assert from 'assert'
import createJieba from '../'
import {
  JiebaDict,
  HMMModel,
  UserDict,
  IDF,
  StopWords
} from 'jieba-zh-tw'

describe('jieba.zh.tw', () => {
  const jieba = createJieba(
    Buffer.from(JiebaDict),
    Buffer.from(HMMModel),
    Buffer.from(UserDict),
    Buffer.from(IDF),
    Buffer.from(StopWords)
  )

  it('cut', function () {
    assert.deepStrictEqual(
      jieba.cut('新竹的交通大學要在2021年2月1日與台北的陽明大學合併'),
      ["新竹", "的", "交通", "大學", "要", "在", "2021", "年", "2", "月", "1", "日", "與", "台北", "的", "陽明", "大學", "合併"]
    )

    assert.deepStrictEqual(
      jieba.cut('新竹的交通大學要在2021年2月1日與台北的陽明大學合併', false),
      ["新竹", "的", "交通", "大學", "要", "在", "2", "0", "2", "1", "年", "2", "月", "1", "日", "與", "台北", "的", "陽明", "大學", "合併"]
    )
  })

  it('cutAll', function () {
    assert.deepStrictEqual(
      jieba.cutAll('新竹的交通大學要在2021年2月1日與台北的陽明大學合併'),
      ['新竹', '的', '交通', '交通大', '大學', '要', '在', '2', '0', '2', '1', '年', '2', '月', '1', '日', '與', '台北', '的', '陽明', '明大', '大學', '合併']
    )
  })

  it('cutForSearch', function () {
    assert.deepStrictEqual(
      jieba.cutForSearch('小明畢業於國立交通大學資訊科學與研究所'),
      ['小明', '畢業', '於', '國立', '交通', '大學', '資訊', '科學', '與', '研究', '研究所']
    )
  })

  it('insertUserWord', function () {
    assert.deepStrictEqual(
      jieba.cut('梅竹錦標對抗賽'), ['梅竹', '錦標', '對抗賽']
    )

    jieba.insertUserWord('梅竹錦標對抗賽')
    assert.deepStrictEqual(
      jieba.cut('梅竹錦標對抗賽'), ['梅竹錦標對抗賽']
    )
  })

  it('cutForSearchWithOffset', function () {
    assert.deepStrictEqual(
      jieba.cutForSearchWithOffset('小明畢業於國立交通大學資訊科學與研究所'),
      [{ "word": "小明", "offset": 0, "unicodeOffset": 0 }, { "word": "畢業", "offset": 6, "unicodeOffset": 2 }, { "word": "於", "offset": 12, "unicodeOffset": 4 }, { "word": "國立", "offset": 15, "unicodeOffset": 5 }, { "word": "交通", "offset": 21, "unicodeOffset": 7 }, { "word": "大學", "offset": 27, "unicodeOffset": 9 }, { "word": "資訊", "offset": 33, "unicodeOffset": 11 }, { "word": "科學", "offset": 39, "unicodeOffset": 13 }, { "word": "與", "offset": 45, "unicodeOffset": 15 }, { "word": "研究", "offset": 48, "unicodeOffset": 16 }, { "word": "研究所", "offset": 48, "unicodeOffset": 16 }]
    )
  })

  it('lookupTag', function () {
    assert.deepStrictEqual(jieba.lookupTag('摩托車'), 'N')
    assert.deepStrictEqual(jieba.lookupTag('CEO'), 'eng')
    assert.deepStrictEqual(jieba.lookupTag('123'), 'm')
    assert.deepStrictEqual(jieba.lookupTag('。'), 'x')
  })

  it('tag', function () {
    assert.deepStrictEqual(
      jieba.tag('萬國商業機器公司(IBM)日前宣布在基本電腦晶片科技方面獲致重大突破，可提升未來電腦運算的速度。'),
      [["萬國", "N"], ["商業", "N"], ["機器", "N"], ["公司", "N"], ["(", "x"], ["IBM", "eng"], [")", "x"], ["日前", "N"], ["宣布", "Vt"], ["在", "P"], ["基本", "A"], ["電腦", "N"], ["晶片", "N"], ["科技", "N"], ["方面", "N"], ["獲致", "Vt"], ["重大", "Vi"], ["突破", "Vt"], ["，", "x"], ["可", "ADV"], ["提升", "Vt"], ["未來", "N"], ["電腦", "N"], ["運算", "Nv"], ["的", "T"], ["速度", "N"], ["。", "x"]]
    )
  })

  it('extract', function () {
    assert.deepStrictEqual(
      jieba.extract('萬國商業機器公司(IBM)日前宣布在基本電腦晶片科技方面獲致重大突破，可提升未來電腦運算的速度。', 5),
      [{ "word": "電腦", "offsets": [50, 110], "weight": 23.35108820321911 }, { "word": "商業", "offsets": [6], "weight": 11.675544101609555 }, { "word": "未來", "offsets": [104], "weight": 11.675544101609555 }, { "word": "獲致", "offsets": [74], "weight": 11.675544101609555 }, { "word": "機器", "offsets": [12], "weight": 11.675544101609555 }]
    )
  })
})
