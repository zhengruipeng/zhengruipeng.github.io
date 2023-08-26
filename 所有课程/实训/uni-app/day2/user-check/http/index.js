import Vue from 'vue'
// 全局的公共url
const baseUrl = 'http://localhost:3000/shop-service/v1'
// 封装全局的请求对象
function http(data){
	let p = new Promise((resolve,reject)=>{
		let token = uni.getStorageSync('token')
		if(token!=''){
			if(!data.header){
				data.header = {}
			}
			data.header['Authorization'] = 'Bearer '+token
		}
		// 拦截器逻辑在这里处理
		
		if(data.url){
			if(data.url.indexOf('http')==-1){
				data.url = baseUrl+data.url
			}
			
		}
		// 请求成功的回调拦截在此处理
		data.success = res => {
			if(res.data.code!=200){
				uni.showToast({
					icon:"none",
					title:res.data.msg
				})
			}
			resolve(res)
		}
		// 请求失败的回调拦截在此处理
		data.fail = err => {
			
			reject(err)
		}
		uni.request(data)
	})
	return p;
}
// 将请求对象挂在到vue的$http上
Vue.prototype.$http = http
// 单独导出请求对象
export default http