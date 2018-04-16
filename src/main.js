import Vue from 'vue'
import App from './App'
import router from './router'
import VueRouter from 'vue-router'
import axios from 'axios'
import store from './store'
import iView from 'iview'
import mavonEditor from 'mavon-editor'

import './common/js/http'

import 'iview/dist/styles/iview.css'
import 'mavon-editor/dist/css/index.css'

Vue.use(VueRouter)
Vue.use(iView)
Vue.use(mavonEditor)

Vue.prototype.$http = axios
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
