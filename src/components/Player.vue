<template>
  <b-row align-h="center" >

      <b-col cols="6" align-self="end" >
    <audio controls ref="audplay">
      <source :src="aud" type="audio/mpeg" />Your browser does not support the audio element.
    </audio><br /><b-button variant="primary" class="p10" @click="pause">Pause/Play</b-button>
    </b-col>
  </b-row>
</template>

<script>
export default {
  data (){
    return{
      aud: this.audioUrl,
    }
  },
  props: {
    audioUrl: String,
    audioUrl1: String
  },
  methods: {
    pause() {
      // if (this.$refs.audplay.paused)
      // console.log(this.$refs.audplay.src);
      this.$refs.audplay.src =
        "http://localhost:3000/api/group/media/55f715614e6f372cc00cbabd5604407c.mp3";
      // this.$refs.audplay.reload;
      this.$refs.audplay.play();
      // else
      //     this.$refs.audplay.pause();
    },
    update() {
      (this.$refs.audplay.src = this.audioUrl), this.$refs.audplay.play();
      return this.audioUrl;
    }
  },
  watch: {
    audioUrl: function() {
      // this.$refs.audplay.src = this.audioUrl;
      if (this.$refs.audplay.paused){
        this.$refs.audplay.src = this.audioUrl;
        this.$refs.audplay.play();
        this.$refs.audplay.pause();
      }
      else{
        this.$refs.audplay.src = this.audioUrl;
        this.$refs.audplay.pause();
        this.$refs.audplay.play();
      }
      
    }
  }
};
</script>