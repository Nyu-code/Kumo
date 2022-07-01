import Vue from 'vue'
import VueCompositionAPI from '@vue/composition-api'
import App from './App.vue'
import router from './router'
import './style.css'

const API = null;

new Vue({
  router,
  render: h => h(App),
  data() {
    return {
      username: '',
      isConnected: false
    }
  },
}).$mount("#app")

Vue.use(VueCompositionAPI)