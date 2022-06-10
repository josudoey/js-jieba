import assert from 'assert'
import createJieba from '../dist/jieba'
import {
  JiebaDict,
  HMMModel,
  UserDict,
  IDF,
  StopWords
} from '../dist/dict.zh-tw'

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
      jieba.cut('新竹的交通大學在新竹的大學路上'),
      ['新竹', '的', '交通', '大學', '在', '新竹', '的', '大學路', '上']
    )
  })
})
