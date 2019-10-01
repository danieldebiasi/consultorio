<template>
  <div>
    <v-dialog v-model="dialog" persistent scrollable max-width="720px">
      <template v-slot:activator="{ on }">
        <v-icon small class="mr-3" v-on="on">visibility</v-icon>
      </template>
      <v-card>
        <v-card-title class="primary headline">
          <v-icon dark left>person</v-icon>
          <span class="white--text">Dados do paciente</span>
          <v-spacer></v-spacer>
          <v-btn flat round dark @click="isEditing = !isEditing">
            <v-icon left>edit</v-icon>
            <span>Editar</span>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-container grid-list-md>
              <v-layout row wrap>
                <v-flex xs8>
                  <v-text-field :disabled="!isEditing" v-model="paciente.nome" label="Nome completo" clearable required></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :disabled="!isEditing" v-model="paciente.convenio" label="Convênio" clearable required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap align-center>
                <v-flex xs4>
                  <v-text-field :disabled="!isEditing" v-model="paciente.cpf" label="CPF" clearable required></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :disabled="!isEditing" v-model="paciente.rg" label="RG" clearable required></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-menu :disabled="!isEditing" v-model="datePickerMenu" offset-y :close-on-content-click="false">
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        :disabled="!isEditing"
                        v-model="formattedDate"
                        v-on="on"
                        label="Data de nascimento"
                        readonly
                      ></v-text-field>
                    </template>
                    <v-date-picker
                      :disabled="!isEditing"
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
                  <v-checkbox :disabled="!isEditing" label="Possui responsável?" v-model="ageCheckbox" color="primary"></v-checkbox>
                </v-flex>
                <v-flex xs8 v-if="ageCheckbox">
                  <v-text-field
                    :disabled="!isEditing"
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
                  <v-text-field :disabled="!isEditing" v-model="paciente.email" label="Email" clearable required></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :disabled="!isEditing" v-model="paciente.telefone" label="Telefone" clearable required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field :disabled="!isEditing" v-model="paciente.endereco" label="Endereço" clearable required></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field :disabled="!isEditing" v-model="paciente.cidade" label="Cidade" clearable required></v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-select :disabled="!isEditing" v-model="paciente.uf" :items="states" label="UF"></v-select>
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
                  <v-text-field :disabled="!isEditing" v-model="paciente.profissao" label="Profissão" clearable></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field :disabled="!isEditing" v-model="paciente.estadoCivil" label="Estado civil" clearable></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <ViewQuestionarios :pacienteData="originalPaciente" />
          <v-spacer></v-spacer>
          <v-btn flat @click="restoreData">Voltar</v-btn>
          <v-btn color="success" :disabled="!isEditing" @click="createPaciente">Salvar</v-btn>
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
import ViewQuestionarios from '@/components/ViewQuestionarios';

export default {
  components: { ViewQuestionarios },
  props: ["pacienteData"],
  data() {
    return {
      isEditing: false,
      originalPaciente: this.pacienteData,
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
      this.dialog = false;
      this.$eventHub.$emit('updatePacientes');
    },
    createPaciente() {
      console.log(this.paciente);
    },
    verifyFields(data) {
      return (data.nome && data.convenio && data.cpf && data.rg && data.dataNascimento
              && data.email && data.telefone && data.endereco && data.cidade && data.uf);
    },
    notify(message) {
      this.message = message;
      this.snackbar = true;
    },
    restoreData() {
      this.paciente.nome = this.originalPaciente.nome;
      this.paciente.convenio = this.originalPaciente.convenio;
      this.paciente.cpf = this.originalPaciente.cpf;
      this.paciente.rg = this.originalPaciente.rg;
      this.paciente.dataNascimento = this.originalPaciente.datanascimento;
      this.paciente.responsavel = this.originalPaciente.responsavel;
      this.paciente.email = this.originalPaciente.email;
      this.paciente.telefone = this.originalPaciente.telefone;
      this.paciente.endereco = this.originalPaciente.endereco;
      this.paciente.cidade = this.originalPaciente.cidade;
      this.paciente.uf = this.originalPaciente.uf;
      this.paciente.profissao = this.originalPaciente.profissao;
      this.paciente.estadoCivil = this.originalPaciente.estadoCivil;
      this.isEditing = false;
      this.dialog = false;
    }
  },
  computed: {
    formattedDate() {
      let split = this.paciente.dataNascimento.split("-");
      return `${split[2]}/${split[1]}/${split[0]}`;
    }
  },
  created() {
    this.restoreData();
  }
};
</script>