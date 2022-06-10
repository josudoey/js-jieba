const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, './entry.js'),
  output: {
    path: path.resolve(__dirname, '../../../dist'),
    filename: 'dict.zh-tw.js',
    libraryTarget: 'commonjs2'
  },
  mode: 'production',
  devtool: 'source-map',
  resolve: {
    fallback: {
      fs: false,
      path: false,
      crypto: false
    }
  },
  module: {
    rules: [{
      test: /\.txt$/,
      type: 'asset/source'
    }]
  }
}
