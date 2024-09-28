<template>
  <div>
    <h2 v-if="isEditing">Редактирование поста</h2>
    <h2 v-else>Создание поста</h2>

    <form @submit.prevent="submitForm">
      <input v-model="title" placeholder="Название" required />
      <textarea v-model="description" placeholder="Описание" required></textarea>
      <button type="submit">{{ isEditing ? 'Сохранить' : 'Создать' }}</button>
    </form>
  </div>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      title: "",
      description: "",
    };
  },
  computed: {
    isEditing() {
      return !!this.id;
    },
  },
  methods: {
    async submitForm() {
      const postData = {
        id: this.id,
        title: this.title,
        description: this.description,
      };

      try {
        if (this.isEditing) {
          await this.$store.dispatch("editPost", postData);
        } else {
          await this.$store.dispatch("createPost", postData);
        }
        this.$router.push("/posts");
      } catch (error) {
        alert("Ошибка при сохранении поста: " + (error.response ? error.response.data : error.message));
      }
    },
  },
  created() {
    if (this.isEditing) {
      const post = this.$store.state.posts.find(post => post.id === this.id);
      if (post) {
        this.title = post.title;
        this.description = post.description;
      }
    }
  },
};
</script>
