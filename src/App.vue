<template>
  <div id="app">
    <Header />
    <b-container class="bv-example-row">
      <b-row>
        <b-col sm="6" offset="3">
          <DataBox 
          v-if="info.data"
          :inputdata="info.data.ayahs[index]"
          :next="next"
          />
        </b-col>
      </b-row>
      <Player 
        :audioUrl="this.url[index]"
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
    }

  },
  mounted: function() {
    fetch("http://localhost:3000/api/users", {
      method: "get"
    })
      .then(response => {
        return response.json();
      })
      .then(jsonData => {
        this.info = jsonData;
      });
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
