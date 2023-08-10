import {findRoleListForPage,deleteRoleById,insertRole,updateRole,findRoleById} from '../../../api/role-api.js'
import {getMenuList,getMenuByRoleId,insertMenuRole,insertMenu,getMenuById,
	updateMenu,insertChildMenu,updateChildMenu,deleteMenuById} from '../../../api/menu-api.js'
import { iconList } from './icon-data.js'
export default {
	namespaced:true,
	state:{
		list:[],
		page:{
			pno:1,
			psize:10,
			pCount:0,
			totalElements:0
		},
		iconList:iconList
	},
	mutations:{
		setList(state,list){
			state.list = list;
		},
		setPage(state,page){
			state.page = page
		},
		
	},
	actions:{
		async getListForPage({commit},params){
			let res = await getMenuList(params)
			if(res.data.code == 200 ){
				commit('setList',res.data.data.list)
			}
		},
		async deleteById({},id){
			await deleteMenuById(id)
		},
		async insert({},data){
			await insertMenu(data)
		},
		async insertChild({},data){
			await insertChildMenu(data)
		},
		async update({},data){
			await updateMenu(data)
		},
		async updateChild({},data){
			await updateChildMenu(data)
		},
		
		async findById({},id){
			let res = await getMenuById(id)
			if(res.data.code==200){
				return res.data.data;
			}else{
				return {}
			}
		},
		
	}
}

