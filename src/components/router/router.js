import Vue from "vue";
import Router from "vue-router";
import PostList from "../UI/PostList.vue";
import CreatePost from "../UI/CreatePost.vue";
import UserLogin from "../UI/UserLogin.vue";
import UserRegister from "../UI/UserRegister.vue";
import store from "../store"; 

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    { path: "/posts", name: "PostList", component: PostList },
    { path: "/login", name: "UserLogin", component: UserLogin },
    { path: "/register", name: "UserRegister", component: UserRegister },
    {
      path: "/create-post",
      name: "CreatePost",
      component: CreatePost,
      beforeEnter(to, from, next) {
        if (!store.getters.isAuthenticated) {
          next("/login");
        } else {
          next();
        }
      },
    },
    {
      path: "/edit-post/:id",
      name: "EditPost",
      component: CreatePost,
      props: true,
      beforeEnter(to, from, next) {
        if (!store.getters.isAuthenticated) {
          next("/login");
        } else {
          next();
        }
      },
    },
    { path: "*", redirect: "/posts" },
  ],
});
