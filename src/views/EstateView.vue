<template>
  <div class="estate">
    <section>
      <div class="container">
        <div class="row">
          <div class="col">
            <div class="card my-2">
              <div class="card-header bg-warning">
                <h1 class="card-title text-white ">{{ this.estate.type }}</h1>
              </div>
              <div class="card-body">
                <h3><span class="text-warning">Owner name:</span> {{ this.estate.owner }} </h3>
                <h3><span class="text-warning">Broker name:</span> {{ this.estate.broker }}</h3>
                <h3><span class="text-warning">Number of beds:</span> {{ this.estate.beds }}</h3>
                <h3><span class="text-warning">Number of paths:</span> {{ this.estate.paths }}</h3>
                <h3><span class="text-warning">Address:</span> {{ this.estate.address }}</h3>
                <h3><span class="text-warning">State:</span> {{ this.estate.state }}</h3>
                <h3><span class="text-warning">Locality:</span> {{ this.estate.locality }}</h3>
                <h3><span class="text-warning">sub-Locality:</span> {{ this.estate.sub_locality }}</h3>
                <h3><span class="text-warning">Street name:</span> {{ this.estate.street_name }}</h3>
                <h4><span class="text-warning">Price:</span> ${{ this.estate.price }}</h4>
                <h4><span class="text-warning">Reserve:</span> {{ this.estate.reserved }}</h4>
                <h4><span class="text-warning">Rent:</span> {{ this.estate.rented }}</h4>
                <button type="button" class="btn btn-success pt-1 my-2" @click="create_reservation()">Create
                  reserve</button>
                <div class="form-group ">
                  <input type="checkbox" v-model="checked" id="extension" class="form-check-input"
                    style="vertical-align: sub;" />
                  <label for="extension" class="form-label ms-1">you want extension choise ?</label>
                  <button type="button" @click="create_contract()" class="btn btn-primary mx-2 pt-1">Create
                    contract</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from '@/http-common';
import router from '@/router';
export default {
  props: ['estateId'],
  data() {
    return {
      estate: [],
      checked: false
    }
  },
  methods: {
    async create_reservation() {
      try {
        await axios.post(`/reservation/${this.estateId}`, {}, {
          headers: {
            'Authorization': `Bearer ${sessionStorage.getItem("token")}`
          }
        })
          .then(res => {
            if (res.status == 200) {
              Swal.fire({
                icon: 'success',
                title: 'Reservation is done',
                text: 'You have week period to install reservation',
                showConfirmButton: false,
                timer: 2000
              })
              setTimeout(() => {
                return router.push({ name: 'home' });
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
    },

    async create_contract() {
      let selected = "no";
      if (this.checked) {
        selected = "yes"
      } else {
        selected = "no"
      }
      try {
        await axios.post("/createContract", {
          estate_id: `${this.estateId}`,
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
    await axios.get('/estate/' + this.estateId)
      .then(res => this.estate = res.data.estate)
  },
}
</script>