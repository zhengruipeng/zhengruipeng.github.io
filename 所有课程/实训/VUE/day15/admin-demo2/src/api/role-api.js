import api from '../http'
// 获取所有角色列表
export const getAllRoleList = () => {
	return api.http({
		url:'/role/list/all',
		method:'get'
	})
}

export const findRoleListForPage = (params) => {
	return api.http({
		url:`/role/list/page`,
		method:'get',
		params
	})
}

export const deleteRoleById = (id) => {
	return api.http({
		url:`/role/delete/id/${id}`,
		method:'delete',
	})
}

export const insertRole = (role) => {
	return  api.http({
		url:`/role/insert`,
		method:'put',
		data:role
	})
}

export const updateRole = (role) => {
	return  api.http({
		url:`/role/update`,
		method:'put',
		data:role
	})
}

export const findRoleById = (id) => {
	return  api.http({
		url:`/role/find/id/${id}`,
		method:'get',
	})
}