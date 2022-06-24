import { createRouter, createWebHistory } from 'vue-router'

import Authentification from './components/Authentification.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Authentification },
    { path: '/received', component: Authentification },
    { path: '/send', component: Authentification }
  ]
})

export default router
