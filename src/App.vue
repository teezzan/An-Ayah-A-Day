<template>
  <div id="app" v-bind:style="{backgroundColor: `#${bgd}`}">
    <Header />
    <b-row id="dispinfo">
      <b-col
        id="surahname"
        class="mr-auto ml-auto"
        sm="4"
        v-if="!qoh"
      >{{info.data[0].number}}. {{info.data[0].englishName}} ({{info.data[0].englishNameTranslation}})</b-col>

      <b-col class="mr-auto ml-auto" sm="4">
        <!-- <span>Hadith</span>
        <div class="custom-control custom-switch">
          <input type="checkbox" class="custom-control-input" id="customSwitch1" v-model="qoh" />
          <label class="custom-control-label" for="customSwitch1">Quran</label>
        </div>-->
        <label class="switch">
          <input type="checkbox" id="togBtn" v-model="qoh" />
          <div class="slider round">
            <span class="on">Hadith</span>
            <span class="off">Quran</span>
          </div>
        </label>
      </b-col>

      <b-col id="ayahindex" class="mr-auto ml-auto" v-if="!qoh">
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
            :qoh="this.qoh"
            :hadith="this.hadith.AllChapters"
          />
        </b-col>
      </b-row>
      <Player
        v-if="info.data"
        :audioUrl="info.data[1].ayahs[index].audio"
        :next="next"
        :qoh="this.qoh"
      />
    </b-container>
    <div class="onesignal-customlink-container"></div>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import DataBox from "./components/DataBox.vue";
import Player from "./components/Player.vue";
import hadith from "./assets/en";
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
      qoh: false,
      hadith: hadith
      // raw: raw,
    };
  },
  methods: {
    next() {
      this.index++;
    },
    // gethadith() {

    //   var parsed = JSON.parse(this.raw);
    //   this.hadith = parsed;
    // },
    randomize() {
      var rand = this.randomint(0, 114);
      // var pre = "http://localhost:3500/";
      var fetchurl = `https://api.alquran.cloud/v1/surah/${rand}/editions/en.yusufali,ar.alafasy`;
      // this.getdata("http://localhost:5001/pay/2", 0);
      this.getdata(fetchurl, 0);
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
              this.index = this.randomint(0, this.numberOfAyahs - 1);
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
    // this.gethadith();
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

.switch {
  position: relative;
  display: inline-block;
  width: 90px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #735d91;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #98d69c;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(55px);
  -ms-transform: translateX(55px);
  transform: translateX(55px);
}

/*------ ADDED CSS ---------*/
.on {
  display: none;
}

.on,
.off {
  color: white;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  font-size: 10px;
  font-family: Verdana, sans-serif;
}

input:checked + .slider .on {
  display: block;
}

input:checked + .slider .off {
  display: none;
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
</style>
