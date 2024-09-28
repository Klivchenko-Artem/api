<template>
  <div>
    <h2>Регистрация</h2>
    <form @submit.prevent="register">
      <input v-model="username" placeholder="Имя пользователя" required />
      <input v-model="password" type="password" placeholder="Пароль" required />
      <button type="submit">Зарегистрироваться</button>
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
    register() {
      try {
        this.$store.dispatch("register", { username: this.username, password: this.password });
        this.$router.push("/posts"); // После регистрации перенаправляем на список постов
      } catch (error) {
        alert(error.message); // Показываем сообщение об ошибке
      }
    },
  },
};
</script>
