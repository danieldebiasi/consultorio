<template>
  <div>
    <v-container fluid>
      <v-layout row wrap v-if="!this.$state.session.consulta.isActive">
        <v-flex xs12>
          <v-alert
            :value="true"
            color="error"
            icon="warning"
            outline
          >Nenhuma consulta ativa no momento!</v-alert>
        </v-flex>
      </v-layout>

      <v-layout row wrap align-center v-if="this.$state.session.consulta.isActive">
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
                  :value="this.$state.session.consulta.person.nome" 
                  readonly
                ></v-text-field>
                <v-text-field
                  label="Convênio"
                  prepend-icon="local_hospital"
                  :value="this.$state.session.consulta.person.convenio"
                  readonly
                ></v-text-field>
              </v-flex>
              <v-flex xs3 my-1 pr-5>
                <v-text-field
                  label="Data de nascimento"
                  prepend-icon="event"
                  :value="formatDate(this.$state.session.consulta.person.datanascimento)"
                  readonly
                ></v-text-field>
                <v-text-field
                  label="Telefone"
                  prepend-icon="phone"
                  :value="this.$state.session.consulta.person.telefone"
                  readonly
                ></v-text-field>
              </v-flex>
              <v-flex xs4 my-1 pr-2>
                <v-text-field
                  label="Email"
                  prepend-icon="email"
                  :value="this.$state.session.consulta.person.email"
                  readonly
                ></v-text-field>
                <v-text-field
                  label="Endereço"
                  prepend-icon="home"
                  :value="this.$state.session.consulta.person.endereco"
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
                <v-icon left dark>warning</v-icon>
                <span class="white--text">Desfazer consulta?</span>
              </v-card-title>
              <v-card-text>Ao desfazer a consulta, as marcações e anotações serão perdidas. A consulta poderá ser aberta novamente ou cancelada através da agenda.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="desfazerDialog = false">Cancelar</v-btn>
                <v-btn color="error" @click="undo">Desfazer Consulta</v-btn>
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
                <v-btn color="success" @click="finish">Encerrar Consulta</v-btn>
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
  methods: {
    formatDate(date) {
      let split = date.split("-");
      return `${split[2]}/${split[1]}/${split[0]}`;
    },
    finish() {
      this.desfazerDialog = false;
      this.$state.$emit('clearConsulta');
      this.$router.push('/');
    },
    undo() {
      this.desfazerDialog = false;
      this.$state.$emit('clearConsulta');
      this.$router.push('/');
    }
  },
  created() {
    if(!this.$state.session.isActive) {
      this.$router.push('/login');
    } else {
        if(!this.$state.session.user.roles.consulta){
        this.$state.$emit('logout');
        this.$router.push('/login');
      }
    }
  }
};
</script>
