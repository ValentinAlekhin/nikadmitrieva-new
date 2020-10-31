import axios from 'axios'

export default {
  state: {
    token: '',
  },

  mutation: {
    setToken(state, payload) {
      state.token = payload
    },
  },

  actions: {
    async loginUser({ commit }, { login, password }) {
      commit('clearError')
      commit('setLoading', true)

      try {
        const res = axios.post('http://localhost:5000/api/auth', {
          login,
          password,
        })
      } catch (e) {}
    },
  },

  getters: {
    token() {
      return state.token
    },
    isUserLoggedIn() {
      return !!state.token
    },
  },
}
