<template>
  <div>
    <h2>Войти</h2>
    <form @submit.prevent="login">
      <input v-model="username" placeholder="Имя пользователя" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <button type="submit">Войти</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    login() {
      try {
        this.$store.dispatch("login", { username: this.username, password: this.password });
        this.$router.push("/posts"); // Перенаправляем на список постов после входа
      } catch (error) {
        alert(error.message); // Показываем сообщение об ошибке
      }
    },
  },
};
</script>
