import http from '../http'

export const login = (data) => {
	return http({
		url:'/user/login',
		method:'post',
		data
	}).catch(err => err)
}
export const checkPosition = (data) => {
	return http({
		url:'/check-out/in-out/position',
		method:'get',
		data
	})
}