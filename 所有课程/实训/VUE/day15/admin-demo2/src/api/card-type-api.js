import api from '../http'

export const getGoodsTypeList = () => {
	return api.http({
		url:'/card-type/list/all',
		method:'get'
	})
}