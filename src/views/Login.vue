<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center mt-5>
        <v-flex xs4>
          <v-card class="elevation-20">
            <v-toolbar color="primary" class="text-uppercase" flat>
              <v-spacer></v-spacer>
              <img class="mr-2 hidden-xs-only" width="20px" height="28px" src="../assets/tooth.svg" />
              <span class="grey--text text--lighten-2 font-weight-light">Meu</span>
              <span class="white--text text--lighten-1 font-weight-medium">Consultório</span>
              <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  v-model="username"
                  name="username"
                  label="Nome de usuário"
                  prepend-icon="person"
                  type="text"
                  @keypress.enter="login"
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  name="password"
                  label="Senha"
                  prepend-icon="lock"
                  :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                  @click:append="showPassword = !showPassword"
                  :type="showPassword ? 'text' : 'password'"
                  @keypress.enter="login"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="login">
                <span>Entrar</span>
                <v-icon right>input</v-icon>
              </v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>

      <v-snackbar v-model="snackbar" :timeout="4500" color="error" top>
        <v-icon dark left>error</v-icon>
        {{ message }}
        <v-btn flat @click.native="snackbar = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import paths from "@/paths";
import { reject } from "q";
import CryptoJS from "crypto-js";

export default {
  data() {
    return {
      username: "",
      password: "",
      showPassword: false,
      snackbar: false,
      message: ""
    };
  },
  methods: {
    notify(message) {
      this.message = message;
      this.snackbar = true;
    },
    login() {
      const username = this.username;
      const password = CryptoJS.MD5(this.password).toString();

      Promise.all([
        new Promise((resolve, reject) => {
          //Check user credentials
          axios
            .post(
              paths.users.checkUserCredentials,
              JSON.stringify({ username: username, password: password })
            )
            .then(response => {
              if (response.data.status == 200) {
                resolve(response.data.authenticatedUser);
              } else {
                switch (response.data.status) {
                  case 401:
                    reject("Usuário ou senha incorretos!");
                    break;
                
                  default:
                    reject("Falha ao comunicar com servidor!");
                    break;
                }
              }
            })
            .catch(error => {
              console.info(error);
            });
        }),
        new Promise((resolve, reject) => {
          //Get user roles
          axios
            .post(
              paths.users.getUserRoles,
              JSON.stringify({ username: username })
            )
            .then(response => {
              resolve(response.data);
            })
            .catch(error => {
              console.error(error);
            });
        })
      ])
        .then(response => {
          const authenticatedUser = response[0];
          const userRoles = response[1];
          this.$state.$emit("user-authenticated", authenticatedUser, userRoles);
          this.$router.push("/");
        })
        .catch(error => {
          this.notify(error);
        });
    }
  }
};
</script>
