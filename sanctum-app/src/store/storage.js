import { createStore } from "vuex";
import axiosClient from "../../axios/axios-js";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      posts: {},
      selectedPost: {},
      myPost: {},
    };
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setMyPost(state, data) {
      state.myPost = data;
    },
  },
  actions: {
    getPost({ commit }) {
      axiosClient
        .get("/posts")
        .then((res) => {
          commit("setPosts", res.data.posts);
        })
        .catch((err) => console.log(err));
    },
    getMyPost({ commit }) {
      axiosClient
        .get("/mypost")
        .then((res) => {
          commit("setMyPost", res.data.response);
        })
        .catch((err) => console.log(err));
    },
  },
});

export default store;
