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
            <button class="button btn solid" @click="decoUser(user)">Déconnexion</button>
        </header>
        <div class="form">
            <form @submit-prevent="submit_form" class="container">
                <h2> Déposez vos fichiers en glissant dans la zone ou appuyez sur le bouton</h2>
                <v-file-input
                    counter
                    show-size
                    truncate-length="50"
                ></v-file-input>
                <button class="button upload"> Upload </button>
                <div class="multisearch">
                      <multiselect 
                            v-model="value"
                            tag-placeholder=""
                            placeholder="Selectionner un ou plusieurs utilisateur"
                            label="name"
                            track-by="value"
                            :options="options"
                            :multiple="true"
                            :taggable="true"
                        />
                </div>
                <button type="submit" class="button btn submit" value="envoyer">Submit</button>
            </form>
        </div>
    </div>
</template>

<script>
import API from '../api'
import Multiselect from 'vue-multiselect'

export default {
    components: {
        Multiselect
    },
    data(){
        return{
            value: [],
            options: []
        }
    },
    methods:{
        submit_form() {
            const users_id = this.value.map((val) => val.code)
            const form_data = new FormData()
            form_data.append('file', null)
            form_data.append('users', JSON.stringify(users_id))
        },
        getUsers(){
            API.get('/getUsers').then((res)=>{
            if(res.data){
                for (var i = 0 ; i< res.data.length; i++){
                    this.options.push({
                        "value": res.data[i].user_id,
                        "name": res.data[i].username,
                        "email": res.data[i].email
                    })
                }
            }
        })},
    },
    beforeMount(){
        this.getUsers()
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>

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
    color: white;
}
</style>