import {
  setToken,
  getToken
} from '@/libs/util'

export default {
  state: {
    username: '',
    openid: '',
    mobile: '',
    headimage: '',
    cookie_value: '',
    addr: '',
  },
  mutations: {
    updateUserState(state) {
      state.token = sessionStorage.getItem('token')
      state.userName = sessionStorage.getItem('userName')
      state.userId = sessionStorage.getItem('userId')
      state.isVip = sessionStorage.getItem('isVip')
    },
    setWxUserInfo(state, user_info) {
      state.username = user_info.username;
      state.openid = user_info.openid;
      state.mobile = user_info.mobile;
      state.headimage = user_info.headimage;
      state.cookie_value = user_info.cookie_value;
      state.addr = user_info.addr;
      setToken(user_info.cookie_value)
    },
  }
}
