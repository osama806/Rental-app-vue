<template>
  <div class="change-password">
    <div class="wallpaper-password">
      <div class="container h-100 ">
        <div class="row h-100 align-content-center ">
          <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
            <div class="card p-4">
              <h1
                class="text-center border border-top-0 border-end-0 border-start-0 border-bottom border-3 py-2 border-warning">
                Change Password</h1>
              <form @click.prevent>
                <div class="form-group my-3">
                  <label for="pass" class="form-label ">Password:</label>
                  <input id="pass" class="form-control" v-model="password" placeholder="Enter password" type="password">
                </div>
                <div class="form-group my-3">
                  <label for="conf" class="form-label ">Confirmation Password:</label>
                  <input id="conf" class="form-control" v-model="confirmPassword" placeholder="Enter password again"
                    type="password">
                </div>
                <div class="d-flex justify-content-center mt-4">
                  <button type="submit" @click="change_password()" class="btn btn-primary">Change</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.wallpaper-password {
  background: url('../../assets/changePassword.jpg') no-repeat center center;
  background-size: cover;
  height: 92.6vh;
  position: absolute;
  width: 100%;

  @media screen and (max-width: 415px) {
    height: 93.8vh;
  }

}
</style>

<script>
import axios from '@/http-common'
import router from '@/router';
export default {
  data() {
    return {
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    async change_password() {
      if (sessionStorage.getItem("phone") == null || sessionStorage.getItem("phone") == undefined || sessionStorage.getItem("code") == null || sessionStorage.getItem("code") == undefined) {
        Swal.fire({
          icon: 'warning',
          title: 'Requirements are missing',
          text: 'Later try!',
          showConfirmButton: false,
          timer: 3000
        })
        setTimeout(() => {
          return router.back()
        }, 3500);
      }
      try {
        await axios.post("/auth/changePassword", {
          phone: sessionStorage.getItem("phone"),
          code: sessionStorage.getItem("code"),
          password: this.password,
          password_confirmation: this.confirmPassword
        })
          .then(res => {
            if (res.status == 200) {
              Swal.fire({
                icon: 'success',
                title: res.data.msg,
                showConfirmButton: false,
                timer: 2500
              })
              setTimeout(() => {
                sessionStorage.clear()
                return router.push({ name: 'login' })
              }, 3000);
            }
          })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: error.response.data.msg ? error.response.data.msg : error.response.data.message,
          text: 'Later try',
        })
      }
    }
  },
}
</script>