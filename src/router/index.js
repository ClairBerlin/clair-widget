import Vue from 'vue'
import VueRouter from 'vue-router'
import NodesList from '../views/NodesList.vue'
import SampleGraph from '../views/SampleGraph.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Nodes',
    component: NodesList
  },
  {
    path: '/nodes/:id',
    name: 'Sample Graph',
    component: SampleGraph
  }
]

const router = new VueRouter({
  routes
})

export default router
