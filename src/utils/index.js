/**
 * common function
 */

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}'
  let date
  if (typeof time === 'object') {
    date = time
  } else {
    if (('' + time).length === 10) time = parseInt(time) * 1000
    date = new Date(time)
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay()
  }
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key]
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1]
    if (result.length > 0 && value < 10) {
      value = '0' + value
    }
    return value || 0
  })
  return time_str
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) { // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

export function formatNum(n, decimal) {
  const dec = decimal || 3;
  let num = Number.isInteger(n) ? n : parseFloat(n).toFixed(dec)
  let result = num
  if (n) {
    const count = Math.abs(parseInt(num)).toString().length
    if (count > 12) {
      result = `${Number(Math.round(num / 1000000000) / 1000)}万亿`
    } else if (count > 8) {
      result = `${Number(Math.round(num / 100000) / 1000)}亿`
    } else if (count > 4) {
      result = `${Number(Math.round(num / 10) / 1000)}万`
    }
  } else {
    result = 0
  }
  return result
}

export function formatIntNum(n) {
  let num = Number.isInteger(n) ? n : parseFloat(n).toFixed(3)
  let result = num
  if (n) {
    const count = Math.abs(parseInt(num)).toString().length
    if (count > 12) {
      result = `${Math.round(num / 1000000000000)}万亿`
    } else if (count > 8) {
      result = `${Math.round(num / 100000000)}亿`
    } else if (count > 4) {
      result = `${Math.round(num / 10000)}万`
    }
  } else {
    result = 0
  }
  return result
}

/**
 * 小数转化为百分比
 * @param {Number} number  <=1的数字
 * @param {Number} decimal 保留的小数位数
 * @return {String}
 */
export function parsePercent(number, decimal) {
  if (isNaN(number)) {
    return '-'
  } else {
    const dec = decimal || 2;
    const pre = Math.pow(10, dec + 2);
    const next = Math.pow(10, dec);
    return `${Math.round(number * pre) / next}%`;
  }
}

/**
 *  设置cookie
 * @param {String} c_name cookie名称
 * @param {String/Number} value cookie值
 * @param {Number} expiredays 过期天数
 */
export function _setCookie(c_name, value, expiredays) {
  let exdate = new Date()
  exdate.setDate(exdate.getDate() + expiredays)
  document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

/**
 * 获取cookie值
 * @param {String} c_name cookie名称
 */
export function _getCookie(c_name) {
  if (document.cookie.length > 0) {
    let c_start = document.cookie.indexOf(c_name + "=")
    if (c_start != -1) {
      c_start = c_start + c_name.length + 1
      let c_end = document.cookie.indexOf(";", c_start)
      if (c_end == -1) c_end = document.cookie.length
      return unescape(document.cookie.substring(c_start, c_end))
    }
  }
  return ""
}

/**
 * 字符串简单加密
 * @param {String} name 要加密的字符串
 * @param {String} insert 要插入的中文字符串
 */
export function _encodeStr(name, insert) {
  return encodeURIComponent(name.split('').join(insert));
}

/**
 * 字符串简单解密
 * @param {String} name 要解密的字符串
 * @param {String} insert 加密时插入的中文字符串
 */
export function _decodeStr(name, insert) {
  return decodeURIComponent(name).split(insert).join('');
}