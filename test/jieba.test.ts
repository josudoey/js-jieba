import assert from 'assert'
import createJieba from '../'

describe('jieba', () => {
  const jieba = createJieba()
  it('cut', function () {
    assert.deepStrictEqual(
      jieba.cut('hello word'),
      ['hello', ' ', 'word']
    )
    assert.deepStrictEqual(
      jieba.cut('default'),
      ['default']
    )
  })
})
