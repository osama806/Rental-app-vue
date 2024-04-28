<template>
  <div class="home">
    <estates-component></estates-component>
  </div>
</template>

<script>
import EstatesComponent from '@/components/EstatesComponent'
export default {
  name: 'HomeView',
  components: {
    EstatesComponent,
  }
}
</script>
