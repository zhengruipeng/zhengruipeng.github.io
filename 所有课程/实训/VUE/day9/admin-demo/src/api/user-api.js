import api from '../http'
// 初步定义login函数，通过api中的http功能将登录实现
export const login = (username,password) => {
	return api.http({
		url:'/user/login',
		method:'post',
		data:{
			username,
			password
		}
	})
}
// 获取用户列表接口参数为接口的参数
export const getUserList = (data) => {
	return api.http({
		url:'/user/list/page',
		params:{
			pno:data.pno,
			psize:data.psize,
			username:data.username
		},
		method:'get'
	})
}

export const removeUserById = (id) => {
	return api.http({
		url:`/user/id/${id}`,
		method:'delete'
	})
}

export const addUser = (user) => {
	return api.http({
		url:`/user/insert`,
		method:'put',
		data:user
	})
}

export const findUserById = (id) => {
	return api.http({
		url:`/user/find/id/${id}`,
		method:'get',
	})
}

export const updateUser = (user) => {
	return api.http({
		url:`/user/update`,
		method:'put',
		data:user
	})
}