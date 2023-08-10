import Vue from 'vue'
import Vuex from 'vuex'
// 引入了user中的user-model.js
import UserModel from '../views/system/user/user-model.js'
import RoleModel from '../views/system/role/role-model.js'
import MenuModel from '../views/system/menu/menu-model.js'

import UserTestModel from '../views/test/user-test/user-test-model.js'
Vue.use(Vuex)
// 根据登录用户的角色id获取菜单列表
import { getMenuByRoleId } from '../api/menu-api.js'
//全局的数据中心
const store = new Vuex.Store({
	// vuex中的核心数据存储对象，相当于Vue对象中的data属性，原理就是Vue.observable时学习的响应式对象
  state: {
    menuList: [],//菜单列表
		tabsList:[],//当前打开的tabs列表
		activeMenuId:'',//当前选中的菜单id
		selectedMenu:[]
  },
	// mutations主要用于对state中声明的属性设置值，这种写法主要为了能让Vuex的数据流向不产生紊乱，
	//所以不推荐直接修改state中的值，一定要通过mutations去设置对应的state
  mutations: {
		// 设置菜单列表的新值
    setMenuList (state,menuList) {
      state.menuList = menuList;
			sessionStorage.menuList = JSON.stringify(menuList);
    },
		// 设置tabs列表的新值
		setTabsList (state,tabsList) {
			state.tabsList = tabsList
			sessionStorage.tabsList = JSON.stringify(tabsList);
		},
		// 设置当前选中菜单的新值
		setActiveMenuId (state, activeMenuId){
			state.activeMenuId = activeMenuId
			sessionStorage.activeMenuId = activeMenuId;
		}
  },
	// getters相当于Vuex对象的计算属性也就是效果等同于Vue中的computed
	getters:{
		getActiveMenuId(state){
			state.activeMenuId = sessionStorage.activeMenuId?sessionStorage.activeMenuId:state.sessionStorage
			return state.activeMenuId;
		},
		getTabsList(state){
			try{
				let tabsList = JSON.parse(sessionStorage.tabsList)
				state.tabsList = tabsList
			}catch(e){
				
			}
			return state.tabsList;
		},
		// 获取菜单列表，防止刷新丢失
		getMenuList(state,getters){
			try{
				let menuList = JSON.parse(sessionStorage.menuList)
				state.menuList = menuList
			}catch(e){
				
			}
			return state.menuList;
		},
		// 根据当前的tabsList返回keep-alive要缓存的页面name数组
		getKeepAliveList(state){
			return state.tabsList.map(item => item.url.replace('/',''));
		},
		// 获取当前选中的菜单对象
		getActiveMenu(state,getters){
			
			let menuList = getters.getMenuList;
			let selectedMenu = {}
			menuList.forEach(item => {
				if(item.children){
					item.children.forEach(itemChild => {
						if(itemChild.id == getters.getActiveMenuId){
							selectedMenu = itemChild;
						}
					})
				}
			})
			state.selectedMenu = selectedMenu
			return state.selectedMenu;
		}
	},
	// actions是Vuex中唯一可以使用异步语法的模块，用于编写业务逻辑
	actions:{
		// 根据角色id查询菜单列表，并将结果设置到menuList,tabsList,activeMenuId中
		async fetchMenuByRoleId({commit},data){
			let res = await getMenuByRoleId(data)
			if(res.data.code == 200){
				let menuList = res.data.data;
				// commit相当于调用了mutations中对应的方法
				commit('setActiveMenuId',menuList[0].children[0].id)
				commit('setTabsList',[menuList[0].children[0]])
				commit('setMenuList',menuList)
			}
		}
	},
	modules:{
		// 将user-model.js注册到了store全局对象中，命名为userModel
		userModel:UserModel,
		roleModel:RoleModel,
		menuModel:MenuModel,
		userTestModel:UserTestModel
		
	}
})
export default store