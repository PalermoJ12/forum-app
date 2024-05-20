<template>

    <div class="d-flex flex-column align-items-center w-100   ">

        <div class="w-75  d-flex flex-column align-items-center">
            <CCard class="d-flex flex-column w-75 p-4 mt-4 gap-4">
                Create Post Page
                <CFormInput v-model="postCreate.postTitle" type="text" label="Post Title" placeholder="Post Title" />
                <CFormTextarea v-model="postCreate.postBody" id="postbody" label="Post Body" rows="3"></CFormTextarea>

                <CButton color="primary" variant="outline" @click="createPost">SUBMIT POST</CButton>
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
                postTitle: " ",
                postBody: " "
            },
            toasts: []

        }
    },

    methods: {

        createToast() {
            this.toasts.push({
                title: 'Success',
                content: 'Successfully created post',
            })
        },
        createPost() {
            axiosClient.post('/postsCreate', this.postCreate).then((res) => {
                this.createToast();
                this.$store.state.posts = res.data.posts;
                setTimeout(() => {
                    this.$router.push('/home');
                }, 2000);
            }).catch((err) => console.log(err));
        },
    }

}
</script>