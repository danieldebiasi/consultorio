<template>
  <v-app>
    
    <Navbar />

    <v-content>

        <router-view class="ma-3"></router-view>      

    </v-content>

  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar';

export default {
  name: 'App',
  components: {Navbar},
  data () {
    return {
      //
    }
  }
}

</script>

<style>

  a {
    text-decoration: none;
  }

</style>
