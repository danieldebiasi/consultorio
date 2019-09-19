<template>
  <path
    :id="divisao"
    class="nenhum"
    @click.stop="clickDivisao($event)"
    :d="d"
  />
</template>

<script>
export default {
  props: ["divisao", "d", "color", "notacao"],
  data() {
    return {
      notacaoDente: this.notacao,
      divisaoDente: this.divisao
    };
  },
  methods: {
    clickDivisao(item) {
      this.$emit('divisaoClicked', item);
    },
  },
  mounted() {
    if(!(this.$state.session.consulta.odontograma[this.notacaoDente][this.divisaoDente] === undefined)) {
      const color = this.$state.session.consulta.odontograma[this.notacaoDente][this.divisaoDente];
      this.$el.classList.remove(
        "feito",
        "a-fazer",
        "presente"
      );
      if (!this.$el.classList.contains(color)) {
        this.$el.classList.add(color);
      }
    } else {
      this.$state.session.consulta.odontograma[this.notacaoDente][this.divisaoDente] = 'nenhum';
    }
  }
};
</script>

<style>
path {
  transition: 0.3s ease all;
  stroke: black;
  stroke-width: 0.2px;
}

.nenhum {
  fill: #ebebeb;
}

.nenhum:hover {
  fill: #d1d1d1;
}

.feito {
  fill: #2979FF;
}

.feito:hover {
 fill: #42A5F5;
}

.a-fazer {
  fill: #D32F2F;
}

.a-fazer:hover {
 fill: #E57373;
}

.presente {
 fill: #76FF03;
}

.presente:hover {
 fill: #64DD17;
}

</style>