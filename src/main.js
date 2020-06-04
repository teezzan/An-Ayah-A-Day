import Vue from "vue";
import { BootstrapVue, BootstrapVueIcons } from "bootstrap-vue";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

import App from "./App.vue";
import VueSocialSharing from "vue-social-sharing";
Vue.use(VueSocialSharing);

Vue.use(BootstrapVue);
Vue.use(BootstrapVueIcons);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
