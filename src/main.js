import Vue from "vue";
import App from "./App.vue";
import router from "./components/router/router"; // Импортируем роутер из папки router
import store from "./components/store"; // Импортируем Vuex Store из папки store

new Vue({
  render: (h) => h(App),
  router,
  store, // Добавляем store в Vue-инстанс
}).$mount("#app");
