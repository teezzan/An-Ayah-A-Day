<template>
  <div>
    <button @click="turn_share_off" style="margin-left:0px;padding-left:0px">
      <ShareNetwork
        style="cursor:pointer;margin:4px"
        v-for="network in networks"
        :network="network.network"
        :key="network.key"
        :style="{ backgroundColor: network.color }"
        :url="url"
        :title="title"
        :description="description"
        :quote="quote"
        :hashtags="hashtags"
        :twitterUser="twitterUser"
      >
        <i :class="network.icon"></i>
        <span>{{ network.name }}</span>
      </ShareNetwork>
    </button>
  </div>
</template>

<script>
export default {
  name: "SocialShare",
  props: {
    arabic: Object,
    english: Object,
    surah: Array,
    surah_number: Number
  },
  methods: {
    turn_share_off() {
      this.$emit("turn_share_off");
    }
  },
  mounted: function() {
    const hostname = window.location.hostname;
    this.url = `${hostname}/${this.surah_number}/${this.verse}`;
  },
  data() {
    return {
      verse: this.arabic.numberInSurah,
      url: "",
      title: `*Surah ${this.surah[0].englishName} Verse ${this.arabic.numberInSurah}*`,
      description: `${this.english.text}. \n ${this.arabic.text}.`,
      hashtags: "Quran,Hadith,Islam",
      twitterUser: "Hadith_Bot",
      networks: [
        // {
        //   network: "baidu",
        //   name: "Baidu",
        //   icon: "fas fah fa-lg fa-paw",
        //   color: "#2529d8",
        // },
        // {
        //   network: "buffer",
        //   name: "Buffer",
        //   icon: "fab fah fa-lg fa-buffer",
        //   color: "#323b43",
        // },
        // {
        //   network: "email",
        //   name: "Email",
        //   icon: "far fah fa-lg fa-envelope",
        //   color: "#333333",
        // },
        // {
        //   network: "evernote",
        //   name: "Evernote",
        //   icon: "fab fah fa-lg fa-evernote",
        //   color: "#2dbe60",
        // },
        {
          network: "facebook",
          name: "Facebook",
          // icon: "fab fah fa-lg fa-facebook-f",
          color: "#1877f2"
        },
        // {
        //   network: "flipboard",
        //   name: "Flipboard",
        //   icon: "fab fah fa-lg fa-flipboard",
        //   color: "#e12828",
        // },
        // {
        //   network: "hackernews",
        //   name: "HackerNews",
        //   icon: "fab fah fa-lg fa-hacker-news",
        //   color: "#ff4000",
        // },
        // {
        //   network: "instapaper",
        //   name: "Instapaper",
        //   icon: "fas fah fa-lg fa-italic",
        //   color: "#428bca",
        // },
        // {
        //   network: "line",
        //   name: "Line",
        //   icon: "fab fah fa-lg fa-line",
        //   color: "#00c300",
        // },
        // {
        //   network: "linkedin",
        //   name: "LinkedIn",
        //   icon: "fab fah fa-lg fa-linkedin",
        //   color: "#007bb5",
        // },
        // {
        //   network: "odnoklassniki",
        //   name: "Odnoklassniki",
        //   icon: "fab fah fa-lg fa-odnoklassniki",
        //   color: "#ed812b",
        // },
        // {
        //   network: "pinterest",
        //   name: "Pinterest",
        //   icon: "fab fah fa-lg fa-pinterest",
        //   color: "#bd081c"
        // },
        // {
        //   network: "pocket",
        //   name: "Pocket",
        //   icon: "fab fah fa-lg fa-get-pocket",
        //   color: "#ef4056",
        // },
        // {
        //   network: "quora",
        //   name: "Quora",
        //   icon: "fab fah fa-lg fa-quora",
        //   color: "#a82400",
        // },
        {
          network: "reddit",
          name: "Reddit",
          // icon: "fab fah fa-lg fa-reddit-alien",
          color: "#ff4500"
        },
        // {
        //   network: "skype",
        //   name: "Skype",
        //   icon: "fab fah fa-lg fa-skype",
        //   color: "#00aff0",
        // },
        {
          network: "sms",
          name: "SMS",
          // icon: "far fah fa-lg fa-comment-dots",
          color: "white"
        },
        // {
        //   network: "stumbleupon",
        //   name: "StumbleUpon",
        //   icon: "fab fah fa-lg fa-stumbleupon",
        //   color: "#eb4924",
        // },
        // {
        //   network: "telegram",
        //   name: "Telegram",
        //   icon: "fab fah fa-lg fa-telegram-plane",
        //   color: "#0088cc",
        // },
        // {
        //   network: "tumblr",
        //   name: "Tumblr",
        //   icon: "fab fah fa-lg fa-tumblr",
        //   color: "#35465c",
        // },
        {
          network: "twitter",
          name: "Twitter",
          // icon: "fab fah fa-lg fa-twitter",
          color: "#1da1f2"
        },
        // {
        //   network: "viber",
        //   name: "Viber",
        //   icon: "fab fah fa-lg fa-viber",
        //   color: "#59267c",
        // },
        // {
        //   network: "vk",
        //   name: "Vk",
        //   icon: "fab fah fa-lg fa-vk",
        //   color: "#4a76a8",
        // },
        // {
        //   network: "weibo",
        //   name: "Weibo",
        //   icon: "fab fah fa-lg fa-weibo",
        //   color: "#e9152d",
        // },
        {
          network: "whatsapp",
          name: "Whatsapp",
          // icon: "fab fah fa-lg fa-whatsapp",
          color: "#25d366"
        }
        // {
        //   network: "wordpress",
        //   name: "Wordpress",
        //   icon: "fab fah fa-lg fa-wordpress",
        //   color: "#21759b",
        // },
        // {
        //   network: "xing",
        //   name: "Xing",
        //   icon: "fab fah fa-lg fa-xing",
        //   color: "#026466",
        // },
        // {
        //   network: "fakeblock",
        //   name: "Custom Network",
        //   icon: "fab fah fa-lg fa-vuejs",
        //   color: "#41b883",
        // },
      ]
    };
  }
};
</script>
