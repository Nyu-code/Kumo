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
                <div class="multisearch">
                    <Multiselect    v-model="this.selected"
                                    mode="tags"
                                    placeholder="Choisissez un ou plusieurs destinataire"
                                    :options="this.listUsers"
                                    :searchable="true"
                                    :close-on-select="false"
                                    label="username"
                                    /> 
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
            selected : []
        }
    },
    methods:{
        upload(){
            nb += 1
        },
        getUsers(){
            API.get('/login').then((res)=>{
            if(res.data){
                for (var i = 0 ; i< res.data.length; i++){
                    this.listUsers.push({"value":res.data[i].user_id, "username":res.data[i].username,"email":res.data[i].email,"public_key":res.data[i].public_key})
                }
            }
        })},
    },
    beforeMount(){
        this.getUsers()
    }
}
</script>
<style src="@vueform/multiselect/themes/default.css"></style>

<style scoped>
form{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.container {
    margin-top: 3rem;
}
.multisearch{
    margin-top: 3rem;
    width: 80%;
}
.upload {
    margin-top: 3rem;
}
.btn.submit{
    margin-top: 3rem;
}
</style>