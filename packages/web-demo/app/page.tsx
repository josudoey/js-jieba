'use client'
import { Card, Checkbox, InputNumber, ConfigProvider } from 'antd'
import { Layout, Flex, Radio } from 'antd'

import { JiebaDict, HMMModel, UserDict, IDF, StopWords } from 'jieba-zh-tw'
import createJieba from 'js-jieba'
import type { Jieba } from 'js-jieba'

type Keywords = ReturnType<typeof jieba.extract>
type Words = ReturnType<typeof jieba.cutForSearchWithOffset>

const jieba: Jieba = createJieba(JiebaDict, HMMModel, UserDict, IDF, StopWords)

import { Input } from 'antd'
import { useState, useMemo, useEffect } from 'react'
import type { CheckboxChangeEvent } from 'antd'

const { TextArea } = Input
const { Content } = Layout
const jiebaMethods = [
  'cut',
  'cutAll',
  'cutForSearchWithOffset',
  'lookupTag',
  'tag',
  'extract'
]

export default function Home() {
  const [type, setType] = useState('cut')
  const [useHMM, setUseHMM] = useState(false)
  const [topk, setTopk] = useState(5)
  const [text, setText] = useState('')

  const displayUseHMM = useMemo(() => {
    return ['cut', 'cutForSearch', 'cutForSearchWithOffset'].indexOf(type) >= 0
  }, [type])

  const displayTopk = useMemo(() => {
    return type === 'extract'
  }, [type])

  const result = useMemo(() => {
    let item: string | string[] | Keywords | Words = ''
    switch (type) {
      case 'cut':
        item = jieba.cut(text, useHMM)
        break
      case 'cutAll':
        item = jieba.cutAll(text)
        break
      case 'cutForSearch':
        item = jieba.cutForSearch(text, useHMM)
        break
      case 'cutForSearchWithOffset':
        item = jieba.cutForSearchWithOffset(text, useHMM)
        break
      case 'tag':
        item = jieba.tag(text)
        break
      case 'lookupTag':
        item = jieba.lookupTag(text)
        break
      case 'extract':
        item = jieba.extract(text, topk)
        break
    }
    return JSON.stringify(item)
  }, [type, text, topk, useHMM])

  return (
    <Content
      style={{
        padding: 0,
        margin: 0,
        minHeight: 280,
        borderRadius: 0
      }}
    >
      <Card>
        <Flex gap='middle' className='w-full'>
          <Radio.Group
            className='w-min'
            block
            options={jiebaMethods.map((name) => ({ label: name, value: name }))}
            defaultValue={type}
            optionType='button'
            buttonStyle='solid'
            onChange={(e) => {
              setType(e.target.value)
            }}
          />

          {displayUseHMM && (
            <Checkbox
              onClick={(e: any) => {
                const event = e as CheckboxChangeEvent
                setUseHMM(event.target.checked)
              }}
            >
              useHMM
            </Checkbox>
          )}

          {displayTopk && (
            <InputNumber
              defaultValue={topk}
              onChange={(e) => {
                setTopk(e?.valueOf() || 5)
              }}
            ></InputNumber>
          )}
        </Flex>
        <Card.Grid
          hoverable={false}
          style={{
            width: '50%',
            textAlign: 'center'
          }}
        >
          <TextArea
            defaultValue={text}
            rows={20}
            onChange={(e) => {
              setText(e.target.value)
            }}
          ></TextArea>
        </Card.Grid>
        <Card.Grid
          hoverable={false}
          style={{
            width: '50%',
            textAlign: 'center'
          }}
        >
          {result}
        </Card.Grid>
      </Card>
    </Content>
  )
}
