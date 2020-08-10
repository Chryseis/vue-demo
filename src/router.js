import Vue from 'vue';
import VueRouter from 'vue-router';

const context = require.context('./pages', true, /index.vue$/);

const routes = context.keys().map(key => {
  const [pagePath, name] = key.match(/\.\/(\w+)\/index.vue/);
  return {
    path: `/${name}`,
    name,
    component: context(pagePath).default
  };
});

Vue.use(VueRouter);

export default new VueRouter({ routes });
