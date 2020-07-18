import {
  registerMicroApps,
  start,
  initGlobalState,
  // setDefaultMountApp
} from "qiankun";
import store from "@/store";
import router from "@/router";
import * as req from "@/httpRequest";
const { onGlobalStateChange, setGlobalState } = initGlobalState({
  userInfo: {},
});

onGlobalStateChange(() => {});

export async function initMicroApp(config) {
  let appsConfig = config.microApps;
  let apps = [];
  appsConfig.forEach((item) => {
    apps.push({
      ...item,
      props: {
        req,
        config,
      },
    });
  });
  registerMicroApps(apps);
  start({ sandbox: false, prefetch: "all" });
}
export function setGlobalData(userInfo, mapConfig) {
  if (!userInfo) {
    userInfo = store.getters.userInfo;
  }
  setGlobalState({
    userInfo,
    mapConfig,
  });
}

router.beforeEach(async (to, from, next) => {
  toggleMicroApp(false);
  console.log(to, from);
  next();
});

function toggleMicroApp(isShow) {
  let con = document.getElementById("micro_app");
  if (isShow) {
    con.style.display = "block";
  } else {
    con.style.display = "none";
  }
}
