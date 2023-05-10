import CryptoJS from 'crypto-js';
import { Base64 } from 'js-base64';
import Cookies from 'js-cookie';

// 格式化--时间(年-月-日)
export function timeStr(dataStr) {
  if (dataStr === null || dataStr === '') return '';
  var date = new Date(dataStr);
  var y = date.getFullYear();

  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;

  var d = date.getDate();
  d = d < 10 ? '0' + d : d;

  var h = date.getHours();
  h = h < 10 ? '0' + h : h;

  // // 获得分
  // var mm = date.getMinutes();
  // mm = mm < 10 ? '0' + mm : mm;

  // // 获得秒
  // var ss = date.getSeconds();
  // ss = ss < 10 ? '0' + ss : ss;

  // console.log(y+'-'+m+'-'+d+' '+h+':'+mm+':'+ss)

  // return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + ss;
  return y + '-' + m + '-' + d;
}

// 格式化--时间(年-月-日 时：分：秒)
export function time2Str(dataStr) {
  if (dataStr === null || dataStr === '') return '';
  var date = new Date(dataStr);
  var y = date.getFullYear();

  var m = date.getMonth() + 1;
  m = m < 10 ? '0' + m : m;

  var d = date.getDate();
  d = d < 10 ? '0' + d : d;

  var h = date.getHours();
  h = h < 10 ? '0' + h : h;

  // 获得分
  var mm = date.getMinutes();
  mm = mm < 10 ? '0' + mm : mm;

  // 获得秒
  var ss = date.getSeconds();
  ss = ss < 10 ? '0' + ss : ss;

  return y + '-' + m + '-' + d + ' ' + h + ':' + mm + ':' + ss;
}

// 加密
export const AESEncrypto = str => {
  const key = CryptoJS.enc.Utf8.parse('gongjikeji201909');
  // 加密结果返回的是 CipherParams object 类型
  const encrypted = CryptoJS.AES.encrypt(str, key, {
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  // ciphertext是密文，toString()内传编码格式，比如 Base64，这里用了16进制
  return encrypted.toString();
};

/**
 * 获取数据类型
 *
 * @param {Object} object
 */
export function getObjectType(obj) {
  return obj === null ? 'null' : obj instanceof Array ? 'array' : typeof obj !== 'object' ? typeof obj : 'object';
}
/**
 * 深拷贝
 * @param {any} obj 被拷贝的数据，不支持Map、WeakMap、Set、WeakSet
 *  时间 正则 .... 都不支持
 */
export function deepClone(obj) {
  let type = getObjectType(obj);
  if (type === 'object') {
    let res = {};
    Object.keys(obj).forEach(key => {
      res[key] = deepClone(obj[key]);
    });
    return res;
  }
  if (type === 'array') {
    let res = [];
    obj.forEach(item => {
      res.push(deepClone(item));
    });
    return res;
  }
  return obj;
}

function _type(value) {
  return Object.prototype.toString.call(value);
}

/**
 * 支持所有类型的深拷贝
 * @param {*} obj
 * @returns
 */
export function deepClonePlus(obj) {
  if (obj === null) return null;

  if (typeof obj !== 'object') return obj;

  if (_type(obj) === '[object RegExp]') return new RegExp(obj);

  if (_type(obj) === '[object Date]') return new Date(obj);

  let newObj = new obj.constructor();
  for (let key in obj) {
    // if (!obj.hasOwnProperty(key)) break;
    newObj[key] = deepClonePlus(obj[key]);
  }
  return newObj;
}

/**
 * 获取cookie中用户名
 * @returns userId
 */
export function getUserName() {
  if (process.env.NODE_ENV === 'development') return 'admin';
  return Base64.decode(Cookies.get('ACCOUNT') || '') || 'null';
}

/**
 * 获取cookie中用户id
 * @returns userId
 */
export function getUserId() {
  if (process.env.NODE_ENV === 'development') return '1';
  return Cookies.get('USER_ID') || '';
}

export function uuidv4() {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0;
    var v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

export function uuid() {
  return 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = (Math.random() * 16) | 0;
    var v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/* // 加密
export const AESEncrypto = str => {
  const key = CryptoJS.enc.Utf8.parse('gongjikeji201909');
  // 加密结果返回的是 CipherParams object 类型
  const encrypted = CryptoJS.AES.encrypt(str, key, {
    iv: key,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  // ciphertext是密文，toString()内传编码格式，比如 Base64，这里用了16进制
  return encrypted.toString();
}; */

export const sleep = async time => {
  let out = await new Promise(resolve => setTimeout(resolve, time));
  return out;
};

/**
 * 树结构的遍历
 * @param {*} nodeList 节点数组
 * @param {*} callback 遍历的回调 传入：节点，节点索引，父节点数组，控制器
 * @param {*} parent 各级父节点
 * @param {*} ctrl 控制器
 */
export const walk = function(
  nodeList,
  callback,
  parent = [],
  ctrl = {
    stop: false,
  }
) {
  if (Array.isArray(nodeList)) {
    for (let i = 0, len = nodeList.length; i < len; i++) {
      callback(nodeList[i], i, parent, ctrl);
      if (!ctrl.stop) {
        const children = nodeList[i].children || nodeList[i].items;
        const node = nodeList[i];
        parent.push(node);
        if (children && children.length) {
          walk(children, callback, [...parent], ctrl);
        }
        parent.pop();
      } else {
        break;
      }
    }
  }
};

export const fileDownload = (data, fileName, isTransformBlob) => {
  const el = document.createElement('a');
  el.download = `${fileName}`;
  el.style.display = 'none';
  let urlBlob = null;
  if (isTransformBlob) {
    const blob = new Blob([data]);
    urlBlob = URL.createObjectURL(blob);
  } else {
    urlBlob = URL.createObjectURL(data);
  }
  el.href = urlBlob;
  document.body.appendChild(el);
  el.click();
  document.body.removeChild(el);
  URL.revokeObjectURL(urlBlob);
};

// 根据key获取cookie的值
export const getCookieByKey = key => {
  let value = document.cookie.match(new RegExp(`${key}=(.+)`)) || '';
  if (value && value.length > 1) {
    value = Base64.decode(value[1].split(';')[0]);
  }
  return value;
};

export default {};

// 非立即执行 防抖
export const debounce = (func, wait) => {
  let timer;
  return function(...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, wait);
  };
};

// 立即执行 节流
export const throttle = (func, wait) => {
  let previous = 0;
  return function(...args) {
    let now = Date.now();
    if (now - previous > wait) {
      func.apply(this, args);
      previous = now;
    }
  };
};

// 小数：四舍五入保留一位小数
export const retain1decimal = number => {
  if (isNaN(Number(number)) || Number(number) === 0) return 0;
  return Math.round(number * 10) / 10;
};

// 获取host
export const getHost = () => {
  let host = '';
  if (window.top === window.self) {
    // 没有内嵌 iframe
    host = window.location.href.split('#')[0];
    console.log('没有内嵌 iframe：' + host);
  } else if (window.parent.document.getElementById('right-content')) {
    // 内嵌 wr 的 iframe
    host = window.parent.document.getElementById('right-content').contentWindow.location.href.split('#')[0];
    console.log('内嵌 wr 的 iframe：' + host);
  } else if (window.parent.document.getElementsByClassName('content-iframe').length) {
    // 内嵌 ccb 的 iframe
    host = window.parent.document.getElementsByClassName('content-iframe')[0].contentWindow.location.href.split('#')[0];
    console.log(window.parent.document.getElementsByClassName('content-iframe')[0].contentWindow.location.href);
    console.log('内嵌 ccb 的 iframe：' + host);
  }
  return host;
};

export function loadScript(url) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.type = 'text/javascript';
    if (script.readyState) {
      script.onreadystatechange = function() {
        if (script.readyState === 'loaded' || script.readyState === 'complete') {
          script.onreadystatechange = null;
          resolve();
        }
      };
    } else {
      script.onload = function() {
        resolve();
      };
    }
    script.src = url;
    document.body.appendChild(script);
  });
}
