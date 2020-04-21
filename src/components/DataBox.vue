<template>
  <div class="data-box-container">
    <b-jumbotron>
      <template v-slot:lead>
          
          {{ inputdata.filename }}

      </template>

      <hr class="my-4" />

      <p>Hadith</p>

      <b-button variant="primary" href="#">Next button</b-button>
      <b-button @click="next" variant="success" href="#">Next</b-button>
    </b-jumbotron>
  </div>
</template>

<script>
export default {
    props: {
        inputdata: Object,
        next: Function
    }
}
</script>