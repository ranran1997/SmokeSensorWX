// import { routers } from './router'
//
// // 路由配置
// const RouterConfig = {
//   // mode: 'history',
//   routes: routers
// }
//
// export const router = new VueRouter(RouterConfig)

import { routers } from './router'
import {
  GetQueryString
} from "@/libs/util";
// import Router from 'vue-router'
// import {LoadingBar,Message} from 'iview'

const router = new VueRouter({
  routes: routers
})
const AUTH_PAGE_NAME = '/auth'

router.beforeEach((to, from, next) => {
  //  第一次进入项目
  let wx_code = GetQueryString("code");

  if (!wx_code && to.path != AUTH_PAGE_NAME) {
    next(AUTH_PAGE_NAME);
    return false;
  }
  next();
})

router.afterEach(to => {
  window.scrollTo(0, 0)
})

export default router
