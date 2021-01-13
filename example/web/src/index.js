import Vue from 'vue/dist/vue.esm'
import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

const Jieba = require('../../../dist/jieba')
const {
  JiebaDict, HMMModel, UserDict, IDF, StopWords
} = require('../../../dist/dict.zh-cn')

const jieba = Jieba(
  Buffer.from(JiebaDict),
  Buffer.from(HMMModel),
  Buffer.from(UserDict),
  Buffer.from(IDF),
  Buffer.from(StopWords)
)

Vue.use(Antd)
const vm = new Vue({
  data () {
    return {
      type: 'cut',
      useHMM: true,
      topk: 5,
      text: '',
      items: []
    }
  },
  methods: {
    onChange () {
      switch (this.type) {
        case 'cut':
          this.items = jieba.cut(this.text, this.useHMM)
          break
        case 'cutAll':
          this.items = jieba.cutAll(this.text)
          break
        case 'cutForSearch':
          this.items = jieba.cutForSearch(this.text, this.useHMM)
          break
        case 'cutForSearchWithOffset':
          this.items = jieba.cutForSearchWithOffset(this.text, this.useHMM)
          break
        case 'tag':
          this.items = jieba.tag(this.text)
          break
        case 'lookupTag':
          this.items = jieba.lookupTag(this.text)
          break
        case 'extract':
          this.items = jieba.extract(this.text, this.topk)
          break
      }
    }
  }
})
vm.$mount('#app')
