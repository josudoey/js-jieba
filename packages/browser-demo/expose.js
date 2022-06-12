const path = require('path')
const projectPath = __dirname
const distPath = path.resolve(projectPath, 'dist')
const publicPath = './'

module.exports = {
  publicPath,
  distPath,
  entry: path.join(projectPath, './vue/entry.mjs'),
  html: {
    appMountId: 'app',
    appMountHtmlSnippet: '',
    lang: 'en-US',
    title: '',
    meta: [{
      name: 'viewport',
      content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
    }, {
      name: 'robots',
      content: 'noindex, nofollow'
    }],
    links: [],
    scripts: []
  }
}
