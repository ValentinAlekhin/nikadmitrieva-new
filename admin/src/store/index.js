import Vue from 'vue'
import Vuex from 'vuex'

import user from './user'
import shared from './shared'
import series from './series'
import home from './home'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { user, shared, series, home },
})
