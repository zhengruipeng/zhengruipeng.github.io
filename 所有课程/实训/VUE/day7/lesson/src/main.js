//在main.js中改造
import Vue from 'vue';
import router from './router'
//引入ElementUI全局对象
import ElementUI from 'element-ui';
//引入ElementUI的css样式文件
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
//通过将ElementUI安装到Vue上
Vue.use(ElementUI);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
