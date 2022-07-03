import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'
import VueSession from "vue-session";
Vue.use(VueSession);

new Vue({
  router,
  render: h => h(App),
  vuetify,

  data() {
    return {
    }
  }
}).$mount("#app")
