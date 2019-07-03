<template>
  <div class="home">
    <!-- <h1>Homepage</h1> 
    
    <v-btn class="hidden-md-and-down teal white--text">Click me</v-btn>
    <v-btn depressed dark color="teal">Click me</v-btn>
    <v-btn flat color="teal">Click me</v-btn>

    <v-btn depressed class="teal white--text">
      <v-icon left>email</v-icon>
      <span>Email me</span>
    </v-btn>-->

    <v-container fluid>
      <v-layout row wrap align-center class="mb-3">
        <v-flex xs12 md2 class="text-xs-center">
          <v-btn color="success">
            <v-icon left>add_circle</v-icon>
            <span>Nova consulta</span>
          </v-btn>
        </v-flex>
        <v-spacer></v-spacer>
        <v-flex xs12 md9 class="text-xs-right hidden-sm-and-down">
          <v-text-field
            solo
            hide-details
            v-model="search"
            label="Buscar paciente"
            prepend-inner-icon="search"
          ></v-text-field>
        </v-flex>
      </v-layout>

      <v-card class="mb-3 elevation-4">
        <v-layout row align-center class="px-2">
          <v-flex xs4 class="text-xs-left">
            <v-btn flat color="info" @click="calendarPrev()">
              <v-icon left>keyboard_arrow_left</v-icon>  
              <span>Anterior</span>
            </v-btn>
          </v-flex>
          <v-flex xs4>
            <v-select v-model="type" :items="typeOptions" label="Visualizar"></v-select>
          </v-flex>
          <v-flex xs4 class="text-xs-right">
            <v-btn flat color="info" @click="calendarNext()">
              <span>Próximo</span>
              <v-icon right>keyboard_arrow_right</v-icon>  
            </v-btn>
          </v-flex>
        </v-layout>
      </v-card>

      <v-calendar
        ref="calendar"
        color="primary"
        :type="type"
        locale="pt-br"
        :interval-format="formatInterval"
        class="elevation-4"
      ></v-calendar>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      search: "",
      type: "week",
      typeOptions: [
        { text: "Dia", value: "day" },
        { text: "4 dias", value: "4day" },
        { text: "Semana", value: "week" },
        { text: "Mês", value: "month" }
      ],
      icon: "favorite"
    };
  },
  methods: {
    changeIcon() {
      this.icon = this.icon == "favorite" ? "favorite_border" : "favorite";
    },
    formatInterval(time) {
      return `${time.time}`;
    },
    calendarPrev() {
      this.$refs.calendar.prev();
    },
    calendarNext() {
      this.$refs.calendar.getNow();
    }
  }
};
</script>