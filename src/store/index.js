import axios from 'axios'
import { resourceModule, mapResourceModules } from '@reststate/vuex'
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
    Address: resourceModule({
      name: 'addresses',
      httpClient: httpClient
    }),
    Organization: resourceModule({
      name: 'organizations',
      httpClient: httpClient
    }),
    ...mapResourceModules({
      names: ['sites', 'rooms', 'installations', 'installation-timeseries'],
      httpClient
    })
  }
})
