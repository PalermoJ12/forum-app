<template>
  <nav class="navbar">
    <div v-if="user" class="w-100 p-3  d-flex  justify-content-between bg-body-tertiary">
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
        <div class="p-2 mx-4 nav-hover-logout" data-bs-toggle="modal" data-bs-target="#myModalLogOut">
          Logout
        </div>
      </div>
    </div>
  </nav>
  <div class="modal" id="myModalLogOut">
    <div class="modal-dialog">
        <div class="modal-content">

        <!-- Modal Header -->
        <div class="modal-header">
            <h4 class="modal-title">Confirm</h4>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>

        <!-- Modal body -->
        <div class="modal-body">
            Are you sure you want to log out ?
        </div>

        <!-- Modal footer -->
        <div class="modal-footer">
            <button type="button" class="btn btn-success"  @click="$router.push('/logout')" data-bs-dismiss="modal">Confirm</button>
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
        </div>

        </div>
    </div>
    </div>

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
  color: black;
  cursor: pointer;
}

.nav-hover-title:hover {
  color: gold;
}

.nav-hover-logout {
  color: black;
  cursor: pointer;
}

.nav-hover-logout:hover {
  background-color: black;
  border-radius: 10%;
  color: white;
}
</style>