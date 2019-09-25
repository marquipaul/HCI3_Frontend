import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
import router from './router'
import store from './store/index.js'
import './registerServiceWorker'
import VueScrollTo from 'vue-scrollto'
import axios from 'axios'
import {initialize} from './helpers/general';

Vue.use(VueScrollTo, {
  container: "body",
  duration: 500,
  easing: "ease",
  offset: -70,
  force: true,
  cancelable: true,
  onStart: false,
  onDone: false,
  onCancel: false,
  x: false,
  y: true
})

// import Echo from 'laravel-echo'

// window.Pusher = require('pusher-js');

// window.Echo = new Echo({
//      broadcaster: 'pusher',
//      key: 'PAULIKAY',
//      cluster: 'mt1',
//      //encrypted: true
//      wsHost: '127.0.0.1',
//      wsPort: 6001,
//      disableStats: true,
// });


axios.defaults.baseURL = 'http://hci3-project.test/'
//axios.defaults.baseURL = 'http://192.168.31.24:8000/'


initialize(store, router, axios);

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
