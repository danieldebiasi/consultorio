<template>
  <div>
    <v-container fluid>
      <FormQuestionario class="mb-3"/>
      <v-text-field
        label="Buscar questionário"
        prepend-icon="search"
        v-model="search"
        clearable        
      ></v-text-field>
      <v-data-table 
        :headers="headers" 
        :items="items" 
        class="elevation-1"
        rows-per-page-text="Questionários por página"
        :rows-per-page-items="[5,10,25,50]"
        :search="search"
        :no-results-text="`Nenhum questionário encontrado com a busca '${search}'`"
        no-data-text="Nenhum questionário cadastrado"
      >
        <template v-slot:items="props">
          <td>{{ props.item.title }}</td>
          <td>{{ props.item.category }}</td>
          <td class="justify-end align-center layout px-0">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">              
                <ViewQuestionario :data="props.item" />
              </template>
              <span>Visualizar questionário</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">              
                <v-icon 
                  small 
                  class="mr-3" 
                  color="error" 
                  v-on="on"
                  @click="deleteForm()"
                >delete</v-icon>
              </template>
              <span>Excluir questionário</span>
            </v-tooltip>
          </td>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import FormQuestionario from '@/components/FormQuestionario';
import ViewQuestionario from '@/components/ViewQuestionario';
import axios from 'axios';
import paths from '@/paths';

export default {
  components: { FormQuestionario, ViewQuestionario },
  data() {
    return {
      headers: [
        {
          text: "Título",
          align: "left",
          value: "title"
        },
        {
          text: "Categoria",
          align: "left",
          value: "category"
        },
        {
          text: "Ações",
          value: "actions",
          align: "right",
          sortable: false
        }
      ],
      items: [],
      search: ''
    };
  },
  methods: {
    getAllQuestionarios() {
      axios
        .get(paths.questionarios.getAll)
        .then(response => {
          this.items = [];
          response.data.forEach(element => {
            this.items.push(element);
          });
        })
        .catch(error => {
          console.log(error);
        });
    },
    viewForm() {},
    editForm() {},
    deleteForm() {}
  },
  created() {
    if(!this.$state.session.isActive) {
      this.$router.push('/login');
    } else {
        if(!this.$state.session.user.roles.questionarios){
          this.$state.$emit('logout');
          this.$router.push('/login');
      }
    }

    this.$eventHub.$on("updatePacientes", () => {
      this.getAllQuestionarios();
    });
  },
  mounted() {
    this.getAllQuestionarios();
  }
};
</script>
