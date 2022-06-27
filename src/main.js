import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './style.css'

const API = null;

const app = createApp(App, {
  data() {
    return {
      username: '',
      isConnected: false
    }
  },
});
app.use(router);
app.mount('#app');
