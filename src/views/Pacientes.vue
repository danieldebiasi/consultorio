<template>
  <div>
    <v-container fluid>
      <FormPaciente class="mb-3" />
      <v-text-field label="Buscar paciente" prepend-icon="search" v-model="search" clearable></v-text-field>
      <v-data-table
        :headers="headers"
        :items="items"
        class="elevation-1"
        rows-per-page-text="Pacientes por página"
        :rows-per-page-items="[10,25,50,90]"
        :search="search"
        :no-results-text="`Nenhum paciente encontrado na busca '${search}'`"
        no-data-text="Nenhum paciente cadastrado"
      >
        <template v-slot:items="props">
          <td>{{ props.item.nome }}</td>
          <td>{{ props.item.convenio }}</td>
          <td class="justify-end align-center layout px-0">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <ViewPaciente v-on="on" :pacienteData="props.item" />
              </template>
              <span>Visualizar paciente</span>
            </v-tooltip>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-icon
                  small
                  class="mr-3"
                  color="error"
                  v-on="on"
                  @click="deletePacient(props.item.id)"
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
import axios from "axios";
import paths from "@/paths";
import FormPaciente from "@/components/FormPaciente";
import ViewPaciente from "@/components/ViewPaciente";

export default {
  components: { FormPaciente, ViewPaciente },
  data() {
    return {
      headers: [
        {
          text: "Paciente",
          align: "left",
          value: "nome"
        },
        {
          text: "Convênio",
          align: "left",
          value: "convenio"
        },
        {
          text: "Ações",
          value: "acoes",
          align: "right",
          sortable: false
        }
      ],
      items: [],
      search: ""
    };
  },
  methods: {
    editPacient() {},
    deletePacient(id) {
      Promise.all([
        new Promise((resolve, reject) => {
          axios
            .post(paths.pacientes.delete, JSON.stringify({ id: id }))
            .then(response => {
              resolve();
            })
            .catch(error => {
              console.log(error);
              reject();
            });
        })
      ])
        .then(response => {
          this.getAllPacientes();
        })
        .catch(error => {});
    },
    viewPacient() {},
    getAllPacientes() {
      Promise.all([
        new Promise((resolve, reject) => {
          axios
            .get(paths.pacientes.getAll)
            .then(response => {
              this.items = [];
              response.data.forEach(element => {
                this.items.push(element);
              });
            })
            .catch(error => {
              console.log(error);
            });
        })
      ]);
    }
  },
  created() {
    if (!this.$state.session.isActive) {
      this.$router.push("/login");
    } else {
      if (!this.$state.session.user.roles.pacientes) {
        this.$state.$emit("logout");
        this.$router.push("/login");
      }
    }

    this.$eventHub.$on("updatePacientes", () => {
      this.getAllPacientes();
    });
  },
  mounted() {
    this.getAllPacientes();
  }
};
</script>
