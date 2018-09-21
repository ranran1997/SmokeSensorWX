import axios from '@/libs/apiRequest'

export const getDevicePagedList = (data) => {
  return axios.request({
    url: '/api/dev/query',
    data: data,
    method: 'post',
    hideLoading:true
  })
}

export const addDevice = (data) => {
  return axios.request({
    url: '/api/dev/add',
    data: data,
    method: 'post'
  })
}
export const delDevice = (data) => {
  return axios.request({
    url: '/api/dev/del',
    data: data,
    method: 'post'
  })
}

export const uploadPic = (data) => {
  return axios.request({
    url: '/api/dev/pic',
    data: data,
    method: 'post'
  })
}


