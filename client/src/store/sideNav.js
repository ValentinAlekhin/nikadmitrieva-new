export default {
  state: {
    isOpen: false,
  },
  mutations: {
    openSideNav(state) {
      state.isOpen = true
    },
    closeSideNav(state) {
      state.isOpen = false
    },

    toggleSideNav(state) {
      state.isOpen = !state.isOpen
    },
  },
}
