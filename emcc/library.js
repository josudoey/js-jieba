/* global mergeInto, LibraryManager */
/* global UTF8ToString */
/* global _array, _result */
mergeInto(LibraryManager.library, {
  array_push_size: function (v) {
    _array.push(v)
  },
  result_push_word: function (word) {
    _result.push(UTF8ToString(word))
  },
  result_push_word_offset: function (word, offset, unicodeOffset) {
    _result.push({
      word: UTF8ToString(word),
      offset: offset,
      unicodeOffset: unicodeOffset
    })
  },
  result_push_keyword: function (word, weight) {
    _result.push({
      word: UTF8ToString(word),
      offsets: _array.splice(0),
      weight: weight
    })
  },
  result_push_tag: function (word, tag) {
    _result.push([
      UTF8ToString(word),
      UTF8ToString(tag)
    ])
  }
})
