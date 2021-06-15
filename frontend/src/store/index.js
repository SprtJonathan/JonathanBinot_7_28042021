import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import user from './modules/user'

Vue.use(Vuex, axios)

let toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  [{ script: "sub" }, { script: "super" }], // superscript/subscript
  ["link", "video"],
  [{ color: [] }, { background: [] }], // dropdown with defaults from theme

  ["clean"], // remove formatting button
];

export default new Vuex.Store({
  state: {
    namespaced: true,
    isHidden: false,
    apiUrl: `http://localhost:3000/api/`,
    toolbarOptions: toolbarOptions,
  },
  mutations: {

  },
  actions: {
  },
  modules: {
    user
  }
})
