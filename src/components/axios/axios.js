import axios from "axios";

const token = localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL: "http://vseverske.ru/blog/api",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  },
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      console.error("Ошибка ответа от сервера:", error.response.status);
      console.error("Детали ответа:", error.response.data);
    } else if (error.request) {
      console.error("Запрос был отправлен, но ответа не было:", error.request);
    } else {
      console.error("Ошибка при настройке запроса:", error.message);
    }
    console.error("Полная конфигурация запроса:", error.config);
    return Promise.reject(error);
  }
);

export default axiosInstance;
