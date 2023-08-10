//完整实现步骤
import { getUserList,addUser,findUserById,updateUser,removeUserById } from '../../../api/user-api.js'

import { getAllRoleList } from '../../../api/role-api.js'

export default{
	namespaced:true,
  state:{
    list:[
			{id:'1',username:'admin1',password:'1234561'},
			{id:'2',username:'admin2',password:'1234562'},
			{id:'3',username:'admin3',password:'1234563'},
		],
		page:{},
		roleList:[]
  },
  mutations:{
    setList(state,list){
      state.list = list
    },
		setPage(state,page){
			state.page = page;
		},
		setRoleList(state,roleList){
			state.roleList = roleList
		}
  },
	//业务函数对象
	actions:{
		//根据业务名称定义异步函数
		async getListForPage({commit},queryForm){
			//在业务函数中执行接口调用函数,通过await来修饰
			let res = await getUserList(queryForm)
			//根据接口返回数据的结构，我们获取状态码进行判断
			if(res.data.code == 200){
				//如果接口调用成功，我们就将当前的接口中list的数据赋给state中的list，通过commit执行
				commit('setList',res.data.data.list)
				commit('setPage',res.data.data.page)
			}
		},
		async getRoleList({commit}){
			let res = await getAllRoleList()
			if(res.data.code == 200){
				commit('setRoleList',res.data.data.list)
			}
		},
		async insert({},addForm){
			await addUser(addForm)
		},
		async findById({},id){
			let res = await findUserById(id)
			if(res.data.code == 200){
				return res.data.data
			}else{
				return {}
			}
		},
		async update({},addForm){
			await updateUser(addForm)
		},
		async deleteById({},id){
			await removeUserById(id)
		}
	}
}