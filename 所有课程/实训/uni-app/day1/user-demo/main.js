import Vue from 'vue'
import App from './App'
// 导入http对象
import './http'
// 导入store对象
import store from './store'
// 导入ui框架
import uView from "uview-ui";
// 安装ui框架
Vue.use(uView);
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App,
		store
})
app.$mount()
