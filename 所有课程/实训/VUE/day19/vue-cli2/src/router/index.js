//router/index.js
import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '@/views/Index.vue'
Vue.use(VueRouter)
const routes = [
    {
        path:'/',
        name:'Index',
        component:Index
    },
    {
        path:'/test',
        name:'Test',
        component:() => {
            return import(
                /*webpackChunkName:"test"*/
                '../views/Test.vue'
                )
        }
    }
]
const router = new VueRouter({
    routes
})
export default router