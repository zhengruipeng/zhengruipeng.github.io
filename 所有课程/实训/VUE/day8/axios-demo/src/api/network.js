// 通过单独引入的方式来使用axios发送请求
import api from '../http'

// 定义并导出调用post/demo1的接口

class APIS extends Object {
  static login() {
    return api.http({
      url: '/user/login',
      method: 'post'
    })
  }

  static list() {
    return api.http({
      url: '/user/menu/list',
      method: 'get'
    })
  }
}

export {APIS};
