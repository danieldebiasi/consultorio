<template>
  <div>
    <v-dialog v-model="dialog" persistent scrollable max-width="720px">
      <template v-slot:activator="{ on }">
        <v-btn round color="success" v-on="on">
          <v-icon left>add_circle</v-icon>
          <span>Novo usuário</span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="primary headline">
          <v-icon dark left>perm_identity</v-icon>
          <span class="white--text">Novo usuário</span>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12>
              <v-text-field label="Nome"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap my-3>
            <v-flex xs12 class="text-xs-center">
              <span class="grey--text">Credenciais de acesso</span>
              <v-divider class=""></v-divider>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs6 pr-2>
              <v-text-field label="Usuário"></v-text-field>
            </v-flex>
            <v-flex xs6 pl-2>
              <v-text-field 
                label="Senha" 
                :v-model="password"
                :append-icon="showPassword ? 'visibility' : 'visibility_off'"
                @click:append="showPassword = !showPassword"
                :type="showPassword ? 'text' : 'password'"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap align-center>
            <v-flex xs6 pr-2>
              <v-select
                :items="types"
                v-model="userType"
                label="Tipo de usuário"
              ></v-select>
            </v-flex>
            <v-flex xs5 pl-2 v-if="userType != 'Administrador'">
              <v-checkbox 
                label="Permissão administrador?"
                v-model="isAdmin"
                color="primary"
              ></v-checkbox>
            </v-flex>
            <v-flex xs1 class="text-xs-left" v-if="userType != 'Administrador'">
              <v-tooltip bottom>
                <template v-slot:activator="{ on }" >
                  <v-icon 
                    color="warning" 
                    v-on="on"
                  >help</v-icon>
                </template>
                <span>Permitir controle total do sistema</span>
              </v-tooltip>
            </v-flex>
          </v-layout>
          <v-layout row wrap my-3>
            <v-flex xs12 class="text-xs-center">
              <span class="grey--text">Acessos</span>
              <v-divider class=""></v-divider>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs6>
              <v-checkbox 
                label="Agenda" 
                v-model="allowAgenda" 
                color="primary"
              ></v-checkbox>
            </v-flex>
            <v-flex xs6>
              <v-checkbox 
                label="Consulta" 
                v-model="allowConsulta" 
                color="primary"
              ></v-checkbox>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs6>
              <v-checkbox 
                label="Pacientes" 
                v-model="allowPacientes" 
                color="primary"
              ></v-checkbox>
            </v-flex>
            <v-flex xs6>
              <v-checkbox 
                label="Questionários" 
                v-model="allowQuestionarios" 
                color="primary"
              ></v-checkbox>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <v-checkbox 
                label="Configurações" 
                v-model="allowConfiguracoes" 
                color="primary"
              ></v-checkbox>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="dialog = false">Cancelar</v-btn>
          <v-btn color="success" @click="dialog = false">Cadastrar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      password: '',
      showPassword: false,
      types: ['Administrador', 'Auxiliar', 'Dentista', 'Outro'],
      isAdmin: false,
      allowAgenda: false,
      allowConsulta: false,
      allowPacientes: false,
      allowQuestionarios: false,
      allowConfiguracoes: false,
      userType: ''
    };
  },
  methods: {
    
  }
};
</script>