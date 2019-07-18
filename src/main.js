// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'

Vue.config.productionTip = false
// Vue.prototype.HOST = 'http://39.105.65.8:9999'
Vue.prototype.HOST = 'http://127.0.0.1:8888'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

const service = axios.create({
  timeout: 1000 * 30,
  // 允许跨域带token
  withCredentials: true
})

service.interceptors.request.use(
  (config) => {
    config.headers['token'] = localStorage.getItem("token");
    return config
  },
  (error) => {
    return Promise.reject(error)
  })

  service.interceptors.response.use(response => {
    console.log("test")
    if (response.data && response.data.code === 511) { // 401, token失效
      
      localStorage.removeItem("token")
      router.push({name: 'Login'})
    }
    return response
  }, error => {
    return Promise.reject(error)
  })
