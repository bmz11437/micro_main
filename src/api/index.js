import { JGET, POST, GET } from "@/httpRequest";
import store from "@/store";
export function getAppConfig() {
  return JGET("static/appConfig.hjson");
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
  return GET(baseUrl + `/user/getUserInfo`, "获取用户信息");
}

export function regisUser(param) {
  let baseUrl = store.getters.appConfig.api;

  return POST(baseUrl + `/user`, "用户注册", param);
}

export function log(param) {
  let baseUrl = store.getters.appConfig.api;

  return POST(baseUrl + `/log`, "用户注册", param);
}

export function getResource() {
  let baseUrl = store.getters.appConfig.api;
  return GET(baseUrl + `/user/resource`, "获取用户资源");
}
