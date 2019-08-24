<template>
  <div>
    <v-container fluid>
      <FormUsuario />
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
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">              
                <v-icon 
                  small  
                  class="mr-2" 
                  v-on="on"
                  @click="viewUser()"
                >visibility</v-icon>
              </template>
              <span>Visualizar usuário</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">              
                <v-icon 
                  small 
                  class="mr-2" 
                  color="success" 
                  v-on="on"
                  @click="editUser()"
                >edit</v-icon>
              </template>
              <span>Editar usuário</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">              
                <v-icon 
                  small 
                  class="mr-2" 
                  color="error" 
                  v-on="on"
                  @click="deleteUser()"
                >delete</v-icon>
              </template>
              <span>Excluir usuário</span>
            </v-tooltip>
          </td>
        </template>
      </v-data-table>
    </v-container>
  </div>
</template>

<script>
import FormUsuario from '@/components/FormUsuario';

export default {
  components: { FormUsuario },
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
    viewUser() {},
    editUser() {},
    deleteUser() {}
  },
  created() {
    this.initialize();
  }
};
</script>
