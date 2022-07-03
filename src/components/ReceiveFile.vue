<template>
  <div>
    <div class="connected" v-if="isConnected">
      <navbar></navbar>
    </div>
    <div class="notconnected" v-if="!isConnected">
      <unconnected-page></unconnected-page>
    </div>
  </div>
</template>

<script>
import Navbar from './/Navbar.vue'
import UnconnectedPage from './UnconnectedPage.vue'

export default {
  components: {
    Navbar,
    UnconnectedPage
  },
  data(){
    return{
      isConnected : false
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
    }
  },
  beforeMount() {
    this.verifSession();
  }
}
</script>

<style scoped>

</style>