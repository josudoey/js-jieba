'use client'
import '@ant-design/v5-patch-for-react-19'
import './globals.css'
import React from 'react'
import { Typography } from 'antd'

const { Title } = Typography
import { Flex, Layout, ConfigProvider } from 'antd'

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html>
      <title>Jieba中文斷詞</title>
      <meta
        name='viewport'
        content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
      ></meta>
      <body className='h-screen'>
        <Flex gap='middle' wrap>
          {/* see https://ant.design/components/layout#design-token */}
          <ConfigProvider
            theme={{
              components: {
                Layout: {
                  headerBg: 'fff'
                },
                Menu: {
                  itemBg: 'fff'
                },
                Radio: {
                  borderRadius: 0
                }
              }
            }}
          >
            {/* see https://ant.design/components/layout#layout-demo-top-side-2 */}
            <Layout className='h-screen'>
              <Title level={2} className='mt-2 mb-2 ml-4'>
                Jieba
              </Title>
              {children}
            </Layout>
          </ConfigProvider>
        </Flex>
      </body>
    </html>
  )
}
