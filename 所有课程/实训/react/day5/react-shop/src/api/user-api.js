//api/user-api.js
//引入http对象，由于这里直接导出的axios并没有封装到对象里所以直接使用http就可以
import http from '@/http'
//获取验证码接口
export const getCode = () => {
  return http({
    url: '/user/code',
    method: 'get'
  })
}

//注册接口，由于参数是通过？传递的所以我们使用params传递参数
export const register = (params) => {
  return http({
    url: '/user/register',
    method: 'get',
    params
  })
}

//由于是post方式使用对象参数所以我们采用method post并且通过data传递参数
export const login = (data) => {
  return http({
    url:'/user/login/shop',
    method:'post',
    data
  })
}
