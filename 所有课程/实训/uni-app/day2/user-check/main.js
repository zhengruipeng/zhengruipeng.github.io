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
// 全局的登陆验证拦截器，每当页面加载就会判断当前是否登陆
Vue.mixin({
	onShow(){
		var url =''
		try{
			// 获取当前页面的url
			url =getCurrentPages()[getCurrentPages().length-1].route
		}catch(e){
			//TODO handle the exception
			url = ''
		}
		// 判断当页面不是登陆页面的时候我们就验证用户是否登陆
		if(url!= 'pages/login/index'&&url!=''){
			let token = uni.getStorageSync('token')
			if(token == ''){
				uni.navigateTo({
					url:'/pages/login/index'
				})
			}
		}
	}
})
const app = new Vue({
    ...App
})
app.$mount()
