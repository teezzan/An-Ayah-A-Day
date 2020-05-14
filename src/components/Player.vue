<template>
  <b-row align-h="center" v-show="!qoh">
    <b-col cols="6" align-self="end" class="player">
      <b-button variant="primary" class="p10" @click="pause">{{playOrPause}}</b-button>
      <!-- <input type="checkbox" id="checkbox" v-model="cont">Continous mode. -->
      <audio controls ref="audplay" style="display: none">
        <source :src="aud" type="audio/mpeg" />Your browser does not support the audio element.
      </audio>
      <br />
    </b-col>
  </b-row>
</template>

<script>
export default {
  data() {
    return {
      aud: this.audioUrl,
      cont: false,
      playOrPause: "Play";
    };
  },
  props: {
    audioUrl: String,
    next: Function,
    qoh: Boolean
  },
  methods: {
    pause() {
      if (this.$refs.audplay.paused) {
        this.$refs.audplay.play();
        if (this.$refs.audplay.duration > 0){
          this.playOrPause = "Pause"; 
       }
      } else {
        this.$refs.audplay.pause();
        this.playOrPause = "Play";
      }
    },
    update() {
      (this.$refs.audplay.src = this.audioUrl), this.$refs.audplay.play();
      return this.audioUrl;
    }
  },
  watch: {
    audioUrl: function() {
      // this.$refs.audplay.src = this.audioUrl;
      if (this.$refs.audplay.paused) {
        this.$refs.audplay.src = this.audioUrl;
        this.$refs.audplay.play();
        this.$refs.audplay.pause();
      } else {
        this.$refs.audplay.src = this.audioUrl;
        this.$refs.audplay.pause();
        this.$refs.audplay.play();
        if (this.cont) {
          // setTimeout(() => {
          //   // this.next();
          //   alert("hiiii")
          // } ,1000)//(this.$refs.audplay.duration * 1000) + 1500);
        }
      }
    }
  }
};
</script>

<style scoped>
.player {
  margin-top: -10px;
  margin-bottom: 180px;
}
</style>
