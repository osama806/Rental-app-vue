<template>
  <div class="forget-password">
    <div class="wallpaper-checkCode">
      <div class="container h-100 ">
        <div class="row h-100 align-content-center ">
          <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
            <div class="card p-4">
              <h1
                class="text-center border border-top-0 border-end-0 border-start-0 border-bottom border-3 py-2 border-warning">
                Check Code</h1>
              <form @click.prevent>
                <div class="form-group my-3">
                  <label for="code" class="form-label ">Verify from code (write code here):</label>
                  <input id="code" class="form-control" v-model="code" :placeholder="cc" type="number">
                </div>

                <div class="d-flex justify-content-center mt-4">
                  <button type="submit" @click="verify()" class="btn btn-primary">Verify</button>
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
.wallpaper-checkCode {
  background: url('../../assets/checkCode.jpg') no-repeat center center;
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
import axios from '@/http-common';
import router from '@/router';
export default {
  data() {
    return {
      code: '',
      cc: sessionStorage.getItem("code")
    }
  },
  methods: {
    async verify() {
      try {
        if (sessionStorage.getItem("phone") == null || sessionStorage.getItem("phone") == undefined) {
          Swal.fire({
            icon: 'error',
            title: 'Phone is not found',
            text: 'Try again!',
            showConfirmButton: false,
            timer: 2500
          })
          setTimeout(() => {
            return router.back();
          }, 3000);
        }
        await axios.post("/auth/checkCode", {
          phone: sessionStorage.getItem("phone"),
          code: this.code
        })
          .then(res => {
            if (res.status == 200) {
              sessionStorage.setItem("code", this.code)
              Swal.fire({
                icon: 'success',
                title: res.data.msg,
                showConfirmButton: false,
                timer: 2000
              })
              setTimeout(() => {
                return router.push({ name: 'changePassword' })
              }, 3000);
            }
          })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: error.response.data.msg ? error.response.data.msg : error.response.data.message,
          text: 'Try again!',
        })
      }
    }
  },
}
</script>