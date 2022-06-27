<template>
    <div>
    <header>
        <img class="logoKumo" src="../images/PNG/KumoLogo.png" alt="Logo de la page">
        <nav>
            <ul class="navlink">
            <li><router-link to='/send'>Envoyer</router-link></li>
            <li><router-link to='/receive'>Réception</router-link></li>
            </ul>
        </nav>
        <button class="btn solid" @click="decoUser(user)">Déconnexion</button>
    </header>
        <form @submit-prevent="upload" class="container">
            <h2> Déposez vos fichiers en glissant dans la zone ou appuyez sur le bouton</h2>
            <button class="upload"> Upload </button>
        </form>
    </div>  
</template>

<script>
import API from '../api'
export default {
    data(){
        return{
            nb: 0
        }
    },
    methods:{
        upload(){
            nb += 1
        }
    }
}
</script>

<style>
.container {
    margin-top: 3rem;
    display: flex;
    justify-content: center;
}
</style>