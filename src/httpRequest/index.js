import axios from "axios";
import hjson from "hjson";
import iview from "view-design";

export function JGET(url, info, params, headers = {}) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
        headers: {
          "Access-Control-Allow-Origin": "*",
          "Cache-Control": "no-cache, no-store, must-revalidate",
          ...headers,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          let data = response.data;
          if (typeof response.data == "string") {
            data = hjson.parse(response.data);
          }
          resolve(data);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
        console.log(`${info}接口调用失败`);
      });
  });
}

export function GET(url, info, params, headers = {}) {
  let token = localStorage.getItem("token");

  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
        headers: {
          ...headers,
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          let data = response.data;
          resolve(data);
        } else {
          reject(response);
        }
      })
      .catch((error) => {
        reject(error);
        console.log(`${info}接口调用失败`);
      });
  });
}

export function POST(url, info, params) {
  let token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    axios
      .post(url, params, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          token,
        },
      })
      .then((response) => {
        if (response.status == 200) {
          resolve(response.data);
        } else {
          iview.Message.error(response.message);
          resolve(response);
        }
      })
      .catch((err) => {
        console.error(`${info}接口调用失败`);
        iview.Message.error(err.response.data.message);
        reject(err.response);
      });
  });
}
