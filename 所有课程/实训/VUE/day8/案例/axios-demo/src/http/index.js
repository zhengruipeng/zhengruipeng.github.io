// 引入请求对象
import axios from 'axios'
// 使用Vue.use时Vue会默认执行这个对象暴露出来的install方法并将Vue作为参数传入
export default {
  // install方法用于将axios安装到Vue上
  install(Vue){
    // 将后台服务统一前缀作为基本配置，设置之后调用this.$http()
    axios.defaults.baseURL = '/shop-service/v1'

    // 添加请求拦截器,所有在项目其他部分使用axios的地方都会触发拦截器的执行
    axios.interceptors.request.use(function (config) {
      console.log('拦截器执行')
      console.log('请求的路径是',config.url)
      // 在发送请求之前做些什么
      return config;
    }, function (error) {
      // 对请求错误做些什么
      return Promise.reject(error);
    });

    // 添加响应拦截器，所有在项目其他部分使用axios的地方都会触发拦截器的执行
    axios.interceptors.response.use(function (response) {
      // 对响应数据做点什么
      return response;
    }, function (error) {
      // 对响应错误做点什么
      return Promise.reject(error);
    });

    Vue.prototype.$http = axios;
  },
  http:axios
}
