import api from '../http'

export const getGoodsTypeList = () => {
	return api.http({
		url:'/goods-type/list/all',
		method:'get'
	})
}