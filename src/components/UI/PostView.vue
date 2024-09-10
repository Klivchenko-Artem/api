<template>
  <div v-if="post">
    <h2>{{ post.title }}</h2>
    <p>{{ post.description }}</p>
    <p><strong>Дата создания:</strong> {{ post.created_at }}</p>
    <p><strong>Дата обновления:</strong> {{ post.updated_at }}</p>
  </div>
  <div v-else>
    <p>Загрузка...</p>
  </div>
</template>

<script>
import axios from '../axios/axios';

export default {
  props: ['id'],
  data() {
    return {
      post: null
    };
  },
  mounted() {
    axios.get(`/post/${this.id}`)
      .then(response => {
        console.log(response.data);
        this.post = response.data.data;
      })
      .catch(error => {
        console.error('Ошибка:', error);
      });
  }
};
</script>

<style scoped>
h2 {
  font-size: 2rem;
}

p {
  font-size: 1.2rem;
  line-height: 1.5;
}
</style>