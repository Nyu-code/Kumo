import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueSession from "vue-session"
import VueCookies from 'vue-cookies';

Vue.use(VueSession)
Vue.use(VueCookies)

new Vue({
  router,
  render: h => h(App),
  vuetify,

  data() {
    return {
    }
  }
}).$mount("#app")
