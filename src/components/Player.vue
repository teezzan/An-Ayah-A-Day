<template>
  <div align-h="center" v-show="!qoh">
    <!-- <b-col cols="6" align-self="end" class="player"> -->
    <b-button
      style="border-radius:0;border-top-right-radius:0.35rem;border-bottom-right-radius:0.35rem"
      class="custom-button"
      variant="secondary"
      @click="pause"
    >
      {{
      playOrPause
      }}
    </b-button>
    <!-- <div style="color:blue;font-weight:bold;font-size:18px"> -->
    <!-- <input
        @click="toggleAutoplay(chec)"
        type="checkbox"
        v-model="chec"
        id="autoplay"
        style="font-size:20px"
        v-show="false"
    />-->
    <!-- Autoplay -->
    <!-- </div> -->
    <audio @ended="audioFinished()" ref="audplay" style="display: none">
      <source :src="aud" type="audio/mpeg" />Your browser does not support the audio element.
    </audio>
    <!-- <br /> -->
    <!-- </b-col> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      aud: this.audioUrl,
      playOrPause: "Play",
      chec: false
    };
  },
  props: {
    audioUrl: String,
    next: Function,
    qoh: Boolean,
    checTemp: Boolean
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
          if (this.$refs.audplay.duration > 0) {
            this.playOrPause = "Pause";
          }
        }
      }
    },
    toggleAutoplay(chec) {
      // var autoplay = document.getElementById("autoplay");
      if (chec == true) {
        if (typeof Storage !== "undefined") {
          sessionStorage.setItem("choice_of_autoplay", "autoplay");
          this.$refs.audplay.play();
          if (this.$refs.audplay.duration > 0) {
            this.playOrPause = "Pause";
          }
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
      }
    },
    checTemp: function() {
      this.chec = this.checTemp;
      this.toggleAutoplay(this.chec);
    }
  },
  mounted() {
    if (typeof Storage !== "undefined") {
      sessionStorage.removeItem("choice_of_autoplay");
    }
  }
};
</script>

<style scoped>
.player {
  margin-top: 5px;
  margin-bottom: 15px;
}
</style>
