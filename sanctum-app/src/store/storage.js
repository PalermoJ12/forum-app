import { createStore } from "vuex";
import axiosClient from "../../axios/axios-js";

// Create a new store instance.
const store = createStore({
  state() {
    return {
      posts: {},
      comment: {},
      selectedPost: {},
      selectedComment: {},
      myPost: {},
      myComment: {},
      updatepost: {
        postTitle: "",
        postBody: "",
      },
      updatecomment: {
        commmentbody: "",
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
    setComment(state, comment) {
      state.comment = comment;
    },
    setMyComment(state, data) {
      state.myComment = data;
    },
    updateComment(state, updatedComment) {
      const commentIndex = state.selectedPost.comments.findIndex(comment => comment.id === updatedComment.id);
      if (commentIndex !== -1) {
        state.selectedPost.comments.splice(commentIndex, 1, updatedComment);
      }
    },
  },
  actions: {
    getPost({ commit }) {
      axiosClient
        .get("/posts")
        .then((res) => {
          console.log(res.data.posts);
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
    getComment({ commit }) {
      axiosClient
        .get("/comments")
        .then((res) => {
          console.log(res.data.posts);
          commit("setComment", res.data.comment);
        })
        .catch((err) => console.log(err));
    },
    getMyComment({ commit }) {
      axiosClient
        .get("/mycomment")
        .then((res) => {
          commit("setMyComment", res.data.response);
        })
        .catch((err) => console.log(err));
    },
    updateComment({ commit }, { selectedPost, updatedComment }) {
      return axiosClient.put(`/commentUpdate/${updatedComment.id}`, updatedComment)
        .then((res) => {
          commit("updateComment", { selectedPost, updatedComment: res.data.updatedComment });
          return res;
        }).catch((err) => {
          console.log(err);
          throw err;
        });
    },
  }
});
export default store;
