import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import material from './modules/material'
import user from './modules/user'
import menu from './modules/menu'
import smart from './modules/smart'
import kpidata from './modules/kpidata'
import channel from './modules/channel'
import getters from './getters'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    common,
    material,
    user,
    menu,
    smart,
    kpidata,
    channel,
  },
  getters
})

export default store
