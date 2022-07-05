<template>
  <div>
    <div class="connected" v-if="isConnected">
      <navbar></navbar>
      <table class="Files">
        <tr class="Files-header">
          <th>Nom du fichier</th>
          <th>Expéditeur</th>
          <th>Date d'expédition</th>
          <th>Commentaire</th>
          <th id="delete-file">Supprimer</th>
        </tr>
        <tr v-for="file in files" :key="file.file_id">
          <div data-app>
            <v-row justify="center">
              <v-dialog
                persistent
                v-model="dialog"
                max-width="300px"
                >
              <template v-slot:activator="{ on, attrs }">
                <td class="header-fichier-nom">
                  <img src="../images/PNG/icone-fichier-document-noir.png" 
                        alt="icon fichier" 
                        class="file"
                        v-bind="attrs"
                        v-on="on">
                        {{file.filename}}
                  </td>
              </template>
                <v-card>
                  <v-card-title>
                    <span class="text-h5">Veuillez entrer votre mot de passe</span>
                  </v-card-title>
                  <v-card-text>
                    <v-container>
                      <v-row>
                        <v-col cols="12">
                          <v-text-field
                            label="Password"
                            type="password"
                            v-model="password"
                            required
                          ></v-text-field>
                        </v-col>
                        <v-col
                          cols="12"
                          sm="6"
                        >
                        </v-col>
                      </v-row>
                    </v-container>
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="dialog = false"
                    >
                      Fermer
                    </v-btn>
                    <v-btn
                      color="blue darken-1"
                      text
                      @click="dialog = false & downloadFile(file.file_id, password)"
                    >
                      Valider
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
            </v-row>
          </div>
          <td>{{file.email}}</td>
          <td>{{file.send_at}}</td>
          <td>{{file.comment}}</td>
          <td><img src="../images/PNG/cross_icon.png" class="image-suppr" alt="pour supprimer un fichier" v-on:click="deleteFile(file.file_id)"></td>
        </tr>
      </table>
      <div class="files-buttons">
        <button class="button" v-on:click="deleteAll()">Tout supprimer</button>
      </div>
    </div>
    <div class="notconnected" v-if="!isConnected">
      <unconnected-page></unconnected-page>
    </div>
  </div>
</template>

<script>
import API from '../api'
import Navbar from './/Navbar.vue'
import UnconnectedPage from './UnconnectedPage.vue'

export default {
  components: {
    Navbar,
    UnconnectedPage
  },
  data(){
    return{
      isConnected : false,
      files : [],
      dialog : false,
      password : ""
    }
  },
  methods:{
    verifSession(){
      if(this.$session){
          if(this.$session.exists()){
          this.isConnected = true
          return
          }
      }
      this.isConnected = false
    },
    getUserFile() {
      console.log(API.defaults)
      API.get('/receivedFiles').then((res)=>{
        this.files = res.data
      })
    },
    deleteFile(file_id){
      API.post('/deleteFile',file_id).then((res)=>{
        return
      })
    },
    downloadFile(file_id, filename){
      API.post('/download/' + file_id, {
        responseType: 'blob',
        password: 'arthur'
      }).then((res)=>{
        console.log(res)
        const url = window.URL.createObjectURL(new Blob([res.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', filename)
        document.body.appendChild(link)
        link.click()
      }).catch((err) => {
        console.log(err)
      })
      this.password = ""
      return
    }
  },
  beforeMount() {
    this.verifSession();
  },
  created(){
    this.getUserFile();
  }
}
</script>

<style scoped>

table{
    margin: 2rem 2rem;
    width: 95%;
    text-align: center;
    align-items: center;
    text-indent: initial;
    overflow: hidden;
    border-collapse: collapse;
    border-radius:15px;
    table-layout: fixed;
    box-shadow: 0 0 30px 0 rgba(0,0,0,.15);
}

th {
    background-color:tomato;
    border-top: none;
    color:white;
    padding:16px 0 16px 0;
}

td {
    padding:12px 0 12px 0;
    overflow-wrap: break-word;
}

td:first-child{
    font-weight: bold;
}

td:first-child, th:first-child {
    border-left: none;
}

tbody tr{
    background-color: #ffffff;
    border-bottom: 1px solid #f2f2f2;
}

#delete-file {
    padding : 10px;
}

.files-buttons {
    display: flex;
}

.button {
  margin-left: 20%;
}

.header-fichier-nom{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.file {
    cursor: pointer;
    width: 20%;
}

.image-suppr {
    cursor: pointer;
    width: 20%;
}

</style>