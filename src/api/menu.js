/**
 * about navigation menu list
 */
import request from '@/utils/request'

export function getMenu(params) {
    return request({
      url: `${Api_Domain}/menu/get`,
      method: 'get',
      params: params
    })
}

export function deleteItem(params) {
    return request({
        url: `${Api_Domain}/menu/del`,
        method: 'get',
        params: params
    })
}

export function editItem(params) {
    return request({
        url: `${Api_Domain}/menu/set`,
        method: 'get',
        params: params
    })
}

export function addItem(params) {
    return request({
        url: `${Api_Domain}/menu/add`,
        method: 'get',
        params: params
    })
}