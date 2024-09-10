import Vue from "vue";
import Router from "vue-router";
import PostsList from "../UI/PostList.vue";
import PostView from "../UI/PostView.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/posts",
      name: "PostsList",
      component: PostsList,
    },
    {
      path: "/post/:id",
      name: "PostView",
      component: PostView,
      props: true,
    },
    {
      path: "*",
      redirect: "/posts",
    },
  ],
});
