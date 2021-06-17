import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import user from './modules/user'

Vue.use(Vuex, axios)

let toolbarOptions = [ // Options de la barre d'outils de l'éditeur de texte pour les posts et commentaires
  ["bold", "italic", "underline", "strike"], // Décoration du texte
  [{ script: "sub" }, { script: "super" }], // indice et exposant
  ["link", "video"],
  [{ color: [] }, { background: [] }], // Couleurs du texte ou du fond

  ["clean"], // Retirer la mise en page
];

export default new Vuex.Store({
  state: {
    namespaced: true,
    isHidden: false, // Variable permettant d'alterner entre l'affichage de connexion et d'inscription
    apiUrl: `http://localhost:3000/api/`, // Passage de l'URL de l'api en variable dans le store afin de pouvoir le modifier plus rapidement
    toolbarOptions: toolbarOptions, // Options de la barre d'outils de l'éditeur de texte pour les posts et commentaires
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    user // Module relatif aux états de l'utilisateur
  }
})
