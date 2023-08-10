//router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
    children: [
      {
        path: '/index/son1',
        name: 'Son1Com',
        component: () => import('../views/son1.vue')
      },
      {
        path: '/index/son2',
        name: 'Son2Com',
        component: () => import('../views/son2.vue')
      }]
  }, {
    path: '/login',
    name: 'Login',
    component: () => import("../views/Login.vue")
  },
]

const router = new VueRouter({
  routes
})

export default router
