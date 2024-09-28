import Vue from "vue";
import Vuex from "vuex";
import axios from "../axios/axios";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem("user")) || null,
    token: localStorage.getItem("token") || null,
    posts: [],
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token);
    },
    clearAuthData(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    setPosts(state, posts) {
      state.posts = posts;
    },
  },
  actions: {
    register({ commit }, registrationData) {
      const { username, password } = registrationData;

      let users = JSON.parse(localStorage.getItem("users")) || [];

      const existingUser = users.find((user) => user.username === username);
      if (existingUser) {
        throw new Error("Пользователь с таким именем уже существует");
      }

      const newUser = { username, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users)); 

      const token = "fake-jwt-token";
      commit("setUser", newUser);
      commit("setToken", token);
    },

    login({ commit }, loginData) {
      const { username, password } = loginData;

      const users = JSON.parse(localStorage.getItem("users")) || [];

      const storedUser = users.find(
        (user) => user.username === username && user.password === password
      );

      if (storedUser) {
        const token = "fake-jwt-token";
        commit("setUser", storedUser);
        commit("setToken", token);
      } else {
        throw new Error("Неверное имя пользователя или пароль");
      }
    },

    logout({ commit }) {
      commit("clearAuthData");
    },


    async fetchPosts({ commit }) {
      try {
        const response = await axios.get("/posts"); 
        commit("setPosts", response.data.data);
      } catch (error) {
        console.error(
          "Ошибка при загрузке постов:",
          error.response ? error.response.data : error.message
        );
      }
    },
  },
  getters: {
    isAuthenticated(state) {
      return !!state.token;
    },
    posts(state) {
      return state.posts;
    },
  },
});
