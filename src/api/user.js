import axios from '@/libs/apiRequest'

export const BindUser = (data) => {
  return axios.request({
    url: '/api/user/bind',
    data: data,
    method: 'post',
    hideLoading: true
  })
}

export const GetSMSValidate = (data) => {
  return axios.request({
    url: '/api/user/validate',
    data: data,
    method: 'post',
    hideLoading: true
  })
}
