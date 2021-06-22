import 'element-ui/lib/theme-chalk/index.css'
import 'normalize.css'
import '@/assets/reset.css'
import Vue from 'vue'
import ElementUI from 'element-ui'
import Vant from 'vant'
import App from './App.vue'
import router from '@/router'

console.log('main.js load', performance.now())

Vue.config.productionTip = false
Vue.config.devtools = true

window.addEventListener('load', () => {
  const navigation =
    performance.getEntriesByType('navigation').length > 0
      ? performance.getEntriesByType('navigation')[0]
      : performance.timing
  console.log('load', performance.now())
  console.log('domInteractive', navigation.domInteractive)
  console.log('domContentLoadedEventStart', navigation.domContentLoadedEventStart)
  console.log('domComplete', navigation.domComplete)
})

document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded', performance.now())
})

Vue.use(ElementUI)
Vue.use(Vant)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

// window.onload = () => {
//   console.log('main.js load');
// };
