<template>
  <div class="data-box-container">
    <b-jumbotron>
      <template v-slot:lead>{{ inputdata.filename }}</template>

      <hr class="my-4" />
      <b-jumbotron class="internal">
        <p v-for="[m_info, index] in inputdata.contentType" :key="index">{{ m_info }}</p>
      </b-jumbotron >

      <b-button @click="next" variant="success" href="#">Next</b-button>
      <b-button variant="primary" href="#">Random</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
  props: {
    inputdata: Object,
    next: Function
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