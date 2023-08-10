import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 引入了基于axios封装的请求对象
import Http from './http'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
Vue.use(ElementUI)
//安装请求对象到vue上
Vue.use(Http)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
