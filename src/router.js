import Vue from 'vue'
import Router from 'vue-router'
import ProductPeview from './components/ProductsView.vue'
import Login from './components/authentication/Login.vue'
import Products from './components/admin/Product.vue'

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
      path: '/admin/products',
      name: 'admin-products',
      component: Products
    },
    {
      path: '/',
      name: 'products-view',
      component: ProductPeview
    },
  ]
})
