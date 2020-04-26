<template>
  <div id="app">
    <Header />
    <b-container id="extcon" class="bv-example-row">
      <b-row id="outter">
        <b-col class="mr-auto ml-auto" sm="8" offset="2">
          <DataBox
            v-if="info.data"
            :inputdataEn="info.data[0].ayahs[index]"
            :inputdataAr="info.data[1].ayahs[index]"
            :numberOfAyahs="this.numberOfAyahs"
            :change="this.change"
            :next="next"
            :randomize="randomize"
          />
        </b-col>
      </b-row>
      <Player
        v-if="info.data"
        :audioUrl="this.url[index]"
        :audioUrl1="info.data[1].ayahs[index].audio"
      />
    </b-container>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import DataBox from "./components/DataBox.vue";
import Player from "./components/Player.vue";
import * as THREE from "three";
import NET from "vanta/dist/vanta.net.min";

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
      url: [
        "http://localhost:3000/api/group/media/cdc132c6b549bdafc48e91b5725ba76d.mp3",
        "http://localhost:3000/api/group/media/55f715614e6f372cc00cbabd5604407c.mp3",
        "http://localhost:3000/api/group/media/21e46af06736eed5abac768d1db0bce1.mp3",
        "",
        "",
        "",
        ""
      ],
      numberOfAyahs: 0,
      change: 0,
      vantaEffect: null
    };
  },
  methods: {
    next() {
      this.index++;
    },
    randomize() {
      var rand = this.randomint(0, 114);
      var pre = "http://localhost:3500/";
      var fetchurl = `https://api.alquran.cloud/v1/surah/${rand}/editions/en.yusufali,ar.alafasy`;
      this.getdata("http://localhost:3000/api/users/2");
      //this.getdata(pre + fetchurl);
      console.log(pre, fetchurl);
    },
    randomint(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    getdata(fetchurl) {
      this.change = 1;
      // console.log('1 ',this.change);
      fetch(fetchurl, {
        method: "get"
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          if (jsonData.data[0].numberOfAyahs != undefined) {
            this.info = jsonData;
            this.numberOfAyahs = jsonData.data[0].numberOfAyahs;
            // this.index=this.randomint(0,this.numberOfAyahs-1);
            this.index = 0;
            this.change = 0;
            // console.log('0 ',this.change);
          } else {
            this.change = 2;
          }
        });
    }
  },
  mounted: function() {
    this.vantaEffect = NET({
      el: "#app",
      THREE,
      color: 0x07690
    });

    this.getdata("http://localhost:3000/api/users");
    //this.getdata("https://api.alquran.cloud/v1/surah/1/editions/en.yusufali,ar.alafasy");
    // setInterval(() => {
    //   this.vantaEffect.setOptions({
    //     color: 0xff88cc
    //   });
    // }, 5000);
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
#tee {
  margin-top: 100px;
}
</style>
