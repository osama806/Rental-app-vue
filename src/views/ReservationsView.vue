<template>
  <div class="reservations">
    <div v-if="isLoading" class="container-fluid position-absolute" style="top: 50vh">
      <div class="spinner-border text-info position-absolute " role="status" style="left: 50vw;">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    <div class="container row mx-auto p-0">
      <div class="col-lg-4 col-md-6 col-sm-10 " v-for="reserve in reservations" :key="reserve.id">
        <div class="card my-2">
          <div class="card-header bg-body-secondary   ">
            <h3 class="card-title">Reservation id: {{ reserve.id }}</h3>
          </div>
          <div class="card-body">
            <h3> <span class="text-warning">Estate id:</span> {{ reserve.estate_id }}</h3>
            <h4> <span class="text-warning">Reservation deposit:</span> ${{ reserve.reservation_deposit }}</h4>
            <h4> <span class="text-warning">Expired date:</span> {{ reserve.expired_date }}</h4>
            <div class="form-group my-2">
              <button type="button" @click="create_contract(`${reserve.estate_id}`)" class="btn btn-primary pt-1">Create
                contract</button>
              <label for="extension" class="form-label mx-2">you want extension choise ?</label>
              <input type="checkbox" v-model="checked" id="extension" class="form-check-input "
                style="vertical-align: sub;" />
            </div>
            <div class="btn-label">
              <button type="button" class="btn btn-danger" @click="reservation_cancel(`${reserve.id}`)">Reservation
                canceled</button>
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
      reservations: []
    }
  },
  methods: {
    async reservation_cancel(reservationId) {
      try {
        await axios.post(`/reserveCancel/${reservationId}`, {}, {
          headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
          }
        })
          .then(res => {
            if (res.status == 200) {
              Swal.fire({
                icon: 'success',
                title: 'Reservation is canceled',
                text: 'Thank you for trying',
                showConfirmButton: false,
                timer: 2000
              })
              setTimeout(() => {
                return router.push({ name: 'home' })
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
            showConfirmButton: false,
            timer: 2500
          })
          setTimeout(() => {
            return router.back()
          }, 3500);
        }
      }
    },
    async create_contract(estateId) {
      let selected = "no";
      if (this.checked) {
        selected = "yes"
      } else {
        selected = "no"
      }
      try {
        await axios.post("/createContract", {
          estate_id: `${estateId}`,
          extension: selected
        }, {
          headers: {
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`
          }
        })
          .then(res => {
            if (res.status == 200) {
              Swal.fire({
                icon: 'success',
                title: 'Contract is done',
                text: 'You have one year period since now',
                showConfirmButton: false,
                timer: 2000
              })
              setTimeout(() => {
                return router.push({ name: 'home' })
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
            return router.push({ name: 'login' });
          }, 3000);
        }
        else {
          Swal.fire({
            icon: 'error',
            title: error.response.data.msg ? error.response.data.msg : error.response.data.message,
            text: 'Later try!'
          })
        }
      }
    }
  },
  async mounted() {
    this.isLoading = true
    try {
      await axios.get('/reservations', {
        headers: {
          "Authorization": `Bearer ${sessionStorage.getItem("token")}`
        }
      })
        .then(res => {
          if (res.status == 200) {
            this.isLoading = false
            this.reservations = res.data.reservations
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
          showConfirmButton: false,
          timer: 2000
        })
        setTimeout(() => {
          return router.back()
        }, 3500);
      }
    }
  },
}
</script>