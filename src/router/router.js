import Main from '@/views/Main.vue';
import user from './user';
import deivice_manage from './device-manage';


// 不作为Main组件的子页面展示的页面单独写，如下

export const page404 = {
  path: '/*',
  name: 'error-404',
  meta: {
    title: '404-页面不存在'
  },
  component: resolve => void(require(['@/views/bind/bind.vue'], resolve))
};
//
// export const page403 = {
//   path: '/403',
//   meta: {
//     title: '403-权限不足'
//   },
//   name: 'error-403',
//   component:resolve => void(require(['@/views/error-page/403.vue'],resolve)),// 懒加载 () => import('@//views/error-page/403.vue')
// };
//
// export const page500 = {
//   path: '/500',
//   meta: {
//     title: '500-服务端错误'
//   },
//   name: 'error-500',
//   component:resolve => void(require(['@/views/error-page/500.vue'],resolve)),// 懒加载 () => import('@/views/error-page/500.vue')
// };
export const authPage = {
  path: '/auth',
  meta: {
    title: '授权'
  },
  name: 'auth',
  component: resolve => void(require(['@/views/auth.vue'], resolve))
};

export const bindWxPage = {
  path: '/bind',
  meta: {
    title: '注册'
  },
  name: 'bind',
  component: resolve => void(require(['@/views/bind/bind.vue'], resolve))
};

export const appRouter = {
  path: '/',
  name: 'main',
  redirect: '/bind',
  component: Main,
  children: [
    ...user,
    ...deivice_manage,
  ]
};


// 所有上面定义的路由都要写在下面的routers里
export const routers = [
  appRouter,
  bindWxPage,
  authPage,
  // page500,
  // page403,
  page404
];
