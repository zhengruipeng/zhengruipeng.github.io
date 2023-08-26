import {getUserListAll} from '../../api/user-api.js'
export default{
	namespaced:true,
	state:{
		list:[],
	},
	mutations:{
		setList(state,list){
			state.list = list
		}
	},
	actions:{
		async getListAll({commit},data){
			let res = await getUserListAll(data)
			console.log(res)
			if(res.data.code == 200){
				console.log(res)
				commit('setList',res.data.data.list)
			}
		}
	}
}