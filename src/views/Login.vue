<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
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
                ></v-text-field>
                <v-text-field
                  v-model="password"
                  name="password"
                  label="Senha"
                  prepend-icon="lock"
                  type="password"
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
    </v-container>
  </div>
</template>

<script>
import axios from "axios";
import paths from "@/paths";
import { reject } from "q";
import CryptoJS from 'crypto-js';

export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  methods: {
    login() {
      const username = this.username;
      const password = CryptoJS.MD5(this.password).toString();

      Promise.all([
        new Promise((resolve, rejected) => {
          //Check user credentials
          axios
            .post(
              paths.users.checkUserCredentials,
              JSON.stringify({ username: username, password: password })
            )
            .then(response => {
              console.log("CRED DATA: ", response.data);
              if(response.data.status == 200) {
                resolve(response.data.authenticatedUser);
              } else {
                const errorStatus = (response.data.status == 401) ? "Unauthorized" : "Internal server error";
                throw new Error(errorStatus);
              }
            })
            .catch(error => {
              console.error(error);
            });
        }),
        new Promise((resolve, rejected) => {
          //Get user roles
          axios
            .post(
              paths.users.getUserRoles,
              JSON.stringify({ username: username })
            )
            .then(response => {
              console.log("ROLES DATA: ", response.data);
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
          console.error(error);
        });
    }
  }
};
</script>
