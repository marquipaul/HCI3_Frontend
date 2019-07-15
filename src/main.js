import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'
//import './fullpage.scrollHorizontally.min' // Optional. When using fullpage extensions
import vueScrollto from 'vue-scrollto'

Vue.use(vueScrollto)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
