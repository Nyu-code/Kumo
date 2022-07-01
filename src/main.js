import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

new Vue({
  router,
  render: h => h(App),
  vuetify,

  data() {
    return {
      username: '',
      isConnected: false
    }
  }
}).$mount("#app")