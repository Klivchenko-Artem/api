<template>
  <nav>
    <!-- Если пользователь не авторизован, показываем ссылки на вход и регистрацию -->
    <router-link v-if="!isAuthenticated" to="/login">Войти</router-link>
    <router-link v-if="!isAuthenticated" to="/register">Регистрация</router-link>

    <!-- Если пользователь авторизован, показываем кнопку выхода -->
    <button v-if="isAuthenticated" @click="logout">Выйти</button>
  </nav>
</template>

<script>
export default {
  computed: {
    // Получаем статус авторизации из Vuex Store
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout"); // Выполняем выход
      this.$router.push("/login"); // Перенаправляем на страницу входа после выхода
    },
  },
};
</script>
