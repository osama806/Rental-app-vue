<template>
  <div class="register-page">
    <div class="wallpaper-register">
      <div class="container h-100 ">
        <div class="row justify-content-center h-100 align-content-center ">
          <div class="col-lg-4 col-md-6 col-sm-8">
            <div class="card w-100 p-4">
              <h1
                class="text-center border border-top-0 border-end-0 border-start-0 border-bottom border-3 py-2 border-warning">
                Sign Up</h1>
              <form @submit.prevent="signUp()">
                <!-- Name Row -->
                <div class="form-group my-3">
                  <label for="name"> Name:</label>
                  <input id="name" class="form-control" placeholder="Enter your name" type="text"
                    v-model="v$.form.name.$model" autocomplete>
                  <div class="pre-icon os-icon os-icon-user-male-circle"></div>
                  <!-- Error Message -->
                  <div class="input-errors" v-for="(error, index) of v$.form.name.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
                </div>

                <!-- Email Row -->
                <div class="form-group my-3">
                  <label for="email"> Email address</label>
                  <input id="email" class="form-control" placeholder="Enter email" type="email"
                    v-model="v$.form.email.$model">
                  <div class="pre-icon os-icon os-icon-email-2-at2"></div>
                  <!-- Error Message -->
                  <div class="input-errors" v-for="(error, index) of v$.form.email.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
                </div>

                <!-- Phone Row -->
                <div class="form-group my-3">
                  <label for="phone"> Phone number:</label>
                  <input id="phone" class="form-control" placeholder="Enter phone" type="tel"
                    v-model="v$.form.phone.$model">
                  <div class="pre-icon os-icon os-icon-email-2-at2"></div>
                  <!-- Error Message -->
                  <div class="input-errors" v-for="(error, index) of v$.form.phone.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
                </div>

                <!-- Password Row -->
                <div class="form-group my-3">
                  <label for="pass"> Password</label>
                  <input id="pass" class="form-control" placeholder="Password" type="password"
                    v-model="v$.form.password.$model">
                  <div class="pre-icon os-icon os-icon-fingerprint"></div>
                  <!-- Error Message -->
                  <div class="input-errors" v-for="(error, index) of v$.form.password.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
                </div>

                <!-- Confirm Password Row -->
                <div class="form-group my-3">
                  <label for="confPass">Confirm Password</label>
                  <input id="confPass" class="form-control" placeholder="Confirm Password" type="password"
                    v-model="v$.form.confirmPassword.$model">
                  <!-- Error Message -->
                  <div class="input-errors" v-for="(error, index) of v$.form.confirmPassword.$errors" :key="index">
                    <div class="error-msg">{{ error.$message }}</div>
                  </div>
                </div>

                <!-- Submit Button -->
                <div class="btn-label d-flex justify-content-center mt-4">
                  <button class="btn btn-primary">Sign-up</button>
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
.wallpaper-register {
  background: url('../../assets/register.jpeg') no-repeat center center;
  background-size: auto;
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
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import router from '@/router'

export function validName(name) {
  let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
  if (validNamePattern.test(name)) {
    return true;
  }
  return false;
}

export function checkPassword(password) {
  if (password == document.getElementById("pass").value) {
    return true;
  }
  return false;
}

export default {
  setup() {
    return { v$: useVuelidate() }
  },

  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
        phone: ''
      },
    }
  },
  methods: {
    async signUp() {
      try {
        await axios.post("/auth/register", {
          name: this.form.name,
          email: this.form.email,
          password: this.form.password,
          password_confirmation: this.form.confirmPassword,
          phone: this.form.phone
        })
          .then(res => {
            if (res.status == 200) {
              Swal.fire({
                icon: 'success',
                title: 'Registration is done',
                text: 'We\'ll convert you to sign-in page through few seconds',
                showConfirmButton: false,
                timer: 3000
              })
              setTimeout(() => {
                return router.push({ name: 'login' });
              }, 4000);
            }
          })
      } catch (error) {
        if (error.status !== 200) {
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
  },

  validations() {
    return {
      form: {
        name: {
          required, name_validation: {
            $validator: validName,
            $message: 'Invalid Name. Valid name only contain letters, dashes (-) and spaces'
          }
        },
        email: { required, email },
        password: { required, min: minLength(6) },
        confirmPassword: {
          required, sameAsPassword: sameAs('password'), check_Password: {
            $validator: checkPassword,
            $message: 'Non-match password!'
          }
        },
        phone: { required, Number }
      },
    }
  },
}
</script>