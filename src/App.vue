<template>
  <main>
    <v-app>
      <router-view v-if="!loading" />
    </v-app>
  </main>
</template>
<script type="text/javascript"
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js">
</script>
<script type="text/javascript">
   (function(){
      emailjs.init("Al7S7v2OGT8ZXYOQK");
   })();
</script>
<script>
import API from './api'

export default {
  name: 'App',
  data() {
    return {
      loading: true
    }
  },
  methods: {
    login(user) {
      console.log("Loging in the user")
      this.$session.start()
      this.$session.set('token', user.token)
      this.$session.set('username', user.username)
      this.$session.set('user_id', user.id)
      this.$cookies.set('token', user.token)
      API.defaults.headers.common['Authorization'] = `Bearer ${user.token}`
      this.loading = false
    },
    logout() {
      console.log("Loging out the user")
      this.$session.destroy()
      this.$cookies.remove('token')
      API.defaults.headers.common['Authorization'] = ''
      this.loading = false
    }
  },
  beforeMount() {
    const token = this.$cookies.get('token')
    if (!token) {
      if (this.$router.currentRoute.name !== 'auth')
        this.$router.push({ name: 'auth', query: { redirect: this.$router.currentRoute.path } })
      this.loading = false
    }
    else {
      API.post('/verifyToken', { token: token })
      .then((res) => {
        this.login(res.data)
        if (this.$router.currentRoute.name === 'auth')
          this.$router.push({ name: 'home'})
      }).catch((err) => {
        console.log(err)
        this.logout()
        this.$router.push({ name: 'auth', query: { redirect: this.$router.currentRoute.path } })
      })
    }
  }
}
</script>