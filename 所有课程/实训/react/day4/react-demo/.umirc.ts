import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
		{ path: '/button', component: '@/pages/button' },
		{ path: '/input', component: '@/pages/input' },
    { path: '/date-picker', component: '@/pages/date-picker' },
    { path: '/segment', component: '@/pages/segment' },
    { path: '/tabs', component: '@/pages/tabs' },
    { path: '/list', component: '@/pages/list' },
    { path: '/picker', component: '@/pages/picker' },
    { path: '/textarea', component: '@/pages/textarea' },
    { path: '/modal-toast', component: '@/pages/modal-toast' },
  ],
});
