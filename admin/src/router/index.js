import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
