// 初始化dayjs相关配置
import Vue from 'vue'
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'

// 配置处理相对时间的包
dayjs.extend(relativeTime)
// 配置中文语言包
dayjs.locale('zh-cn')

// 把处理相对时间的代码包装为全局过滤器，就是一个方法
// 在组件中使用过滤器: {{ xxx | relativeTime }}
// xxx是参数，relativeTime是模板的名称
Vue.filter('relativeTime', value => {
  return dayjs(value).from(dayjs())
})

Vue.filter('datetime', (value, format = 'YYYY-MM-DD HH:mm:ss') => {
  return dayjs(value).format(format)
})
