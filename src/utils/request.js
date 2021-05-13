// 请求模块
import axios from 'axios'
// 在非组件模块中必须通过这种方式
import store from '@/store'
import JSONbig from 'json-bigint'

const request = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn', // 基础路径
  transformResponse: [function (data) {
    // 后端返回的数据可能不是json格式字符串
    // 如果不是的话，那么JSONbig.parse调用会报错
    // 所以使用try-catch捕获异常
    try {
      return JSONbig.parse(data)
    } catch (err) {
      console.log('转换失败', err)
      // 如果转换失败，则直接把数据原封不动的直接返回给请求使用
      return data
    }
  }]
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
