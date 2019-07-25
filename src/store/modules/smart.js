import { proxyGet } from '@/api/common'
import { Message } from 'element-ui'

const user = {
  state: {
    cutImage: null
  },

  mutations: {
    SET_IMAGE_INFO: (state, data) => {
      state.cutImage = data.thumbnail_square
    },
  },

  actions: {
    // 获取图片信息
    GetImageInfo({commit}, params) {
      return new Promise((resolve, reject) => {
        proxyGet(params).then(response => {
          // console.log('response:', response)
          Message({
            showClose: true,
            message: 'success',
            type: 'success',
            duration: 1000
          })
          commit('SET_IMAGE_INFO', response)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    }
  }
}

export default user
