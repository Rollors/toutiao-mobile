// 请求模块
import axios from 'axios'
// 在非组件模块中必须通过这种方式
import store from '@/store'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn' // 基础路径
})
// 请求拦截器
request.interceptors.request.use(function (config) {
  const { user } = store.state
  // 如果用户已登录
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }

  // 处理完之后，一定要把config返回，否则会停在这里
  return config
}, function (error) {
  return Promise.reject(error)
})
// 响应拦截器

// 导出
export default request
