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
    shopname: '',
    dutypath: ''
  },
  mutations: {
    setDutyPath(state, dutypath) {
      state.dutypath = dutypath;
    },
    setWxOpenId(state, result) {
      state.openid = result.openid;
      state.headimage = result.headimage;
    },
    setWxUserInfo(state, user_info) {
      state.username = user_info.username;
      state.openid = user_info.openid;
      state.mobile = user_info.mobile;
      state.headimage = user_info.headimage;
      state.cookie_value = user_info.cookie_value;
      state.addr = user_info.addr;
      state.shopname = user_info.shopname;
      state.dutypath = user_info.dutypath;
      setToken(user_info.cookie_value)
    },
  }
}
