<template>
  <!-- ۞ -->

  <section>
    <div id="bgb" class="p-2 pt-4">
      <div id="Hadith" class="mytext" v-if="qoh">
        {{ hadith_disp[0] }}
        <br />
        [{{this.hadith_disp[1]}}]
        <br />
        {{this.hadith_disp[2] && this.hadith_disp[2].length > 1? this.hadith_disp[2].substring(1) : ""}}
      </div>

      <div v-if="!qoh" id="surahName">
        {{ surah }}. {{ info_arr[0].englishName }} ({{
        info_arr[0].englishNameTranslation
        }})
        <br />
        <small>Verse {{ index }}</small>
      </div>
      <b-row align-v="center" class="p10" v-if="!qoh">
        <b-col md="6" class="mytext">
          <b-card id="ar" align="right">
            <b-card-text id="arabic">{{ inputdataAr.text }}</b-card-text>
          </b-card>
        </b-col>
        <hr class="my-4" />
        <b-col md="6" class="mytext">
          <b-card id="en" align="left">
            <b-card-text
              id="english"
              v-bind:style="{ fontSize: fonty(inputdataEn.text) }"
            >{{ inputdataEn.text }}</b-card-text>
          </b-card>
        </b-col>
      </b-row>
    </div>

    <b-button-group class="mb-5">
      <b-button @click="rand(3)" variant="secondary" class="custom-button">Prev</b-button>
      <b-button @click="rand(2)" variant="secondary" class="custom-button">Next</b-button>
      <b-button
        class="custom-button"
        @click="rand(1)"
        v-bind:variant="change == 1 ? 'info' : 'secondary'"
      >
        <span class="change" v-show="change == 1 ? true : false">
          <b-spinner small></b-spinner>Loading
        </span>
        <span v-show="change == 0">Random</span>
      </b-button>
    </b-button-group>
    <br />
  </section>
</template>

<script>
export default {
  props: {
    inputdataAr: Object,
    inputdataEn: Object,
    next: Function,
    prev: Function,
    randomize: Function,
    numberOfAyahs: Number,
    change: Number,
    hadith: Array,
    qoh: Boolean,
    info_arr: Array,
    index: Number,
    surah: Number
  },
  data() {
    return {
      hadith_disp: "",
      hadith_index: null
    };
  },
  computed: {
    more_info() {
      console.log("stuff could happen here");
      return "info";
    }
  },
  mounted() {
    this.randomhadith();
  },
  methods: {
    fonty(inp) {
      if (inp.length > 240) {
        return `15px`;
      } else if (inp.length < 170) {
        return `17px`;
      }
      return `20px`;
      //
    },
    rand(i) {
      if (this.qoh) {
        if (i == 1) {
          this.randomhadith();
        } else if (i == 3) {
          this.hadith_index--;
        } else {
          this.hadith_index++;
        }
        let hadith = `${this.hadith[this.hadith_index].En_Sanad} ${
          this.hadith[this.hadith_index].En_Text
        }`;
        let hadith_lhs = hadith.split("[");
        let hadith_rhs = hadith_lhs[1].split("]"); //for hadith that brings othe rnarration after the raawi(s)
        this.hadith_disp = [hadith_lhs[0], hadith_rhs[0], hadith_rhs[1]];
      } else {
        if (i == 1) {
          this.randomize();
        } else if (i == 3) {
          this.prev();
        } else {
          this.next();
        }
      }
    },
    randomhadith() {
      this.hadith_index = this.randomint(0, 1894);
      let hadith = `${this.hadith[this.hadith_index].En_Sanad} ${
        this.hadith[this.hadith_index].En_Text
      }`;
      this.hadith_disp = hadith.split("[");
    },
    randomint(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  }
};
</script>

<style scoped>
#en,
#ar {
  margin-bottom: 10px;
  background-color: rgba(88, 74, 43, 0);
}
.internal:hover {
  background-color: rgba(173, 179, 163, 0.7);
  border-radius: 5px;
}
.uinternal:hover {
  background-color: rgba(170, 212, 169, 0.2);
  border-radius: 5px;
}
#arabic {
  font-size: 21px;
  font-family: "Amiri", serif;
  /* font-Weight: bold; */
  color: rgb(194, 186, 186);
  line-height: 40px;
}
#english {
  font-size: 21px;
  /* font-Weight: bold; */
  color: rgb(194, 186, 186);
}
#bgb {
  margin-bottom: 15px;
  background-color: rgba(0, 0, 0, 0.75);
  border-radius: 7px;
  height: auto;
  width: auto;
}
#bgb:hover {
  background-color: rgba(0, 0, 0, 0.85);
  color: rgb(255, 255, 255);
}
.uinternal {
  margin-top: 45px;
}
/* p.lead:hover{
  background-color: rgb(203, 236, 182);
} */
.btn {
  /* margin: 0 5px; */
}
.mytext {
  margin-top: 25px;
  margin-bottom: 35px;
  text-align: justify;
  padding-left: 10px;
  padding-right: 10px;
}
.custom-button {
  width: 100px;
  /* margin: 10px; */
}
</style>
