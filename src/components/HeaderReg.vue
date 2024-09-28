<template>
  <nav>
    <router-link v-if="!isAuthenticated" to="/login">Войти</router-link>
    <router-link v-if="!isAuthenticated" to="/register">Регистрация</router-link>
    <button v-if="isAuthenticated" @click="logout">Выйти</button>
  </nav>
</template>

<script>
export default {
  computed: {
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout"); 
      this.$router.push("/login"); 
    },
  },
};
</script>
