import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'
import Login from '../views/Login.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
		children:[
			{
				path:'/user',
				name:'user',
				component:() => import('../views/system/user.vue'),
			},
			{
				path:'/menu',
				name:'menu',
				component:() => import('../views/system/menu.vue'),
			},
			{
				path:'/goods',
				name:'goods',
				component:() => import('../views/goods/goods.vue'),
			},
			{
				path:'/goods-type',
				name:'goods-type',
				component:() => import('../views/goods/goods-type.vue'),
			},
		]
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

export default router
