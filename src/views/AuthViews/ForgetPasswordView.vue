<template>
  <div class="forget-password">
    <div class="wallpaper-forgetPassword">
      <div class="container h-100 ">
        <div class="row h-100 align-content-center ">
          <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
            <div class="card p-4">
              <h1
                class="text-center border border-top-0 border-end-0 border-start-0 border-bottom border-3 py-2 border-warning">
                Forget Password</h1>
              <form @click.prevent>
                <div class="form-group my-3">
                  <label for="phone" class="form-label ">Phone</label>
                  <input id="phone" class="form-control" v-model="phone" placeholder="Enter your phone" type="tel">
                </div>

                <div class="d-flex justify-content-center mt-4">
                  <button type="submit" @click="send()" class="btn btn-primary">Send code</button>
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
.wallpaper-forgetPassword {
  background: url('../../assets/forgetPassword.jpg') no-repeat center center;
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
      phone: ''
    }
  },
  methods: {
    async send() {
      try {
        await axios.post("/auth/forgetPassword", {
          phone: this.phone
        })
          .then(res => {
            if (res.status == 200) {
              sessionStorage.setItem("phone", this.phone)
              sessionStorage.setItem("code", res.data.code)
              Swal.fire({
                icon: 'success',
                title: 'Code is sent successfully',
                showConfirmButton: false,
                timer: 2000
              })
              setTimeout(() => {
                return router.push({ name: 'checkCode' })
              }, 2500);
            }
          })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: error.response.data.msg ? error.response.data.msg : error.response.data.message,
          text: 'Later try!'
        })
      }
    }
  },
}
</script>