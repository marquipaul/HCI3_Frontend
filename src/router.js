import Vue from 'vue'
import Router from 'vue-router'
import ProductPreview from './components/ProductsView.vue'
import ProductView from './components/pages/ViewProduct.vue'
import CheckoutPage from './components/pages/Checkout.vue'

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
      component: Products,
      meta: {
        requiresAuth: true,
      }
    },
    {
      path: '/',
      name: 'products-view',
      component: ProductPreview
    },
    {
      path: '/product/preview',
      name: 'view-product',
      component: ProductView
    },
    {
      path: '/checkout',
      name: 'checkout',
      component: CheckoutPage
    },
  ]
})
