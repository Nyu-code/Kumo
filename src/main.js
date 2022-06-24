import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

const API = null;

const app = createApp(App, {
  data() {
    return {
      username : "",
      livres: [],
      panier: [],
      isAdmin: false,
      isConnected: false,
      username: ''
    }
  },
})

app.use(router)

app.mount('#app')
