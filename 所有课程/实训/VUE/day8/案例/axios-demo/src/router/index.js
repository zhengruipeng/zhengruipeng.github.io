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
        path: '/axios-test',
        name: 'AxiosTest',
        component: () => import('../views/AxiosTest.vue')
      },
      {
        path: '/axios',
        name: 'Axios',
        component: () => import('../views/Axios.vue')
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
