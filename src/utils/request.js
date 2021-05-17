// 请求模块
import axios from 'axios'
// 在非组件模块中必须通过这种方式
import store from '@/store'
import JSONbig from 'json-bigint'
import { Toast } from 'vant'
import router from '@/router'

const refreshTokenReq = axios.create({
  baseURL: 'http://ttapi.research.itcast.cn'
})

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
axios.interceptors.response.use(function (response) {
  return response
}, async function (error) {
  const status = error.response.status
  if (status === 400) {
    // 客户端参数错误
    Toast.fail('客户端参数错误')
  } else if (status === 401) {
    // token无效
    // 如果没有user或者user.token，直接登录
    const { user } = store.state
    if (!user || !user.token) {
      // 直接跳到登录页
      return redirectLogin()
    }
    // 如果有refresh_token，则请求获取新的token
    try {
      const { data } = await refreshTokenReq({
        method: 'PUT',
        url: '/app/v1_0/authorizations',
        headers: {
          Authorization: `Bearer ${user.refresh_token}`
        }
      })
      // 更新到容器中
      user.token = data.data.token
      store.commit('setUser', user)
      return request(error.config)
    } catch (err) {
      redirectLogin()
    }
    // 拿到新的token到容器中
    // 把失败的请求重新发出去
  } else if (status === 403) {
    // 没有权限操作
    Toast.fail('没有权限操作')
  } else if (status >= 500) {
    // 服务端异常
    Toast.fail('服务端异常')
  }
  return Promise.reject(error)
})
function redirectLogin () {
  router.replace({
    name: 'login',
    query: {
      // router.currentRoute当前路由对象
      redirect: router.currentRoute.fullPath
    }
  })
}
// 导出
export default request
