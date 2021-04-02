<template>
  <div id="app" class="app">
    <Header />
    <SideNav />
    <router-view />
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
  methods: {},
  created() {
    this.$store.dispatch('fetchAllData')
  },
}
</script>

<style lang="scss">
.app {
  width: 60%;
  margin: 0 auto;
}
</style>
