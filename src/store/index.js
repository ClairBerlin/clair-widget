import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import { mapResourceModules } from '@reststate/vuex'

const httpClient = axios.create({
  baseURL: '/api/inspect/v1/',
  headers: {
    'Content-Type': 'application/vnd.api+json'
  }
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ...mapResourceModules({
      httpClient,
      names: ['nodes', 'timeseries']
    })
  }
})
