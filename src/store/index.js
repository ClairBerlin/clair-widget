import axios from 'axios'
import { mapResourceModules } from '@reststate/vuex'
import Vue from 'vue'
import Vuex from 'vuex'

const httpClient = axios.create({
  baseURL: '/api/v1/',
  headers: {
    common: {
      'Content-Type': 'application/vnd.api+json'
    }
  }
})

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    ...mapResourceModules({
      names: ['nodes', 'samples'],
      httpClient
    })
  }
})
