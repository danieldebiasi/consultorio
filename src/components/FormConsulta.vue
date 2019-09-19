<template>
  <div>
    <v-dialog v-model="dialog" persistent scrollable max-width="720px">
      <template v-slot:activator="{ on }">
        <v-btn round color="success" v-on="on">
          <v-icon left>add_circle</v-icon>
          <span>Agendar consulta</span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="headline primary">
          <v-icon dark left>event_available</v-icon>
          <span class="white--text">Agendar consulta</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout row wrap>
              <v-flex xs12 mb-3>
                <v-autocomplete
                  v-model="person"
                  :items="items"
                  :search-input.sync="personSearch"
                  chips
                  clearable
                  hide-details
                  hide-selected
                  :loading="personSearchIsLoading"
                  item-text="nome"
                  label="Paciente"
                  prepend-inner-icon="person"
                  return-object
                >
                  <template v-slot:no-data>
                    <v-list-tile>
                      <v-list-tile-title>Digite o nome do paciente</v-list-tile-title>
                    </v-list-tile>
                  </template>
                </v-autocomplete>
                <v-divider></v-divider>
                <v-expand-transition>
                  <v-list v-if="person" class="grey lighten-3">
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-sub-title>Paciente</v-list-tile-sub-title>
                        <v-list-tile-title>{{ person.nome }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-sub-title>Convênio</v-list-tile-sub-title>
                        <v-list-tile-title>{{ person.convenio }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-sub-title>CPF</v-list-tile-sub-title>
                        <v-list-tile-title>{{ person.cpf }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-sub-title>Data de Nascimento</v-list-tile-sub-title>
                        <v-list-tile-title>{{ formatDate(person.datanascimento) }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                    <v-list-tile>
                      <v-list-tile-content>
                        <v-list-tile-sub-title>Telefone</v-list-tile-sub-title>
                        <v-list-tile-title>{{ person.telefone }}</v-list-tile-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                </v-expand-transition>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs3>
                <v-menu v-model="datePickerMenu" offset-y :close-on-content-click="false">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="formattedDate"
                      v-on="on"
                      label="Data"
                      prepend-icon="event"
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
              <v-flex xs3>
                <v-menu v-model="startTimePickerMenu" offset-y :close-on-content-click="false">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="startTime"
                      v-on="on"
                      label="Hora Início"
                      prepend-icon="alarm"
                      clearable
                      readonly
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    color="primary"
                    v-model="startTimeModel"
                    locale="pt-br"
                    format="24hr"
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn flat @click="startTimePickerMenu = false">Fechar</v-btn>
                  </v-time-picker>
                </v-menu>
              </v-flex>
              <v-flex xs3>
                <v-menu v-model="endTimePickerMenu" offset-y :close-on-content-click="false">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="endTime"
                      v-on="on"
                      label="Hora Fim"
                      prepend-icon="alarm_on"
                      clearable
                      readonly
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    color="primary"
                    v-model="endTimeModel"
                    locale="pt-br"
                    format="24hr"
                    scrollable
                  >
                    <v-spacer></v-spacer>
                    <v-btn flat @click="endTimePickerMenu = false">Fechar</v-btn>
                  </v-time-picker>
                </v-menu>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs3>
                <v-text-field
                  name="duracao"
                  label="Duração"
                  placeholder="hh:mm"
                  mask="##:##"
                  type="time"
                  prepend-icon="timer"
                  :value="duracaoModel"
                  disabled
                ></v-text-field>
              </v-flex>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <v-textarea
                  v-model="description"
                  box
                  name="descricao"
                  label="Descrição (opcional)"
                  hint="Descrição ou observação relacionadas à consulta"
                ></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn flat @click="dismiss">Cancelar</v-btn>
          <v-btn color="success" @click="schedule">Agendar</v-btn>
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
import { subtractHours } from "@/util/util.js";
import paths from "@/paths";
import axios from "axios";

export default {
  data() {
    return {
      dialog: false,
      message: "",
      snackbar: false,
      datePickerMenu: false,
      date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      description: "",
      person: null,
      personList: [],
      personSearch: null,
      personSearchIsLoading: false,
      startTimePickerMenu: false,
      startTime: null,
      duracao: null,
      endTimePickerMenu: false,
      endTime: null
    };
  },
  methods: {
    dismiss() {
      this.clearFields();
      this.dialog = false;
    },
    formatDate(date) {
      let split = date.split("-");
      return `${split[2]}/${split[1]}/${split[0]}`;
    },
    clearFields() {
      this.person = null;
      this.date = new Date().toISOString().substr(0, 10);
      this.startTime = null;
      this.duracao = null;
      this.endTime = null;
      this.description = "";
    },
    notify(message) {
      this.message = message;
      this.snackbar = true;
    },
    getFieldName(field) {
      switch (field) {
        case "paciente":
          return "Paciente";
          break;
        case "convenio":
          return "Convênio";
          break;
        case "cpf":
          return "CPF";
          break;
        case "datanascimento":
          return "Data de Nascimento";
          break;
        case "telefone":
          return "Telefone";
          break;
        default:
          return false;
          break;
      }
    },
    schedule() {
      Promise.all([
        new Promise((resolve, reject) => {
          //Check date and time. Schedule if ok
          if (this.person && this.date && this.startTime && this.endTime) {
            axios
              .post(
                paths.consultas.create,
                JSON.stringify({
                  person: this.person,
                  date: this.date,
                  startTime: this.startTime + ":00",
                  endTime: this.endTime + ":00",
                  description: this.description
                })
              )
              .then(response => {
                if (response.data.status == 200) {
                  resolve();
                } else {
                  if (response.data.status == 401) {
                    this.notify("Horário de consulta ocupado!");
                    reject();
                  }
                  reject();
                }
              })
              .catch(error => {
                console.info(error);
              });
          } else {
            this.notify("Preencha todos os campos obrigatórios!");
            reject();
          }
        })
      ])
        .then(response => {
          this.$eventHub.$emit("updateAgenda");
          this.dismiss();
        })
        .catch(error => {});
    }
  },
  computed: {
    formattedDate() {
      let split = this.date.split("-");
      return `${split[2]}/${split[1]}/${split[0]}`;
    },
    startTimeModel: {
      get() {
        return this.startTime;
      },
      set(time) {
        if (this.endTime != null) {
          let hour = subtractHours(time, this.endTime);

          if (hour) {
            this.startTime = time;
          } else {
            this.snackbar = true;
          }
        } else {
          this.startTime = time;
        }
      }
    },
    endTimeModel: {
      get() {
        return this.endTime;
      },
      set(time) {
        if (this.startTime != null) {
          let hour = subtractHours(this.startTime, time);

          if (hour) {
            this.endTime = time;
          } else {
            this.message = "Horário inválido!";
            this.snackbar = true;
          }
        } else {
          this.endTime = time;
        }
      }
    },
    duracaoModel: {
      get() {
        if (this.startTime != null && this.endTime != null) {
          let hour = subtractHours(this.startTime, this.endTime);
          if (hour) return hour;
        }

        return "00:00";
      },
      set(duracao) {
        this.duracao = duracao;
      }
    },
    fields() {
      if (!this.person) return [];

      return Object.keys(this.person).map(key => {
        return {
          key,
          value: this.person[key] || "-"
        };
      });
    },
    items() {
      return this.personList.map(person => {
        return Object.assign({}, person);
      });
    }
  },
  watch: {
    personSearch(person) {
      if (this.personList.length > 0 || this.personSearchIsLoading) return;

      this.personSearchIsLoading = true;

      axios
        .get(paths.pacientes.getAll)
        .then(response => {
          this.personList = [];
          response.data.forEach(element => {
            this.personList.push(element);
          });
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => (this.personSearchIsLoading = false));
    }
  },
  created() {},
  beforeDestroy() {
    this.$eventHub.$off();
  }
};
</script>
