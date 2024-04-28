<template>
  <div class="contracts">
    <section>
      <div v-if="isLoading" class="container-fluid position-absolute" style="top: 50vh">
        <div class="spinner-border text-info position-absolute " role="status" style="left: 50vw;">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div class="container row mx-auto p-0">
        <div class="col-lg-4 col-md-6 col-sm-10 " v-for="contract in contracts" :key="contract.id">
          <div class="card my-2">
            <div class="card-header bg-body-secondary   ">
              <h3 class="card-title">Contract id: {{ contract.id }}</h3>
            </div>
            <div class="card-body">
              <h4> <span class="text-warning">Owner:</span> {{ contract.owner_name }}</h4>
              <h3> <span class="text-warning">Estate id:</span> {{ contract.estate_id }}</h3>
              <h4> <span class="text-warning">Price:</span> ${{ contract.balance }}</h4>
              <h4> <span class="text-warning">Expired date:</span> {{ contract.expired_date }}</h4>
              <h4> <span class="text-warning">Extension:</span> {{ contract.extension }}</h4>
              <div class="btn-label mt-3 d-flex flex-column align-items-center ">
                <button type="button" class="btn btn-info w-75" @click="extensionToYear(`${contract.id}`)">
                  Extension for one year
                </button>
                <button type="button" class="btn btn-danger w-75 my-2" @click="early_delivery(`${contract.estate_id}`)">
                  Early delivery
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from '@/http-common'
import router from '@/router'
export default {
  data() {
    return {
      contracts: [],
      isLoading: false
    }
  },
  methods: {
    async early_delivery(estate_id) {
      try {
        await axios.get(`/earlyDelivery/${estate_id}`, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`
          }
        })
          .then(res => {
            if (res.status == 200) {
              Swal.fire({
                icon: 'success',
                title: res.data.msg,
                text: 'Thank you for the experience',
                showConfirmButton: false,
                timer: 2000
              })
              setTimeout(() => {
                return router.push({ name: 'home' })
              }, 3500);
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
          }, 3500);
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
    async extensionToYear(contractId) {
      try {
        await axios.get(`/extension/${contractId}`, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`
          }
        })
          .then(res => {
            if (res.status == 200) {
              Swal.fire({
                icon: 'success',
                title: res.data.msg,
                text: 'Enjoy this real-estate to another year since now',
                showConfirmButton: false,
                timer: 2000
              })
              setTimeout(() => {
                return router.push({ name: 'home' })
              }, 3500);
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
          }, 3500);
        }
        else {
          Swal.fire({
            icon: 'error',
            title: error.response.data.msg ? error.response.data.msg : error.response.data.message,
            text: 'Later try!',
            showConfirmButton: false,
            timer: 2000
          })
        }
      }
    }
  },
  async mounted() {
    this.isLoading = true
    try {
      await axios.get('/contracts', {
        headers: {
          'Authorization': `Bearer ${sessionStorage.getItem("token")}`
        }
      })
        .then((res) => {
          if (res.status == 200) {
            this.isLoading = false
            this.contracts = res.data.contracts
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
        }, 3500);
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