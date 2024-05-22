import { createStore } from "vuex";
import axiosClient from "../../axios/axios-js";

const store = createStore({
  state() {
    return {
      posts: {},
      selectedPost: {},
      myPost: {},
      updatepost: {
        postTitle: "",
        postBody: "",
      },
      user_id: localStorage.getItem("user"),
    };
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts;
    },
    setMyPost(state, data) {
      state.myPost = data;
    },
    updateComment(state, updatedComment) {
      const post = state.selectedPost;
      const commentIndex = post.comments.findIndex(comment => comment.id === updatedComment.id);
      if (commentIndex !== -1) {
        post.comments.splice(commentIndex, 1, updatedComment);
      }
    },
  },
  actions: {
    getPost({ commit }) {
      axiosClient.get("/posts")
        .then((res) => {
          commit("setPosts", res.data.posts);
        })
        .catch((err) => console.log(err));
    },
    getMyPost({ commit }) {
      axiosClient.get("/mypost")
        .then((res) => {
          commit("setMyPost", res.data.response);
        })
        .catch((err) => console.log(err));
    },
    updatePost({ commit }, post) {
      axiosClient.put(`/postsUpdate/${post.id}`, post)
        .then((res) => {
          commit("setMyPost", res.data.response);
        })
        .catch((err) => console.log(err));
    },
    updateComment({ commit }, comment) {
      axiosClient.put(`/comments/${comment.id}`, comment)
        .then((res) => {
          commit("updateComment", res.data.response);
        })
        .catch((err) => console.log(err));
    },
  },
});

export default store;
