<template>
  <div>
    <v-dialog v-model="dialog" persistent scrollable max-width="720px">
      <template v-slot:activator="{ on }">
        <v-btn round color="success" v-on="on">
          <v-icon left>add_circle</v-icon>
          <span>Novo paciente</span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="primary headline">
          <v-icon dark left>person</v-icon>
          <span class="white--text">Novo paciente</span>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs8>
                  <v-text-field v-model="paciente.nome" label="Nome completo" clearable required></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field v-model="paciente.convenio" label="Convênio" clearable required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap align-center>
                <v-flex xs4>
                  <v-text-field v-model="paciente.cpf" label="CPF" clearable required></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field v-model="paciente.rg" label="RG" clearable required></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-menu v-model="datePickerMenu" offset-y :close-on-content-click="false">
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="formattedDate"
                        v-on="on"
                        label="Data de nascimento"
                        readonly
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      color="primary"
                      v-model="paciente.dataNascimento"
                      @input="datePickerMenu = false"
                      locale="pt-br"
                    ></v-date-picker>
                  </v-menu>
                </v-flex>
              </v-layout>
              <v-layout row wrap align-center>
                <v-flex xs4>
                  <v-checkbox label="Possui responsável?" v-model="ageCheckbox" color="primary"></v-checkbox>
                </v-flex>
                <v-flex xs8 v-if="ageCheckbox">
                  <v-text-field
                    v-model="paciente.responsavel"
                    label="Nome do responsável"
                    clearable
                    required
                  ></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap mt-3>
                <v-flex xs12 class="text-xs-center">
                  <span class="grey--text">Contato</span>
                  <v-divider class></v-divider>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs8>
                  <v-text-field v-model="paciente.email" label="Email" clearable required></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field v-model="paciente.telefone" label="Telefone" clearable required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field v-model="paciente.endereco" label="Endereço" clearable required></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field v-model="paciente.cidade" label="Cidade" clearable required></v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-select v-model="paciente.uf" :items="states" label="UF"></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap mt-3>
                <v-flex xs12 class="text-xs-center">
                  <span class="grey--text">Dados adicionais</span>
                  <v-divider class></v-divider>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field v-model="paciente.profissao" label="Profissão" clearable></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field v-model="paciente.estadoCivil" label="Estado civil" clearable></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="dismiss">Cancelar</v-btn>
          <v-btn color="success" @click="createPaciente">Cadastrar</v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar v-model="snackbar" :timeout="4500" color="warning" top>
        <v-icon dark left>warning</v-icon>
        {{ message }}
        <v-btn flat @click.native="snackbar = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import paths from "@/paths";

export default {
  props: ["formContext"],
  data() {
    return {
      context: this.formContext,
      paciente: {
        nome: null,
        convenio: null,
        cpf: null,
        rg: null,
        dataNascimento: new Date().toISOString().substr(0, 10),
        responsavel: "",
        email: null,
        telefone: null,
        endereco: null,
        cidade: null,
        uf: null,
        profissao: "",
        estadoCivil: ""
      },
      dialog: false,
      message: "",
      ageCheckbox: false,
      datePickerMenu: false,
      snackbar: "",
      states: [
        "AC",
        "AL",
        "AM",
        "AP",
        "BA",
        "CE",
        "DF",
        "ES",
        "GO",
        "MA",
        "MT",
        "MS",
        "MG",
        "PA",
        "PB",
        "PR",
        "PE",
        "PI",
        "RJ",
        "RN",
        "RS",
        "RO",
        "RR",
        "SC",
        "SP",
        "SE",
        "TO"
      ]
    };
  },
  methods: {
    dismiss() {
      this.paciente.nome = null;
      this.paciente.convenio = null;
      this.paciente.cpf = null;
      this.paciente.rg = null;
      this.paciente.dataNascimento = new Date().toISOString().substr(0, 10);
      this.paciente.responsavel = "";
      this.paciente.email = null;
      this.paciente.telefone = null;
      this.paciente.endereco = null;
      this.paciente.cidade = null;
      this.paciente.uf = null;
      this.paciente.profissao = "";
      this.paciente.estadoCivil = "";
      this.dialog = false;
    },
    createPaciente() {
      Promise.all([
        new Promise((resolve, reject) => {
          let data = this.paciente;
          if (this.verifyFields(data)) {
            axios
              .post(paths.pacientes.create, JSON.stringify(data))
              .then(response => {
                resolve();
              })
              .catch(error => {
                reject("Falha ao cadastrar paciente!");
              });
          } else {
            reject("Preencha todos os campos obrigatórios!");
          }
        })
      ])
      .then((response) => {
        this.$eventHub.$emit('updatePacientes');
        this.dismiss();
      })
      .catch((error) => {
        this.notify(error);
      });
    },
    verifyFields(data) {
      return (data.nome && data.convenio && data.cpf && data.rg && data.dataNascimento
              && data.email && data.telefone && data.endereco && data.cidade && data.uf);
    },
    notify(message) {
      this.message = message;
      this.snackbar = true;
    }
  },
  computed: {
    formattedDate() {
      let split = this.paciente.dataNascimento.split("-");
      return `${split[2]}/${split[1]}/${split[0]}`;
    }
  }
};
</script>