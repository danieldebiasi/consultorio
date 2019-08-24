<template>
  <div>
    <v-dialog v-model="dialog" persistent scrollable max-width="720px">
      <template v-slot:activator="{ on }">
        <v-btn round color="success" v-on="on">
          <v-icon left>add_circle</v-icon>
          <span>Novo questionário</span>
        </v-btn>
      </template>
      <v-card>
        <v-card-title class="primary headline">
          <v-icon dark left>assignment</v-icon>
          <span class="white--text">Novo questionário</span>
        </v-card-title>
        <v-card-text>
          <v-layout row wrap>
            <v-flex xs6 pr-2>
              <v-text-field label="Título"></v-text-field>
            </v-flex>
            <v-flex xs6 pl-2>
              <v-text-field label="Categoria"></v-text-field>
            </v-flex>
          </v-layout>
          <v-layout row wrap my-3>
            <v-flex xs12 class="text-xs-center">
              <span class="grey--text">Perguntas</span>
              <v-divider class=""></v-divider>
            </v-flex>
          </v-layout>
          <v-layout row wrap>
            <v-flex xs12>
              <div v-for="(item, index) in questions" :key="index">
                <Pergunta 
                  v-if="!item.deleted"
                  v-model="item.question"
                  @deleteQuestion="deleteQuestion" 
                  :item="{question: item.question, index: index}"
                />
              </div>
            </v-flex>
          </v-layout>
        </v-card-text>
        <v-card-actions>
          <v-tooltip right>
            <template v-slot:activator="{ on }">
              <v-btn color="success" fab v-on="on" @click="addQuestion()">
                <v-icon>add</v-icon>
              </v-btn>
            </template>
            <span>Adicionar pergunta</span>
          </v-tooltip>
          <v-spacer></v-spacer>
          <v-btn flat @click="dialog = false">Cancelar</v-btn>
          <v-btn color="success" @click="dialog = false">Concluído</v-btn>
        </v-card-actions>
      </v-card>
      <!-- <v-snackbar v-model="snackbar" :timeout="3500" color="error" top>
        {{ message }}
        <v-btn flat @click.native="snackbar = false">
          <v-icon>close</v-icon>
        </v-btn>
      </v-snackbar> -->
    </v-dialog>
  </div>
</template>

<script>
import Pergunta from '@/components/Pergunta';

export default {
  components: { Pergunta },
  data() {
    return {
      dialog: false,
      message: "",
      questions: [
        {question: "Pergunta 1", deleted: false}, 
        {question: "Pergunta 2", deleted: false}, 
        {question: "Pergunta 3", deleted: false}
      ]
    };
  },
  methods: {
    addQuestion() {
      this.questions.push({question: '', deleted: false});
    },
    deleteQuestion(index) {      
      this.questions[index].deleted = true;
    }
  }
};
</script>