/* global Module */
/* global _result _array */
/* eslint-disable */

/** in pre.js */
// module.exports = function() {
/** ... */
  return {
    cut: function(sentence, useHMM) {
      if(typeof useHMM ==='undefined') {
        useHMM = true
      }
      Module.ccall('Cut', 'number',
        ['string', 'boolean'],
        [sentence, useHMM]
      )
      return _result.splice(0)
    },
    cutAll: function(sentence) {
      Module.ccall('CutAll', 'number',
        ['string'],
        [sentence]
      )
      return _result.splice(0)
    },
    cutForSearch: function(sentence, useHMM) {
      if(typeof useHMM ==='undefined') {
        useHMM = true
      }
      Module.ccall('CutForSearch', 'number',
        ['string', 'boolean'],
        [sentence, useHMM]
      )
      return _result.splice(0)
    },
    cutForSearchWithOffset: function(sentence, useHMM) {
      if(typeof useHMM ==='undefined') {
        useHMM = true
      }
      Module.ccall('CutForSearchWithOffset', 'number',
        ['string', 'boolean'],
        [sentence, useHMM]
      )
      return _result.splice(0)
    },
    insertUserWord: function(word) {
      Module.ccall('InsertUserWord', 'number',
        ['string'],
        [word]
      )
    },
    tag: function(sentence) {
      Module.ccall('Tag', 'number',
        ['string'],
        [sentence]
      )
      return _result.splice(0)
    },
    extract: function(sentence, topk) {
      Module.ccall('Extract', 'number',
        ['string', 'number'],
        [sentence, topk]
      )
      return _result.splice(0)
    },
    lookupTag: function(sentence) {
      Module.ccall('LookupTag', 'number',
        ['string'],
        [sentence]
      )
      return _result.splice(0).pop()
    }
  }
}