<template>
  <div class="login-page">
    <div class="wallpaper-login">
      <div class="container h-100 ">
        <div class="row h-100 align-content-center ">
          <div class="col-lg-4 col-md-6 col-sm-8 mx-auto">
            <div class="card p-4">
              <h1
                class="text-center border border-top-0 border-end-0 border-start-0 border-bottom border-3 py-2 border-warning">
                Sign In</h1>
              <form @submit.prevent="signIn()">
                <div class="form-group my-3" :class="{ error: v$.form.email.$errors.length }">
                  <label for="email" class="form-label ">Email</label>
                  <input id="email" class="form-control" placeholder="Enter your email" type="email"
                    v-model="v$.form.email.$model">
                  <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                  <!-- error message -->
                  <div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
                </div>

                <div class="form-group my-3" :class="{ error: v$.form.password.$errors.length }">
                  <label for="pass" class="form-label ">Password</label>
                  <input id="pass" class="form-control" placeholder="Enter your password" type="password"
                    v-model="v$.form.password.$model">
                  <div class="pre-icon os-icon os-icon-fingerprint"></div>
                  <!-- error message -->
                  <div class="input-errors" v-for="(error, index) of v$.form.password.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
                </div>

                <!-- Submit Button -->
                <div class="d-flex align-items-center  mt-4 flex-column ">
                  <button :disabled="v$.form.$invalid" class="btn btn-primary w-50 ">Sign-in</button>
                  <router-link to="/forgetPassword" class="my-2">Forget Password ?</router-link>
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
.wallpaper-login {
  background: url('../../assets/login.jpg') no-repeat center center;
  background-size: cover;
  height: 92.6vh;
  position: absolute;
  width: 100%;

  @media screen and (max-height: 896px) {
    height: 93.8vh;
  }

}
</style>

<script>
import axios from '@/http-common'
import useVuelidate from '@vuelidate/core'
import { required, email, minLength } from '@vuelidate/validators'
import router from '@/router'

export default {
  setup() {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      token: '',
    }
  },

  validations() {
    return {
      form: {
        email: {
          required, email
        },
        password: {
          required,
          min: minLength(6)
        },
      },
    }
  },
  methods: {
    async signIn() {
      try {
        await axios.post("/auth/login", {
          email: this.form.email,
          password: this.form.password,
          device_name: "token"
        })
          .then(res => {
            this.token = res.data.token
            sessionStorage.setItem("token", this.token)
            Swal.fire({
              icon: 'success',
              title: 'Welcome, back:)',
              showConfirmButton: false,
              timer: 2000
            })
            setTimeout(() => {
              return router.push({ name: 'home' })
            }, 3000);
          })
      } catch (error) {
        Swal.fire({
          icon: 'error',
          title: error.response.data.message ? error.response.data.message : error.response.data.msg,
          text: 'Later try!',
          showConfirmButton: false,
          timer: 2000
        })
      }
    }
  }
}
</script>