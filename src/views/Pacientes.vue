<template>
  <div>
    <v-container fluid>
      <v-btn round class="mb-3" color="success">
        <v-icon left>add_circle</v-icon>
        <span>Novo paciente</span>
      </v-btn>
      <v-data-table :headers="headers" :items="items" class="elevation-1">
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
      items: [{ name: "Paciente 1" }, { name: "Paciente 2" }]
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
