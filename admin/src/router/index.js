import Vue from 'vue'
import VueRouter from 'vue-router'
import AuthGuard from './authGuard'
import Login from '../views/Login.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      beforeEnter: AuthGuard,
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
  ],
  mode: 'history',
  base: process.env.BASE_URL,
})

export default router
