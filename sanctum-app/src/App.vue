<template>
  <nav class="navbar">
    <div v-if="user" class="w-100 p-3  d-flex  justify-content-between bg-dark">
      <div class="p-2 ms-4  nav-hover-title">
        Forum App
      </div>
      <div class="d-flex justify-content-between  ">
        <div class="p-2 mx-4 nav-hover-logout " @click="$router.push('/home')">
          Home
        </div>
        <div class="p-2 mx-4 nav-hover-logout " @click="$router.push('/mypost')">
          My Posts
        </div>
        <div class="p-2 mx-4 nav-hover-logout " @click="$router.push('/logout')">
          Logout
        </div>
      </div>

    </div>
  </nav>

  <router-view />
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      user: localStorage.getItem("token")

    }
  }
}
</script>

<style>
.nav-hover-title {
  color: aliceblue;
  cursor: pointer;
}

.nav-hover-title:hover {
  color: gold;
}

.nav-hover-logout {
  color: aliceblue;
  cursor: pointer;
}

.nav-hover-logout:hover {
  background-color: aliceblue;
  border-radius: 10%;
  color: black;
}
</style>
