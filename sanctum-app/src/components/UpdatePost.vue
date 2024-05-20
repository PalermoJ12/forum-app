<template>

    <div class="d-flex flex-column align-items-center w-100   ">

        <div class="w-75  d-flex flex-column align-items-center">
            <CCard class="d-flex flex-column w-75 p-4 mt-4 gap-4">
                Edit Post Page
                <CFormInput type="text" placeholder="Post Title" />
                <CFormTextarea id="postbody" label="Post Body" rows="3"></CFormTextarea>

                <CButton color="primary" variant="outline">SUBMIT POST</CButton>
            </CCard>

        </div>
    </div>



    <router-view />
</template>

<script>
// import axiosClient from '../../axios/axios-js';


export default {

    name: 'CreatePost',
    data() {
        return {

        }
    },

    mounted() {



    },

}
</script>