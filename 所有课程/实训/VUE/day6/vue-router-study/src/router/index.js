import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../views/index.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'index',
    component:Index
  },
  {
    path: '/js-router',
    name: 'js-router',
    component: () => import(/* webpackChunkName:"js-router"*/'../views/js-router.vue'),
    children:[
      {
        path: '/js-router/test',
        name: 'router-test1',
        component: () => import(/* webpackChunkName:"router-param"*/'../views/test.vue'),
      },
      {
        path: '/js-router/test2',
        name: 'router-test2',
        component: () => import(/* webpackChunkName:"router-param"*/'../views/test2.vue'),
      },
      {
        path: '/js-router/test3',
        name: 'router-test3',
        component: () => import(/* webpackChunkName:"router-param"*/'../views/test3.vue'),
      },

    ]
  },
  {
    path: '/router-param',
    name: 'router-param',
    component: () => import(/* webpackChunkName:"router-param"*/'../views/router-param.vue')
  },
  {
    path: '/router-param1',
    name: 'router-param1',
    component: () => import(/* webpackChunkName:"router-param"*/'../views/router-param1.vue')
  },
  {
    path: '/router-children',
    name: 'router-children',
    component: () => import(/* webpackChunkName:"router-param"*/'../views/router-children.vue'),
    children:[
      {
        path: '/router-children/',
        name: 'router-children1',
        component: () => import(/* webpackChunkName:"router-param"*/'../views/router-children1.vue'),
      },
      {
        path: '/router-children/router-children2',
        name: 'router-children2',
        component: () => import(/* webpackChunkName:"router-param"*/'../views/router-children2.vue'),
      },
      {
        path: '/router-children/router-children3',
        name: 'router-children3',
        component: () => import(/* webpackChunkName:"router-param"*/'../views/router-children3.vue'),
      },

    ]
  },
  {
    path: '/transition',
    name: 'transition',
    component: () => import(/* webpackChunkName:"router-param"*/'../views/transition.vue'),
    children:[
      {
        path: '/transition/',
        name: 'transition-router-children1',
        component: () => import(/* webpackChunkName:"router-param"*/'../views/router-children1.vue'),
      },
      {
        path: '/transition/router-children2',
        name: 'transition-router-children2',
        component: () => import(/* webpackChunkName:"router-param"*/'../views/router-children2.vue'),
      },
      {
        path: '/transition/router-children3',
        name: 'transition-router-children3',
        component: () => import(/* webpackChunkName:"router-param"*/'../views/router-children3.vue'),
      },

    ]
  },
]

const router = new VueRouter({
  // mode:'hash',
  routes
})

export default router
