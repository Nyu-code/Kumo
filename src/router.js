import Vue from 'vue'
import VueRouter from 'vue-router'

import Authentification from './components/Authentification.vue'
import SendFile from './components/SendFile.vue'
import ReceiveFile from './components/ReceiveFile.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', component: Authentification },
  { path: '/receive', component: ReceiveFile },
  { path: '/send', component: SendFile }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
