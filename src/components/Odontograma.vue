<template>
  <div>
    <!-- SUPERIOR -->
    <v-layout row wrap>
      <v-flex xs6>
        <!-- SUPERIOR DIREITO -->
        <v-layout row wrap class="pr-3 border-right">
          <v-flex xs6>
            <v-layout row wrap>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_DIREITO" :notacao="18" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_DIREITO" :notacao="17" />
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_DIREITO" :notacao="16" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_DIREITO" :notacao="15" />
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-layout row wrap>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_DIREITO" :notacao="14" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_DIREITO" :notacao="13" />
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_DIREITO" :notacao="12" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_DIREITO" :notacao="11" />
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs6>
        <!-- SUPERIOR ESQUERDO -->
        <v-layout row wrap class="pl-3 border-left">
          <v-flex xs6>
            <v-layout row wrap>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_ESQUERDO" :notacao="21" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_ESQUERDO" :notacao="22" />
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_ESQUERDO" :notacao="23" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_ESQUERDO" :notacao="24" />
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-layout row wrap>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_ESQUERDO" :notacao="25" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_ESQUERDO" :notacao="26" />
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_ESQUERDO" :notacao="27" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_ESQUERDO" :notacao="28" />
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <!-- MEDIO SUPERIOR-->
    <v-layout row wrap>
      <v-flex xs6>
        <!-- MEDIO SUPERIOR DIREITO -->
        <v-layout row wrap class="pr-3 border-right border-bottom">
          <v-flex xs6>
            <v-layout row wrap>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-spacer></v-spacer>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-spacer></v-spacer>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_DIREITO" :notacao="55" />
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-layout row wrap>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_DIREITO" :notacao="54" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_DIREITO" :notacao="53" />
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_DIREITO" :notacao="52" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_DIREITO" :notacao="51" />
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs6>
        <!-- MEDIO SUPERIOR ESQUERDO -->
        <v-layout row wrap class="pl-3 border-left border-bottom">
          <v-flex xs6>
            <v-layout row wrap>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_ESQUERDO" :notacao="61" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_ESQUERDO" :notacao="62" />
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_ESQUERDO" :notacao="63" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_ESQUERDO" :notacao="64" />
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-layout row wrap>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.SUPERIOR_ESQUERDO" :notacao="65" />
                  </v-flex>
                  <v-flex xs6>
                    <v-spacer></v-spacer>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-spacer></v-spacer>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <!-- MEDIO INFERIOR -->
    <v-layout row wrap>
      <v-flex xs6>
        <!-- MEDIO INFERIOR DIREITO -->
        <v-layout row wrap class="pr-3 pt-3 border-right border-top">
          <v-flex xs6>
            <v-layout row wrap>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-spacer></v-spacer>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <v-spacer></v-spacer>
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_DIREITO" :notacao="85" />
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-layout row wrap>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_DIREITO" :notacao="84" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_DIREITO" :notacao="83" />
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_DIREITO" :notacao="82" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_DIREITO" :notacao="81" />
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs6>
        <!-- MEDIO INFERIOR ESQUERDO -->
        <v-layout row wrap class="pl-3 pt-3 border-left border-top">
          <v-flex xs6>
            <v-layout row wrap>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_ESQUERDO" :notacao="71" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_ESQUERDO" :notacao="72" />
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_ESQUERDO" :notacao="73" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_ESQUERDO" :notacao="74" />
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-layout row wrap>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_ESQUERDO" :notacao="75" />
                  </v-flex>
                  <v-flex xs6>
                    <v-spacer></v-spacer>
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-spacer></v-spacer>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>

    <!-- INFERIOR -->
    <v-layout row wrap>
      <v-flex xs6>
        <!-- INFERIOR DIREITO -->
        <v-layout row wrap class="pr-3 border-right">
          <v-flex xs6>
            <v-layout row wrap>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_DIREITO" :notacao="48" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_DIREITO" :notacao="47" />
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_DIREITO" :notacao="46" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_DIREITO" :notacao="45" />
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-layout row wrap>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_DIREITO" :notacao="44" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_DIREITO" :notacao="43" />
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_DIREITO" :notacao="42" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_DIREITO" :notacao="41" />
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
      <v-flex xs6>
        <!-- INFERIOR ESQUERDO -->
        <v-layout row wrap class="pl-3 border-left">
          <v-flex xs6>
            <v-layout row wrap>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_ESQUERDO" :notacao="31" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_ESQUERDO" :notacao="32" />
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_ESQUERDO" :notacao="33" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_ESQUERDO" :notacao="34" />
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs6>
            <v-layout row wrap>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_ESQUERDO" :notacao="35" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_ESQUERDO" :notacao="36" />
                  </v-flex>
                </v-layout>
              </v-flex>
              <v-flex xs6>
                <v-layout row wrap>
                  <v-spacer></v-spacer>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_ESQUERDO" :notacao="37" />
                  </v-flex>
                  <v-flex xs6>
                    <Dente :quadrante="dentes.INFERIOR_ESQUERDO" :notacao="38" />
                  </v-flex>
                </v-layout>
              </v-flex>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
import Dente from "@/components/Dente";

export default {
  components: { Dente },
  data() {
    return {
      dentes: {
        SUPERIOR_DIREITO: {
          superior: "vestibular",
          inferior: "palatina",
          esquerda: "distal",
          direita: "mesial",
          centro: "oclusal"
        },
        SUPERIOR_ESQUERDO: {
          superior: "vestibular",
          inferior: "palatina",
          esquerda: "mesial",
          direita: "distal",
          centro: "oclusal"
        },
        INFERIOR_ESQUERDO: {
          superior: "lingual",
          inferior: "vestibular",
          esquerda: "mesial",
          direita: "distal",
          centro: "oclusal"
        },
        INFERIOR_DIREITO: {
          superior: "lingual",
          inferior: "vestibular",
          esquerda: "distal",
          direita: "mesial",
          centro: "oclusal"
        }
      }
    };
  }
};
</script>

<style>

.border-left {
  border-left: 1px solid rgb(231, 231, 231);
}

.border-right {
  border-right: 1px solid rgb(231, 231, 231);
}

.border-top {
  border-top: 1px solid rgb(231, 231, 231);
}

.border-bottom {
  border-bottom: 1px solid rgb(231, 231, 231);
}

</style>