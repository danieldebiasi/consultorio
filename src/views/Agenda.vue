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
        class="elevation-1"
      >
        <template v-slot:dayBody="{ date, timeToY, minutesToPixels }">
          <template v-for="event in eventsMap[date]">
            <div
              v-if="event.time"
              :key="event.title"
              :style="{ top: timeToY(event.time) + 'px', height: minutesToPixels(event.duration) + 'px' }"
              class="my-event with-time"
              @click="open(event)"
              v-html="event.title"
            ></div>
          </template>
        </template>
      </v-calendar>

      <v-dialog v-model="dialog" persistent scrollable max-width="720px">
        <v-card>
          <v-card-title class="primary headline">
            <v-icon dark left>perm_identity</v-icon>
            <span class="white--text">Consulta {{ currentEvent.title }}</span>
          </v-card-title>
          <v-card-text>
            <ActionConsulta :isDisabled="!isReschedule" />
          </v-card-text>
          <v-card-actions>
            <v-btn flat color="error">Desmarcar</v-btn>
            <v-btn flat color="warning" @click="reschedule">Remarcar</v-btn>
            <v-spacer></v-spacer>
            <v-btn flat @click="dialog = false">Voltar</v-btn>
            <v-btn color="success" v-if="!isReschedule" @click="$router.push('consulta')">Iniciar</v-btn>
            <v-btn color="warning" v-if="isReschedule">Remarcar</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>

<script>
import FormConsulta from "@/components/FormConsulta";
import ActionConsulta from "@/components/ActionConsulta";

export default {
  components: { FormConsulta, ActionConsulta },
  data() {
    return {
      dialog: false,
      currentEvent: "",
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
      events: [
        {
          id: 1,
          title: "Paciente 1",
          date: "2019-09-05",
          time: "09:00",
          duration: 45
        },
        {
          id: 2,
          title: "Paciente 2",
          date: "2019-09-02",
          time: "12:30",
          duration: 180
        },
        {
          id: 3,
          title: "Paciente 3",
          date: "2019-09-05",
          time: "10:00",
          duration: 90
        }
      ],
      date: new Date().toISOString().substr(0, 10),
      isReschedule: false
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
    open(event) {
      this.currentEvent = event;
      this.dialog = true;
    },
    reschedule() {
      this.isReschedule = !this.isReschedule;
    }
  },
  created() {
    if(!this.$state.session.isActive) {
      this.$router.push('/login');
    }
    if(!this.$state.session.user.roles.agenda){
      this.$state.$emit('logout');
      this.$router.push('/login');
    }
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
  border: 1px solid #009688;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;

  &.with-time {
    position: absolute;
    right: 4px;
    margin-right: 0px;
  }
}
</style>