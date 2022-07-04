<template>
    <div>
        <div class="connected">
            <Navbar/>
            <div class="grid">
                <div class="form">
                    <form @submit.prevent="submit_form" class="container">
                        <h2> Déposez vos fichiers appuyant dans la zone ci-dessous</h2>
                        <div class="file-input">
                            <v-file-input
                                counter
                                show-size
                                aria-required="true"
                                truncate-length="20"
                                v-model="file"
                            />
                        </div>
                        <h2>Ensuite veuillez selectionner un ou plusieurs utilisateur</h2>
                        <div class="multisearch">
                            <multiselect
                                    v-model="value"
                                    tag-placeholder=""
                                    placeholder="Selectionner un ou plusieurs utilisateur"
                                    label="name"
                                    track-by="name"
                                    aria-required="true"
                                    :options="options"
                                    :multiple="true"
                                    :taggable="true"
                                />
                        </div>
                        <button type="submit" class="button btn submit" value="envoyer">Submit</button>
                    </form>
                </div>
                <div class="historical-container">
                    <table class="historical">
                        <tr class="historical-header">
                            <th>Nom d'utilisateur du réceptionneur</th>
                            <th>Mail</th>
                            <th>Date d'expédition</th>
                            <th>Nom du fichier</th>
                            <th id="delete-file">Supprimer l'accès</th>
                        </tr>
                            <tr v-for="tx in historical" :key="tx.file_id">
                            <td>{{tx.username}}</td>
                            <td>{{tx.email}}</td>
                            <td>{{tx.send_at}}</td>
                            <td>{{tx.filename}}</td>
                            <td><img src="../images/PNG/cross_icon.png" class="image-suppr" alt="pour supprimer un fichier" v-on:click="deleteFile(file.file_id)"></td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import API from '../api'
import Multiselect from 'vue-multiselect'
import Navbar from './Navbar.vue'
import UnconnectedPage from './UnconnectedPage.vue'

export default {
    components: {
        Multiselect,
        Navbar,
        UnconnectedPage
    },
    data(){
        return{
            value: [],
            options: [],
            file: null,
            historical : []
        }
    },
    methods:{
        submit_form() {
            const users_id = this.value.map((val) => val.code)
            const form_data = new FormData()
            console.log(users_id)
            form_data.append('file', this.file)
            form_data.append('users', JSON.stringify(users_id))
            API.post('/sendFile', form_data)
            .then((res) => {
                console.log(res)
            }).catch((err) => {
                console.log(err)
            })
        },
        getUsers() {
            API.get('/getUsers').then((res)=>{
                for (let i=0; i < res.data.length; i++){
                    this.options.push({
                        "code": res.data[i].user_id,
                        "name": res.data[i].username,
                    })
                }
            })
        },
        getHistorical(){
            API.get('/getSendHistorical').then((res)=>{
                this.historical = res.data
            })
        }
    },
    beforeMount() {
        this.getUsers()
        this.getHistorical()
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
    width: 50%;
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
    width: 50%;
}
.grid {
    display: grid;
}
.form {
    grid-column: 1/2;
}
.history {
    grid-column: 2/2;
}
</style>