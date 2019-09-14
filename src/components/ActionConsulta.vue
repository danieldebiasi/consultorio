<template>
  <v-container grid-list-md>
    <v-layout row wrap>
      <v-flex xs12>
        <v-text-field label="Paciente" prepend-icon="person" clearable required :disabled="disabled"></v-text-field>
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
              :disabled="disabled"
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
              :disabled="disabled"
            ></v-text-field>
          </template>
          <v-time-picker color="primary" v-model="startTimeModel" locale="pt-br" format="24hr">
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
              :disabled="disabled"
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
          box
          name="descricao"
          label="Descrição (opcional)"
          hint="Descrição ou observação relacionadas à consulta"
          :disabled="disabled"
        ></v-textarea>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { subtractHours } from '@/util/util.js';

export default {
  props: ['isDisabled'],
  data() {
    return {
      datePickerMenu: false,
      date: new Date().toISOString().substr(0, 10),
      startTimePickerMenu: false,
      startTime: null,
      duracao: null,
      endTimePickerMenu: false,
      endTime: null
    }
  },
  computed: {
    disabled() {
      return this.isDisabled;
    },
    formattedDate() {
      let split = this.date.split("-");
      return `${split[2]}/${split[1]}/${split[0]}`;
    },
    startTimeModel: {
      get() {
        return this.startTime;
      },
      set(time) {
        if(this.endTime != null) {
          let hour = subtractHours(time, this.endTime);
          
          if(hour) {
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
        if(this.startTime != null) {
          let hour = subtractHours(this.startTime, time);
          
          if(hour) {
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
        if(this.startTime != null && this.endTime != null) {
          let hour = subtractHours(this.startTime, this.endTime);
          if(hour) return hour;
        }
        
        return "00:00";
      },
      set(duracao) {
        this.duracao = duracao;
      }
    }
  }
};
</script>