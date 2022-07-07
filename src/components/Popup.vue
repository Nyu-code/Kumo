<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="320">
      <template v-slot:activator="{ on, attrs }">
        <button class="delete-button" v-bind="attrs" v-on="on">
          Supprimer le fichier
        </button>
      </template>
      <v-card>
        <v-card-title class="text-h5">
          Voulez-vous vraiment supprimer ce fichier ?
        </v-card-title>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="dialog = false">
            Non
          </v-btn>
          <v-btn color="green darken-1" text @click="dialog = false & deleteFile(file_id)">
            Oui
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  props: ['file_id', 'deleteFile'],
  data() {
    return {
      dialog: false
    }
  }
}

</script>

<style>
.delete-button {
    font-size: 20px;
    padding: 9px 25px;
    background-color: rgb(211, 29, 59);
    border: none;
    border-radius: 25px;
    color: white;
    margin: 15px 0;
    transition: all 0.3s ease 0s;
}

.delete-button:hover {
    opacity: .7;
}
</style>