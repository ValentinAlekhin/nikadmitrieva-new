import Vue from 'vue'
import VueRouter from 'vue-router'

import Home from '../pages/Home.vue'
import Series from '../pages/Series.vue'
import Contact from '../pages/Contact.vue'
import About from '../pages/About.vue'

Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/series/:id',
      name: 'Series',
      component: Series,
    },
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    {
      path: '/contact',
      name: 'contact',
      component: Contact,
    },
  ],
  beforeEach() {
    console.log('work')
  },
})

export default router
