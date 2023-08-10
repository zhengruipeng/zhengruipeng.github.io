import api from '../http'

export const getNewsTypeList = () => {
	return api.http({
		url:'/news-type/list/all',
		method:'get'
	})
}