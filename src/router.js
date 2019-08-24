import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Market from './views/Market.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  linkActiveClass: "is-active",
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/market',
      name: 'market',
      component: Market
    }
  ]
})