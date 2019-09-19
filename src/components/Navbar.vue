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

      <v-dialog v-model="dialogLogout" persistent max-width="400" transition="dialog-transition">
        <template v-slot:activator="{ on }">
          <v-btn flat color="grey" v-on="on">
            <span>Sair</span>
            <v-icon right>exit_to_app</v-icon>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline primary">
            <v-icon left dark>info</v-icon>
            <span class="white--text">Deseja sair?</span>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn flat @click="dialogLogout = false">Cancelar</v-btn>
            <v-btn flat color="error" @click="logout">Sair</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
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
                <v-icon>perm_identity</v-icon>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12 class="text-xs-center">
                <span class="subheading font-weight-medium">{{this.$state.session.user.username}}</span>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 mt-3 class="text-xs-center">
            <v-layout row wrap>
              <v-flex xs12>
                <span class="font-weight-black">Acesso:&nbsp;</span>
                <span>{{this.now.date}} |&nbsp;</span>
                <span>{{this.now.time}}</span>
              </v-flex>
              <v-flex xs12>
                <span class="font-weight-black">Nível:&nbsp;</span>
                <span>{{this.$state.session.user.type}}</span>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>

      <v-divider dark></v-divider>

      <v-list>
        <div v-for="tile in this.tiles" :key="tile.text">
          <v-list-tile router :to="tile.route" v-if="tile.access" active-class="primary lighten-1">
            <v-list-tile-action left>
              <v-icon>{{ tile.icon }}</v-icon>
            </v-list-tile-action>

            <v-list-tile-content>
              <v-list-tile-title class="subheading">{{ tile.text }}</v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </div>
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
      dialogLogout: false,
      tiles: [
        //{ icon: "lock", text: "Login", route: "/login", access: true },
        {
          icon: "today",
          text: "Agenda",
          route: "/",
          access: true
        },
        {
          icon: "schedule",
          text: "Consulta",
          route: "/consulta",
          access: this.$state.session.user.roles.consulta
        },
        {
          icon: "person",
          text: "Pacientes",
          route: "/pacientes",
          access: this.$state.session.user.roles.pacientes
        },
        {
          icon: "assignment",
          text: "Questionários",
          route: "/questionarios",
          access: this.$state.session.user.roles.questionarios
        },
        {
          icon: "settings",
          text: "Configurações",
          route: "/configuracoes",
          access: this.$state.session.user.roles.configuracoes
        }
      ],
      username: "Usuário",
      now: "",
      userLevel: "Administrador"
    };
  },
  methods: {
    goToHomepage() {
      this.$router.push("/");
    },
    logout() {
      this.$state.$emit("logout");
      this.$router.push("/login");
    }
  },
  created() {
    let today = getNow();
    today.date = today.date
      .split("-")
      .reverse()
      .join("/");
    this.now = today;
  }
};
</script>