import {
  routers
} from './router'
import {
  GetQueryString
} from "@/libs/util";
import Store from '@/store'
import {
  WxGetUser
} from "@/api/wx";

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
  if (to.path != AUTH_PAGE_NAME && !Store.state.user.username) {
    WxGetUser({
      code: wx_code
    }).then(res => {
       if (res.code === -1 && res.result) {
         Store.commit('setWxOpenId', res.result)
          next();
       } else if (res.code === -1 && res.msg) {
         next('/auth');
       } else if (res.code === 0) {
          Store.commit('setWxUserInfo', res.result)
         next({replace:true,name:'user'});
       }
    }).catch(function (error) {
      // promise chain中出现异常的时候会被调用
      console.error(error);
    });
  } else {
    next();
  }


})

router.afterEach(to => {
  window.scrollTo(0, 0)
})

export default router
