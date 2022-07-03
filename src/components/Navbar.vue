<template>
  <div>
      <header>
        <router-link to='/'><img class="logoKumo" src="../images/PNG/KumoLogo.png" alt="Logo de la page"></router-link>
        <nav>
            <ul class="navlink">
            <li><router-link to='/send'>Envoyer</router-link></li>
            <li><router-link to='/receive'>Réception</router-link></li>
            </ul>
        </nav>
        <button class="button" @click="decoUser()">Déconnexion</button>
    </header>
  </div>
</template>

<script>
import API from '../api'

export default {
    data(){
        return{
        }
    },
    methods: {
        decoUser(){
            this.$session.destroy()
            this.$cookies.remove('token')
            API.defaults.headers.common['Authorization'] = ""
            this.$router.push({ path: '/auth' })
        }
    }
}
</script>

<style scoped>

</style>