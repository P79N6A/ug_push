import { proxyGet } from '@/api/common'
import { getBlackList, addBlackList, setBlackList } from '@/api/material'
import { Message } from 'element-ui'

const material = {
  state: {
    dataInfo: null,
    record: null,
    monitor: null,
    status: null,
    authorInfo: null,
    authorType: null,
    blackList: null,
    curvideo: null,
  },

  mutations: {
    SET_DATA_INFO: (state, data) => {
      state.dataInfo = data
    },
    SET_RECORD: (state, data) => {
      state.record = data
    },
    SET_MONITOR: (state, data) => {
      state.monitor = data
    },
    SET_STATUS: (state, data) => {
      state.status = data
    },
    SET_AUTHOR_INFO: (state, data) => {
      state.authorInfo = data
    },
    SET_AUTHOR_TYPE: (state, data) => {
      state.authorType = data
    },
    SET_BLACK_LIST: (state, data) => {
      state.blackList = data
    },
    SET_CUR_VIDEO: (state, data) => {
      state.curvideo = data
    },
  },

  actions: {
    // 获取物料信息
    GetMaterial({ commit }, params) {
      return new Promise((resolve, reject) => {
        proxyGet(params).then(response => {
          commit('SET_DATA_INFO', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //showbatch接口获取物料作者相关信息
    ShowBatch({ commit }, params) {
      return new Promise((resolve, reject) => {
        proxyGet(params).then(response => {
          const res = response && response[0];
          if (res) {
            const { link, text } = res;
            const { name, avatar_hd, friends_count, followers_count, statuses_count, profile_url } = res.user;
            const data = {
              user: {
                name,
                avatar_hd,
                friends_count,
                followers_count,
                statuses_count,
                profile_url
              },
              link,
              text
            };
            commit('SET_AUTHOR_INFO', data)
          } else {
            commit('SET_AUTHOR_INFO', null)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //获取物料作者V类型、Clevel
    AuthorType({ commit }, params) {
      return new Promise((resolve, reject) => {
        proxyGet(params).then(response => {
          const res = response && response.publisher_status;
          if (res && res[1] && res[2]) {
            const data = {
              vtype: res[1].value,
              clevel: res[2].value
            }
            commit('SET_AUTHOR_TYPE', data)
          } else {
            commit('SET_AUTHOR_TYPE', null)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //置顶物料上榜/下榜
    TopMaterial({ commit }, params) {
      return new Promise((resolve, reject) => {
        proxyGet(params).then(response => {
          // 置顶物料上榜/下榜成功
          Message({
            showClose: true,
            message: 'success',
            type: 'success',
            duration: 1000
          })
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //物料屏蔽/取消屏蔽
    ShieldMaterial({ commit }, params) {
      return new Promise((resolve, reject) => {
        proxyGet(params).then(response => {
          if (response.code && Number(response.code) == 200) {
            // 物料屏蔽/取消屏蔽成功
            Message({
              showClose: true,
              message: 'success',
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
    //获取物料操作记录
    GetRecord({ commit }, params) {
      return new Promise((resolve, reject) => {
        proxyGet(params).then(response => {
          Message({
            showClose: true,
            message: 'success',
            type: 'success',
            duration: 1000
          })
          commit('SET_RECORD', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取物料库监控
    GetMonitor({ commit }, params) {
      return new Promise((resolve, reject) => {
        proxyGet(params).then(response => {
          const data = response.data
          commit('SET_MONITOR', data)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    // 获取物料库现状
    GetStatus({ commit }, params) {
      return new Promise((resolve, reject) => {
        proxyGet(params).then(response => {
          if (response.code && Number(response.code) == 200) {
            Message({
              showClose: true,
              message: 'success',
              type: 'success',
              duration: 1000
            })
            const data = response.data
            commit('SET_STATUS', data)
          } else {
            Message({
              showClose: true,
              message: '数据获取失败',
              type: 'error',
              duration: 1000
            })
            commit('SET_STATUS', {material: []})
          }
          resolve()
        }).catch(error => {
          Message({
            showClose: true,
            message: '数据获取失败',
            type: 'error',
            duration: 1000
          })
          commit('SET_STATUS', {material: []})
          reject(error)
        })
      })
    },
    GetBlackList({commit}, params) {
      return new Promise((resolve, reject) => {
        getBlackList(params).then(response => {
          if (response.code && Number(response.code) == 200) {
            const data = response.result
            commit('SET_BLACK_LIST', data)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    AddBlackList({commit}, params) {
      return new Promise((resolve, reject) => {
        addBlackList(params).then(response => {
          if (response.msg && Number(response.code) == 400) {
            Message({
              showClose: true,
              message: response.msg,
              type: 'info',
              duration: 0
            })
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    SetBlackList({commit}, params) {
      return new Promise((resolve, reject) => {
        setBlackList(params).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetManageData({ commit }, params) {
      return new Promise((resolve, reject) => {
        proxyGet(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    updateVideo({ commit }, params) {
      commit('SET_CUR_VIDEO', params)
    },
    GetThirdTag({ commit }, params) {
      return new Promise((resolve, reject) => {
        proxyGet(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    SetManageData({ commit }, params) {
      return new Promise((resolve, reject) => {
        proxyGet(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //首位广告开启过滤/关闭
    FilterAdvert({ commit }, params) {
      return new Promise((resolve, reject) => {
        proxyGet(params).then(response => {
          if (response.code && Number(response.code) == 200) {
            // 操作成功
            Message({
              showClose: true,
              message: 'success',
              type: 'success',
              duration: 1000
            })
          } else {
            //操作失败
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
  }
}

export default material
