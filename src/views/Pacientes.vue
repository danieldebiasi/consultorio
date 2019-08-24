<template>
  <div>
    <v-container fluid>
      <FormPaciente class="mb-3" />
      <v-text-field
        label="Buscar paciente"
        prepend-icon="search"
        v-model="search"
        clearable        
      ></v-text-field>
      <v-data-table 
        :headers="headers" 
        :items="items" 
        class="elevation-1"
        rows-per-page-text="Pacientes por página"
        :rows-per-page-items="[5,10,25,50,90]"
        :search="search"
        :no-results-text="`Nenhum paciente encontrado na busca '${search}'`"
        no-data-text="Nenhum paciente cadastrado"
      >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.insurance }}</td>
          <td class="justify-end layout px-0">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">              
                <v-icon 
                  small  
                  class="mr-2" 
                  v-on="on"
                  @click="viewPacient()"
                >visibility</v-icon>
              </template>
              <span>Visualizar paciente</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">              
                <v-icon 
                  small 
                  class="mr-2" 
                  color="success" 
                  v-on="on"
                  @click="editPacient()"
                >edit</v-icon>
              </template>
              <span>Editar paciente</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">              
                <v-icon 
                  small 
                  class="mr-2" 
                  color="error" 
                  v-on="on"
                  @click="deletePacient()"
                >delete</v-icon>
              </template>
              <span>Excluir paciente</span>
            </v-tooltip>
          </td>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import FormPaciente from '@/components/FormPaciente';

export default {
  components: { FormPaciente },
  data() {
    return {
      headers: [
        {
          text: "Paciente",
          align: "left",
          value: "name"
        },
        {
          text: "Convênio",
          align: "left",
          value: "insurance"
        },
        {
          text: "Ações",
          value: "name",
          align: "right",
          sortable: false
        }
      ],
      items: [
        { name: "Paciente 1", insurance: "SulAmérica Saúde"},
        { name: "Paciente 2", insurance: "Amil"},
        { name: "Paciente 3", insurance: "Bradesco Saúde" }],
      search: ''
    };
  },
  methods: {
    initialize() {
      this.items = [
        { name: "Paciente 1", insurance: "SulAmérica Saúde"},
        { name: "Paciente 2", insurance: "Amil"},
        { name: "Paciente 3", insurance: "Bradesco Saúde" }
      ];
    },
    editPacient() {},
    deletePacient() {},
    viewPacient() {}
  },
  created() {
    this.initialize();
  }
};
</script>
