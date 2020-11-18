import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import SiteView from '../views/SiteView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Start',
    component: Home
  },
  {
    path: '/sites/:id',
    name: 'Widget-Ansicht für Orte',
    component: SiteView
  }
]

const router = new VueRouter({
  base: '/widget',
  routes
})

export default router
