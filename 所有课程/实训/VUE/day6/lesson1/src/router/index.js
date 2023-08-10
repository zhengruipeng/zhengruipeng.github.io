//引入vue对象
import Vue from 'vue'
//引入vue-router对象
import VueRouter from 'vue-router'
//引入Home.vue组件
import Home from '../views/HomeView.vue'
//Vue.use()是Vue提供的一个通用的安装接口，这里代表将路由框架安装到Vue中
Vue.use(VueRouter)
//定义路由的结构
const routes = [
  {
    //vue的路由跳转有两种方式
    //1.一种是通过path跳转页面
    //2.一种是通过name跳转页面
    path: '/',//通过path访问该页面的访问路径
    name: 'Home',//通过name访问该页面的访问路径
    component: Home //这个页面展示的Vue组件该方式是同步引用方式
  },
  {
    path: '/about',
    name: 'About',
    //这里是组件的异步加载方式，通过() => import(组件)的方式实现异步引用，其内部是基于Promise原理实现的
    //异步引用与同步引用的区别是异步引用会通过VueCli将该组件的代码拆分到单独的文件中，在项目启动时并没有加载当前组件的文件只有在第一次访问到about的页面时才加载当前组件的代码，这种做法在大型项目开发中非常常用，只有首页是直接引用，其他的子页面全部采用异步引用的方式来保证在项目第一次运行时只加载首页的代码这样可以提升单页面应用的加载速度。
    ///*webpacChunkName:"about"代表当项目打包时about.vue会被单独打包进about.js文件中而不会影响主程序加载*/
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    //这里涉及到path的命名规范由于path是url路径所以需要在前面加/
    //并且url路径遵循所有字母小写的原则所以我们的分词就使用-来分，MyView的path为my-path
    path:'/my-view',
    name:'MyView',//name属性相当于文件名可以直接写MyView，如果文件名采用my-view的方式那么name也为my-view，这里还要注意的是name不加/
    //component我们直接采用异步的方式引用通过相对路径进行引用根据router文件夹和views文件夹的相对路径为../views/MyView.vue
    component: () => import(/* webpackChunkName:"my-view" */ '../views/MyView.vue')
  },
  {
    //这里涉及到path的命名规范由于path是url路径所以需要在前面加/
    //并且url路径遵循所有字母小写的原则所以我们的分词就使用-来分，MyView的path为my-path
    path:'/my-view2',
    name:'MyView2',//name属性相当于文件名可以直接写MyView，如果文件名采用my-view的方式那么name也为my-view，这里还要注意的是name不加/
    //component我们直接采用异步的方式引用通过相对路径进行引用根据router文件夹和views文件夹的相对路径为../views/MyView.vue
    component: () => import(/* webpackChunkName:"my-view" */ '../views/MyView2.vue')
  }
]
//将定义好的路由结果传入VueRouter对象中并且实例化
const router = new VueRouter({
  routes
})
//模块暴漏router对象，用来给其他文件引用
export default router
