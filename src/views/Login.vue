<template>
  <div>
    <v-container fluid fill-height>
      <v-layout align-center justify-center>
        <v-flex xs4>
          <v-card class="elevation-20">
            <v-toolbar color="primary" class="text-uppercase" flat>
                <v-spacer></v-spacer>
                <img class="mr-2 hidden-xs-only" width="20px" height="28px" src="../assets/tooth.svg"/>
                <span class="grey--text text--lighten-2 font-weight-light">Meu</span>
                <span class="white--text text--lighten-1 font-weight-medium">Consultório</span>              
                <v-spacer></v-spacer>
            </v-toolbar>
            <v-card-text>
              <v-form>
                <v-text-field
                  name="username"
                  label="Nome de usuário"
                  prepend-icon="person"
                  type="text"
                ></v-text-field>
                <v-text-field
                  name="password"
                  label="Senha"
                  prepend-icon="lock"
                  type="password"
                ></v-text-field>
              </v-form>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary">
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

export default {
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    login() {
      const { username, password } = this;
    }
  }
}

</script>
