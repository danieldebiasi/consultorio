<template>
  <div>
    <v-container fluid>
      <v-layout row wrap v-if="!consulta">
        <v-flex xs12>
          <v-alert 
            :value="true" 
            color="error" 
            icon="warning" 
            outline>
            Nenhuma consulta ativa no momento!
          </v-alert>
        </v-flex>
      </v-layout>

      <v-layout row wrap align-center v-if="consulta">
        <v-flex xs12>
          <h2 class="headline font-weight-light">Dados do paciente</h2>
        </v-flex>
        <v-flex xs5 my-2>
          <!-- <v-card class="mr-2">
            <p>Nome</p>
            <p>Nome</p>
            <p>Nome</p>
          </v-card> -->
        </v-flex>
        <v-flex xs4 my-2>
          <!-- <v-card class="mx-2">
            <p>Histórico</p>
          </v-card> -->
        </v-flex>
        <v-flex xs3 my-2 class="text-xs-right">
          <v-btn round color="success">
            <v-icon left>check_circle</v-icon>
            <span>Encerrar consulta</span>
          </v-btn>
        </v-flex>
        <v-flex xs12>
          <v-card>
            <Odontograma />
          </v-card>   
        </v-flex>
        <v-flex d-flex xs12 mt-3>
          <v-card class="pa-1">
            <v-textarea
            class="ma-2"
            name="observacoes"
            label="Observações da consulta"
          ></v-textarea>
          </v-card>
        </v-flex>
      </v-layout>

      
         
    </v-container>
  </div>
</template>

<script>
import Odontograma from "@/components/Odontograma";

export default {
  components: { Odontograma },
  data() {
    return {
      consulta: true
    };
  },
  methods: {}
};
</script>
