// routes.js
import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../components/LoginPage.vue";
import RegisterPage from "../components/RegisterPage.vue";
import HomePage from "../components/HomePage.vue";
import MyPostPage from "../components/MyPostPage.vue";
import ViewPost from "../components/ViewPost.vue";
import CreatePost from "../components/CreatePost.vue";

const routes = [
  {
    path: "/",
    component: LoginPage,
    name: "login",
    beforeEnter: (to, from, next) => {
      if (!localStorage.getItem("token")) {
        next();
      } else {
        next("/home");
      }
    },
  },
  { path: "/register", component: RegisterPage, name: "register" },
  {
    path: "/home",
    component: HomePage,
    name: "home",
    beforeEnter: (to, from, next) => {
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/mypost",
    component: MyPostPage,
    name: "mypost",
    beforeEnter: (to, from, next) => {
      // check if user is logged in and redirect to login page if not
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/createpost",
    component: CreatePost,
    name: "createpost",
    beforeEnter: (to, from, next) => {
      // check if user is logged in and redirect to login page if not
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/viewpost",
    component: ViewPost,
    name: "ViewPost",
    beforeEnter: (to, from, next) => {
      // check if user is logged in and redirect to login page if not
      if (localStorage.getItem("token")) {
        next();
      } else {
        next("/");
      }
    },
  },
  {
    path: "/logout",
    name: "logout",
    component: LoginPage,
    beforeEnter: (to, from, next) => {
      console.log("logout");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.reload();
      next("/");
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
