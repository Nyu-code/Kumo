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
            <form @submit-prevent="upload" class="container">
                <h2> Déposez vos fichiers en glissant dans la zone ou appuyez sur le bouton</h2>
                <button class="button upload"> Upload </button>
                <div class="multisearch">
                      <multiselect 
                            v-model="value"
                            tag-placeholder="Add this as new tag"
                            placeholder="Search or add a tag"
                            label="name"
                            track-by="value"
                            :options="options"
                            :multiple="true"
                            :taggable="true"
                            @tag="addTag"
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
        addTag(newTag) {
            const tag = {
                name: newTag,
                code: newTag
            }
            this.options.push(tag)
            this.value.push(tag)
        },
        upload() {
            console.log('bite')
        },
        submit_form() {
            const form_data = new FormData()
            form_data.append('file', null)
            form_data.append('users', JSON.stringify({}))
        },
        getUsers(){
            API.get('/getUsers').then((res)=>{
            if(res.data){
                for (var i = 0 ; i< res.data.length; i++){
                    this.options.push({
                        code: res.data[i].user_id,
                        name: res.data[i].username,
                        email: res.data[i].email
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
}
</style>