export default [
  { path: 'device-manage',
    title: '设备管理',
    name: 'device-manage',
    meta: {
      title: '设备管理',
      keepAlive: false, // 需要被缓存
    },
    component: resolve => void(require(['@/views/device-manage/device-manage.vue'],resolve)),
  },
   {
     path: 'add-device',
     title: '添加设备',
     name: 'add-device',
     meta: {
       title: '添加设备',
       keepAlive: true, // 需要被缓存
     },
     component: resolve => void(require(['@/views/device-manage/add-device.vue'], resolve)),
   },
]
