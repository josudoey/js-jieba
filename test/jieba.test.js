/* eslint-env jest */
const assert = require('assert')
const Jieba = require('../dist/jieba')

describe('jieba', () => {
  const jieba = Jieba()
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
