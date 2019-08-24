<template>
  <path
    :id="divisao"
    :class="divisao"
    @click.stop="clickDivisao($event)"
    :d="d"
  />
</template>

<script>
export default {
  props: ["divisao", "d"],
  data() {
    return {

    };
  },
  methods: {
    clickDivisao(item) {
      item.srcElement.classList.toggle("selected");
      this.$emit('divisaoClicked');
    },
  }
};
</script>

<style>
path {
  fill: #ebebeb;
  transition: 0.3s ease all;
  stroke: black;
  stroke-width: 0.2px;
}

path:hover {
  fill: #d1d1d1;
}

.selected {
  fill: rgb(55, 74, 191);
}

.selected:hover {
  fill: rgba(55, 74, 191, 0.7);
}
</style>