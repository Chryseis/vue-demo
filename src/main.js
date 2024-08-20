import 'element-ui/lib/theme-chalk/index.css'
import '@zyf2e/capui-mobile/lib/index.css'
import 'normalize.css'
import '@/assets/reset.css'
import Vue from 'vue'
import ElementUI from 'element-ui'
import CapUI from '@zyf2e/capui-mobile'
import App from './App.vue'
import createRouter from '@/router'

console.log('main.js load', performance.now())

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(ElementUI)
Vue.use(CapUI)

let instance = null
let router = null

if (!window.__POWERED_BY_QIANKUN__) {
  render()
}

function render(props = {}) {
  const { container } = props
  router = createRouter()

  instance = new Vue({
    router,
    render: h => h(App)
  }).$mount(container ? container.querySelector('#app') : '#app')
}

export async function bootstrap() {
  console.log('[vue] vue app bootstraped')
}

export async function mount(props) {
  console.log('[vue] props from main framework', props)
  render(props)
}

export async function unmount() {
  instance.$destroy()
  instance.$el.innerHTML = ''
  instance = null
  router = null
}
