import Vue from "vue";
import App from "./App.vue";
import router from "./components/router/router"; 
import store from "./components/store"; 

new Vue({
  render: (h) => h(App),
  router,
  store, 
}).$mount("#app");
