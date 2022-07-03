<template>
  <div class="container">
    <h2>Vous n'êtes pas connecter, veuillez vous connecter</h2>
    <button @click="$router.push('/')" class="button">Se connecter</button>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.container{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}
.container h2, .container .button{
    margin-top: 3rem;
}
</style>