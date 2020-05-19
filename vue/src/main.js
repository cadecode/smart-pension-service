import Vue from 'vue'
import App from './App.vue'

// 引入 vue-router
import router from './router/router'
// 引入 vuex
import store from './store/store'
// 引入 axios
import axios from './util/axios'
Vue.prototype.$ajax = axios

// 引入 iView
import iView from 'view-design'
import 'view-design/dist/styles/iview.css'
Vue.use(iView)

// 引入登录状态工具
import Validator from './util/validator'
Vue.prototype.$validator = new Validator({
  router,
  store,
  iView
})

// 引入 js/css 资源文件
import './assets/js/adapter'
import './assets/css/mian.css';

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')