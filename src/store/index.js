import Vue from "vue";
import Vuex from "vuex";
import { setGlobalData } from "@/initMicroApps";
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    appConfig: null,
    userInfo: {},
    resource: [],
  },
  mutations: {
    appConfig(state, data) {
      state.appConfig = data;
    },
    userInfo(state, data) {
      state.userInfo = data;
      // setGlobalData(data);
    },
    resource(state, data) {
      state.resource = data;
      setGlobalData(null, null, data);
    },
  },
  actions: {},
  modules: {},
  getters: {
    appConfig: (state) => state.appConfig,
    userInfo: (state) => state.userInfo,
    resource: (state) => state.resource,
  },
});
