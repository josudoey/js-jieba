/* eslint-env jest */
const assert = require('assert')
const Jieba = require('../dist/jieba')

describe('jieba.zh.cn', () => {
  const {
    JiebaDict, HMMModel, UserDict, IDF, StopWords
  } = require('../dist/dict.zh-cn')
  const jieba = Jieba(
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
  })
})
