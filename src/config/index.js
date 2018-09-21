let baseURL = 'http://192.168.2.143:8040'
let mediaURL = 'http://192.168.2.143:8040'
let frontWebURL = 'http://192.168.2.150:8080'
const cookieExpires=1;
if (process.env.NODE_ENV === 'production') {
     baseURL = 'http://xf.ctjt.cn:8020';
     frontWebURL = 'http://xf.ctjt.cn';
     mediaURL = 'http://xf.ctjt.cn:8020'
}

export  {
  /**
   * @description token在Cookie中存储的天数，默认1天
   */
  cookieExpires,
  /**
   * @description 后台请求地址
   */
  baseURL,
  /**
   * @description 前端地址
   */
  frontWebURL,
  mediaURL
}
