<template>
  <!-- ۞ -->

  <div id="bgb" class="p-5">
    <div id="Hadith" class="mytext" v-if="qoh">{{ hadith_disp }}</div>

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
            v-bind:style="{fontSize: fonty(inputdataEn.text)}"
          >{{ inputdataEn.text }}</b-card-text>
        </b-card>
      </b-col>
    </b-row>

    <b-row align-h="center">
      <b-col cols="6" align-self="end">
        <b-button @click="rand(2)" variant="primary" class="custom-button">Next</b-button>
        <b-button @click="rand(1)" v-bind:variant="[change==1 ? 'primary' :'info']">
          <span class="change" v-show="change==1 ? true :false">
            <b-spinner small></b-spinner>Loading
          </span>
          <span v-show="change==0" class="custom-button">Random</span>
        </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
export default {
  props: {
    inputdataAr: Object,
    inputdataEn: Object,
    next: Function,
    randomize: Function,
    numberOfAyahs: Number,
    change: Number,
    hadith: Array,
    qoh: Boolean
  },
  data() {
    return {
      hadith_disp: ""
    };
  },
  computed: {
    more_info() {
      console.log("stuff could happen here");
      return "info";
    }
  },
  methods: {
    fonty(inp) {
      if (inp.length > 240) {
        return `15px`;
      }else if(inp.length < 170){
        return `17px`;
      }
      return `20px`;
      //
    },
    rand(i) {
      if (this.qoh) {
        this.randomhadith();
      } else {
        if (i == 1) {
          this.randomize();
        } else {
          this.next();
        }
      }
    },
    randomhadith() {
      this.hadith_disp = `${this.hadith[this.randomint(0, 1894)].En_Sanad} ${
        this.hadith[this.randomint(0, 1894)].En_Text
      }`;
    },
    randomint(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    }
  },
  mounted() {
    this.randomhadith();
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
  font-family: Amiri;
  /* font-Weight: bold; */
  color: rgb(194, 186, 186);
}
#english {
  font-size: 21px;
  /* font-Weight: bold; */
  color: rgb(194, 186, 186);
}
#bgb {
  margin-bottom: 35px;
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
  margin: 0 5px;
}
.mytext {
  margin-top: 25px;
  margin-bottom: 25px;
}
.custom-button {
  width: 100px;
  margin: 10px;
}
</style>