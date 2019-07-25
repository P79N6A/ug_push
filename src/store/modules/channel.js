import { commonGet, commonPost } from '@/api/common'
import { Message } from 'element-ui'

import { getPageAuth } from '@/api/user'

const channel = {
    state: {
        channelDrop: {
            typeList: null,
            tagList: null,
        },
        channelList: null,
        channelApi: null,
        channelData: null,
        whiteList: null,
        keywordList: null,
    },

    mutations: {
        SET_CHANNEL_DROP: (state, data) => {
            state.channelDrop = data
        },
        SET_CHANNEL_LIST: (state, data) => {
            state.channelList = data
        },
        SET_CHANNEL_DATA: (state, data) => {
            state.channelData = data
        },
        SET_WHITE_LIST: (state, data) => {
            state.whiteList = data
        },
        SET_KEYWORD_LIST: (state, data) => {
            state.keywordList = data
        },
        SET_CHANNEL_API: (state, data) => {
            state.channelApi = data
        },
    },

    actions: {
        // 获取频道下拉列表
        GetChannelDrop({ commit }, data) {
            return new Promise((resolve, reject) => {
                commonGet(data).then(response => {
                    if (response.code && Number(response.code) == 200) {
                        commit('SET_CHANNEL_DROP', response.result);
                    }
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        SetChannelList({ commit }, data) {
            return new Promise((resolve, reject) => {
                commonGet(data).then(response => {
                    if (response.code && Number(response.code) == 200) {
                        commit('SET_CHANNEL_LIST', response.result);
                        commit('SET_CHANNEL_API', true);
                    } else {
                        commit('SET_CHANNEL_API', 'response failed');
                    }
                    resolve()
                }).catch(error => {
                    commit('SET_CHANNEL_API', 'response failed');
                    reject(error)
                })
            })
        },
        GetChannelData({ commit }, data) {
            return new Promise((resolve, reject) => {
                commonGet(data).then(response => {
                    if (response.code && Number(response.code) == 200) {
                        commit('SET_CHANNEL_DATA', response.result)
                    }
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        GetWhiteList({ commit }, data) {
            return new Promise((resolve, reject) => {
                commonGet(data).then(response => {
                    const res = response.result
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        AddWhiteList({ commit }, data) {
            return new Promise((resolve, reject) => {
                commonGet(data).then(response => {
                    if (response.code && Number(response.code) == 200) {
                        const tips = response.msg || 'success';
                        Message({
                            showClose: true,
                            message: tips,
                            type: 'success',
                            duration: 1000
                        })
                    } else {
                        Message({
                            showClose: true,
                            message: response.msg || '操作失败！',
                            type: 'error',
                            duration: 3000
                        })
                    }
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        SetChannelData({ commit }, data) {
            return new Promise((resolve, reject) => {
                commonGet(data).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        delWhiteList({ commit }, data) {
            return new Promise((resolve, reject) => {
                commonGet(data).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        SetWhiteList({ commit }, data) {
            return new Promise((resolve, reject) => {
                commonGet(data).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        updateWhiteList({ commit }, data) {
            return new Promise((resolve, reject) => {
                commonGet(data).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        editWhiteList({ commit }, data) {
            return new Promise((resolve, reject) => {
                commonGet(data).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        GetKeywordList({ commit }, data) {
            return new Promise((resolve, reject) => {
                commonGet(data).then(response => {
                    const res = response.result
                    resolve(res)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        AddKeywordList({ commit }, data) {
            return new Promise((resolve, reject) => {
                commonGet(data).then(response => {
                    if (response.code && Number(response.code) == 200) {
                        const tips = response.msg || 'success';
                        Message({
                            showClose: true,
                            message: tips,
                            type: 'success',
                            duration: 1000
                        })
                    } else {
                        Message({
                            showClose: true,
                            message: response.msg || '操作失败！',
                            type: 'error',
                            duration: 3000
                        })
                    }
                    resolve()
                }).catch(error => {
                    reject(error)
                })
            })
        },
        delKeywordList({ commit }, data) {
            return new Promise((resolve, reject) => {
                commonGet(data).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        SetKeywordList({ commit }, data) {
            return new Promise((resolve, reject) => {
                commonGet(data).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        GetChannelList({ commit }, data) {
            return new Promise((resolve, reject) => {
                commonGet(data).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        AddChannelUids({ commit }, data) {
            return new Promise((resolve, reject) => {
                commonPost(data).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        GetChannelAuth({ commit }, params) { //获取频道授权和频道列表页管理权限，兼容处理
            return new Promise((resolve, reject) => {
                getPageAuth(params).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}

export default channel