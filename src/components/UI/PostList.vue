<template>
  <div>

    <div v-if="isAuthenticated">
      <button @click="createNewPost">Создать пост</button>
    </div>

    <div v-if="posts.length > 0">
      <div v-for="post in posts" :key="post.id">
        <h2>{{ post.title }}</h2>
        <p>{{ post.description }}</p>

        <div v-if="isAuthenticated">
          <button @click="editPost(post.id)">Редактировать</button>
          <button @click="openDeleteModal(post.id)">Удалить</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>Нет постов для отображения</p>
    </div>

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
import ConfirmModal from "../ConfirmModal.vue";

export default {
  components: {
    ConfirmModal,
  },
  data() {
    return {
      showModal: false,
      postIdToDelete: null,
    };
  },
  computed: {
    posts() {
      return this.$store.getters.posts;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    },
  },
  methods: {
    editPost(id) {
      this.$router.push({ name: "EditPost", params: { id } });
    },
    createNewPost() {
      this.$router.push({ name: "CreatePost" });
    },
    openDeleteModal(postId) {
      this.postIdToDelete = postId;
      this.showModal = true;
    },
    confirmDeletePost() {
      this.$store.dispatch("deletePost", this.postIdToDelete);
      this.closeModal();
    },
    closeModal() {
      this.showModal = false;
    },
  },
  created() {
    this.$store.dispatch("fetchPosts");
  },
};
</script>
