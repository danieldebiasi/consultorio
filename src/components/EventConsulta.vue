<template>
  <div>
    <v-dialog v-model="dialog" persistent scrollable max-width="720px">
      <template v-slot:activator="{ on }">
        <div
          v-if="event"
          :key="event.id"
          :style="style"
          class="my-event with-time elevation-3"
          :class="{'current-active': isConsultaActive}"
          v-on="on"
          v-html="event.title"
        ></div>
      </template>
      <v-card>
        <v-card-title class="primary headline">
          <v-icon dark left>perm_identity</v-icon>
          <span class="white--text">Consulta | {{ event.title }}</span>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs12 mb-3>
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
                    readonly
                  ></v-text-field>
                </template>
                <v-time-picker
                  color="primary"
                  v-model="startTimeModel"
                  locale="pt-br"
                  format="24hr"
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
                    readonly
                  ></v-text-field>
                </template>
                <v-time-picker color="primary" v-model="endTimeModel" locale="pt-br" format="24hr">
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
        </v-card-text>
        <v-card-actions>

          <v-dialog
            v-model="desmarcarDialog"
            persistent
            max-width="400"
            transition="dialog-transition"
          >
            <template v-slot:activator="{ on }">
              <v-btn flat color="error" v-on="on">
                <span>Desmarcar</span>
              </v-btn>
            </template>
            <v-card>
              <v-card-title class="headline primary">
                <v-icon left dark>warning</v-icon>
                <span class="white--text">Desmarcar consulta?</span>
              </v-card-title>
              <v-card-text>Ao desmarcar, a consulta será excluída da agenda.</v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn flat @click="desmarcarDialog = false">Cancelar</v-btn>
                <v-btn color="error" @click="unschedule(event.id)">Desmarcar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-btn flat color="warning" @click="reschedule">Remarcar</v-btn>
          <v-spacer></v-spacer>
          <v-btn flat @click="this.dismiss">Voltar</v-btn>
          <v-btn color="success" @click="start">Iniciar</v-btn>
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
import paths from "@/paths";
import axios from "axios";
import { subtractHours } from "@/util/util.js";

export default {
  props: ["currentEvent", "styleEvent"],
  data() {
    return {
      dialog: false,
      event: this.currentEvent,
      datePickerMenu: false,
      date: null,
      description: "",
      person: null,
      startTimePickerMenu: false,
      startTime: null,
      duration: null,
      endTimePickerMenu: false,
      endTime: null,
      style: this.styleEvent,
      snackbar: false,
      message: "",
      desmarcarDialog: false
    };
  },
  methods: {
    dismiss() {
      this.date = this.event.date;
      this.startTime = this.event.start
      this.endTime = this.event.end;
      this.description = this.event.description;
      this.dialog = false;
    },
    getPersonByEventId(id) {
      axios
        .post(paths.pacientes.getById, JSON.stringify({ id: id }))
        .then(response => {
          this.person = response.data;
        })
        .catch(error => {
          console.log(error);
        });
    },
    start() {
      if(this.$state.session.consulta.isActive) {
        this.notify("Já existe uma consulta ativa no momento!");
      } else {
        this.dismiss();
        this.$state.$emit('startConsulta', {event: this.event, person: this.person});
        this.$router.push('/consulta');
      }
    },
    reschedule() {
      Promise.all([
        new Promise((resolve, reject) => {
          axios
            .post(
              paths.consultas.update,
              JSON.stringify({ 
                id: this.event.id,
                dia: this.date,
                inicio: this.startTime,
                termino: this.endTime,
                descricao: this.description
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
              console.log(error);
              reject();
            });
        })
      ])
      .then((response) => {
        this.dismiss();
        this.$eventHub.$emit('updateAgenda');
      })
      .catch((error) => {

      });
    },
    unschedule(id) {
      Promise.all([
        new Promise((resolve, reject) => {
          axios
            .post(
              paths.consultas.delete,
              JSON.stringify({ id: id })
            )
            .then(response => {
              if (response.data.status == 200) {
                resolve();
              } else {
                reject();
              }
            })
            .catch(error => {
              console.log(error);
              reject();
            });
        })
          .then((response) => {
            this.dismiss();
            this.$eventHub.$emit('updateAgenda');
          })
          .catch((error) => {})
      ]);
    },
    formatDate(date) {
      let split = date.split("-");
      return `${split[2]}/${split[1]}/${split[0]}`;
    },
    notify(message) {
      this.message = message;
      this.snackbar = true;
    }
  },
  computed: {
    formattedDate() {
      let split = this.date.split("-");
      return `${split[2]}/${split[1]}/${split[0]}`;
    },
    isConsultaActive() {
      return (this.$state.session.consulta.isActive) ? (this.$state.session.consulta.event.id == this.event.id) : false;
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
            this.notify("Horário inválido!");
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
            this.notify("Horário inválido!");
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
        console.log("HERE");
        return "00:00";
      },
      set(duracao) {
        this.duration = duracao;
      }
    }
  },
  created() {
    this.getPersonByEventId(this.event.id);
    this.event = this.currentEvent;
    this.date = this.event.date;
    this.startTime = this.event.start;
    this.endTime = this.event.end;
    this.description = this.event.description;
  }
};
</script>

<style lang="stylus" scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #009688;
  color: #ffffff;
  border: 1px solid #00635a;
  border-radius: 8px;
  font-size: 13px;
  padding: 1px 8px 2px 8px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
  transition: 0.3s ease all;
  animation: zoomIn 0.3s ease-in;

  &.with-time {
    position: absolute;
    right: 4px;
    margin-right: 0px;
  }
}

.my-event:hover {
  background-color: #00b0a0;
}

.current-active {
  transition: 0.3s ease all;
  background-color: #0D47A1;
  border: 2px solid #1A237E;
  animation: flash 2s infinite;
}

.current-active:hover {
  background-color: #1E88E5;
}

@keyframes zoomIn {
  from {
    opacity: 0;
    transform: scale3d(0.3, 0.3, 0.3);
  }

  50% {
    opacity: 1;
  }
}

@keyframes flash {
  0% {background-color: #0D47A1;}
  50% {background-color: #1E88E5;}
  100% {background-color: #0D47A1;}
}

</style>