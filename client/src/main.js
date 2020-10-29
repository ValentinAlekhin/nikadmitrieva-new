import Vue from 'vue'
import VuePageTransition from 'vue-page-transition'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.use(VuePageTransition)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
