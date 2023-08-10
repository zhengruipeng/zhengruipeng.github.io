import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/parent',
    name: 'ParentCom',
    component: () => import('../views/parent.vue'),
    children: [
      {
        path: '/parent/son1',
        name: 'Son1Com',
        component: () => import('../views/son1.vue')
      },
      {
        path: '/parent/son2',
        name: 'Son2Com',
        component: () => import('../views/son2.vue')
      }

    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
