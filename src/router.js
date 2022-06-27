import { createRouter, createWebHistory } from 'vue-router'

import Authentification from './components/Authentification.vue'
import SendFile from './components/SendFile.vue'
import ReceiveFile from './components/ReceiveFile.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Authentification },
    { path: '/receive', component: ReceiveFile },
    { path: '/send', component: SendFile }
  ]
})

export default router
