import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
// import VueSocialSharing from "vue-social-sharing";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "./App.vue";
import router from "./router";

// Vue.use(VueSocialSharing);

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
