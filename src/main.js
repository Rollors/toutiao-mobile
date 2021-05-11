import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 加载Vant组件库,样式不适配所有设备，需要解决适配问题
import Vant from 'vant'

// 加载Vant组件库样式
import 'vant/lib/index.css'

// 自动设置rem基准值(html标签的字体大小)
import 'amfe-flexible'

// 加载全局样式，最好放到样式加载的最后，方便覆盖第三方样式
import './styles/index.less'

import './utils/day'

// 全局注册Vant中的组件
Vue.use(Vant)
Vue.config.productionTip = false

// 创建Vue根实例，将router,store配置到根实例中
// 把App根组件渲染到#app节点
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
