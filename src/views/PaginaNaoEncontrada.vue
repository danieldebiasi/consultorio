<template>
  <div>

    <v-scale-transition>
      <v-alert 
        v-show="show"
        type="warning" 
        :value="true"
        transition="scale-transition">
        <span class="headline">Página não encontrada ou inexistente.</span>
      </v-alert>
    </v-scale-transition>

  </div>
</template>

<script>
export default {
  data() {
    return {
      show: false
    }
  },
  mounted() {
    setTimeout(() => {
      this.show = true;
    }, 500);
  }
};
</script>
