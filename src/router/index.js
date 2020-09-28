import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import NodeView from '../views/NodeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Start',
    component: Home
  },
  {
    path: '/nodes/:id',
    name: 'Sensor-Ansicht',
    component: NodeView
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
