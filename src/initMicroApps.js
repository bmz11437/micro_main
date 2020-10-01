import {
  registerMicroApps,
  start,
  initGlobalState,
  addGlobalUncaughtErrorHandler,
  // setDefaultMountApp
} from "qiankun";

import store from "@/store";
import router from "@/router";
import * as req from "@/httpRequest";
const { onGlobalStateChange, setGlobalState } = initGlobalState({
  userInfo: {},
});

onGlobalStateChange(() => {});
addGlobalUncaughtErrorHandler((event) => console.log(event));
export async function initMicroApp(config) {
  let appsConfig = config.microApps;
  let apps = [];
  appsConfig.forEach((item) => {
    if (item.appType == "microApp") {
      apps.push({
        ...item,
        props: {
          req,
          config,
        },
      });
    }
  });
  registerMicroApps(apps);
  start({ sandbox: true });
}
export function setGlobalData(userInfo, mapConfig, resource) {
  if (!userInfo) {
    userInfo = store.getters.userInfo;
  }
  setGlobalState({
    userInfo,
    mapConfig,
    resource,
  });
}

router.beforeEach((to, from, next) => {
  if (!store.getters.userInfo.name && to.name !== "Login") {
    next({
      path: "/Login",
    });
    return;
  }
  if (!to.matched[0]) {
    if (!from.matched[0]) {
      next({
        path: "/Portal",
      });
    }
    return;
  } else {
    next();
  }

  if (to.matched[1] && to.matched[1].meta && to.matched[1].meta.activeRule) {
    setTimeout(() => {
      history.replaceState(null, null, to.matched[1].meta.activeRule);
      toggleMicroApp(true);
    }, 300);
  } else {
    toggleMicroApp(false);
  }
});

function toggleMicroApp(isShow) {
  let con = document.getElementById("micro_app");
  if (isShow) {
    con.style.display = "block";
  } else {
    con.style.display = "none";
  }
}
