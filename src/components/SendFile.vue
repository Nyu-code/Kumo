<template>
    <div>
        <div class="connected">
            <Navbar />
            <div class="grid">
                <div class="form">
                    <form @submit.prevent="submit_form">
                        <h2> Déposez vos fichiers appuyant dans la zone ci-dessous</h2>
                        <div class="file-input">
                            <v-file-input counter show-size aria-required="true" truncate-length="20" v-model="file" />
                        </div>
                        <h2>Ensuite veuillez selectionner un ou plusieurs utilisateur</h2>
                        <div class="multisearch">
                            <multiselect v-model="value" tag-placeholder=""
                                placeholder="Selectionner un ou plusieurs utilisateur" label="name" track-by="name"
                                aria-required="true" :options="options" :multiple="true" :taggable="true" />
                        </div>
                        <h2>Laissez un commentaire</h2>
                        <v-text-field class="comment-field" label="Commentaire" solo v-model="comment"></v-text-field>
                        <button type="submit" class="button btn submit" value="envoyer">Submit</button>
                    </form>
                    <div class="messageupload" v-if="upload !== null">
                        <p v-if="upload">Vous avez bien upload votre fichier !</p>
                        <p v-if="upload == false">Il y a eu un problème lors de l'upload. Votre fichier n'a pas pu être
                            upload</p>
                    </div>
                </div>
                <div class="historical-container" v-if="files.length > 0">
                    <v-card id="table" min-width="1000px">
                        <v-tabs v-model="tab" background-color="primary" dark>
                            <v-tab v-for="file in files" class="historical-header" :key="file.file_id">
                                {{ file.filename }}
                            </v-tab>
                        </v-tabs>

                        <v-tabs-items v-model="tab">
                            <v-tab-item class="user" v-for="file in files" :key="file.file_id">
                                <v-card class="v-card" v-for="user in file.send_to" :key="user.user_id">
                                    <v-card-text>
                                        <div class="receiverUsername">Nom d'utilisateur : {{ user.username }}</div>
                                        <div class="receiverEmail">Son email : {{ user.email }}</div>
                                    </v-card-text>
                                    <v-card-actions class="v-btn">
                                        <v-btn color="error" dark @click="revokeUserAccess(user.user_id, user.file_id)">
                                            Révoquer l'accès
                                        </v-btn>
                                    </v-card-actions>
                                </v-card>
                                <!-- <button class="delete-button" @click="deleteFile(file.file_id)">Delete</button> -->
                                <Popup :file_id="file.file_id" :deleteFile="deleteFile" />
                            </v-tab-item>
                        </v-tabs-items>
                    </v-card>
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
import Popup from './Popup.vue'

export default {
    components: {
        Multiselect,
        Navbar,
        UnconnectedPage,
        Popup
    },
    data() {
        return {
            value: [],
            options: [],
            file: null,
            files: [],
            upload: null,
            tab: null,
            comment: ""
        }
    },
    methods: {
        deleteFile(file_id) {
            API.delete('/deleteFile/' + file_id).then((res) => {
                this.getHistorical()
            }).catch((err) => {
                console.log(err)
            })
        },
        revokeUserAccess(user_id, file_id) {
            API.post('/removeUserAccess', { user_id, file_id }).then((res) => {
                this.getHistorical()
            }).catch((err) => {
                console.log(err)
            })
        },
        submit_form() {
            const users_id = this.value.map((val) => val.code)
            const form_data = new FormData()
            form_data.append('file', this.file)
            form_data.append('users', JSON.stringify(users_id))
            form_data.append('comment', this.comment)
            API.post('/sendFile', form_data)
                .then((res) => {
                    console.log(res)
                    this.getHistorical()
                    this.upload = true
                }).catch((err) => {
                    console.log(err)
                    this.upload = false
                })
        },
        getUsers() {
            API.get('/getUsers').then((res) => {
                this.options = []
                for (let i = 0; i < res.data.length; i++) {
                    this.options.push({
                        code: res.data[i].user_id,
                        name: res.data[i].username,
                    })
                }
            })
        },
        getHistorical() {
            API.get('/getSendHistorical')
                .then((res) => {
                    this.files = res.data
                }).catch((err) => {
                    console.log(err)
                })
        }
    },
    beforeMount() {
        this.getUsers()
        this.getHistorical()
    }
}
</script>
<style src="vue-multiselect/dist/vue-multiselect.min.css">
</style>

<style scoped>
.historical-container,
.tx-buttons,
.grid {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.form {
    border-radius: 25px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    margin-top: 10px;
}

.form form {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    padding: 20px;
}

.comment-field {
    width: 70%;
    margin-top: 20px !important;
}

h2 {
    margin-top: 20px;
}

.container {
    margin-top: 3rem;
}

.multisearch {
    margin-top: 3rem;
    width: 70%;
}

.upload {
    margin-top: 3rem;
}

.btn.submit {
    margin-top: 3rem;
    color: white;
}

.file-input {
    margin-top: 3rem;
    width: 70%;
}

.messageupload {
    display: flex;
    justify-content: center;
    font-size: 20px;
    margin: 2rem;
}

.button {
    margin: 3rem;
}

#table {
    width: 70%;
    text-indent: initial;
}

.historical-header {
    margin-right: 2rem;
}

.user,
.v-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

.v-card {
    margin: 25px;
}
</style>