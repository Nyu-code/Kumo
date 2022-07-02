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
      user: {
        username: '',
        email: '',
        username : '',
        password: ''
      },
      isConnected: false
    }
  },
  methods: {
    async addUser (user) {
      const res = await axios.post('/api/register', user)
      if(res.data){
        alert( "Votre compte a été créé! Connectez-vous !")
      }else{
        alert("L'email est déjà utilisé")
      }
    },
    async loginUser () {
      API.post('/login', this.user).then((res) => {
        if(res.data) {
          this.user.isConnected = true
          this.user.username = res.data.username
          this.$router.push({ path: '/' })
          alert("Connexion réussite")
        } else {
          alert("Utilisateur n'existe pas ou mauvais mot de passe")
        }
      }).catch((err) => {
        console.log(err);
      })
    },
    async decoUser(user) {
      const res = await axios.post('/api/login', user)
      this.isConnected = false
      this.$router.push({ path: '/' })
      alert("Déconnexion réussite")
    }
  }
}).$mount("#app")
