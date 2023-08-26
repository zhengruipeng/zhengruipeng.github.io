// 引入vue
import Vue from 'vue'
// 引入vuex
import Vuex from 'vuex'
import MeModel  from '../pages/me/me.model.js'
console.log(MeModel)
// 将Vuex挂在到Vue上
Vue.use(Vuex)

// 实例化store对象
const store = new Vuex.Store({
	// 全局的状态数据
	state:{
		name:'hello'
	},
	getters:{
		getName(state){
			return state.name
		}
	},
	mutations:{
		setName(state,name){
			state.name = name
		}
	},
	actions:{
		
	},
	// 业务模块注册在这里
	modules:{
		meModel:MeModel
	}
})
// 导出store对象
export default store