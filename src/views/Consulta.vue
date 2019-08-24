<template>
  <div>
    <v-container fluid>
      <v-layout row wrap v-if="!consulta">
        <v-flex xs12>
          <v-alert
            :value="true"
            color="error"
            icon="warning"
            outline
          >Nenhuma consulta ativa no momento!</v-alert>
        </v-flex>
      </v-layout>

      <v-layout row wrap align-center v-if="consulta">
        <v-flex xs12>
          <v-card>
            <v-card-title class="primary">
              <v-icon dark left>assignment</v-icon>
              <h2 class="headline white--text">Dados do paciente</h2>
            </v-card-title>

            <v-layout row wrap align-center pa-3>
              <v-flex xs5 my-1 pr-5>
                <v-text-field 
                  label="Paciente" 
                  prepend-icon="person" 
                  value="João da Silva" 
                  readonly
                ></v-text-field>
                <v-text-field
                  label="Convênio"
                  prepend-icon="local_hospital"
                  value="SulAmérica Saúde"
                  readonly
                ></v-text-field>
              </v-flex>
              <v-flex xs3 my-1 pr-5>
                <v-text-field
                  label="Data de nascimento"
                  prepend-icon="event"
                  value="03/10/1970"
                  readonly
                ></v-text-field>
                <v-text-field
                  label="Telefone"
                  prepend-icon="phone"
                  value="(11) 99922-1002"
                  readonly
                ></v-text-field>
              </v-flex>
              <v-flex xs4 my-1 pr-2>
                <v-text-field
                  label="Email"
                  prepend-icon="email"
                  value="joaosilva70@gmail.com"
                  readonly
                ></v-text-field>
                <v-text-field
                  label="Endereço"
                  prepend-icon="home"
                  value="Rua Nossa Senhora de Fátima, 912 - apto 43"
                  readonly
                ></v-text-field>
              </v-flex>
            </v-layout>
          </v-card>
        </v-flex>
        <v-flex xs12 mt-3>
          <v-card>
            <Odontograma />
          </v-card>
        </v-flex>
        <v-flex d-flex xs12 mt-3>
          <v-card class="pa-1">
            <v-textarea class="ma-2" name="observacoes" label="Observações da consulta"></v-textarea>
          </v-card>
        </v-flex>
        <v-flex xs12 text-xs-right mt-3>
          <v-dialog
            v-model="desfazerDialog"
            persistent
            max-width="400"
            transition="dialog-transition"
          >
            <template v-slot:activator="{ on }">
              <v-btn round color="error" v-on="on">
                <v-icon left>cancel</v-icon>
                <span>Desfazer Consulta</span>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline primary">
                <v-icon left dark color="warning">warning</v-icon>
                <span class="white--text">Desfazer consulta?</span>
              </v-card-title>
              <v-card-text>Ao desfazer a consulta, as marcações e anotações serão perdidas. A consulta poderá ser aberta novamente ou cancelada através da agenda.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="desfazerDialog = false">Cancelar</v-btn>
                <v-btn color="error">Desfazer Consulta</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog
            v-model="encerrarDialog"
            persistent
            max-width="400"
            transition="dialog-transition"
          >
            <template v-slot:activator="{ on }">
              <v-btn round color="success" v-on="on">
                <v-icon left dark>check_circle</v-icon>
                <span>Encerrar consulta</span>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline primary">
                <v-icon left dark>info</v-icon>
                <span class="white--text">Encerrar consulta?</span>
              </v-card-title>
              <v-card-text>Ao encerrar não será mais possível realizar alterações nesta consulta.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="encerrarDialog = false">Cancelar</v-btn>
                <v-btn color="success">Encerrar Consulta</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
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
      consulta: true,
      encerrarDialog: false,
      desfazerDialog: false
    };
  },
  methods: {}
};
</script>
