import axios from '../axios/index'

export default {
  state: {
    token: '',
  },

  mutations: {
    setToken(state, payload) {
      state.token = payload
    },
  },

  actions: {
    async loginUser({ commit }, { login, password }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const {
          data: { token },
        } = await axios.post('auth', {
          login,
          password,
        })

        sessionStorage.setItem('token', token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
        commit('setToken', token)
      } catch (e) {
        const message = e.response.data.message || e
        commit('setError', message)
        throw message
      } finally {
        commit('setLoading', false)
      }
    },

    async autoLoginUser({ commit }) {
      commit('setLoading', true)
      const token = sessionStorage.getItem('token')

      if (token) {
        try {
          await axios.post('/auth/check', { token })
          axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
          commit('setToken', token)
        } catch (e) {
          const message = e.response.data.message || e
          sessionStorage.removeItem('token')
          commit('setError', message)
        } finally {
          commit('setLoading', false)
        }
      } else {
        commit('setToken', token)
        commit('setLoading', false)
      }
    },

    logoutUser({ commit }) {
      commit('setToken', '')
      sessionStorage.removeItem('token')
    },
  },

  getters: {
    token(state) {
      return state.token
    },
    isUserLoggedIn(state) {
      return !!state.token
    },
  },
}
