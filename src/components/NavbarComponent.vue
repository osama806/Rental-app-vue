<template>
  <div class="navbar-component position-sticky top-0 w-100 " style="z-index: 10;">
    <nav class="navbar navbar-expand-lg bg-primary ">
      <div class="container">
        <router-link to="/" class="ms-1 text-decoration-none text-warning fw-bold fs-5 ">Estate
          Rental</router-link>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav mx-auto my-2">
            <li class="nav-item align-self-center mx-3">
              <router-link to="/myReservation" class="text-decoration-none text-warning fs-6 ">My
                Reservations</router-link>
            </li>
            <li class="nav-item align-self-center mx-3">
              <router-link to="/myContracts" class="text-decoration-none text-warning fs-6 ">My Contracts</router-link>
            </li>
            <li class="nav-item align-self-center mx-3">
              <router-link to="/myInfo" class="text-decoration-none text-warning fs-6 ">My Profile</router-link>
            </li>
          </ul>
          <form class="d-flex" role="search">
            <input class="form-control" type="search" v-model="search" placeholder="Search......" aria-label="Search">
            <button type="button" class="btn btn-success ms-4 w-50 ">
              <router-link to="/auth/login" class="text-decoration-none text-light">Sign
                in</router-link>
            </button>
            <button type="button" class="btn btn-warning w-50 mx-4 ">
              <router-link to="/auth/register" class="text-decoration-none text-light">Sign up</router-link>
            </button>
            <button type="button" class="btn btn-danger w-50" @click="signOut()">
              Sign out
            </button>
          </form>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
import router from '@/router';
import axios from '@/http-common';

export default {
  data() {
    return {
      search: ''
    }
  },
  methods: {
    async signOut() {
      try {
        await axios.get('/logout', {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`
          }
        })
          .then(res => {
            if (res.status == 200) {
              sessionStorage.clear()
              Swal.fire({
                icon: 'success',
                title: 'Successfully logged out',
                text: 'Thank you for visit',
                showConfirmButton: false,
                timer: 2000
              })
              setTimeout(() => {
                return router.push({ name: 'login' })
              }, 3000);
            }
          })
      } catch (error) {
        if (error.response.status == 401) {
          Swal.fire({
            icon: "error",   // success, error, warning, info, question  
            title: error.response.data.msg ? error.response.data.msg : error.response.data.message,
            text: "Please login!",
            showConfirmButton: false,
            timer: 2500
          })
          setTimeout(() => {
            return router.push({ name: 'login' })
          }, 3000);
        }
        else {
          Swal.fire({
            icon: "error",
            title: error.response.data.msg ? error.response.data.msg : error.response.data.message,
            text: "Later try!",
            showConfirmButton: false,
            timer: 2000
          })
        }
      }
    }
  }
}
</script>