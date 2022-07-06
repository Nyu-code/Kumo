<template>
  <main>
    <v-app>
      <router-view v-if="!loading" />
    </v-app>
  </main>
</template>

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
    },
    logout() {
      console.log("Loging out the user")
      this.$session.destroy()
      this.$cookies.remove('token')
      API.defaults.headers.common['Authorization'] = ''
    }
  },
  beforeMount() {
    this.loading = true
    const token = this.$cookies.get('token')
    if (!token && this.$router.currentRoute.name !== 'auth') {
      console.log("coucou")
      this.loading = false
      this.$router.push({ name: 'auth', query: { redirect: this.$router.currentRoute.path } })
    }
    else if (this.$router.currentRoute.name !== 'auth') {
      console.log("hello")
      API.post('/verifyToken', { token: token })
      .then((res) => {
        this.login(res.data)
        this.loading = false
        if (this.$router.currentRoute.name === 'auth')
          this.$router.push({ name: 'home'})
      }).catch((err) => {
        console.log(err)
        this.logout()
        this.loading = false
        this.$router.push({ name: 'auth', query: { redirect: this.$router.currentRoute.path } })
      })
    }
  }
}
</script>
