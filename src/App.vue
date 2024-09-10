<template>
  <div>
    <header>
      <nav>
        <router-link to="/posts">Посты</router-link>
      </nav>
    </header>
    
    <router-view />
  </div>
</template>

<script>
import router from './components/router/router';

export default {
  router
};
</script>

<style scoped>
nav {
  background-color: #333;
  padding: 1rem;
}

nav a {
  color: white;
  text-decoration: none;
  margin-right: 1rem;
}
</style>