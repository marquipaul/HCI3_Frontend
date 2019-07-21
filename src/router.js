import Vue from 'vue'
import Router from 'vue-router'
import Products from './components/ProductsView.vue'
import Login from './components/authentication/Login.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/admin/login',
      name: 'admin-login',
      component: Login
    },
    {
      path: '/',
      name: 'products-view',
      component: Products
    },
  ]
})
