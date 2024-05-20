<template>

    <div class="d-flex flex-column align-items-center w-100 ">


        <div v-if="posts" class="w-50">
            <CCard class="w-100">
                <CCardHeader class="d-flex justify-content-between">
                    <div>
                        {{ posts.user.name }}
                    </div>
                    <div class="text-muted">Author</div>
                </CCardHeader>
                <CCardBody>
                    <CCardTitle>{{ posts.title }}</CCardTitle>
                    <CCardText>{{ posts.body }}</CCardText>
                    <div class="d-flex justify-content-end">
                        <CButton color="primary" @click="showComment = !showComment">Post comment</CButton>
                    </div>
                </CCardBody>
                <br>
                <div v-if="showComment" class="row g-3 mx-2 ">

                    <div class="d-flex mb-4">
                        <CFormLabel for="inputComment" class="col-sm-2 col-form-label">Comment</CFormLabel>
                        <CFormInput v-model="comment_body" type="text" id="inputComment" />
                        <CButton color="success" class="mx-4" @click="postComment()">Post</CButton>
                    </div>

                </div>
                <div v-if="posts.comments">
                    <CCardFooter class="w-100 ">
                        <div class="w-100">Comments</div>
                        <div v-for="comment in posts.comments" :key="comment.id"
                            class="mt-3 d-flex w-100 justify-content-between ">
                            <h6>{{ comment.comment_body }} </h6>
                            <div class="text-muted">{{ comment.user.name }}
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

    name: 'ViewPost',
    data() {
        return {
            posts: this.$store.state.selectedPost,
            comment_body: '',
            showComment: false,

            toast: []
        }
    },
    mounted() {

        if (!this.$store.state.posts || Object.keys(this.$store.state.posts).length === 0) {
            this.$router.push('/home');
        }
    },
    methods: {
        createToast() {
            this.toast.push({
                title: 'Success',
                content: 'Successfully posted a comment.',
            })
        },
        postComment() {
            const comment_data = {
                post_id: this.posts.id,
                comment_body: this.comment_body,
            }


            axiosClient.post('/commentPost', comment_data).then((res) => {
                console.log(res.data.response)
                this.$store.dispatch('getPost');
                this.posts.comments.push(res.data.response);
                console.log(this.posts.comments)
                this.createToast();
            }).catch((err) => console.log(err));
        },


    }

}
</script>