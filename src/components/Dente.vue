<template>
  <div>
    <img src="../assets/odonto.png" usemap="#image-map" class="map" />

    <!-- 
            esquerda: distal
            baixo: palatina (superior), lingual (inferior)
            direita: mesial
            cima: vestibular
            centro: oclusal
    -->

    <map name="image-map">
      <area
        @click.prevent="clickDente('distal')"
        alt="esquerda"
        coords="98, 107, 96, 98, 99, 89, 104, 82, 61, 32, 50, 39, 40, 47, 28, 62, 20, 78, 17, 94, 18, 108, 21, 120, 26, 132, 34, 144, 44, 153, 54, 161, 60, 164, 104, 115"
        shape="poly"
      />
      <area
        @click.prevent="clickDente('palatina/lingual')"
        alt="baixo"
        coords="108, 117, 64, 167, 73, 171, 85, 175, 96, 178, 108, 180, 120, 181, 133, 181, 144, 180, 155, 177, 164, 175, 172, 172, 178, 169, 133, 117, 125, 120, 117, 120"
        shape="poly"
      />
      <area
        @click.prevent="clickDente('mesial')"
        alt="direita"
        coords="182, 168, 193, 161, 202, 155, 212, 146, 219, 136, 226, 124, 231, 108, 231, 94, 228, 80, 223, 67, 214, 54, 204, 43, 195, 35, 184, 30, 138, 83, 144, 89, 146, 99, 143, 109, 138, 115"
        shape="poly"
      />
      <area
        @click.prevent="clickDente('vestibular')"
        alt="cima"
        coords="65, 28, 108, 80, 116, 77, 125, 77, 133, 79, 179, 28, 170, 23, 159, 21, 147, 17, 136, 16, 122, 16, 110, 16, 99, 17, 87, 21, 76, 25"
        shape="poly"
      />
      <area
        @click.prevent="clickDente('oclusal')"
        alt="centro"
        coords="106, 87, 101, 93, 100, 99, 103, 107, 109, 112, 117, 115, 125, 115, 132, 113, 139, 107, 142, 99, 141, 92, 135, 86, 127, 82, 120, 81, 112, 83"
        shape="poly"
      />
    </map>

    <p>{{ face }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      face: ''
    }
  },
  props: ['quadrante'],
  methods: {
    clickDente(face) {
      this.face = face +' '+ this.quadrante;
    }
  }
};
</script>
