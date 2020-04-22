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
    </b-container>
  </div>
</template>

<script>
import Header from "./components/Header.vue";
import DataBox from "./components/DataBox.vue";
export default {
  name: "App",
  components: {
    Header,
    DataBox
  },
  data() {
    return {
      info: {},
      index: 0
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
