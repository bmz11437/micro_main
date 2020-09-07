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
          ...headers
        }
      })
      .then(response => {
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
      .catch(error => {
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
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        if (response.status == 200) {
          let data = response.data;
          resolve(data);
        } else {
          iview.Message.error(response.message);
          reject(response);
        }
      })
      .catch(error => {
        iview.Message.error(error.response.data.message);
        reject(error);
        console.log(`${info}接口调用失败`);
      });
  });
}
export function BGET(url, info, params, headers = {}) {
  axios.defaults.withCredentials = true;
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params,
        headers: {
          ...headers,
          // "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          Cookie: `finger=1571944565; _uuid=68EDC73D-A1BA-CBF9-88F0-F5678349C7CC69539infoc; buvid3=C9D7DD47-313B-4630-9AE5-F6466D12206D155810infoc; LIVE_BUVID=AUTO1415738749393213; sid=bgxoujq7; CURRENT_FNVAL=16; stardustvideo=1; laboratory=1-1; rpdid=|(u))Jkl)kRJ0J'ul~J)~Rm)|; im_notify_type_123237907=0; im_notify_type_398709635=0; CURRENT_QUALITY=0; blackside_state=1; PVID=2; bp_video_offset_123237907=429268851523821861; bp_t_offset_123237907=429160008463018515; bfe_id=fdfaf33a01b88dd4692ca80f00c2de7f; DedeUserID=123237907; DedeUserID__ckMd5=47d6a0ad04fd5d86; SESSDATA=697c64dd%2C1614339469%2C82f75*81; bili_jct=8e8bba5f908c8345f2818fd13c5e7c6a`
        }
      })
      .then(response => {
        if (response.status == 200) {
          let data = response.data;
          resolve(data);
        } else {
          iview.Message.error(response.message);
          reject(response);
        }
      })
      .catch(error => {
        iview.Message.error(error.response.data.message);
        reject(error);
        console.log(`${info}接口调用失败`);
      });
  });
}
export function DELETE(url, info, params, headers = {}) {
  let token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        params,
        headers: {
          ...headers,
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        if (response.status === 200) {
          let data = response.data;
          resolve(data);
        } else {
          reject(response);
        }
      })
      .catch(error => {
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
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        if (response.status == 200) {
          resolve(response.data);
        } else {
          iview.Message.error(response.message);
          resolve(response);
        }
      })
      .catch(err => {
        console.error(`${info}接口调用失败`);
        iview.Message.error(err.response.data.message);
        reject(err.response);
      });
  });
}
export function PUT(url, info, params) {
  let token = localStorage.getItem("token");
  return new Promise((resolve, reject) => {
    axios
      .put(url, params, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          Authorization: "Bearer " + token
        }
      })
      .then(response => {
        if (response.status === 200) {
          resolve(response.data);
        } else {
          iview.Message.error(response.message);
          resolve(response);
        }
      })
      .catch(err => {
        console.error(`${info}接口调用失败`);
        iview.Message.error(err.response.data.message);
        reject(err.response);
      });
  });
}
