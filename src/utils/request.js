import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { Loading } from 'element-ui'

let loadingInstance

// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API, // api的base_url
  // timeout: 15000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(config => {
  const isShowLoad = config.data && config.data.isLoad === false ? false : true;
  // 创建全屏 Loading
  isShowLoad && (loadingInstance = Loading.service({fullscreen: true, text: 'Loading', background: 'rgba(0, 0, 0, 0.8)'}))
  if (store.getters.isLogin) {
    const user = process.env.NODE_ENV === 'production' ? store.getters.email : 'test'
    config.headers['U-Token'] = user // 让每个请求携带自定义token 请根据实际情况自行修改
  }
  return config
}, error => {
  // Do something with request error
  console.log('config error:', error) // for debug
  Promise.reject(error)
})

// respone拦截器
service.interceptors.response.use(
  response => {
    // 请求响应成功关闭全屏 Loading
    loadingInstance && loadingInstance.close()
    return response.data
  },
  error => {
    // 请求响应失败关闭全屏 Loading
    loadingInstance && loadingInstance.close()
    Message({
      showClose: true,
      message: 'response failed',
      type: 'error',
      duration: 1000
    })
    console.log('response error:' + error)// for debug
    return Promise.reject(error)
  }
)

export default service
