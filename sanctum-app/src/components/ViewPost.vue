<template>
    <div class="d-flex flex-column align-items-center mt-4 w-100">

      <div v-if="posts" class="w-50">
        <!-- Post display card -->
        <CCard class="w-100">
          <CCardHeader class="d-flex justify-content-between">
            <div>{{ posts.user.name }}</div>
            <div class="text-muted">Author</div>
          </CCardHeader>
          <CCardBody>
            <div class="d-flex justify-content-between">
              <CCardTitle>{{ posts.title }}</CCardTitle>
              <div v-if="posts.user.id == user_id" class="icon-trash-container">
                <CIcon class="icon-hover-trash" icon="cilBackspace" size="sm" @click="() => { visibleDelete = true }" />
              </div>
            </div>
            <CCardText>{{ posts.body }}</CCardText>
            <div class="d-flex justify-content-end">
              <CButton v-if="posts.user.id == user_id" color="success" class="mx-2" @click="() => { visibleUpdate = true }"> Edit </CButton>
              <CButton color="primary" @click="showComment = !showComment">Post comment</CButton>
            </div>
          </CCardBody>
          <br>
          <div v-if="showComment" class="row g-3 mx-2">
            <div class="d-flex mb-4">
              <CFormLabel for="inputComment" class="col-sm-2 col-form-label">Comment</CFormLabel>
              <CFormInput v-model="comment_body" type="text" id="inputComment" />
              <CButton color="success" class="mx-4" @click="postComment()">Post</CButton>
            </div>
          </div>
          <div v-if="posts.comments">
            <CCardFooter class="w-100">
              <div class="w-100">Comments</div>
              <div v-for="comment in posts.comments" :key="comment.id" class="mt-3 d-flex w-100 justify-content-between">
                <h6>{{ comment.comment_body }}</h6>
                <div class="d-flex justify-content-end">
                  <CButton v-if="comment.user.id == user_id" color="success" class="mx-2" @click="editComment(comment)"> Edit </CButton>
                </div>
                <div class="text-muted">{{ comment.user.name }}</div>
              </div>
            </CCardFooter>
          </div>
        </CCard>
      </div>
    </div>
  
    <CToaster class="p-3" placement="top-end">
      <CToast v-for="(toast, index) in toasts" visible :key="index">
        <CToastHeader closeButton>
          <span class="me-auto fw-bold">{{ toast.title }}</span>
          <small>Just Now</small>
        </CToastHeader>
        <CToastBody>{{ toast.content }}</CToastBody>
      </CToast>
    </CToaster>
  
    <CModal :visible="visibleUpdate" @close="() => { visibleUpdate = false }" aria-labelledby="LiveDemoExampleLabel">
      <CModalHeader>
        <CModalTitle id="LiveDemoExampleLabel">Edit Post</CModalTitle>
      </CModalHeader>
      <CModalBody class="d-flex flex-column gap-3">
        <CFormInput v-model="updatepostdata.postTitle" type="text" id="inputTitle" placeholder="Edit Title" />
        <CFormInput v-model="updatepostdata.postBody" type="text" id="inputBody" placeholder="Edit Body" />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="() => { visibleUpdate = false }">Close</CButton>
        <CButton color="primary" @click="updatePost(posts.id)">Save changes</CButton>
      </CModalFooter>
    </CModal>
  
    <CModal :visible="visibleDelete" @close="() => { visibleDelete = false }" aria-labelledby="LiveDemoExampleLabel">
      <CModalHeader>
        <CModalTitle id="LiveDemoExampleLabel">Delete a post</CModalTitle>
      </CModalHeader>
      <CModalBody>Are you sure to delete this post?</CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="() => { visibleDelete = false }">Close</CButton>
        <CButton color="danger" @click="deletePost(posts.id)">Delete</CButton>
      </CModalFooter>
    </CModal>
  
    <!-- Comment Modal -->
    <CModal :visible="visibleCommentUpdate" @close="() => { visibleCommentUpdate = false }" aria-labelledby="LiveDemoExampleLabel">
      <CModalHeader>
        <CModalTitle id="LiveDemoExampleLabel">Edit Comment</CModalTitle>
      </CModalHeader>
      <CModalBody class="d-flex flex-column gap-3">
        <CFormInput v-model="updatecommentdata.commentBody" type="text" id="inputBody" placeholder="Edit Comment" />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" @click="() => { visibleCommentUpdate = false }">Close</CButton>
        <CButton color="primary" @click="updateComment">Save changes</CButton>
      </CModalFooter>
    </CModal>
    <router-view />
  </template>
  
  <script>
  import axiosClient from '../../axios/axios-js';
  
  export default {
    name: 'ViewPost',
    data() {
      return {
        posts: this.$store.state.selectedPost,
        comment_body: '',
        showComment: false,
        visibleUpdate: false,
        visibleDelete: false,
        visibleCommentUpdate: false,
        updatepostdata: {
          postTitle: '',
          postBody: '',
        },
        updatecommentdata: {
          commentId: null,
          commentBody: '',
        },
        toasts: [],
        user_id: this.$store.state.user_id,
      };
    },
    methods: {
      createToast(content) {
        this.toasts.push({
          title: 'Success',
          content: `Successfully ${content}.`,
        });
      },
      updatePost(id) {
        axiosClient.put(`/postsUpdate/${id}`, this.updatepostdata).then((res) => {
          this.$store.state.selectedPost.title = this.updatepostdata.postTitle;
          this.$store.state.selectedPost.body = this.updatepostdata.postBody;
          this.visibleUpdate = false;
          this.createToast('updated post');
          console.log(res);
        }).catch((err) => console.log(err));
      },
      deletePost(id) {
        axiosClient.delete(`/postDelete/${id}`).then((res) => {
          console.log(res.data);
          this.$store.dispatch('getPost');
          this.createToast('deleted post');
          this.visibleDelete = false;
          setTimeout(() => {
            this.$router.push('/home');
          }, 2000);
        }).catch((err) => console.log(err));
      },
      postComment() {
        const comment_data = {
          post_id: this.posts.id,
          comment_body: this.comment_body,
        };
  
        axiosClient.post('/commentPost', comment_data).then((res) => {
          this.$store.dispatch('getPost');
          this.posts.comments.push(res.data.response);
          this.createToast('commented to post');
          this.showComment = false;
        }).catch((err) => console.log(err));
      },
      updateComment() {
  const { commentId, commentBody } = this.updatecommentdata;
  this.$store.dispatch('updateComment', { selectedPost: this.posts, updatedComment: { id: commentId, commentBody } })
    .then((res) => {
      const updatedComment = res.data.updatedComment;
      const index = this.posts.comments.findIndex(comment => comment.id === updatedComment.id);
      if (index !== -1) {
        this.$set(this.posts.comments, index, updatedComment);
      }
      this.visibleCommentUpdate = false;
      this.createToast('updated comment');
      console.log(res);
    }).catch((err) => console.log(err));
},

      editComment(comment) {
        this.updatecommentdata.commentId = comment.id;
        this.updatecommentdata.commentBody = comment.comment_body;
        this.visibleCommentUpdate = true;
      },
    }
  };
  </script>
  
  <style>
  .icon-trash-container {
    display: inline-block;
    position: relative;
    cursor: pointer;
  }
  
  .icon-hover-trash {
    height: 20px;
    width: 30px;
    transition: color 0.3s;
    color: red;
  }
  </style>
  