<template>
  <div>

    <v-toolbar app temporary>
      <v-toolbar-side-icon class="grey--text" @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title class="text-uppercase grey--text">
          <router-link to="/">
            <v-layout row wrap>
              <img class="mr-2 hidden-xs-only" width="20px" height="28px" src="../assets/tooth.svg"/>
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

    <v-navigation-drawer app dark v-model="drawer" class="primary elevation-1">
      <!-- user card -->
      <v-list>
        <v-list-tile v-for="tile in this.tiles" :key="tile.text" router :to="tile.route" active-class='primary lighten-1'>
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

export default {
  data() {
    return {
      drawer: false,
      tiles: [
        {icon: 'lock', text: 'Login', route: '/login'},
        {icon: 'calendar_today', text: 'Agenda', route: '/'},
        {icon: 'schedule', text: 'Consulta', route: '/consulta'},
        {icon: 'person', text: 'Pacientes', route: '/pacientes'},
        {icon: 'assignment', text: 'Questionários', route: '/questionarios'},
        {icon: 'settings', text: 'Configurações', route: '/configuracoes'}
      ]
    }
  },
  methods: {
    goToHomepage() {
      this.$router.push('/');
    }
  }
  
}

</script>