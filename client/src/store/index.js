import Vue from 'vue'
import Vuex from 'vuex'
import sideNav from './sideNav'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    static: {
      title: 'Ника Дмитриева',
      links: [
        {
          title: 'Портфолио',
          url: '/',
        },
        {
          title: 'Обо мне',
          url: '/about',
        },
        {
          title: 'Контакты',
          url: '/contact',
        },
      ],
    },
  },
  mutations: {},
  actions: {},
  modules: {
    sideNav,
  },
})
