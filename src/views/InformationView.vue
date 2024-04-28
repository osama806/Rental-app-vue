<template>
  <div class="myInfo">
    <div v-if="isLoading" class="container-fluid position-absolute" style="top: 50vh">
      <div class="spinner-border text-info position-absolute " role="status" style="left: 50vw;">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="container row mx-auto p-0">
      <div class="col-lg-12  col-md-12 col-sm-12 ">
        <div class="card my-2" v-if="!isLoading">
          <div class="card-header bg-body-secondary">
            <h3 class="card-title">Id: {{ info.id }}</h3>
          </div>
          <div class="card-body">
            <h3> <span class="text-warning">Name:</span> {{ info.name }}</h3>
            <h4> <span class="text-warning">Email:</span> {{ info.email }}</h4>
            <h4> <span class="text-warning">Phone:</span> {{ info.phone }}</h4>
            <h4> <span class="text-warning">Current balance:</span> ${{ info.balance }}</h4>
            <h4> <span class="text-warning">Reservations:</span></h4>
            <div class="lists d-flex row mx-1">
              <ul class="col-lg-4 col-md-6 list-group mb-2" v-for="reserve in info.my_reservations">
                <li class="list-group-item active ">Id: {{ reserve.id }}</li>
                <li class="list-group-item ">Estate id: {{ reserve.estate_id }}</li>
                <li class="list-group-item ">Reservation deposit: ${{ reserve.reservation_deposit }}</li>
                <li class="list-group-item ">Expired date: {{ reserve.expired_date }}</li>
              </ul>
            </div>
            <h4 class="mt-3"><span class="text-warning">Contracts:</span></h4>
            <div class="lists d-flex row mx-1">
              <ul class="col-lg-4 col-md-6 list-group mb-2" v-for="contract in info.my_contracts">
                <li class="list-group-item active ">Id: {{ contract.id }}</li>
                <li class="list-group-item ">Estate id: {{ contract.estate_id }}</li>
                <li class="list-group-item ">Price: ${{ contract.price }}</li>
                <li class="list-group-item ">Expired date: {{ contract.expired_date }}</li>
                <li class="list-group-item ">Extension: {{ contract.extension }}</li>
              </ul>
            </div>
            <hr class="my-5">
            <h2 class="mt-0 text-center ">Change Current Password</h2>
            <div class="row">
              <form class="d-flex justify-content-center" @click.prevent>
                <fieldset class="border border-2 p-2 w-50">
                  <div class="form-group my-2 ">
                    <label for="pass" class="form-label">New password:</label>
                    <input type="password" id="pass" v-model="password" class="form-control" required>
                  </div>
                  <div class="form-group my-2 ">
                    <label for="conf" class="form-label">Confirm password</label>
                    <input type="password" id="conf" v-model="confirmPassword" class="form-control" required>
                  </div>
                  <div class="btn-label d-flex justify-content-center ">
                    <button type="submit" class="btn btn-primary" @click="new_password()">Change password</button>
                  </div>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/http-common'
import router from '@/router'

export default {
  data() {
    return {
      isLoading: false,
      info: [],
      password: '',
      confirmPassword: ''
    }
  },
  methods: {
    async new_password() {
      if (this.password !== this.confirmPassword) {
        Swal.fire({
          icon: 'warning',
          title: "Password confirmation is wrong!",
          text: 'Rewrite password again, please!',
        })
        return;
      }
      if (this.password == "" || this.confirmPassword == "") {
        Swal.fire({
          icon: 'warning',
          title: "Tow fields is required",
        })
        return;
      }
      if (this.password.length < 6 || this.confirmPassword.length < 6) {
        Swal.fire({
          icon: 'warning',
          title: "Password length less than 6 characters",
        })
        return;
      }
      try {
        await axios.post("/change_password", {
          password: this.password,
          password_confirmation: this.confirmPassword
        }, {
          headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
          }
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
                this.password = ''
                this.confirmPassword = ''
              }, 3000);
            }
          })

      } catch (error) {
        if (error.response.status == 401) {
          Swal.fire({
            icon: 'error',
            title: error.response.data.msg ? error.response.data.msg : error.response.data.message,
            text: 'Please login!',
            showConfirmButton: false,
            timer: 2000
          })
          setTimeout(() => {
            return router.push({ name: 'login' })
          }, 3000);
        }
        else {
          Swal.fire({
            icon: 'error',
            title: error.response.data.msg ? error.response.data.msg : error.response.data.message,
            text: 'Later try!',
          })
        }
      }
    }
  },
  async mounted() {
    this.isLoading = true
    try {
      await axios.get("/myInformation", {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
      })
        .then(res => {
          this.isLoading = false
          this.info = res.data.info
        })
    } catch (error) {
      if (error.response.status == 401) {
        Swal.fire({
          icon: 'error',
          title: error.response.data.msg ? error.response.data.msg : error.response.data.message,
          text: 'Please login!',
          showConfirmButton: false,
          timer: 2000
        })
        setTimeout(() => {
          return router.push({ name: 'login' })
        }, 3000);
      } else {
        Swal.fire({
          icon: 'error',
          title: error.response.data.msg ? error.response.data.msg : error.response.data.message,
          text: 'Later try!',
          showConfirmButton: false,
          timer: 3000
        })

      }
    }
  },
}
</script>