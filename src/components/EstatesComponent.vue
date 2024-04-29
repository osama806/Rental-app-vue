<template>
  <div class="estate">
    <section>
      <div v-if="isLoading" class="container-fluid position-absolute" style="top: 50vh">
        <div class="spinner-border text-info position-absolute " role="status" style="left: 50vw;">
          <span class="visually-hidden">Loading...</span>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="col-lg-4 col-md-6 col-sm-10 " v-for="estate in estates" :key="estate.id">
            <div class="card my-2">
              <div class="card-header bg-body-secondary   ">
                <router-link :to="`/estate/${estate.id}`" class="text-decoration-none ">
                  <h3 class="card-title">{{ estate.type }}</h3>
                </router-link>
              </div>
              <div class="card-body">
                <h3> <span class="text-warning">Number of beds:</span> {{ estate.beds }}</h3>
                <h4> <span class="text-warning">Price:</span> ${{ estate.price }}</h4>
                <h4> <span class="text-warning">Reserve:</span> {{ estate.reserved }}</h4>
                <h4> <span class="text-warning">Rent:</span> {{ estate.rented }}</h4>
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
export default {
  data() {
    return {
      estates: [],
      isLoading: false
    }
  },
  async mounted() {
    this.isLoading = true
    try {
      await fetch("https://osama1410.infinityfreeapp.com/api/estates", {
        method: 'GET',
        mode: 'cors'
      })
        .then(res => res.json())
        .then(data => {
          this.isLoading = false
          this.estates = data.data.estates
        })
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: error.message,
        text: 'Later try!'
      })
      this.isLoading = false
    }
  }
}
</script>