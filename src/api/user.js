/**
 * get user information
 */
import request from '@/utils/request'

export function getAuth (params) {
    return request({
      url: `${Api_Domain}/proxy/getauth`,
      method: 'get',
      params: params
    })
}

export function getPageAuth (params) {
    return request({
      url: `${Api_Domain}/menu/checkUserMenuAuth`,
      method: 'get',
      params: params
    })
}