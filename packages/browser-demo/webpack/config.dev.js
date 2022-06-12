const path = require('path')
const config = require('./config')
module.exports = Object.assign({}, config, {
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    devMiddleware: {
      writeToDisk: true
    },
    static: [{
      serveIndex: true,
      directory: path.resolve(__dirname, '../dist.dev')
    }]
  }
})
