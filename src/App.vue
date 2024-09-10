<template>
  <div>
    <PostsList :posts="posts" />
  </div>
</template>

<script>
import axiosInstance from './components/axios/axios'; 
import PostsList from './components/UI/PostList.vue'; 

export default {
  components: {
    PostsList 
  },
  data() {
    return {
      posts: [] 
    };
  },
  mounted() {
    axiosInstance
      .get('/posts')
      .then((response) => {
        this.posts = response.data.data;
      })
      .catch((error) => {
        console.error('Ошибка:', error);
      });
  }
};
</script>

<style scoped>
h1 {
  text-align: center;
}
</style>