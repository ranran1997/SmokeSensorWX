export default [
  { path: 'user',
    title: '个人中心',
    name: 'user',
    meta: {
       title: '个人中心',
       keepAlive: true, // 需要被缓存
   },
    component: resolve => void(require(['@/views/user/user-info.vue'],resolve)),
  }
]

