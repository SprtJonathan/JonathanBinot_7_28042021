import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'
import moment from 'moment'
import Toast from "vue-toastification";

// Import the CSS or use your own!
import "vue-toastification/dist/index.css";

import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import VueQuillEditor from 'vue-quill-editor'

import 'quill/dist/quill.core.css' // import styles
import 'quill/dist/quill.snow.css' // for snow theme
import 'quill/dist/quill.bubble.css' // for bubble theme

const options = {
  // Toastification options
};

Vue.use(VueQuillEditor, /* { default global options } */)
Vue.use(Toast, options);

// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
// Make BootstrapVue available throughout your project
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.config.productionTip = false

Vue.filter('formatDate', function (value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY à HH:mm')
  }
});

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
