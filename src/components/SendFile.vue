<template>
    <div>
        <Navbar></Navbar>
        <div class="form">
            <form @submit-prevent="submit_form" class="container">
                <h2> Déposez vos fichiers appuyant dans la zone ci-dessous</h2>
                <div class="file-input">
                    <v-file-input
                    counter
                    show-size
                    truncate-length="50"
                    ></v-file-input>
                </div>
                <h2>Ensuite veuillez selectionner un ou plusieurs utilisateur</h2>
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
import Navbar from './/Navbar.vue'

export default {
    components: {
        Multiselect,
        Navbar
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
        })}
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
h2{
    margin-top: 3rem;
}
.container {
    margin-top: 3rem;
}
.multisearch{
    margin-top: 3rem;
    width: 70%;
}
.upload {
    margin-top: 3rem;
}
.btn.submit{
    margin-top: 3rem;
    color: white;
}
.file-input{
    margin-top: 3rem;
    width: 70%;
}
</style>