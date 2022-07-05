import Vue from 'vue'
import VueRouter from 'vue-router'

import Authentification from './components/Authentification.vue'
import SendFile from './components/SendFile.vue'
import ReceiveFile from './components/ReceiveFile.vue'
import askPassword from './components/askPassword.vue'

Vue.use(VueRouter)

const routes = [
  { path: '/', redirect: '/send', name: 'home' },
  { path: '/auth', name: 'auth', component: Authentification },
  { path: '/receive', name: 'reveived', component: ReceiveFile },
  { path: '/send', name: 'send', component: SendFile },
  { path: '/askPassword', name: 'askPassword', component : askPassword}
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
