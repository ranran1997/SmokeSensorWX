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
    updateUserState(state) {
      state.token = sessionStorage.getItem('token')
      state.userName = sessionStorage.getItem('userName')
      state.userId = sessionStorage.getItem('userId')
      state.isVip = sessionStorage.getItem('isVip')
    },
    setDutyPath(state, dutypath) {
      state.dutypath = dutypath;
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
