<template>
  <div>
    <audio controls ref="audplay">
        <source :src="audioUrl"  type="audio/mpeg">
        Your browser does not support the audio element.
    </audio>
    <b-button variant="primary" @click="pause">Pause/Play</b-button>
  </div>
</template>

<script>
export default {
    props: {
        audioUrl: String
  },
  methods: {
      pause(){
        
            if (this.$refs.audplay.paused) 
                // console.log(this.$refs.audplay.src);
                // this.$refs.audplay.src = "http://localhost:3000/api/group/media/55f715614e6f372cc00cbabd5604407c.mp3";
                // this.$refs.audplay.reload;
                this.$refs.audplay.play(); 
            else 
                this.$refs.audplay.pause(); 
         
      }
  }
    
}
</script>