const decompress = require('brotli/decompress')
const base64 = require('base64-js')

function unpack (bs64) {
  return decompress(base64.toByteArray(bs64))
}

module.exports.unpack = unpack
