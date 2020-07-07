<template>
  <div>
    <v-dialog v-model="dialog" persistent scrollable max-width="720px">
      <template v-slot:activator="{ on }">
        <v-icon small class="mr-3" v-on="on">visibility</v-icon>
      </template>
      <v-card>
        <v-card-title class="primary headline">
          <v-icon dark left>perm_identity</v-icon>
          <span class="white--text">Visualizar usuário</span>
          <v-spacer></v-spacer>
          <v-btn flat round dark @click="isEditing = !isEditing">
            <v-icon left>edit</v-icon>
            <span>Editar</span>
          </v-btn>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field :disabled="!isEditing" label="Nome" v-model="usuario.name"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap my-3>
            <v-flex xs12 class="text-xs-center">
              <span class="grey--text">Credenciais de acesso</span>
              <v-divider class></v-divider>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs6 pr-2>
              <v-text-field :disabled="!isEditing" label="Usuário" v-model="usuario.username"></v-text-field>
            </v-flex>
            <v-flex xs6 pl-2>
              <v-text-field
                label="Senha"
                v-model="usuario.password"
                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"
                :disabled="!isEditing"
              ></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap align-center>
            <v-flex xs6 pr-2>
              <v-select :disabled="!isEditing" :items="types" v-model="usuario.userType" label="Tipo de usuário"></v-select>
            </v-flex>
            <v-flex xs5 pl-2 v-if="usuario.userType != 'Administrador'">
              <v-checkbox
                label="Permitir editar/deletar?"
                v-model="usuario.isAdmin"
                color="primary" 
                :disabled="!isEditing"
              ></v-checkbox>
            </v-flex>
            <v-flex xs1 :disabled="!isEditing" class="text-xs-left" v-if="usuario.userType != 'Administrador'">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-icon color="warning" v-on="on">help</v-icon>
                </template>
                <span>Permitir editar e deletar informações no sistema</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
          <v-layout row wrap my-3>
            <v-flex xs12 class="text-xs-center">
              <span class="grey--text">Acessos</span>
              <v-divider class></v-divider>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs6>
              <v-checkbox :disabled="!isEditing" label="Consulta" v-model="usuario.allowConsulta" color="primary"></v-checkbox>
            </v-flex>
            <v-flex xs6>
              <v-checkbox :disabled="!isEditing" label="Pacientes" v-model="usuario.allowPacientes" color="primary"></v-checkbox>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs6>
              <v-checkbox
                label="Questionários"
                v-model="usuario.allowQuestionarios"
                color="primary" 
                :disabled="!isEditing"
              ></v-checkbox>
            </v-flex>
            <v-flex xs6>
              <v-checkbox
                label="Configurações"
                v-model="usuario.allowConfiguracoes"
                color="primary"
                :disabled="!isEditing"
              ></v-checkbox>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="dismiss">Voltar</v-btn>
          <v-btn color="success" :disabled="!isEditing" @click="createUsuario">Salvar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <v-snackbar v-model="snackbar" :timeout="4500" color="warning" top>
      <v-icon dark left>warning</v-icon>
      {{ message }}
      <v-btn flat @click.native="snackbar = false">
        <v-icon>close</v-icon>
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import axios from "axios";
import paths from "@/paths";
import CryptoJS from "crypto-js";

export default {
  data() {
    return {
      dialog: false,
      isEditing: false,
      usuario: {
        name: "",
        username: "",
        password: "",
        isAdmin: false,
        allowConsulta: false,
        allowPacientes: false,
        allowQuestionarios: false,
        allowConfiguracoes: false,
        userType: ""
      },
      showPassword: false,
      types: ["Administrador", "Auxiliar", "Dentista", "Outro"],
      snackbar: false,
      message: ""
    };
  },
  methods: {
    createUsuario() {
      let data = {
        username: this.usuario.username,
        name: this.usuario.name,
        password: CryptoJS.MD5(this.usuario.password).toString(),
        userType: this.usuario.userType,
        isAdmin: this.usuario.isAdmin ? 1 : 0,
        allowConsulta: this.usuario.allowConsulta ? 1 : 0,
        allowPacientes: this.usuario.allowPacientes ? 1 : 0,
        allowQuestionarios: this.usuario.allowQuestionarios ? 1 : 0,
        allowConfiguracoes: this.usuario.allowConfiguracoes ? 1 : 0
      };
      Promise.all([
        new Promise((resolve, reject) => {
          console.log("DATA SENT: ", data);
          if (this.verifyFields(data)) {
            axios
              .post(paths.usuarios.create, JSON.stringify(data))
              .then(response => {
                console.log("Data returned: ", response.data);
                resolve();
              })
              .catch(error => {
                reject();
              });
          } else {
            reject("Preencha todos os campos obrigatórios!");
          }
        })
      ])
        .then(response => {
          this.$eventHub.$emit("updateUsuarios");
          this.dismiss();
        })
        .catch(error => {
          this.notify(error);
        });
    },
    clearFields() {
      this.name = "";
      this.username = "";
      this.password = "";
      this.userType = "";
      this.isAdmin = false;
      this.allowAgenda = false;
      this.allowConsulta = false;
      this.allowPacientes = false;
      this.allowQuestionarios = false;
      this.allowConfiguracoes = false;
    },
    verifyFields(data) {
      return data.name && data.username && data.password && data.userType;
    },
    dismiss() {
      this.clearFields();
      this.dialog = false;
    },
    notify(message) {
      this.message = message;
      this.snackbar = true;
    }
  }
};
</script>