import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

// 路由表
const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/')
  },
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '', // 默认子路由
        name: 'home',
        component: () => import('@/views/home/')
      },
      {
        path: '/qa', // 默认子路由
        name: 'qa',
        component: () => import('@/views/qa/')
      },
      {
        path: '/video', // 默认子路由
        name: 'video',
        component: () => import('@/views/video/')
      },
      {
        path: '/my', // 默认子路由
        name: 'my',
        component: () => import('@/views/my/')
      },
      {
        path: '/search',
        name: 'search',
        component: () => import('@/views/search/')
      }
    ]
  },
  {
    path: '/article/:articleId',
    name: 'article',
    component: () => import('@/views/article/'),
    // 将动态路由参数映射到组件的props中
    props: true
  },
  {
    path: '/user/profile',
    name: 'user-profile',
    component: () => import('@/views/user-profile/')
  }
]

const router = new VueRouter({
  routes
})

export default router
