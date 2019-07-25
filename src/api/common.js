/**
 * common api about proxy
 */
import request from '@/utils/request'

export function proxyGet (params) {
  return request({
    url: `${Api_Domain}/proxy/get`,
    method: 'get',
    params: params,
    data: {
      isLoad: params.isLoad
    }
  })
}

export function proxyGetTimeout (params) {
  return request({
    url: `${Api_Domain}/proxy/getTimeout`,
    method: 'get',
    params: params
  })
}

export function proxyPost (data) {
  return request({
    url: `${Api_Domain}/proxy/post`,
    method: 'post',
    data: data,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}

export function commonGet (data) {
  return request({
    url: `${Api_Domain}${data.url}`,
    method: 'get',
    params: data.params,
    data: {
      isLoad: data.isLoad
    }
  })
}

export function commonPost (data) {
  return request({
    url: `${Api_Domain}${data.url}`,
    method: 'post',
    data: data.params,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
    }
  })
}
