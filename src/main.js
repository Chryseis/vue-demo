import 'element-ui/lib/theme-chalk/index.css';
import 'normalize.css';
import '@/assets/reset.css';
import Vue from 'vue';
import ElementUI from 'element-ui';
import Vant from 'vant';
import App from './App.vue';
import router from '@/router';

Vue.config.productionTip = false;
Vue.config.devtools = true;

Vue.use(ElementUI);
Vue.use(Vant);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');

document.addEventListener('DOMContentLoaded', () => {
  const event = document.createEvent('Events');
  event.initEvent('myJSBridgeReady', false, true);
  event.data = 'myJSBridgeReady';
  document.dispatchEvent(event);
});

document.addEventListener('myJSBridgeReady', () => {
  console.log('haha');
});
