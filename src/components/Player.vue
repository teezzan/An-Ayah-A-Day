<template>
  <b-row align-h="center" v-show="!qoh">
    <b-col cols="6" align-self="end" class="player">
      <b-button variant="primary" class="p10" @click="pause">{{playOrPause}}</b-button>
      <br />
      <br />
      <div style="color:blue;font-weight:bold;font-size:18px">
        <input @click="toggleAutoplay()" type="checkbox" id="autoplay" style="font-size:20px" />
        Autoplay
      </div>
      <!-- <input type="checkbox" id="checkbox" v-model="cont">Continous mode. -->
      <audio @ended="audioFinished()" ref="audplay" style="display: none">
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
      playOrPause: "Play"
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
        if (this.$refs.audplay.duration > 0) {
          this.playOrPause = "Pause";
        }
      } else {
        this.$refs.audplay.pause();
        this.playOrPause = "Continue";
      }
    },
    audioFinished() {
      this.playOrPause = "Play";
      if (typeof Storage !== "undefined") {
        if (sessionStorage.choice_of_autoplay) {
          this.next();
          this.$refs.audplay.play();
        }
      }
    },
    toggleAutoplay() {
      var autoplay = document.getElementById("autoplay");
      if (autoplay.checked == true) {
        if (typeof Storage !== "undefined") {
          sessionStorage.setItem("choice_of_autoplay", "autoplay");
          this.$refs.audplay.play();
        } else {
          alert("Not supported by your browser");
        }
      } else {
        sessionStorage.removeItem("choice_of_autoplay");
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
  },
  mounted() {}
};
</script>

<style scoped>
.player {
  margin-top: -10px;
  margin-bottom: 180px;
}
</style>
