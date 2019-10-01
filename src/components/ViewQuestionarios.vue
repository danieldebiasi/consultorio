<template>
  <div>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      scrollable
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn color="info" v-on="on">Questionários</v-btn>
      </template>
      <v-card>
        <v-toolbar dark color="primary">
          <v-btn icon dark @click="dismiss">
            <v-icon>close</v-icon>
          </v-btn>
          <v-toolbar-title>
            <span>Questionários</span>
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <v-btn dark flat @click="save">Concluído</v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <div>
            <v-select
              :items="questionarios"
              item-text="title"
              v-model="questionario"
              label="Selecione um questionário"
              prepend-icon="assignment"
              @change="select(questionario)"
              return-object
              solo
            ></v-select>
            <v-card v-if="questionario" class="pa-2">
              <div class="elevated-4 pa-2 mb-2">
                <v-layout row wrap>
                  <v-flex xs6 pr-3>
                    <v-text-field
                      prepend-icon="description"
                      :value="questionario.title"
                      label="Título"
                      readonly
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs6 pl-3>
                    <v-text-field
                      prepend-icon="bookmark"
                      :value="questionario.category"
                      label="Categoria"
                      readonly
                    ></v-text-field>
                  </v-flex>
                </v-layout>
              </div>

              <v-card class="elevated-3 pa-2 ma-2" v-for="(item, index) in questions" :key="index">
                <v-layout row wrap>
                  <v-flex xs12>
                    <v-text-field
                      label="Pergunta"
                      :value="item.pergunta"
                      readonly
                      prepend-icon="assignment_turned_in"
                    ></v-text-field>
                  </v-flex>
                  <v-flex xs12>
                    <v-textarea
                      class="ma-2"
                      name="resposta"
                      v-model="item.answer"
                      label="Resposta"
                      @change="saveAnswer(item)"
                      outline
                    ></v-textarea>
                  </v-flex>
                </v-layout>
              </v-card>
            </v-card>
          </div>
        </v-card-text>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import axios from "axios";
import paths from "@/paths";

export default {
  props: ["pacienteData"],
  data() {
    return {
      paciente: this.pacienteData,
      dialog: false,
      questionarios: [],
      questionario: null,
      questions: [],
      answers: []
    };
  },
  methods: {
    printme(printed) {
      console.log(printed);
    },
    select(item) {
      this.questionario = item;
      this.answers = [];
      this.questions = [];
      this.getQuestions(item.id);
    },
    dismiss() {
      this.dialog = false;
      this.questionario = null;
      this.questions = [];
    },
    save() {
      console.log("SELECTED: ", this.questionario);
    },
    saveAnswer(question) {
      Promise.all([
        new Promise((resolve, reject) => {
          axios
            .post(paths.questionarios.editResposta, JSON.stringify({
              idPergunta: question.id,
              idPaciente: this.paciente.id,
              resposta: question.answer
            }))
            .then(response => {
              console.log(response);
            })
            .catch(error => {
              console.log(error);
            });
        })
      ])
    },
    getAllQuestionarios() {
      Promise.all([
        new Promise((resolve, reject) => {
          axios
            .get(paths.questionarios.getAll)
            .then(response => {
              this.questionarios = [];
              response.data.forEach(element => {
                this.questionarios.push(element);
              });
            })
            .catch(error => {
              console.log(error);
            });
        })
      ])
        .then(response => {
          this.$eventHub.$emit("updatePacientes");
          this.dismiss();
        })
        .catch(error => {
          console.log(error);
        });
    },
    getQuestions(idQuestionario) {
      Promise.all([
        new Promise((resolve, reject) => {
          axios
            .post(paths.questionarios.getPerguntas, JSON.stringify({
              idQuestionario: idQuestionario
            }))
            .then(response => {
              this.questions = response.data;
              response.data.forEach(element => {
                this.getAnswer(element.id);
              });
              resolve();
            })
            .catch(error => {
              console.log(error);
            });
        })
      ])
        .then(response => {
          console.log("QUESTIONS");
          console.log(this.questions);
        })
        .catch(error => {
          console.log(error);
        });
    },
    getAnswer(idPergunta) {
      Promise.all([
        new Promise((resolve, reject) => {
          axios
            .post(
              paths.questionarios.getResposta,
              JSON.stringify({
                idPergunta: idPergunta,
                idPaciente: this.paciente.id
              })
            )
            .then(response => {
              this.questions.forEach(el => {
                if(el.id == idPergunta) {
                  el.answer = response.data.resposta ? response.data.resposta.resposta : "";
                }
              })
              resolve();
              // this.answers[idPergunta] = response.data.resposta ? response.data.resposta.resposta : "";
              // console.log("ANSWER ASSIGNED: " + this.answers[idPergunta]);
            })
            .catch(error => {
              console.log(error);
            });
        })
      ])
        .then(response => {})
        .catch(error => {});
    }
  },
  computed: {
    answer() {
      return answers;
    },
    questionariosItems() {
      let items = [];
      this.questionarios.forEach(element => {
        items.push(element.title);
      });
      return items;
    }
  },
  mounted() {
    this.getAllQuestionarios();
  }
};
</script>