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
        <v-flex xs4 class="text-xs-left">
          <v-text-field
            solo
            hide-details
            v-model="search"
            label="Buscar paciente"
            prepend-inner-icon="search"
            clearable
          ></v-text-field>
        </v-flex>
        <v-flex xs4 class="text-xs-center">
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
        <v-flex xs4 class="text-xs-right">
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
              <v-menu 
                v-model="datePickerMenu"
                offset-y
                :close-on-content-click="false"
              >
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
        class="elevation-1"
      ></v-calendar>
    </v-container>
  </div>
</template>

<script>
import FormConsulta from "@/components/FormConsulta";

export default {
  components: { FormConsulta },
  data() {
    return {
      dialog: false,
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
      date: new Date().toISOString().substr(0, 10),
      month: "Julho"
    };
  },
  computed: {
    formattedDate() {
      let split = this.date.split("-");
      return `${split[2]}/${split[1]}/${split[0]}`;
    }
  },
  methods: {
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
    }
  }
};
</script>