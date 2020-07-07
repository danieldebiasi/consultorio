<template>
  <div>
    <v-layout row wrap align-baseline>
      <v-flex xs11>
        <v-text-field 
          solo 
          label="Digite a pergunta" 
          v-model="question" 
          @input="updateQuestion"
          :disabled="isDisabled"
        ></v-text-field>
      </v-flex>
      <v-flex xs1>
        <v-tooltip bottom>
          <template v-slot:activator="{ on }">
            <v-icon
              small
              right
              class="mr-2"
              color="error"
              v-on="on"
              @click="deleteQuestion()"
              :disabled="isDisabled"
            >delete</v-icon>
          </template>
          <span>Excluir pergunta</span>
        </v-tooltip>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  props: ["item", "isEditing"],
  data() {
    return {
      question: this.item.question,
      index: this.item.index
    };
  },
  methods: {
    updateQuestion() {
      this.$emit("input", this.question);
    },
    deleteQuestion() {
      this.$emit("deleteQuestion", this.index);
    }
  },
  computed: {
    isDisabled() {
      return this.isEditing;
    }
  }
};
</script>