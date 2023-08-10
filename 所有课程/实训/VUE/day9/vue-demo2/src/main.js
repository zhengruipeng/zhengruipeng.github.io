import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Store from './store'

Vue.config.productionTip = false

Vue.prototype.$store = Store//挂载在vue原型上，这样组件就可以通过this.$store.state来访问

new Vue({
  router,
  Store,
  render: h => h(App)
}).$mount('#app')
