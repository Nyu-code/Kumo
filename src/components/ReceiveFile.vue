<template>
  <div>
    <div class="connected">
      <navbar></navbar>
      <table class="Files">
        <tr class="Files-header">
          <th>Nom du fichier</th>
          <th>Expéditeur</th>
          <th>Date d'expédition</th>
          <th>Commentaire</th>
        </tr>
        <tr v-for="file in files" :key="file.file_id">
          <td class="header-fichier-nom">
            <img src="../images/PNG/icone-fichier-document-noir.png" alt="icon fichier" class="file"
              @click.stop="dialog = true" @click="selectFile(file.file_id, file.filename)">
            {{ file.filename }}
          </td>
          <td>{{ file.email }}</td>
          <td>{{ new Date(file.send_at).toLocaleString() }}</td>
          <td>{{ file.comment }}</td>
        </tr>
        <v-dialog persistent v-model="dialog" max-width="500px">
          <v-card>
            <v-card-title>
              <span class="text-h5">Veuillez entrer votre mot de passe</span>
            </v-card-title>
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12">
                    <v-text-field label="Password" type="password" v-model="password" required></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6">
                  </v-col>
                </v-row>
              </v-container>  
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="dialog = false">
                Fermer
              </v-btn>
              <v-btn color="blue darken-1" text
                @click="dialog = false & downloadFile(selectedFile_id, selectedFilename, password)">
                Valider
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </table>
    </div>
  </div>
</template>

<script>
import API from '../api'
import Navbar from './/Navbar.vue'

export default {
  components: {
    Navbar
  },
  data() {
    return {
      files: [],
      dialog: false,
      password: "",
      selectedFile_id: "",
      selectedFilename: ""
    }
  },
  methods: {
    getUserFile() {
      console.log(API.defaults)
      API.get('/receivedFiles').then((res) => {
        this.files = res.data
      }).catch((err) => {
        console.log(err)
      })
    },
    downloadFile(file_id, filename, password) {
      API.post('/download/' + file_id, {
        password: password
      }).then((res) => {
        const link = document.createElement('a')
        link.href = API.defaults.baseURL + "/downloadFile/" + res.data.message
        link.target = "_blank"
        link.setAttribute('download', filename)
        link.click();
      }).catch((err) => {
        console.log(err)
      })
      this.password = ""
      return
    },
    selectFile(file_id, filename) {
      this.selectedFile_id = file_id
      this.selectedFilename = filename
    }
  },
  created() {
    this.getUserFile();
  }
}
</script>

<style scoped>
table {
  margin: 2rem 2rem;
  width: 95%;
  text-align: center;
  align-items: center;
  text-indent: initial;
  overflow: hidden;
  border-collapse: collapse;
  border-radius: 15px;
  table-layout: fixed;
  box-shadow: 0 0 30px 0 rgba(0, 0, 0, .15);
}

th {
  background-color: tomato;
  border-top: none;
  color: white;
  padding: 16px 0 16px 0;
}

td {
  padding: 12px 0 12px 0;
  overflow-wrap: break-word;
}

td:first-child {
  font-weight: bold;
}

td:first-child,
th:first-child {
  border-left: none;
}

tbody tr {
  background-color: #ffffff;
  border-bottom: 1px solid #f2f2f2;
}

#delete-file {
  padding: 10px;
}

.button {
  margin-left: 20%;
}

.header-fichier-nom {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.file {
  margin-top: 1rem;
  cursor: pointer;
  width: 20%;
}

.image-suppr {
  cursor: pointer;
  width: 20%;
}
</style>