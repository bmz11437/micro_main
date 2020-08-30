import "whatwg-fetch";
import "custom-event-polyfill";
import "core-js/stable/promise";
import "core-js/stable/symbol";
import "core-js/stable/string/starts-with";
import "core-js/web/url";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";

import "fullpage.js/vendors/scrolloverflow"; // Optional. When using scrollOverflow:true

import VueFullPage from "vue-fullpage.js";

import { getAppConfig } from "@/api";
import { initMicroApp } from "./initMicroApps";
import "./register/index";
// import $ from 'jquery'
Vue.config.productionTip = false;

Vue.use(VueFullPage);
Vue.use(ViewUI);

async function initApp() {
  let config = await getAppConfig();
  const env = process.env.NODE_ENV;
  store.commit("appConfig", config[env]);
  initMicroApp(config[env]);
  new Vue({
    router,
    store,
    render: (h) => h(App),
  }).$mount("#app");
}
initApp();
