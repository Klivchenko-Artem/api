import Vue from "vue";
import Vuex from "vuex";
import axios from "../axios/axios"; // Подключаем axios для работы с сервером

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: JSON.parse(localStorage.getItem("user")) || null, // Текущий пользователь
    token: localStorage.getItem("token") || null, // Токен текущего пользователя
    posts: [], // Храним посты
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user)); // Сохраняем текущего пользователя
    },
    setToken(state, token) {
      state.token = token;
      localStorage.setItem("token", token); // Сохраняем токен
    },
    clearAuthData(state) {
      state.user = null;
      state.token = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    setPosts(state, posts) {
      state.posts = posts; // Устанавливаем посты в состояние Vuex
    },
  },
  actions: {
    register({ commit }, registrationData) {
      const { username, password } = registrationData;

      // Загружаем список пользователей из localStorage
      let users = JSON.parse(localStorage.getItem("users")) || [];

      // Проверяем, есть ли уже такой пользователь
      const existingUser = users.find((user) => user.username === username);
      if (existingUser) {
        throw new Error("Пользователь с таким именем уже существует");
      }

      // Создаем нового пользователя и добавляем в массив пользователей
      const newUser = { username, password };
      users.push(newUser);
      localStorage.setItem("users", JSON.stringify(users)); // Сохраняем всех пользователей

      // Логируем пользователя после регистрации
      const token = "fake-jwt-token";
      commit("setUser", newUser);
      commit("setToken", token);
    },

    login({ commit }, loginData) {
      const { username, password } = loginData;

      // Загружаем список пользователей из localStorage
      const users = JSON.parse(localStorage.getItem("users")) || [];

      // Ищем пользователя с введенными данными
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
      commit("clearAuthData"); // Очищаем данные пользователя и токен
    },

    // Логика для загрузки постов с сервера
    async fetchPosts({ commit }) {
      try {
        const response = await axios.get("/posts"); // Запрос к API для получения постов
        commit("setPosts", response.data.data); // Сохраняем посты в Vuex Store
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
      return !!state.token; // Проверка, авторизован ли пользователь
    },
    posts(state) {
      return state.posts; // Возвращаем список постов из Vuex
    },
  },
});
