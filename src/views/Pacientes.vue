<template>
  <div>
    <v-container fluid>
      <v-btn round class="mb-3" color="success">
        <v-icon left>add_circle</v-icon>
        <span>Novo paciente</span>
      </v-btn>
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
          <td class="justify-end layout px-0">
            <v-icon small class="mr-2" color="success" @click="editPacient()">edit</v-icon>
            <v-icon small class="mr-3" color="error" @click="deletePacient()">delete</v-icon>
          </td>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        {
          text: "Paciente",
          align: "left",
          value: "name"
        },
        {
          text: "Ações",
          value: "name",
          align: "right",
          sortable: false
        }
      ],
      items: [{ name: "Paciente 1" }, { name: "Paciente 2" }],
      search: ''
    };
  },
  methods: {
    initialize() {
      this.items = [
        { name: "Paciente 1" },
        { name: "Paciente 2" },
        { name: "Paciente 3" }
      ];
    },
    editPacient() {},
    deletePacient() {}
  },
  created() {
    this.initialize();
  }
};
</script>
