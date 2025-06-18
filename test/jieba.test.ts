import createJieba from '../'

describe('jieba', () => {
  const jieba = createJieba()
  it('cut', function () {
    expect(
      jieba.cut('hello word')
    ).toEqual(
      ['hello', ' ', 'word']
    )
    expect(
      jieba.cut('default')
    ).toEqual(
      ['default']
    )
  })
})
