<template>
  <div>
      <header>
        <img class="logoKumo" src="../images/PNG/KumoLogo.png" alt="Logo de la page">
        <nav>
            <ul class="navlink">
            <li><router-link to='/send'>Envoyer</router-link></li>
            <li><router-link to='/receive'>Réception</router-link></li>
            </ul>
        </nav>
        <button class="btn solid" @click="decoUser(user)">Déconnexion</button>
    </header>
  </div>
</template>

<script>
export default {

}
</script>

<style>

</style>