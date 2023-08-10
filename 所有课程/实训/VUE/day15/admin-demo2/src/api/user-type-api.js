import api from '../http'

export const getUserTypeList = () => {
	return api.http({
		url:'/user-type/list/all',
		method:'get'
	})
}