<template>
  <div id="app" class="app">
    <Header />
    <SideNav />
    <vue-page-transition :name="transitionName">
      <router-view />
    </vue-page-transition>
  </div>
</template>

<script>
import './scss/style.scss'
import Header from './components/Header/Header.vue'
import SideNav from './components/SideNav/SideNav.vue'

export default {
  name: 'App',
  components: {
    Header,
    SideNav,
  },
  data: () => ({
    transitionName: '',
    enterActiveClass: '',
    leaveActiveClass: '',
  }),
  methods: {},
  watch: {
    $route(from, to) {
      console.log(from, to)
      const fPath = from.fullPath
      const tPath = to.fullPath
      if (fPath === '/') {
        this.transitionName = 'fade-in-right'
        this.enterActiveClass = 'animate fadeInRightBig'
        this.leaveActiveClass = 'animate fadeOutLeftBig'
      } else if (fPath === '/contact') {
        this.transitionName = 'fade-in-left'
        this.enterActiveClass = 'animate fadeOutLeftBig'
        this.leaveActiveClass = 'animate fadeInRightBig'
      } else if (fPath === '/about') {
        if (tPath === '/') {
          this.transitionName = 'fade-in-right'
          this.enterActiveClass = 'animate fadeOutLeftBig'
          this.leaveActiveClass = 'animate fadeInRightBig'
        } else {
          this.transitionName = 'fade-in-left'
          this.enterActiveClass = 'animate fadeInRightBig'
          this.leaveActiveClass = 'animate fadeOutLeftBig'
        }
      }
    },
  },
}
</script>

<style lang="scss">
.app {
  overflow: hidden;
}
</style>
