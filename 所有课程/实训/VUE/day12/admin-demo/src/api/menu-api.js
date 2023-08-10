import api from '../http'

// 初步定义获取菜单函数，通过api中的http功能将获取登录实现
export const getMenuByRoleId = (roleId) => {
	return api.http({
		url:`/menu/list/all/role/${roleId}`,
		method:'post'
	})
}

export const getMenuList = () => {
	return api.http({
		url:`/menu/list/all`,
		method:'get'
	})
}
export const insertMenuRole = (data) => {
	return api.http({
		url:`/menu/insert/menu-role`,
		method:'post',
		data
	})
}
export const insertMenu = (data) => {
	return api.http({
		url:`/menu/insert`,
		method:'put',
		data
	})
}

export const insertChildMenu = (data) => {
	return api.http({
		url:`/menu/insert/pid/${data.pid}`,
		method:'put',
		data
	})
}
export const updateMenu = (data) => {
	return api.http({
		url:`/menu/update`,
		method:'put',
		data
	})
}

export const updateChildMenu = (data) => {
	return api.http({
		url:`/menu/update/child`,
		method:'put',
		data
	})
}

export const getMenuById = (id) => {
	return api.http({
		url:`/menu/find/id/${id}`,
		method:'get',
	})
}

export const deleteMenuById = (id) => {
	return api.http({
		url:`/menu/delete/id/${id}`,
		method:'delete',
	})
}