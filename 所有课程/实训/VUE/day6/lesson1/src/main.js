//main.js与public中的index.html存在自动引入关系，是通过VueCli在运行时自动关联的，所以无需在html中引入main.js启动项目就会自动执行这个文件
//从node_modules文件夹中引入vue的js依赖包并存放到Vue对象中
//此操作相当于在html文件中通过script标签引入vue的js代码
//在网页中Vue对象是自动的全局对象，由于main.js是通过node.js驱动运行的，本身并不存在window对象，所以需要在文件中声明Vue对象才能使用Vue对象
import Vue from 'vue'
//引用App.vue文件中导出的对象
import App from './App.vue'
//引入router文件夹中的index.js文件 import * from './xxx'的写法相当于import * from './xxx/index.js'。import的过程中相当于执行了一遍index.js的代码
//所以这里引入了我们在router中定义的路由对象并且VueRouter也安装到了Vue中
import router from './router'
//设置为 false 以阻止 vue 在启动时生成生产提示。（这里不需要理解他的具体作用）
Vue.config.productionTip = false
//这里为我们最熟悉的地方实例化Vue对象并渲染到html中id为app的标签中
new Vue({
  router,//这表示将路由组件设置到Vue中
  render: h => h(App)//这里表示将App.vue中的内容渲染到Vue组件里，我们在学习函数式组件是了解过
}).$mount('#app')
