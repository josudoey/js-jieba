import assert from 'assert'
import createJieba from '../dist/jieba'
import {
  JiebaDict,
  HMMModel,
  UserDict,
  IDF,
  StopWords
} from '../dist/dict.zh-cn'


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
  })
})
