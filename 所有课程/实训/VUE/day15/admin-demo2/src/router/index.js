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
				component:() => import('../views/system/user/user.vue'),
			},
			{
				path:'/user-add',
				name:'user-add',
				component:() => import('../views/system/user/user-add.vue'),
			},
			{
				path:'/user-edit',
				name:'user-edit',
				component:() => import('../views/system/user/user-edit.vue'),
			},
			{
				path:'/menu',
				name:'menu',
				component:() => import('../views/system/menu/menu.vue'),
			},
			{
				path:'/menu-add',
				name:'menu-add',
				component:() => import('../views/system/menu/menu-add.vue'),
			},
			{
				path:'/menu-edit',
				name:'menu-edit',
				component:() => import('../views/system/menu/menu-edit.vue'),
			},
			{
				path:'/menu-add-child',
				name:'menu-add-child',
				component:() => import('../views/system/menu/menu-add-child.vue'),
			},
			{
				path:'/menu-edit-child',
				name:'menu-edit-child',
				component:() => import('../views/system/menu/menu-edit-child.vue'),
			},
			{
				path:'/role',
				name:'role',
				component:() => import('../views/system/role/role.vue'),
			},
			{
				path:'/role-add',
				name:'role-add',
				component:() => import('../views/system/role/role-add.vue'),
			},
			{
				path:'/role-edit',
				name:'role-edit',
				component:() => import('../views/system/role/role-edit.vue'),
			},
			{
				path:'/role-menu',
				name:'role-menu',
				component:() => import('../views/system/role/role-menu.vue'),
			},
			{
				path:'/test-user',
				name:'test-user',
				component:() => import('../views/test/user/test-user.vue'),
			},
			{
				path:'/user-test',
				name:'user-test',
				component:() => import('../views/test/user-test/user-test.vue'),
			},
			{
				path:'/user-test-add',
				name:'user-test-add',
				component:() => import('../views/test/user-test/user-test-add.vue'),
			},
			{
				path:'/user-test-edit',
				name:'user-test-edit',
				component:() => import('../views/test/user-test/user-test-edit.vue'),
			},
			{
				path:'/upload',
				name:'upload',
				component:() => import('../views/test/upload/upload.vue'),
			},
			{
				path:'/goods',
				name:'goods',
				component:() => import('../views/test/goods/test-goods.vue'),
			},
			{
				path:'/goods-add',
				name:'goods-add',
				component:() => import('../views/test/goods/goods-test-add.vue'),
			},
			{
				path:'/goods-edit',
				name:'goods-edit',
				component:() => import('../views/test/goods/goods-test-edit.vue'),
			},
			{
				path:'/news',
				name:'news',
				component:() => import('../views/test/news/test-news.vue'),
			},
			{
				path:'/news-add',
				name:'news-add',
				component:() => import('../views/test/news/news-test-add.vue'),
			},
			{
				path:'/news-edit',
				name:'news-edit',
				component:() => import('../views/test/news/news-test-edit.vue'),
			},
			{
				path:'/news-preview',
				name:'news-preview',
				component:() => import('../views/test/news/news-test-preview.vue'),
			},
			{
				path:'/card',
				name:'card',
				component:() => import('../views/test/card/test-card.vue'),
			},
			{
				path:'/card-add',
				name:'card-add',
				component:() => import('../views/test/card/card-test-add.vue'),
			},
			{
				path:'/card-edit',
				name:'card-edit',
				component:() => import('../views/test/card/card-test-edit.vue'),
			},
			{
				path:'/card-add-multiple',
				name:'card-add-multiple',
				component:() => import('../views/test/card/card-add-multiple.vue'),
			},
			{
				path:'/goods-type',
				name:'goods-type',
				component:() => import('../views/test/goods-type/goods-type.vue'),
				
			}
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
