// import Cookies from 'js-cookie'
// // cookie保存的天数
import {cookieExpires} from '@/config'
export const TOKEN_KEY = 'token'
export const IS_VIP = 'isVip'

export const setToken = (token) => {
  sessionStorage.setItem(TOKEN_KEY, token)
}

export const getToken = () => {
  const token = sessionStorage.getItem(TOKEN_KEY)
  if (token) return token
  else return false
}

export const GetQueryString = name => {
  var url = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var newUrl = window.location.search.substr(1).match(url);
  if (newUrl != null) {
    return unescape(newUrl[2]);
  } else {
    return false;
  }
};

export const timestampToTime = (timestamp) => {
  let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
  var Y = date.getFullYear() + '-';
  var M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
  var D = date.getDate() + ' ';
  var h = date.getHours() + ':';
  var m = date.getMinutes() + ':';
  var s = date.getSeconds();
  return Y+M+D+h+m+s;
}

export const throttle = (func, wait, options) => {
  var timeout, context, args, result;
  var previous = 0;
  if (!options) options = {};

  var later = function () {
    previous = options.leading === false ? 0 : new Date();
    timeout = null;
    result = func.apply(context, args);
    if (!timeout) context = args = null; //显示地释放内存，防止内存泄漏
  };

  var throttled = function () {
    var now = new Date();
    if (!previous && options.leading === false) previous = now;
    var remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      if (!timeout) context = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = context = args = null;
  };

  return throttled;
}
