import { getMenu, deleteItem, editItem, addItem } from '@/api/menu'
import { commonGet } from '@/api/common'
import { Message } from 'element-ui'

const menu = {
  state: {
    list: null,
    specialList: null,
  },

  mutations: {
    SET_LIST: (state, data) => {
      state.list = data
    },
    SET_SPECIAL: (state, data) => {
      state.specialList = data
    },
  },

  actions: {
    // 获取导航菜单列表
    GetMenu({ commit }, params) {
      return new Promise((resolve, reject) => {
        getMenu(params).then(response => {
          const res = response.result
          commit('SET_LIST', res)
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //删除一项导航
    DeleteItem({ commit }, params) {
      return new Promise((resolve, reject) => {
        deleteItem(params).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //修改一项导航
    EditItem({ commit }, params) {
      return new Promise((resolve, reject) => {
        editItem(params).then(response => {
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
    //添加一项导航
    AddItem({ commit }, params) {
      return new Promise((resolve, reject) => {
        addItem(params).then(response => {
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },
    //获取特殊页面列表
    GetSpecialMenu({ commit }, data) {
      return new Promise((resolve, reject) => {
        commonGet(data).then(response => {
          if (response.code && Number(response.code) == 200) {
            commit('SET_SPECIAL', response.result)
          }
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },
  }
}

export default menu