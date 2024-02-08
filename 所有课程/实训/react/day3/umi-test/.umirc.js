import { defineConfig } from 'umi';
export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    routes: [
        { path: '/', component: '@/pages/index' },
        {
            path: '/test',
            component: '@/pages/test',
            //对test页面配置子路由，配置了子路由的页面需要在对应的页面中使用props.children让子路由的内容展示
            //该配置的规则和结构与vue-router完全一样，遵循父子路由命名规则以及在子路由页面中创建router-view规则
            routes: [
                { path: '/test/test1', component: '@/pages/test/test1' },
                { path: '/test/test2', component: '@/pages/test/test2' },
            ]
        }
    ],
    fastRefresh: {},
});
//# sourceMappingURL=.umirc.js.map