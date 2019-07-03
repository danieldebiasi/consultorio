<template>
  <div>
    <v-container fluid>
      <v-btn class="mb-3" color="success">
        <v-icon left>add_circle</v-icon>
        <span>Novo questionário</span>
      </v-btn>
      <v-data-table :headers="headers" :items="items" class="elevation-1">
        <template v-slot:items="props">
          <td>{{ props.item.title }}</td>
          <td class="justify-end layout px-0">
            <v-icon small class="mr-2" color="success" @click="editForm()">edit</v-icon>
            <v-icon small class="mr-3" color="error" @click="deleteForm()">delete</v-icon>
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
          text: "Título",
          align: "left",
          value: "title"
        },
        {
          text: "Ações",
          value: "name",
          align: "right",
          sortable: false
        }
      ],
      items: []
    };
  },
  methods: {
    initialize() {
      this.items = [
        { title: "Questionário 1" },
        { title: "Questionário 2" },
        { title: "Questionário 3" }
      ];
    },
    editForm() {},
    deleteForm() {}
  },
  created() {
    this.initialize();
  }
};
</script>
