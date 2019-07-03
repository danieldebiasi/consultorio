<template>
  <div>
    <v-alert 
      :value="true" 
      color="error" 
      icon="warning" 
      outline>
      Nenhuma consulta ativa no momento!
    </v-alert>
    <v-card>
      <Odontograma />
    </v-card>
  </div>
</template>

<script>
import Odontograma from "@/components/Odontograma";

export default {
  components: { Odontograma },
  data() {
    return {};
  },
  methods: {}
};
</script>
