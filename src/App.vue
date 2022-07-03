<template>
  <main>
    <router-view/>
  </main>
</template>

<script>
import API from './api'

export default {
  name: 'App',
  beforeMount() {
    const token = this.$cookies.get('token')
    if (!token && this.$router.currentRoute.name !== 'auth')
      this.$router.push({ name: 'auth', query: { redirect: this.$router.currentRoute.path } })
    else if (this.$router.currentRoute.name !== 'auth') {
      API.post('/verifyToken', { token: token })
      .then((res) => {
        API.defaults.headers.common['Authorization'] = `Bearer ${token}`
        if (this.$router.currentRoute.name === 'auth')
          this.$router.push({ name: 'home'})
      }).catch((err) => {
        console.log(err)
        this.$cookies.remove('token')
        this.$router.push({ name: 'auth', query: { redirect: this.$router.currentRoute.path } })
      })
    }
  }
}
</script>
