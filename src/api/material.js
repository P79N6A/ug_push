/**
 *  material api
 */
import request from '@/utils/request'

export function getBlackList(params) {
    return request({
        url: `${Api_Domain}/Shield/get`,
        method: 'get',
        params: params
    })
}

export function addBlackList(params) {
    return request({
        url: `${Api_Domain}/Shield/add`,
        method: 'get',
        params: params
    })
}

export function setBlackList(params) {
    return request({
        url: `${Api_Domain}/Shield/set`,
        method: 'get',
        params: params
    })
}