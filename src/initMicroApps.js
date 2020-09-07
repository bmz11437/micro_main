import {
  registerMicroApps,
  start,
  initGlobalState
  // setDefaultMountApp
} from "qiankun";

import store from "@/store";
import router from "@/router";
import * as req from "@/httpRequest";
const { onGlobalStateChange, setGlobalState } = initGlobalState({
  userInfo: {}
});

onGlobalStateChange(() => {});

export async function initMicroApp(config) {
  let appsConfig = config.microApps;
  let apps = [];
  appsConfig.forEach(item => {
    if (item.type == "microApp") {
      apps.push({
        ...item,
        props: {
          req,
          config
        }
      });
    }
  });
  registerMicroApps(apps);
  start({
    sandbox: false,
    prefetch: "all",
    fetch(url, ...args) {
      if (url.indexOf("%5Coms%5Cstatic%5Cjs%5C1") > -1) {
        return {
          async text() {
            return "";
          }
        };
      }
      return window.fetch(url, ...args);
    }
  });
}
export function setGlobalData(userInfo, mapConfig) {
  if (!userInfo) {
    userInfo = store.getters.userInfo;
  }
  setGlobalState({
    userInfo,
    mapConfig
  });
}

router.beforeEach((to, from, next) => {
  if (!store.getters.userInfo.name && to.name !== "Login") {
    next({
      path: "/Login"
    });
    return;
  }
  if (!to.matched[0]) {
    if (!from.matched[0]) {
      next({
        path: "/Portal"
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
