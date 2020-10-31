import Vue from 'vue'
import vuelidate from 'vuelidate'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

Vue.use(vuelidate)

new Vue({
  el: '#app',
  router,
  store,
  vuetify,
  render: h => h(App),
  created() {
    this.$store.dispatch('autoLoginUser')
  },
})
