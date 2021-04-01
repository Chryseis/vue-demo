import Vue from 'vue';
import VueRouter from 'vue-router';

const context = require.context('./pages', true, /index.vue$/);

const routes = context.keys().map(key => {
  const [pagePath, name] = key.match(/\.\/(\w+)\/index.vue/);
  return {
    path: name === 'index' ? '/' : `/${name}`,
    name,
    component: context(pagePath).default
  };
});
Vue.use(VueRouter);

export { routes };

export default new VueRouter({
  routes,
  scrollBehavior(to, from, savedPosition) {
    console.log(savedPosition, 'savedPosition');
    if (savedPosition) {
      return savedPosition;
    } else {
      return { x: 0, y: 0 };
    }
  }
});
