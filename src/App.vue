<template>
  <navbar-component></navbar-component>
  <router-view />
</template>

<style>
body {
  background-color: gray;
}
</style>
<script>
import NavbarComponent from '@/components/NavbarComponent'

export default {
  components: {
    NavbarComponent
  },
}
</script>