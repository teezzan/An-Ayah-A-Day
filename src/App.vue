<template>
  <div id="app" v-bind:style="{backgroundColor: `#${bgd}`}">
    <Header />
    <b-row id="dispinfo">
      <b-col
        id="surahname"
        class="mr-auto ml-auto"
        sm="4"
      >{{info.data[0].number}}. {{info.data[0].englishName}} ({{info.data[0].englishNameTranslation}})</b-col>
      <b-col id="ayahindex" class="mr-auto ml-auto" sm="6">
        <b-input id="ayahindexin" v-model="index" :value="index" class="ml-sm-auto"></b-input>
      </b-col>
    </b-row>
    <b-container id="extcon" class="bv-example-row">
      <b-row id="outter">
        <b-col class="mr-auto ml-auto my-auto" sm="8" offset="2">
          <DataBox
            v-if="info.data"
            :inputdataEn="info.data[0].ayahs[index]"
            :inputdataAr="info.data[1].ayahs[index]"
            :numberOfAyahs="this.numberOfAyahs"
            :change="this.change"
            :next="next"
            :randomize="randomize"
            :qoh="false"
          />
        </b-col>
      </b-row>
      <Player v-if="info.data" 
      :audioUrl="info.data[1].ayahs[index].audio"
      :next="next" />
    </b-container>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import DataBox from "./components/DataBox.vue";
import Player from "./components/Player.vue";

export default {
  name: "App",
  components: {
    Header,
    DataBox,
    Player
  },
  data() {
    return {
      info: {},
      index: 0,
      bgd: 0,
      numberOfAyahs: 0,
      change: 0,
      hadith: {}
    };
  },
  methods: {
    next() {
      this.index++;
    },
    randomize() {
      var rand = this.randomint(0, 114);
      // var pre = "http://localhost:3500/";
      var fetchurl = `https://api.alquran.cloud/v1/surah/${rand}/editions/en.yusufali,ar.alafasy`;
      // this.getdata("http://localhost:5001/pay/2", 0);
      this.getdata(fetchurl,0);
     // console.log(fetchurl);
    },
    randomint(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    getdata(fetchurl, qh) {
      this.change = 1;
      fetch(fetchurl, {
        method: "get"
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          if (qh == 0) {
            if (jsonData.data[0].numberOfAyahs != undefined) {
              this.info = jsonData;
              this.numberOfAyahs = jsonData.data[0].numberOfAyahs;
              this.index=this.randomint(0,this.numberOfAyahs-1);
              // this.index = 0;
              this.change = 0;
            } else {
              this.change = 2;
            }
          } else {
            this.hadith = jsonData;
            //console.log(jsonData);
          }
        });
    },
    bg() {
      return this.bgd();
    }
  },
  mounted: function() {
    this.randomize();
  }
};
</script>

<style>
@font-face {
  font-family: "Amiri";
  src: url("/../assets/fonts/Amiri-Italic.ttf") format("truetype");
  font-style: normal;
}

#app {
  font-family: Amiri, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  /* background-color: rgb(34, 53, 89); */
  margin-top: 60px;
  /* background: url(http://localhost:5001/image/0194513bd3af713611be53a0a183505b.jpg) no-repeat center center;
  background-size: cover; */
}
#tee {
  margin-top: 100px;
}
#dispinfo {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-size: 20px;
  margin-bottom: 18px;
  color: rgba(253, 253, 253, 0.6);
  background-color: rgba(0, 0, 0, 0.6);
}
#dispinfo:hover {
  background-color: rgba(0, 0, 0, 0.8);
  color: rgba(253, 253, 253, 0.9);
}
#surahname,
#ayahindex #ayahindexin {
  margin-top: 1px;
}
#ayahindexin {
  margin-top: 1px;
  background-color: rgba(0, 0, 0, 0);
  color: rgba(253, 253, 253, 0.6);
  text-justify: right;
  width: 58px;
  border: none;
}
#ayahindexin:hover {
  background-color: rgba(0, 0, 0, 0.8);
  color: rgba(253, 253, 253);
}
</style>
