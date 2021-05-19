import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import user from './modules/user'

Vue.use(Vuex, axios)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user
  }
})
