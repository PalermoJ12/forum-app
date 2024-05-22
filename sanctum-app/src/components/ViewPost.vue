<template>
  <div class="d-flex flex-column align-items-center mt-4 w-100">
    <div v-if="posts" class="w-50">
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
                <div class="w-100">
                    <b>Comments</b>
                    <span v-if="posts.comments.length === 0" style="opacity: 0.7;"> - There are no comments on this post.</span>
                </div>
                <div v-for="(comment, index) in posts.comments" :key="comment.id" class="mt-3 d-flex w-100 justify-content-between align-items-center">
                    <div v-if="editingCommentId === comment.id" class="d-flex flex-grow-1">
                        <CFormInput v-model="comment.comment_body" class="me-2 flex-grow-1" placeholder="Please enter a comment." />
                        <CButton color="primary" class="me-2" @click="saveEditedComment(comment)">Save</CButton>
                        <CButton color="secondary" @click="cancelEdit(comment)">Cancel</CButton>
                    </div>
                    <div v-else class="d-flex justify-content-between align-items-center w-100" :style="{ borderBottom: index !== posts.comments.length - 1 ? '1px solid #dee2e6' : 'none' }">
                        <b><span style="font-size: 25px;">👨🏻‍💼 </span></b>
                        <div class="flex-grow-1">               
                            <div class="text-muted">
                                <b><span style="padding-left: 5px; font-size: 18px;"> {{ comment.user.name }}</span></b>
                            </div>
                            <h6 class="mb-1" style="padding-left: 5px; opacity: 0.7;"> {{ comment.comment_body }}</h6>
                        </div>
                        <div v-if="comment.user.id == user_id" class="ms-2 d-flex">
                            <CButton color="primary" class="me-1" @click="editComment(comment)">✏️</CButton>
                            <CButton color="danger" @click="deleteComment(comment)">🗑️</CButton>
                        </div>
                    </div>
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
      updatepostdata: {
        postTitle: this.$store.state.updatepost.postTitle,
        postBody: this.$store.state.updatepost.postBody
      },
      toasts: [],
      user_id: this.$store.state.user_id,
      editingCommentId: null
    };
  },
  mounted() {
    if (!this.$store.state.posts || Object.keys(this.$store.state.posts).length === 0) {
      this.$router.push('/home');
    }
  },
  methods: {
    createToast(content) {
      this.toasts.push({
        title: 'Success',
        content: `Successfully ${content}.`,
      });
    },
    updatePost(id) {
      axiosClient.put(`/postsUpdate/${id}`, this.updatepostdata)
        .then((res) => {
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
    editComment(comment) {
      this.editingCommentId = comment.id;
      // Store the original comment body before editing
      comment.original_comment_body = comment.comment_body;
    },
    saveComment(comment) {
      this.$store.dispatch('updateComment', comment).then(() => {
        this.editingCommentId = null;
        this.createToast('updated comment');
      }).catch((err) => console.log(err));
    },
    cancelEdit(comment) {
      this.editingCommentId = null;
      // Revert changes made to the comment body
      comment.comment_body = comment.original_comment_body;
    },
    saveEditedComment(comment) {
      if (comment.comment_body.trim() !== '') {
        this.saveComment(comment);
      } else {
        console.log('Input field is empty. Cannot save.');
      }
    }
  },
};
</script>



<style scoped>
  .icon-hover-trash {
    cursor: pointer;
  }

  .icon-hover-trash {
    height: 20px;
    width: 30px;
    transition: color 0.3s;
    color: red;
  }
</style>
