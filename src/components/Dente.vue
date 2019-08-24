<template>
  <div>
    <v-layout row wrap>
      <v-flex xs12 class="text-xs-center">
        <svg
          class="ma-1"
          version="1.1"
          viewBox="0 0 55.121 45.235"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g transform="translate(-68.53 -117.75)" stroke-width=".26458">
            <Divisao
              :divisao="quadrante.inferior"
              :notacao="this.notacao"
              @divisaoClicked="showColorDialog(quadrante.inferior)"
              :d="'m91.645 162.7c-2.5679-0.37396-5.9085-1.2891-8.138-2.2294-2.1208-0.89445-5.7033-2.9897-6.2612-3.6619-0.25124-0.30272 0.89188-1.3708 6.1985-5.7914l6.5065-5.4203 1.8709 0.95991c1.7505 0.89815 2.0262 0.95964 4.2839 0.95575 2.0784-4e-3 2.6321-0.10618 3.9933-0.73996 0.86918-0.4047 1.7836-0.91976 2.032-1.1446 0.41515-0.3757 1.01 0.014 7.3486 4.8148 5.6066 4.2464 6.8398 5.2924 6.5918 5.5913-0.69146 0.83316-5.0205 3.4831-7.1385 4.3697-5.2895 2.2142-11.859 3.0867-17.288 2.2961z'"
            />
            <Divisao
              :divisao="quadrante.esquerda"
              :notacao="this.notacao"
              @divisaoClicked="showColorDialog(quadrante.esquerda)"
              :d="'m74.018 153.79c-7.3117-7.8264-7.3181-18.887-0.0154-26.81 0.92313-1.0016 1.7916-1.8211 1.9299-1.8211 0.19131 0 11.355 8.2886 12.486 9.2704 0.12055 0.10465-0.11108 0.82983-0.51475 1.6115-1.2926 2.503-0.9194 6.1531 0.83507 8.1681 0.29688 0.34096-0.5711 1.1611-6.1604 5.8208-3.5783 2.9832-6.5871 5.4576-6.6862 5.4988-0.0991 0.0411-0.94242-0.7411-1.874-1.7383'"
            />
            <Divisao
              :divisao="quadrante.direita"
              :notacao="this.notacao"
              @divisaoClicked="showColorDialog(quadrante.direita)"
              :d="'m110.69 149.74c-3.638-2.7704-6.7083-5.1275-6.8228-5.238-0.1145-0.11057 0.0961-0.78756 0.46806-1.5044 1.2576-2.424 1.1526-5.2767-0.27764-7.5423l-0.66213-1.0489 0.73682-0.6152c0.40525-0.33837 3.1011-2.5964 5.9907-5.0178 2.8896-2.4214 5.3367-4.4026 5.4379-4.4026 0.35243 0 3.0359 2.7892 4.2002 4.3656 1.4966 2.0264 2.4928 4.0038 3.2705 6.4916 0.49538 1.5848 0.61794 2.5763 0.62019 5.0178 3e-3 3.7516-0.55292 6.0283-2.2376 9.1564-1.0339 1.9197-3.5796 5.3571-3.9773 5.3704-0.0728 2e-3 -3.1089-2.2622-6.7469-5.0326z'"
            />
            <Divisao
              :divisao="quadrante.centro"
              :notacao="this.notacao"
              @divisaoClicked="showColorDialog(quadrante.centro)"
              :d="'m93.458 145.84c-1.5229-0.52636-3.7072-2.3055-4.3845-3.5712-1.7048-3.1859-0.0635-7.3158 3.5494-8.9311 1.9688-0.88028 5.0582-0.88028 7.027 0 3.4872 1.5592 5.1583 5.3486 3.744 8.4902-1.5843 3.5191-6.0939 5.3401-9.936 4.0121z'"
            />
            <Divisao
              :divisao="quadrante.superior"
              :notacao="this.notacao"
              @divisaoClicked="showColorDialog(quadrante.superior)"
              :d="'m83.435 129.01c-3.3412-2.5396-6.1153-4.7389-6.1648-4.8874-0.115-0.34499 3.1952-2.4922 5.3265-3.4552 3.8782-1.7522 9.2794-2.915 13.54-2.915 5.7216 0 12.203 1.7843 16.586 4.5658l1.769 1.1228-5.5507 4.6302c-3.0529 2.5466-5.762 4.7792-6.0204 4.9613-0.39589 0.27905-0.75801 0.18533-2.3037-0.5962-3.1926-1.6142-6.5448-1.5074-9.5536 0.30436-0.80996 0.48773-1.4908 0.88679-1.5131 0.88679-0.0222 0-2.7741-2.0778-6.1152-4.6174z'"
            />
          </g>
        </svg>

        <v-dialog v-model="noteDialog" persistent max-width="400" transition="dialog-transition">
          <template v-slot:activator="{ on }">
            <v-btn icon :color="btnColor" v-on="on">
              <span>{{ notacao }}</span>
            </v-btn>
          </template>
          <v-card>
            <v-card-title class="headline primary">
              <v-icon left dark>comment</v-icon>
              <span class="white--text">Anotação - Dente {{ notacao }}</span>
            </v-card-title>
            <v-textarea class="ma-3" name="anotacao" label="Anotação"></v-textarea>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="noteDialog = false">Cancelar</v-btn>
              <v-btn flat @click="note" color="success">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

        <v-dialog 
          v-model="colorDialog"
          persistent max-width="400" 
          transition="dialog-transition"
        >
          <v-card>
            <v-card-title class="headline primary">
              <v-icon left dark>class</v-icon>
              <span class="white--text">Dente {{ notacao }} - {{ colorDialogDiv }}</span>
            </v-card-title>
            <v-card-text>
              <v-list>
                <v-list-tile
                  v-for="(item, index) in this.colorDialogItems" 
                  :key="index"
                  @click="selectColor"
                >
                  <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                </v-list-tile>
              </v-list>
            </v-card-text>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn flat @click="colorDialog = false">Cancelar</v-btn>
              <v-btn flat @click="colorDialog = false" color="success">Salvar</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>

      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Divisao from "@/components/Divisao";
import { appEvents } from '@/main';

export default {
  components: { Divisao },
  data() {
    return {
      noteDialog: false,
      colorDialog: false,
      btnColor: "",
      colorDialogDiv: '',
      colorDialogItems: [
        {title: 'Teste', value: ''},
        {title: 'Teste 2', value: ''}
      ]
    };
  },
  props: ["quadrante", "notacao"],
  methods: {
    note() {
      this.btnColor = this.btnColor == "info" ? "" : "info";
      this.noteDialog = false;
    },
    showColorDialog(item) {
      this.colorDialogDiv = item.charAt(0).toUpperCase() + item.slice(1);
      this.colorDialog = true;
    },
    selectColor() {
      
    }
  }
};
</script>

<style scoped>
svg {
  width: auto;
  height: auto;
}
</style>
