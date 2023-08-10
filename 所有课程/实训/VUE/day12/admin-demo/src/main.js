import Vue from 'vue'
import App from './App.vue'
//引入路由组件
import router from './router'
//引入elementUI框架
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引入axios请求库
import http from './http'
//引入Vuex框架
import store from './store'
//引入自定义全局组件
import './components'
//安装请求库到Vue对象上
Vue.use(http)
//安装elementUI到Vue框架上
Vue.use(ElementUI)

Vue.config.productionTip = false

new Vue({
	store,//将Vuex数据注册到Vue的全局对象上
  router,//将路由的数据注册到Vue的全局对象上
  render: h => h(App)//渲染页面
}).$mount('#app')
