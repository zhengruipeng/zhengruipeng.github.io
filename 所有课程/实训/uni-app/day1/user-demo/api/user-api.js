import http from '../http'
export const getUserListAll = () => {
	return http({
		url:'/api-test/get/demo1',
		method:'get'
	}).catch(err => err)
}