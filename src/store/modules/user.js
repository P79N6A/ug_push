import { getPageAuth } from '@/api/user'
import { commonGet } from '@/api/common'
import { Loading } from 'element-ui'

const user = {
    state: {
        email: '',
        isLogin: null,
        pageAuth: null,
    },

    mutations: {
        SET_USER_INFO: (state, preload) => {
            state.isLogin = preload.isLogin
            state.isLogin && (state.email = preload.data.email)
        },
        SET_PAGE_AUTH: (state, preload) => {
            state.pageAuth = preload
        },
    },

    actions: {
        GetPageAuth({ commit }, params) {
            return new Promise((resolve, reject) => {
                getPageAuth(params).then(response => {
                    if (response.code && Number(response.code) == 200) {
                        commit('SET_PAGE_AUTH', response.result);
                    } else {
                        commit('SET_PAGE_AUTH', 'response failed');
                    }
                    resolve()
                }).catch(error => {
                    commit('SET_PAGE_AUTH', 'response failed');
                    reject(error)
                })
            })
        },
        GetUserList({ commit }, data) {
            return new Promise((resolve, reject) => {
                commonGet(data).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //添加用户
        SetUser({ commit }, data) {
            return new Promise((resolve, reject) => {
                commonGet(data).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //删除用户
        DeleteUser({ commit }, data) {
            return new Promise((resolve, reject) => {
                commonGet(data).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        //获取用户页面权限信息
        GetUser({ commit }, data) {
            return new Promise((resolve, reject) => {
                commonGet(data).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        SetUserInfo({ commit }, data) {
            return new Promise((resolve, reject) => {
                commonGet(data).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
        SetMenuAuth({ commit }, data) {
            return new Promise((resolve, reject) => {
                commonGet(data).then(response => {
                    resolve(response)
                }).catch(error => {
                    reject(error)
                })
            })
        },
    }
}

export default user