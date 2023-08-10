//router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/Index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index
  },
  {
    path: '/button',
    name: 'Button',
    component: () => import('../views/Button.vue')
  },
  {
    path: '/input',
    name: 'Input',
    component: () => import('../views/Input.vue')
  },
  {
    path: '/notify',
    name: 'Notify',
    component: () => import('../views/Notify.vue')
  },
  {
    path: '/confirm',
    name: 'Confirm',
    component: () => import('../views/Confirm.vue')
  },
  {
    path: '/container',
    name: 'Container',
    component: () => import('../views/Container.vue')
  },
  {
    path: '/form',
    name: 'Form',
    component: () => import('../views/Form.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
