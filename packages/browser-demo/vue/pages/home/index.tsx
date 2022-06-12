import { ref, defineComponent, computed } from 'vue'
import {
  Layout,
  InputNumber,
  Checkbox,
  LayoutContent,
  PageHeader,
  Card,
  RadioGroup,
  RadioButton,
  CardGrid,
  Textarea
} from 'ant-design-vue'

import {
  JiebaDict, HMMModel, UserDict, IDF, StopWords
} from 'jieba-zh-tw'
import createJieba from 'js-jieba'

const jieba = createJieba(
  JiebaDict,
  HMMModel,
  UserDict,
  IDF,
  StopWords
)

export default defineComponent({
  setup() {
    const type = ref("cut")
    const useHMM = ref(false)
    const topk = ref(5)
    const text = ref("")
    const result = ref("")

    const onChange = () => {
      let item: any = undefined
      switch (type.value) {
        case 'cut':
          item = jieba.cut(text.value, useHMM.value)
          break
        case 'cutAll':
          item = jieba.cutAll(text.value)
          break
        case 'cutForSearch':
          item = jieba.cutForSearch(text.value, useHMM.value)
          break
        case 'cutForSearchWithOffset':
          item = jieba.cutForSearchWithOffset(text.value, useHMM.value)
          break
        case 'tag':
          item = jieba.tag(text.value)
          break
        case 'lookupTag':
          item = jieba.lookupTag(text.value)
          break
        case 'extract':
          item = jieba.extract(text.value, topk.value)
          break
      }
      result.value = JSON.stringify(item)
    }

    const displayUseHMM = computed<boolean>(() => {
      return ['cut', 'cutForSearch', 'cutForSearchWithOffset'].indexOf(type.value) >= 0
    })

    const displayTopk = computed<boolean>(() => {
      return type.value === "extract"
    })

    const jiebaMethods = ["cut", "cutAll", "cutForSearchWithOffset", "lookupTag", "tag", "extract"]

    return () => (
      <Layout class="h-100">
        <LayoutContent class="h-100">
          <PageHeader title="Jieba Demo"></PageHeader>
          <Card>
            <div>
              <RadioGroup v-model:value={type.value} onChange={onChange}>
                {jiebaMethods.map((name) =>
                  <RadioButton value={name}>{name}</RadioButton>
                )}
              </RadioGroup>
              {displayUseHMM.value ? <Checkbox v-model:checked={useHMM.value} onChange={onChange}>useHMM</Checkbox> : undefined}
              {displayTopk.value ? <InputNumber v-model:value={topk.value} onChange={onChange}></InputNumber> : undefined}
            </div>
            <CardGrid style="width:50%;text-align:center">
              <Textarea v-model:value={text.value} rows={20} onChange={onChange}></Textarea>
            </CardGrid>
            <CardGrid style="width:50%;text-align:center">
              {result.value}
            </CardGrid>
          </Card>
        </LayoutContent>
      </Layout>
    )
  }
})
