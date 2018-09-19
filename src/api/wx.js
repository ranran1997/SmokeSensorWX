import axios from '@/libs/apiRequest'

export const WxAUTH = (data) => {
  return axios.request({
    url: '/api/oauth/create',
    data: data,
    method: 'post',
    hideLoading: false
  })
}

export const WxGetUser = (data) => {
  return axios.request({
    url: '/api/oauth/get_user',
    data: data,
    method: 'post',
    hideLoading: false
  })
}

export const WxGetSign = (data) => {
  return axios.request({
    url: '/api/dev/get_sign',
    data: data,
    method: 'post',
    hideLoading: true
  })
}




