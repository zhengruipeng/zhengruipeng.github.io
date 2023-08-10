// 通过单独引入的方式来使用axios发送请求
import api from '../http'
// 定义并导出调用post/demo1的接口
export const postDemo1 = () => {
  return api.http({
    url: '/api-test/post/demo1',
    method: 'post'
  })
}
export const pathDemo1 = (username, password) => {
  return api.http({
    url: `/api-test/path/demo1/username/${username}/password/${password}`,
    method: 'post'
  })
}
export const pathDemo2 = (username, password) => {
  return api.http({
    // url: `/api-test/path/demo2/username/${username}/password/${password}`,
    url: `api-test/get/demo2?username=${username}&password=${password}`,
    method: 'get'
  })
}
