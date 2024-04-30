import { defineConfig } from 'umi';
export default defineConfig({
    nodeModulesTransform: {
        type: 'none',
    },
    routes: [
        { path: '/', component: '@/pages/index' },
        { path: '/me', component: '@/pages/me' },
        { path: '/news', component: '@/pages/news' },
        { path: '/shop', component: '@/pages/shop' },
        { path: '/login', component: '@/pages/login/login' },
        { path: '/register', component: '@/pages/login/register' },
    ],
    proxy: {
        '/shop-service/v1': {
            target: 'http://localhost:3000',
            changeOrigin: true
        },
        '/public': {
            target: 'http://localhost:3000',
            changeOrigin: true
        }
    },
});
//# sourceMappingURL=.umirc.js.map