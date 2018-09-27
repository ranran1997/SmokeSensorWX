import axios from '@/libs/apiRequest'

export const BindUser = (data) => {
  return axios.request({
    url: '/api/user/bind',
    data: data,
    method: 'post',
    hideLoading: true
  })
}
export const UnBindUser = (data) => {
  return axios.request({
    url: '/api/user/unbind',
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

export const uploadDutyLetter = (data) => {
  return axios.request({
    url: '/api/user/dutyletter',
    data: data,
    method: 'post',
    hideLoading: true
  })
}
