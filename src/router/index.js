import Vue from 'vue'
import VueRouter from 'vue-router'
import Jokes from '../views/Jokes.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Jokes',
    component: Jokes
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import(/* webpackChunkName: "favorites" */ '../views/Favorites.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
