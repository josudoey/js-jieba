import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import 'ant-design-vue/dist/antd.css'
import routes from './routes.mjs'

const router = createRouter({
  history: createWebHashHistory(),
  base: '/',
  linkActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { x: 0, y: 0 }
  },
  routes
})

const app = window.app = createApp({})
app.use(router)
const div = document.createElement('div')
div.appendChild(document.createElement('router-view'))
document.body.appendChild(div)

app.mount(div)
