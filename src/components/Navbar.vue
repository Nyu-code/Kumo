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
            API.defaults.headers.common['Authorization'] = ''
            this.$router.push({ path: '/auth' })
        }
    }
}
</script>

<style scoped>
.v-application a {
  color: black;
}
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 30px 10%;
    border-bottom: 3px solid rgb(255, 82, 59);
}

.logoKumo {
    width: 50%;
    cursor: pointer;
}
nav {
    width: 80%;
}
.navlink {
    list-style: none;
}
.navlink li {
    display: inline-block;
    padding: 0px 50px;
}

.navlink li a {
    font-size: 40px;
    transition: all 0.3s ease 0s;
}

.navlink li a:hover{
    color: rgb(255, 82, 59);
}

.button {
    font-size: 25px;
    padding: 9px 25px;
    background-color:rgb(211, 29, 59);
    border: none;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease 0s;
    color: white;
}

.button:hover{
    background-color:rgb(255, 102, 128);
}
.logoKumo {
    width: 50%;
    cursor: pointer;
}
</style>