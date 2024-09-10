import axios from 'axios';


const axiosInstance = axios.create({
  baseURL: 'http://vseverske.ru/blog/api', 
  timeout: 1000, 
  headers: { 'Content-Type': 'application/json' }
});

export default axiosInstance;