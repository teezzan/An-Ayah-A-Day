<template>
  <div id="applet">
    <Header />

    <b-container id="extcon">
      <div class="mr-auto ml-auto" sm="4" id="switch">
        <label class="switch mt-2">
          <input type="checkbox" id="togBtn" v-model="qoh" />
          <div class="slider round">
            <span class="on">Hadith</span>
            <span class="off">Quran</span>
          </div>
        </label>
      </div>
      <!-- <div> -->
      <!-- <b-row align-h="center" v-if="!qoh">
        <b-col>
          <b-button variant="secondary" @click="showModal">Options</b-button>
        </b-col>

        <b-col>
          <Player
            v-if="info.data"
            :audioUrl="audioLink()"
            :next="next"
            :qoh="this.qoh"
            :checTemp="checTemp"
          />
        </b-col>
      </b-row>-->
      <b-button-group align-h="center" v-if="!qoh">
        <b-button
          style="border-top-left-radius:0.35rem;border-bottom-left-radius:0.35rem"
          class="custom-button"
          variant="secondary"
          @click="showModal"
        >Options</b-button>
        <Player
          style="border-radius:0;border-top-right-radius:0.35rem;border-bottom-right-radius:0.35rem"
          v-if="info.data"
          :audioUrl="audioLink()"
          :next="next"
          :qoh="this.qoh"
          :checTemp="checTemp"
        />
      </b-button-group>
      <div class="mt-1"></div>

      <!-- </div> -->
      <b-row id="outter">
        <b-col class="m-auto my-auto" sm="9">
          <DataBox
            v-if="info.data"
            :index="index"
            :info_arr="info.data"
            :inputdataEn="info.data[0].ayahs[index-1]"
            :inputdataAr="info.data[1].ayahs[index-1]"
            :numberOfAyahs="this.numberOfAyahs"
            :change="this.change"
            :next="next"
            :prev="prev"
            :randomize="randomize"
            :qoh="this.qoh"
            :hadith="this.hadith.AllChapters"
            :surah="currentSurah"
          />
        </b-col>
      </b-row>

      <!-- list the reciters -->

      <b-modal ref="my-modal" hide-footer>
        <div id="modalV">
          <div v-if="!qoh" id="surahName">
            {{ info.data[0].number }}. {{ info.data[0].englishName }} ({{
            info.data[0].englishNameTranslation
            }})
            <br />
            <small>Verse {{ index }}</small>
          </div>
          <div class="mt-3"></div>

          <b-row v-if="info.data">
            <b-col class="mr-auto ml-auto" v-if="!qoh">
              <label for="surah" class="mb-0">Jump to Surah</label>
              <b-input
                @input="updateSurah"
                v-model.number="currentSurah"
                type="number"
                class="ml-sm-auto"
                id="surah"
              ></b-input>
              <div class="mt-3"></div>
            </b-col>
          </b-row>

          <b-row v-if="info.data">
            <b-col class="mr-auto ml-auto" v-if="!qoh">
              <label for="ayah" class="mb-0">Jump to verse</label>
              <b-input v-model.number="index" type="number" class="ml-sm-auto" id="ayah"></b-input>
              <div class="mt-3"></div>
            </b-col>
          </b-row>

          <!-- Reciter and Continous -->
          <b-row>
            <b-col class="mr-auto ml-auto my-auto" sm="9" xm="7" offset="2">
              <div v-if="info.data">
                <label for="reciter" class="mb-0">Change reciter</label>
                <b-form-select v-model="selected_reciter" id="reciter" :options="options"></b-form-select>
                <div class="mt-3"></div>
                <input type="checkbox" v-model="checTemp" style="font-size:20px" id="ckbx" />
                Continuous autoplay
              </div>
            </b-col>
          </b-row>
        </div>

        <div class="mr-auto ml-auto text-center" sm="4" id="switch">
          <!-- <label class="switch">
            <input type="checkbox" id="togBtn" v-model="qoh" />
            <div class="slider round">
              <span class="on"> Hadith </span>
              <span class="off"> Quran </span>
            </div>
          </label>-->
          <b-button variant="secondary" class="p10 mt-4" @click="draw" v-show="true">Save and Share</b-button>
        </div>
      </b-modal>
    </b-container>
  </div>
</template>

<script>
import Header from "../components/Header.vue";
import DataBox from "../components/DataBox.vue";
import Player from "../components/Player.vue";
import hadith from "../assets/en";
import reciter from "../assets/verse_ar";
var FileSaver = require("file-saver");
const Jimp = require("jimp");
export default {
  components: {
    Header,
    DataBox,
    Player
  },
  data() {
    return {
      info: {},
      index: 1,
      bgd: 0,
      numberOfAyahs: 0,
      currentSurah: null,
      change: 0,
      qoh: false,
      hadith: hadith,
      reciter: reciter,
      selected_reciter: 37,
      options: [],
      checTemp: false,
      keep_ayah_on_surah_modified: false,
      permalink_ayah : false
    };
  },
  methods: {
    next() {
      this.index++;
    },
    prev() {
      this.index--;
    },
    randomint(min, max) {
      return Math.floor(Math.random() * (max - min + 1) + min);
    },
    randomize() {
      this.keep_ayah_on_surah_modified = false;
      this.currentSurah = this.randomint(0, 114);
      var fetchurl = `https://api.alquran.cloud/v1/surah/${this.currentSurah}/editions/en.yusufali,ar.alafasy`;
      // this.currentSurah = 2; //for local test
      // this.getdata("http://localhost:5001/pay/2", 0);
      this.getdata(fetchurl, 0);
    },
    updateSurah() {
      var fetchurl = `https://api.alquran.cloud/v1/surah/${this.currentSurah}/editions/en.yusufali,ar.alafasy`;
      // this.currentSurah = 2; //for local test
      // this.getdata("http://localhost:5001/pay/2", 0);
      this.keep_ayah_on_surah_modified = true;
      this.getdata(fetchurl, 0);
    },
    parseNum(num) {
      if (num / 10 < 1) {
        return `00${num}`;
      }

      if (num / 10 < 10) {
        return `0${num}`;
      }

      if (num / 10 >= 10) {
        return `${num}`;
      }
    },
    audioLink() {
      //https://verse.mp3quran.net/arabic/shaik_abu_baker_alshatri/64/001002.mp3
      if (this.selected_reciter != null) {
        if (typeof Storage !== "undefined") {
          localStorage.setItem("choice_of_reciter", this.selected_reciter);
        }

        var surah = this.parseNum(this.currentSurah);
        var ayah = this.parseNum(this.index);
        return `${
          this.reciter.reciters_verse[this.selected_reciter]
            .audio_url_bit_rate_64
        }${surah}${ayah}.mp3`;
      }
      return "";
    },
    parseName(name) {
      return name
        .substring(name.indexOf("/arabic/") + 8, name.indexOf("/64/"))
        .replace(/_/g, " ");
    },

    getdata(fetchurl, qh) {
      this.change = 1;
      fetch(fetchurl, {
        method: "get"
      })
        .then(response => {
          return response.json();
        })
        .then(jsonData => {
          if (qh == 0) {
            if (jsonData.data[0].numberOfAyahs != undefined) {
              this.info = jsonData;
              this.numberOfAyahs = jsonData.data[0].numberOfAyahs;
              if (!this.keep_ayah_on_surah_modified)
                if(this.permalink_ayah){
                   this.index = parseInt(this.$route.params.ayah)
                   this.permalink_ayah = false
                }
                else{
                this.index = this.randomint(0, this.numberOfAyahs - 1);}
              // this.index = 0;
              this.change = 0;
            } else {
              this.change = 2;
            }
          } else {
            this.reciter = jsonData;
          }
        });
    },
    bg() {
      return this.bgd();
    },
    reciter_option() {
      this.options = [];

      for (var i = 0; i < this.reciter.reciters_verse.length; i++) {
        if (this.reciter.reciters_verse[i].audio_url_bit_rate_64 != "") {
          var tempOption = {
            value: i,
            text: `${this.parseName(
              this.reciter.reciters_verse[i].audio_url_bit_rate_64
            )}`
          };
          if (tempOption.text != "0") {
            this.options.push(tempOption);
          }
        }
      }
    },

    showModal() {
      this.$refs["my-modal"].show();
    },
    cancelModal() {
      this.$refs["my-modal"].hide();
    },
    draw() {
      async function textOverlay() {
        const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
        const image = await Jimp.read(1000, 1000, 0x0000ffff);

        image.print(font, 10, 10, "Hello World!");
        image.getBase64(Jimp.MIME_PNG, (err, blob) => {
          FileSaver.saveAs(blob, "inlayworld.png");
        });
      }

      textOverlay();
    },
    write() {
      async function waterMark(waterMarkImage) {
        let watermark = await Jimp.read(waterMarkImage);
        watermark = watermark.resize(300, 300);
        const image = await Jimp.read(
          "https://images.pexels.com/photos/298842/pexels-photo-298842.jpeg"
        );
        watermark = await watermark;
        image
          .composite(watermark, 0, 0, {
            mode: Jimp.BLEND_SOURCE_OVER,
            opacityDest: 1,
            opacitySource: 0.5
          })
          .then(
            image.getBase64(Jimp.MIME_PNG, (err, blob) => {
              FileSaver.saveAs(blob, "inlayworld.png");
            })
          );
      }
      waterMark(
        "https://cdn-images-1.medium.com/fit/c/152/152/1*8I-HPL0bfoIzGied-dzOvA.png"
      );
    }
  },
  watch: {},
  mounted: function() {
    if (
      this.$route.params.ayah != undefined &&
      this.$route.params.surah != undefined
    ) {
      this.keep_ayah_on_surah_modified = false;
      this.permalink_ayah = true
      this.currentSurah = parseInt(this.$route.params.surah);
      var fetchurl = `https://api.alquran.cloud/v1/surah/${this.currentSurah}/editions/en.yusufali,ar.alafasy`;
      this.getdata(fetchurl, 0);
    } else {
      this.randomize();
    }

    this.reciter_option();

    if (typeof Storage !== "undefined") {
      if (localStorage.choice_of_reciter) {
        this.selected_reciter = localStorage.choice_of_reciter;
      }
    }

    var Trianglify = require("trianglify");
    var pattern = Trianglify({
      height: 1000,
      width: 3000,
      cell_size: this.randomint(70, 700)
    }).svg({ includeNamespace: true });

    // Take Trianglify SVG pattern and serialize it into XML string
    var patternString = new XMLSerializer().serializeToString(pattern);

    // URL encode the pattern and set into the proper format for SVG background
    var patternMin =
      'url("data:image/svg+xml,' + encodeURIComponent(patternString) + '")';

    // document.getElementById("background").style.backgroundImage = patternMin;

    document.body.style.backgroundImage = patternMin;
  }
};
</script>

<style>
@font-face {
  font-family: "Amiri";
  src: url("/../assets/fonts/Amiri-Italic.ttf") format("truetype");
  font-style: normal;
}

#applet {
  font-family: Amiri, Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  margin-top: 2%;
  width: 100%;
}
#tee {
  margin-top: 100px;
}
#dispinfo,
#modalV {
  /* font-family: Avenir, Helvetica, Arial, sans-serif; */
  font-size: 20px;
  margin-bottom: 2%;
  margin-left: 5%;
  color: rgba(0, 0, 0, 0.6);
  background-color: rgba(255, 255, 255, 0.5884);
}
#dispinfo:hover {
  background-color: rgba(0, 0, 0, 0.8);
  color: rgba(253, 253, 253, 0.9);
}
#surahname,
#ayahindex #ayahindexin {
  margin-top: 1px;
}
#ayahindexin {
  margin-top: 1px;
  background-color: rgba(0, 0, 0, 0);
  color: rgba(253, 253, 253, 0.6);
  text-justify: right;
  width: 58px;
  border: none;
}
#ayahindexin:hover {
  background-color: rgba(0, 0, 0, 0.8);
  color: rgba(253, 253, 253);
}
.modal-body {
  background-color: rgba(255, 255, 255, 0.493);
}

.switch {
  position: relative;
  display: inline-block;
  width: 90px;
  height: 34px;
}

.switch input {
  display: none;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #735d91;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 26px;
  width: 26px;
  left: 4px;
  bottom: 4px;
  background-color: white;
  -webkit-transition: 0.4s;
  transition: 0.4s;
}

input:checked + .slider {
  background-color: #98d69c;
}

input:focus + .slider {
  box-shadow: 0 0 1px #2196f3;
}

input:checked + .slider:before {
  -webkit-transform: translateX(55px);
  -ms-transform: translateX(55px);
  transform: translateX(55px);
}

/*------ ADDED CSS ---------*/
.on {
  display: none;
}

.on,
.off {
  color: white;
  position: absolute;
  transform: translate(-50%, -50%);
  top: 50%;
  left: 50%;
  font-size: 13px;
  font-family: Verdana, sans-serif;
}

input:checked + .slider .on {
  display: block;
}

input:checked + .slider .off {
  display: none;
}

.slider.round {
  border-radius: 34px;
}

.slider.round:before {
  border-radius: 50%;
}
#ckbx,
#switch {
  align-self: center;
}
.custom-button {
  width: 100px;
  /* margin: 10px; */
}
</style>
