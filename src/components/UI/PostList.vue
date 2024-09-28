<template>
  <div>
    <!-- Кнопка для создания поста -->
    <div v-if="isAuthenticated">
      <button @click="createNewPost">Создать пост</button>
    </div>

    <!-- Список постов -->
    <div v-if="posts.length > 0">
      <div v-for="post in posts" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.description }}</p>

        <!-- Если пользователь авторизован, показываем кнопки редактирования и удаления -->
        <div v-if="isAuthenticated">
          <button @click="editPost(post.id)">Редактировать</button>
          <button @click="openDeleteModal(post.id)">Удалить</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Нет постов для отображения</p>
    </div>

    <!-- Модалка для подтверждения удаления -->
    <ConfirmModal
      v-if="showModal"
      :isVisible="showModal"
      title="Удаление поста"
      message="Вы уверены, что хотите удалить этот пост?"
      @confirm="confirmDeletePost"
      @cancel="closeModal"
    />
  </div>
</template>

<script>
import ConfirmModal from "../ConfirmModal.vue"; // Модалка для подтверждения удаления

export default {
  components: {
    ConfirmModal,
  },
  data() {
    return {
      showModal: false, // Управление модалкой
      postIdToDelete: null, // Идентификатор поста для удаления
    };
  },
  computed: {
    posts() {
      return this.$store.getters.posts; // Получаем посты из Vuex Store
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated; // Проверяем авторизацию
    },
  },
  methods: {
    editPost(id) {
      this.$router.push({ name: "EditPost", params: { id } }); // Переход на редактирование поста
    },
    createNewPost() {
      this.$router.push({ name: "CreatePost" }); // Переход на создание поста
    },
    openDeleteModal(postId) {
      this.postIdToDelete = postId; // Устанавливаем ID поста для удаления
      this.showModal = true; // Открываем модалку
    },
    confirmDeletePost() {
      this.$store.dispatch("deletePost", this.postIdToDelete); // Удаление поста
      this.closeModal(); // Закрываем модалку
    },
    closeModal() {
      this.showModal = false; // Закрываем модалку
    },
  },
  created() {
    this.$store.dispatch("fetchPosts"); // Загружаем посты при создании компонента
  },
};
</script>
