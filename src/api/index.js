import { JGET, POST, GET } from "@/httpRequest";
import store from "@/store";
export function getAppConfig() {
  return JGET("/static/appConfig.hjson");
}

export function getUserInfo(appId, time, signature, param) {
  return POST(
    `https://oapi.dingtalk.com/sns/getuserinfo_bycode?accessKey=${appId}&timestamp=${time}&signature=${signature}`,
    "获取用户信息",
    param
  );
}

export function login(param) {
  let baseUrl = store.getters.appConfig.api;
  return POST(baseUrl + `/user/login`, "用户登录", param);
}

export function getInfo() {
  let baseUrl = store.getters.appConfig.api;
  return GET(baseUrl + `/user`, "获取用户信息");
}
