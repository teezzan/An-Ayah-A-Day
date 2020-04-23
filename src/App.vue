<template>
  <div id="app">
    <Header />
    <b-container class="bv-example-row">
      <b-row>
        <b-col sm="6" offset="3">
          <DataBox 
          v-if="info.data"
          :inputdataEn="info.data[0].ayahs[index]"
          :inputdataAr="info.data[1].ayahs[index]"
          :numberOfAyahs="info.data[0].numberOfAyahs"
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
      url: ["http://localhost:3000/api/group/media/cdc132c6b549bdafc48e91b5725ba76d.mp3",
        "http://localhost:3000/api/group/media/55f715614e6f372cc00cbabd5604407c.mp3",
        "http://localhost:3000/api/group/media/21e46af06736eed5abac768d1db0bce1.mp3","","","",""
      ]
    };
  },
  methods: {
    next() {
      this.index++
    },
    randomize(){
      var rand=5;
      var fetchurl = `https://api.alquran.cloud/v1/surah/${rand}/editions/en.yusufali,ar.alafasy`;
      this.index=0;
      console.log(rand,fetchurl);
    },
    getdata(fetchurl){
      fetch(fetchurl, {
        method: "get"
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          this.info = jsonData;
        });
    }

  },
  mounted: function() {
    this.getdata("http://localhost:3000/api/users");
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
</style>
