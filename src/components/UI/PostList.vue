<template>
  <div>
    <h2>Список постов</h2>
    <ul>
      <li v-for="post in posts" :key="post.id" class="post-item">
        <router-link :to="'/post/' + post.id">{{ post.title }}</router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from '../axios/axios';

export default {
  data() {
    return {
      posts: []
    };
  },
  mounted() {
    axios.get('/posts')
      .then(response => {
        console.log(response.data);
        this.posts = response.data.data;
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
  }
};
</script>

<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}

.post-item {
  padding: 10px;
  background-color: #848484;
  margin-bottom: 10px;
  border-radius: 4px;
}

a {
  text-decoration: none;
  color: #001020;
}

a:hover {
  text-decoration: underline;
}
</style>