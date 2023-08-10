import {findRoleListForPage,deleteRoleById,insertRole,updateRole,findRoleById} from '../../../api/role-api.js'
import {getMenuList,getMenuByRoleId,insertMenuRole} from '../../../api/menu-api.js'
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
		menuList:[],
		checkMenuList:[]
	},
	mutations:{
		setList(state,list){
			state.list = list;
		},
		setPage(state,page){
			state.page = page
		},
		setMenuList(state,menuList){
			state.menuList = menuList
		},
		setChekMenuList(state,checkMenuList){
			state.checkMenuList = checkMenuList
		}
	},
	actions:{
		async getListForPage({commit},params){
			let res = await findRoleListForPage(params);
			if(res.data.code == 200){
				commit('setList',res.data.data.list)
				commit('setPage',res.data.data.page)
			}
		},
		async deleteById({},id){
			await deleteRoleById(id)
		},
		async insert({},role){
			await insertRole(role)
		},
		async update({},role){
			await updateRole(role)
		},
		async findById({},id){
			let res = await findRoleById(id);
			if(res.data.code == 200){
				return res.data.data
			}else{
				return {}
			}
		},
		async findAllMenu({commit}){
			let res = await getMenuList()
			if(res.data.code == 200){
				commit('setMenuList',res.data.data.list)
			}
		},
		async findMenuByRoleId({commit},roleId){
			let res = await getMenuByRoleId(roleId)
			if(res.data.code == 200){
				commit('setChekMenuList',res.data.data)
			}
		},
		async saveMenuRole({},data){
			await insertMenuRole(data)
		}
	}
}