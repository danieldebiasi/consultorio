<template>
  <div>
    <v-dialog v-model="dialog" persistent max-width="720px">
      <template v-slot:activator="{ on }">
        <v-btn round color="success" v-on="on">
          <v-icon left>add_circle</v-icon>
          <span>Agendar consulta</span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline primary">
          <v-icon dark left>event_available</v-icon>
          <span class="white--text">Agendar consulta</span>
        </v-card-title>
        <v-card-text>
          <ActionConsulta :isDisabled="false" />
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="dialog = false">Cancelar</v-btn>
          <v-btn color="success" @click="dialog = false">Agendar</v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar
        v-model="snackbar"
        :timeout="3500"
        color="warning"
        top
      >
        {{ message }}
        <v-btn flat @click.native="snackbar = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-dialog>
  </div>
</template>

<script>
import { subtractHours } from '@/util/util.js';
import ActionConsulta from '@/components/ActionConsulta';

export default {
  components: { ActionConsulta },
  data() {
    return {
      dialog: false,
      message: "",
      snackbar: false
    };
  }
};
</script>
