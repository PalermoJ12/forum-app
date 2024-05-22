<template>
    <!-- Button trigger modal -->
        <div class="modal" id="myModal">
        <div class="modal-dialog">
            <div class="modal-content">
    
            <!-- Modal Header -->
            <div class="modal-header">
                <h4 class="modal-title">Confirm</h4>
                <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
            </div>
    
            <!-- Modal body -->
            <div class="modal-body">
                Are you sure create this post ?
            </div>
    
            <!-- Modal footer -->
            <div class="modal-footer">
                <button type="button" class="btn btn-success" @click="validateAndCreatePost" data-bs-dismiss="modal">Confirm</button>
                <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
            </div>
    
            </div>
        </div>
        </div>
        <div class="d-flex flex-column align-items-center w-100">
          <div class="w-75  d-flex flex-column align-items-center">
            <CCard class="d-flex flex-column w-75 p-4 mt-4 gap-4">
              Create Post Page
              <CFormInput
                v-model="postCreate.postTitle"
                type="text"
                label="Post Title"
                placeholder="Post Title"
                required
              />
              <!-- Display validation error for post title -->
              <span v-if="validationErrors.postTitle" class="text-danger">{{ validationErrors.postTitle }}</span>
      
              <CFormTextarea
                v-model="postCreate.postBody"
                id="postbody"
                label="Post Body"
                rows="3"
                required
              ></CFormTextarea>
              <!-- Display validation error for post body -->
              <span v-if="validationErrors.postBody" class="text-danger">{{ validationErrors.postBody }}</span>
      
              <CButton color="primary" variant="outline" data-bs-toggle="modal" data-bs-target="#myModal" >SUBMIT POST</CButton>
            </CCard>
          </div>
        </div>
      
        <CToaster class="p-3" placement="top-end">
          <CToast v-for="(toast, index) in toasts" visible :key="index">
            <CToastHeader closeButton>
              <span class="me-auto fw-bold">{{ toast.title }}</span>
              <small>Just Now</small>
            </CToastHeader>
            <CToastBody>
              {{ toast.content }}
            </CToastBody>
          </CToast>
        </CToaster>
      
        <router-view />
      </template>
      
      <script>
      import axiosClient from '../../axios/axios-js';
      
      export default {
        name: 'CreatePost',
        data() {
          return {
            postCreate: {
              postTitle: "",
              postBody: ""
            },
            toasts: [],
            validationErrors: {}
          }
        },
        methods: {
          createToast(title, content) {
            this.toasts.push({ title, content });
          },
          validateAndCreatePost() {
            // Clear previous validation errors
            this.validationErrors = {};
      
            // Perform validation
            if (!this.postCreate.postTitle || !this.postCreate.postTitle.trim()) {
              this.validationErrors.postTitle = "Post title is required.";
            }
            if (!this.postCreate.postBody || !this.postCreate.postBody.trim()) {
              this.validationErrors.postBody = "Post body is required.";
            }
      
            // If there are validation errors, do not proceed with creating post
            if (Object.keys(this.validationErrors).length > 0) {
              return;
            }
      
            // If validation passes, create post
            this.createPost();
          },
          createPost() {
            axiosClient.post('/postsCreate', this.postCreate).then((res) => {
              this.createToast('Success', 'Successfully created post');
              this.$store.state.posts = res.data.posts;
              setTimeout(() => {
                this.$router.push('/home');
              }, 2000);
            }).catch((err) => console.log(err));
          },
        }
      }
      </script>