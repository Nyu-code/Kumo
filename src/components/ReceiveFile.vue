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
          <td class="header-fichier-nom"><img src="../images/PNG/icone-fichier-document-noir.png" alt="icon fichier" class="file">
              {{file.filename}}
          </td>
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
      files : []
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

      })
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