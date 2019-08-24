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
                  <v-text-field label="Nome completo" clearable required></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field label="Convênio" clearable required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap align-center>
                <v-flex xs4>
                  <v-text-field label="CPF" clearable required></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field label="RG" clearable required></v-text-field>
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
                      v-model="date"
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
                  <v-text-field label="Nome do responsável" clearable required></v-text-field>
                </v-flex>
              </v-layout>              
              <v-layout row wrap mt-3>
                <v-flex xs12 class="text-xs-center">
                  <span class="grey--text">Contato</span>
                  <v-divider class=""></v-divider>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs8>
                  <v-text-field label="Email" clearable required></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field label="Telefone" clearable required></v-text-field>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field label="Endereço" clearable required></v-text-field>
                </v-flex>
                <v-flex xs4>
                  <v-text-field label="Cidade" clearable required></v-text-field>
                </v-flex>
                <v-flex xs2>
                  <v-select :items="states" label="UF"></v-select>
                </v-flex>
              </v-layout>
              <v-layout row wrap mt-3>
                <v-flex xs12 class="text-xs-center">
                  <span class="grey--text">Dados adicionais</span>
                  <v-divider class=""></v-divider>
                </v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-text-field label="Profissão" clearable></v-text-field>
                </v-flex>
                <v-flex xs6>
                  <v-text-field label="Estado civil" clearable></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="dialog = false">Cancelar</v-btn>
          <v-btn color="success" @click="dialog = false">Cadastrar</v-btn>
        </v-card-actions>
      </v-card>
      <v-snackbar v-model="snackbar" :timeout="3500" color="error" top>
        {{ message }}
        <v-btn flat @click.native="snackbar = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      message: "",
      ageCheckbox: false,
      date: new Date().toISOString().substr(0, 10),
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
  methods: {},
  computed: {
    formattedDate() {
      let split = this.date.split("-");
      return `${split[2]}/${split[1]}/${split[0]}`;
    }
  }
};
</script>