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
        :rows-per-page-items="[10,25,50]"
        :search="search"
        :no-results-text="`Nenhum usuário encontrado com a busca '${search}'`"
        no-data-text="Nenhum usuário cadastrado"
      >
        <template v-slot:items="props">
          <td>{{ props.item.nome }}</td>
          <td>{{ props.item.tipo }}</td>
          <td>{{ props.item.username }}</td>
          <td class="justify-end layout px-0">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">              
                <v-icon 
                  small  
                  class="mr-3" 
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
                  class="mr-3" 
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
import axios from 'axios';
import paths from '@/paths';

export default {
  components: { FormUsuario },
  data() {
    return {
      headers: [
        {
          text: "Nome",
          align: "left",
          value: "nome"
        },
        {
          text: "Acesso",
          align: "left",
          value: "tipo"
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
    getAllUsers() {
      axios.get(paths.usuarios.getAll)
      .then((response) => {
        this.items = [];
        response.data.forEach(element => {
          this.items.push(element);
        });
      })
      .catch((error) => {
        console.log(error);
      });
    },
    viewUser() {},
    editUser() {},
    deleteUser() {}
  },
  created() {
    if(!this.$state.session.isActive) {
      this.$router.push('/login');
    } else {
        if(!this.$state.session.user.roles.configuracoes){
        this.$state.$emit('logout');
        this.$router.push('/login');
      }
    }

  
  },
  mounted() {
    this.$eventHub.$on("updateUsuarios", () => {
      this.getAllUsers();
    });

    this.getAllUsers();
  },
  beforeDestroy() {
    this.$eventHub.$off();
  }
};
</script>
