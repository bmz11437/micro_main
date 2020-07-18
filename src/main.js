import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min";

import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import ViewUI from "view-design";
import "view-design/dist/styles/iview.css";

import { getAppConfig } from "@/api";
import { initMicroApp } from "./initMicroApps";
// import $ from 'jquery'
Vue.config.productionTip = false;

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
