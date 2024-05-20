<template>
  <div class="d-flex flex-column align-items-center w-100">
    <CCard v-if="posts" class="d-flex flex-column w-75 p-4 mt-4">
      <div>
        <CButton color="success" variant="outline" @click="$router.push('/createpost')">Create Post</CButton>
      </div>
      <div v-for="post in posts" :key="post.id">
        <CCard class="w-100 mt-4">
          <CCardHeader class="d-flex justify-content-between">
            <div>{{ post.user.name }}</div>
            <div class="text-muted">Author</div>
          </CCardHeader>
          <CCardBody>
            <CCardTitle>{{ post.title }}</CCardTitle>
            <CCardText>{{ post.body }}</CCardText>
            <div class="d-flex justify-content-end">
              <div class="icon-container">
                <CIcon class="icon-hover" icon="cilArrowRight" size="sm" @click="postComment(post)" />
              </div>
            </div>
          </CCardBody>
          <CCardFooter class="text-muted d-flex justify-content-between">
            <div>{{ formatDate(post.created_at) }}</div>
            <div>Date Posted</div>
          </CCardFooter>
        </CCard>
      </div>
    </CCard>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  computed: {
    posts() {
      return this.$store.state.posts;
    }
  },
  mounted() {
    this.$store.dispatch('getPost');
  },
  methods: {
    postComment(post) {
      this.$store.state.selectedPost = post;
      this.$router.push('/viewpost');
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    }
  }
}
</script>

<style>
.icon-container {
  display: inline-block;
  position: relative;
  cursor: pointer;
}

.icon-hover {
  height: 30px;
  width: 50px;
  transition: color 0.3s;
}

.icon-container::after {
  content: '';
  position: absolute;
  width: 0;
  height: 2px;
  bottom: -5px;
  left: 50%;
  background-color: rgb(115, 69, 241);
  transition: width 0.3s ease, left 0.3s ease;
}

.icon-container:hover::after {
  width: 100%;
  left: 0;
}
</style>
