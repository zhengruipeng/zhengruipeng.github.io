import api from '../http'

export const getShopUserListForPage = (queryForm) => {
	return api.http({
		url:'/shop-user/list/page',
		method:'get',
		params:queryForm
	})
}

export const insertShopUser = (addForm) => {
	return api.http({
		url:'/shop-user/insert',
		method:'put',
		data:addForm
	})
}

export const findShopUserById = (id) => {
	return api.http({
		url:`/shop-user/find/id/${id}`,
		method:'get',
		data:id
	})
}

export const updateShopUser = (addForm) => {
	return api.http({
		url:`/shop-user/update`,
		method:'put',
		data:addForm
	})
}

export const deleteShopUserById = (id) => {
	return api.http({
		url:`/shop-user/delete/id/${id}`,
		method:'delete',
	})
}


export const setShopUserFreeze = (params) => {
	return api.http({
		url:`/shop-user/set/freeze`,
		method:'get',
		params
	})
}
