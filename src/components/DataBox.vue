<template>
  <div class="data-box-container">
    <b-jumbotron>
      <template v-slot:lead>{{ inputdataAr.text }}</template>

      <hr class="my-4" />
      <b-jumbotron class="internal">
        <!-- <p v-for="m_info in inputdata.audioSecondary" :key="m_info">{{ m_info }}</p> -->
        <!-- <p>  {{ inputdata.audioSecondary[1] }} </p> -->
        <template v-slot:lead>{{ inputdataEn.text }}</template>
      </b-jumbotron >

      <b-button @click="next" variant="success" href="#">Next</b-button>
      <b-button @click="randomize" variant="primary" href="#">Random</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  props: {
    inputdataAr: Object,
    inputdataEn: Object,
    next: Function,
    randomize: Function,
    numberOfAyahs: Number
  },
  computed: {
    more_info() {
      console.log("stuff could happen here");
      return "info";
    }
  }
};
</script>

<style scoped>
.internal {
    margin-bottom: 10px;
}
.btn {
  margin: 0 5px;
}
</style>