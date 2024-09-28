<template>
  <div>
    <HeaderReg />  <!-- Подключаем HeaderReg вместо Header -->
    <router-view />  <!-- Здесь рендерятся страницы -->
  </div>
</template>

<script>
import HeaderReg from './components/HeaderReg.vue';  // Импортируем компонент HeaderReg

export default {
  components: {
    HeaderReg,  // Регистрируем HeaderReg
  },
  created() {
    this.$store.dispatch('autoLogin');  // Автоматическая проверка на авторизацию
  },
};
</script>