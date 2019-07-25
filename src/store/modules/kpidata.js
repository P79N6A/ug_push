import { proxyGet,commonGet } from '@/api/common'
import { Message } from 'element-ui'

const kpidata = {
  state: {
    dataMonitor: null,
    entireMonitor: null,
    analyDropList: null,
    analyData: null,
  },

  mutations: {
    SET_DATA_MONITOR: (state, data) => {
      state.dataMonitor = data
    },
    SET_ENTIRE_DATA: (state, data) => {
      state.entireMonitor = data
    },
    SET_ANALY_DROP: (state, data) => {
      state.analyDropList = data
    },
    SET_ANALY_DATA: (state, data) => {
      state.analyData = data
    },
  },

  actions: {
    // 获取单个维度KPI数据监控信息
    GetDataMonitor({ commit }, params) {
      return new Promise((resolve, reject) => {
        proxyGet(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //获取整体KPI数据监控信息
    GetEntireMonitor({ commit }, params) {
      return new Promise((resolve, reject) => {
        proxyGet(params).then(response => {
          Message({
            showClose: true,
            message: 'success',
            type: 'success',
            duration: 1000
          })
          if (response.code && Number(response.code) == 200) {
            commit('SET_ENTIRE_DATA', response.data)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //获取KPI数据分析项下拉列表
    GetAnalyDrop({ commit }, params) {
      return new Promise((resolve, reject) => {
        proxyGet(params).then(response => {
          Message({
            showClose: true,
            message: 'success',
            type: 'success',
            duration: 1000
          })
          if (response.code && Number(response.code) == 200) {
            commit('SET_ANALY_DROP', response.data)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    ////获取KPI数据分析信息
    GetAnalyData({ commit }, params) {
      return new Promise((resolve, reject) => {
        proxyGet(params).then(response => {
          Message({
            showClose: true,
            message: 'success',
            type: 'success',
            duration: 1000
          })
          if (response.code && Number(response.code) == 200) {
            commit('SET_ANALY_DATA', response.data)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetBaseAnaly({ commit }, params) {
      return new Promise((resolve, reject) => {
        proxyGet(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    GetSourceList({ commit }, params) {
      return new Promise((resolve, reject) => {
        proxyGet(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //获取用户画像数据
    GetFeature({ commit }, data) {
      return new Promise((resolve, reject) => {
          commonGet(data).then(response => {
              resolve(response)
          }).catch(error => {
              reject(error)
          })
      })
    },
    //获取用户标签覆盖率
    GetUserRate({ commit }, params) {
      return new Promise((resolve, reject) => {
        proxyGet(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default kpidata