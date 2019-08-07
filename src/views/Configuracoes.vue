<template>
  <div>
    <v-container fluid>
      <v-btn round class="mb-3" color="success">
        <v-icon left>add_circle</v-icon>
        <span>Novo usuário</span>
      </v-btn>
      <v-text-field
        label="Buscar usuário"
        prepend-icon="search"
        v-model="search"
        clearable        
      ></v-text-field>
      <v-data-table
        :headers="headers" 
        :items="items" 
        class="elevation-1"
        rows-per-page-text="Usuários por página"
        :rows-per-page-items="[5,10,25,50]"
        :search="search"
        :no-results-text="`Nenhum usuário encontrado com a busca '${search}'`"
        no-data-text="Nenhum usuário cadastrado"
      >
        <template v-slot:items="props">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.access }}</td>
          <td>{{ props.item.username }}</td>
          <td class="justify-end layout px-0">
            <v-icon small class="mr-2" color="success" @click="editUser()">edit</v-icon>
            <v-icon small class="mr-3" color="error" @click="deleteUser()">delete</v-icon>
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
          text: "Nome",
          align: "left",
          value: "name"
        },
        {
          text: "Acesso",
          align: "left",
          value: "access"
        },
        {
          text: "Usuário",
          align: "left",
          value: "username"
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
    initialize() {
      this.items = [
        { name: "Carlos Alberto", access: "Administrador", username: "admin"},
        { name: "Raquel Soares", access: "Dentista", username: "dentista01"},
        { name: "Paulo Victor", access: "Auxiliar", username: "auxiliar01"}
      ];
    },
    editUser() {},
    deleteUser() {}
  },
  created() {
    this.initialize();
  }
};
</script>
