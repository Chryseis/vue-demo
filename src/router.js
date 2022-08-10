import Vue from 'vue'
import VueRouter from 'vue-router'

const context = require.context('./pages', true, /index.vue$/)

const routes = context
  .keys()
  .map(key => {
    const [pagePath, name] = key.match(/\.\/(\w+)\/index.vue/)
    if (name !== 'index') {
      return {
        path: `/${name}`,
        name,
        component: context(pagePath).default
      }
    }
    return {
      path: '/',
      name,
      component: context(pagePath).default
    }
  })
  .filter(Boolean)

Vue.use(VueRouter)

export { routes }

const createRouter = () =>
  new VueRouter({
    mode: 'history',
    base: 'vue2',
    routes,
    scrollBehavior(to, from, savedPosition) {
      console.log(savedPosition, 'savedPosition')
      if (savedPosition) {
        return savedPosition
      } else {
        return { x: 0, y: 0 }
      }
    }
  })

export default createRouter
