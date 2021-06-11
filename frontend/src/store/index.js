import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import user from './modules/user'

Vue.use(Vuex, axios)

export default new Vuex.Store({
  state: {
    namespaced: true,
    isHidden: false,
    apiUrl: `http://localhost:3000/api/`
  },
  mutations: {

  },
  actions: {
  },
  modules: {
    user
  }
})
