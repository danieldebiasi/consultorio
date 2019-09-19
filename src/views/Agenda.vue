<template>
  <div>
    <v-container fluid grid-list-md>
      <v-layout row wrap align-center mb-2>
        <v-flex xs12 class="text-xs-left">
          <FormConsulta />
        </v-flex>
      </v-layout>

      <v-card class="mb-3 elevation-1 px-3">
        <v-layout row wrap align-center>
          <v-flex xs2 class="text-xs-left">
            <!-- <v-text-field
              solo
              hide-details
              v-model="search"
              label="Buscar paciente"
              prepend-inner-icon="search"
              clearable
            ></v-text-field> -->
            <v-btn round color="info" @click="getAllConsultas">
              <v-icon left>refresh</v-icon>
              <span>Atualizar</span>
            </v-btn>
          </v-flex>
          <v-flex xs5 class="text-xs-center">
            <v-btn icon color="info" @click="$refs.calendar.prev()">
              <v-icon>keyboard_arrow_left</v-icon>
            </v-btn>
            <v-btn round color="info" @click="setToday">
              <v-icon left>schedule</v-icon>
              <span>Ver Hoje</span>
            </v-btn>
            <v-btn icon color="info" @click="$refs.calendar.next()">
              <v-icon>keyboard_arrow_right</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs5 class="text-xs-right">
            <v-layout row wrap align-center>
              <v-flex xs5 class="text-xs-left">
                <v-select
                  v-model="type"
                  :items="typeOptions"
                  label="Visualizar"
                  prepend-icon="visibility"
                ></v-select>
              </v-flex>
              <v-spacer></v-spacer>
              <v-flex xs6 class="text-xs-right px-3">
                <v-menu v-model="datePickerMenu" offset-y :close-on-content-click="false">
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="formattedDate"
                      v-on="on"
                      label="Ir para"
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
            </v-layout>
          </v-flex>
        </v-layout>
      </v-card>

      <v-calendar
        ref="calendar"
        v-model="date"
        :weekday-format="formatDay"
        color="primary"
        :type="type"
        locale="pt-br"
        :interval-format="formatInterval"
        :interval-minutes="60"
        class="elevation-1"
      >
        <template v-slot:dayBody="{ date, timeToY, minutesToPixels }">
          <template v-for="event in eventsMap[date]">
            <EventConsulta :key="event.id" :currentEvent="event" :styleEvent="{ top: timeToY(event.start) + 'px', height: minutesToPixels(event.durationMinutes) + 'px' }" />
          </template>
        </template>
      </v-calendar>

    </v-container> 
  </div>
</template>

<script>
import FormConsulta from "@/components/FormConsulta";
import EventConsulta from "@/components/EventConsulta";
import { subtractHours, inMinutes } from "@/util/util.js";
import paths from '@/paths';
import axios from 'axios';
import { isUndefined } from 'util';

export default {
  components: { FormConsulta, EventConsulta },
  data() {
    return {
      search: "",
      datePickerMenu: false,
      type: "week",
      typeOptions: [
        { text: "Dia", value: "day" },
        { text: "4 dias", value: "4day" },
        { text: "Semana", value: "week" }
      ],
      weekdays: {
        0: "dom",
        1: "seg",
        2: "ter",
        3: "qua",
        4: "qui",
        5: "sex",
        6: "sáb"
      },
      months: {
        1: "jan",
        2: "fev",
        3: "mar",
        4: "abr",
        5: "mai",
        6: "jun",
        7: "jul",
        8: "ago",
        9: "set",
        10: "out",
        11: "nov",
        12: "dez"
      },
      events: [],
      date: new Date(Date.now() - (new Date().getTimezoneOffset())*60000).toISOString().substr(0, 10),
    };
  },
  computed: {
    formattedDate() {
      let split = this.date.split("-");
      return `${split[2]}/${split[1]}/${split[0]}`;
    },
    eventsMap() {
      const map = {};
      this.events.forEach(e => (map[e.date] = map[e.date] || []).push(e));
      return map;
    }
  },
  methods: {
    teste() {
      console.log("TESTE");
    },
    clearSearch() {
      this.search = "";
    },
    formatDay(day) {
      let weekday = this.weekdays[day.weekday];
      let month = this.months[day.month];
      return `${weekday} | ${month}/${day.year}`;
    },
    formatInterval(time) {
      return `${time.time}`;
    },
    setToday() {
      this.date = new Date().toISOString().substr(0, 10);
    },
    getAllConsultas() {
      this.events = [];
      axios.get(paths.consultas.getAll)
      .then((response) => {
        response.data.forEach(element => {
          const id = element.id;
          const title = element.nome;
          const date = element.dia;
          const start = element.inicio.split(":")[0] + ":" + element.inicio.split(":")[1];
          const end = element.termino.split(":")[0] + ":" + element.termino.split(":")[1];
          const description = element.descricao;
          const duration = subtractHours(start, end);
          this.events.push({
            id: id,
            title: title,
            date: date,
            start: start,
            end: end,
            duration: duration,
            durationMinutes: inMinutes(duration),
            description: description
          });
        });
      })
      .catch((error) => {
        console.log(error);
      });
    }
  },
  created() {
    if(!this.$state.session.isActive) {
      this.$router.push('/login');
    }

    this.$eventHub.$on('updateAgenda', () => {
      this.events = [];
      this.getAllConsultas();
    });
  },
  mounted() {
    this.getAllConsultas();
  },
  beforeDestroy() {
    this.$eventHub.$off();
  }
};
</script>