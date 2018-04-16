/**
 * Created by zhangfuhao on 2018/4/12.
 */
import Vue from 'vue'
import axios from 'axios'
import iView from 'iview'

Vue.use(iView)

axios.defaults.timeout = 5000

axios.interceptors.request.use((config) => {
  iView.LoadingBar.start()
  return config
}, error => {
  iView.LoadingBar.finish()
  return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use((data) => {
  iView.LoadingBar.finish()
  return data
}, (error) => {
  iView.LoadingBar.finish()
  return Promise.reject(error)
})

export default axios

