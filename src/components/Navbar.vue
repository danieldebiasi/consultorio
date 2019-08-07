<template>
  <div>
    <v-toolbar clipped-left app>
      <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase">
        <router-link to="/">
          <v-layout row wrap>
            <img class="mr-2 hidden-xs-only" width="20px" height="28px" src="../assets/tooth.svg" />
            <span class="grey--text font-weight-light">Meu</span>
            <span class="primary--text text--lighten-1 font-weight-medium">Consultório</span>
          </v-layout>
        </router-link>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn flat color="grey">
        <span>Sair</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer clipped app dark v-model="drawer" class="primary elevation-3">
      <v-card color="primary">
        <v-layout row wrap>
          <v-flex xs12 class="text-xs-right">
            <v-btn fab flat @click="drawer = !drawer">
          <v-icon>keyboard_arrow_left</v-icon>
        </v-btn>
          </v-flex>
        </v-layout>
        
        <v-layout row wrap pl-4 pr-4 pb-4>
          <v-flex xs12>
            <v-layout row wrap>
              <v-flex xs12 class="text-xs-center">
                <v-icon>person</v-icon>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 class="text-xs-center">
                <span class="subheading font-weight-medium">{{this.username}}</span>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 mt-3 class="text-xs-center">
            <v-layout row wrap>
              <v-flex xs12>
                <span class="font-weight-black">Acesso: </span>
                <span>{{this.now.date}} | </span>
                <span>{{this.now.time}}</span>
              </v-flex>
              <v-flex xs12>
                <span class="font-weight-black">Nível: </span>
                <span>{{this.userLevel}}</span>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>

      <v-divider dark></v-divider>

      <v-list>
        <v-list-tile
          v-for="tile in this.tiles"
          :key="tile.text"
          router
          :to="tile.route"
          active-class="primary lighten-1"
        >
          <v-list-tile-action left>
            <v-icon>{{ tile.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title class="subheading">{{ tile.text }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { getNow } from "@/util/util";

export default {
  data() {
    return {
      drawer: false,
      tiles: [
        { icon: "lock", text: "Login", route: "/login" },
        { icon: "calendar_today", text: "Agenda", route: "/" },
        { icon: "schedule", text: "Consulta", route: "/consulta" },
        { icon: "person", text: "Pacientes", route: "/pacientes" },
        { icon: "assignment", text: "Questionários", route: "/questionarios" },
        { icon: "settings", text: "Configurações", route: "/configuracoes" }
      ],
      username: "Usuário",
      now: "",
      userLevel: "Administrador"
    };
  },
  methods: {
    goToHomepage() {
      this.$router.push("/");
    }
  },
  created() {
    let today = getNow();
    today.date = today.date
      .split("-")
      .reverse()
      .join("/");
    this.now = today;
    console.log("Today: " + today);
    console.log("Now: " + this.now);
  }
};
</script>