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
        <div class="form">
            <form @submit-prevent="upload" class="container">
                <h2> Déposez vos fichiers en glissant dans la zone ou appuyez sur le bouton</h2>
                <button class="upload"> Upload </button>
                <div class="selectizesearch">
                    <div>
                        <label class="">Choisir utilisateur(s)</label>
                        <Multiselect v-model="this.selected" :options="this.listUsers" :multiple="true" :close-on-select="false" :clear-on-select="false" :preserve-search="true" placeholder="Pick some" label="name" track-by="name" :preselect-first="true"/>
                    </div>
                </div>
                <button type="submit" class="btn submit" value="envoyer">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
import API from '../api'
import Multiselect from '@vueform/multiselect'

export default {
    components: {
        Multiselect
    },
    data(){
        return{
            nb: 0,
            listUsers : [],
            selected : null,
        }
    },
    methods:{
        upload(){
            nb += 1
        },
        getUsers(){
            API.get('/login').then((res)=>{
            if(res.data){
                this.listUsers = res.data
            }
        })}
    },
    beforeMount(){
        this.getUsers()
    }
}
</script>

<style scoped>
.form {
    flex-direction: row;
    justify-content: center;
}
.container {
    margin-top: 3rem;
}
</style>