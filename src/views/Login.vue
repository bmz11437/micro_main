<template>
  <div class="login">
    <div class="container">
      <div class="row">
        <div class="login-container col-md-3 col-sm-8 col-xs-12">
          <div class="login-content">
            <div class="toggle-login">
              <div class="pic" :class="{bg1:showErWei,bg2:!showErWei}" @click="handleShowErWei"></div>
            </div>
            <div class="login-header">
              <h3>
                <strong>{{title}}</strong>
              </h3>
              <h5
                v-if="false"
              >Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis quam numquam</h5>
            </div>
            <div class="login-body" v-show="!showErWei&&!isRegis">
              <div class="form-group">
                <div class="pos-r">
                  <input
                    v-model="name"
                    type="text"
                    placeholder="Username..."
                    class="form-username form-control"
                  />
                  <i class="fa fa-user"></i>
                </div>
              </div>
              <div class="form-group">
                <div class="pos-r">
                  <input
                    v-model="password"
                    type="password"
                    placeholder="Password..."
                    class="form-password form-control"
                  />
                  <i class="fa fa-lock"></i>
                </div>
              </div>
              <div class="form-group">
                <button class="btn btn-primary form-control" @click="userLogin">
                  <strong>登录</strong>
                </button>
                <button class="btn btn-success form-control" @click="showRegister">
                  <strong>注册</strong>
                </button>
              </div>
            </div>
            <div class="login-body" v-show="isRegis">
              <div class="form-group">
                <div class="pos-r">
                  <input
                    v-model="name"
                    type="text"
                    placeholder="请输入登陆名..."
                    class="form-username form-control"
                  />
                  <i class="fa fa-user"></i>
                </div>
              </div>
              <div class="form-group">
                <div class="pos-r">
                  <input
                    v-model="name2"
                    type="text"
                    placeholder="请输入用户名..."
                    class="form-username form-control"
                  />
                  <i class="fa fa-user"></i>
                </div>
              </div>
              <div class="form-group">
                <div class="pos-r">
                  <input
                    v-model="password"
                    type="password"
                    placeholder="请输入密码..."
                    class="form-password form-control"
                  />
                  <i class="fa fa-lock"></i>
                </div>
              </div>
              <div class="form-group">
                <div class="pos-r">
                  <input
                    v-model="password2"
                    type="password"
                    placeholder="请再次输入密码..."
                    class="form-password form-control"
                  />
                  <i class="fa fa-lock"></i>
                </div>
              </div>
              <div class="form-group">
                <div class="btn-group" role="group" aria-label="..." style="width:100%">
                  <button class="btn btn-primary form-control" @click="handleRegis">
                    <strong>确定</strong>
                  </button>
                  <button class="btn btn-info form-control" @click="showRegister">
                    <strong>取消</strong>
                  </button>
                </div>
              </div>
            </div>
            <div class="erwei-page" v-show="showErWei">
              <div class="ding-login" id="dingCon"></div>
            </div>
          </div>
          <div class="login-footer text-center template" v-if="false">
            <h5>
              Don't have an account?
              <a href="#" class="bold">Sign up</a>
            </h5>
            <h5>
              Bootstrap login template made by
              <a href="#" class="bold">Mohamed Azouaoui</a>
            </h5>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HmacSHA256 from "crypto-js/hmac-sha256";
import { getUserInfo, login, getInfo, regisUser, getResource } from "@/api";
import Base64 from "crypto-js/enc-base64";
export default {
  name: "Login",
  data() {
    return {
      isRegis: false,
      name: "",
      password: "",
      name2: "",
      password2: "",
      appId: "dingoaybjwr1ydtutbvpkk",
      backUrl: "http://localhost:9527/#/Login",
      picUrl: `https://oapi.dingtalk.com/connect/qrconnect?appid=dingoaybjwr1ydtutbvpkk&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=http://localhost:9527/#/Login`,
      showErWei: false
    };
  },
  computed: {
    title() {
      return this.isRegis ? "注册" : "登陆";
    }
  },
  mounted() {
    // this.dingLogin();
    // this.getLoginUrl();
  },
  methods: {
    async handleRegis() {
      if (this.password !== this.password2) {
        this.$Message.error("密码不一致！");
        return;
      }
      let res = await regisUser({
        name: this.name,
        userName: this.name2,
        password: this.password,
        type: "user"
      });
      console.log(res);
      this.$Message.success("注册成功！");
      this.showRegister();
    },
    showRegister() {
      this.isRegis = !this.isRegis;
    },
    dingLogin() {
      // 这边需要用 $nextTick() 方法来等DOM渲染完成后，才能获取到盒子容器（$nextTick 方法见另一篇文章）
      this.$nextTick(() => {
        // 钉钉登录，参数文档中那些其他项就不展示了，按照文档自己配置就可以
        let obj = window.DDLogin({
          id: "dingCon",
          goto: encodeURIComponent(this.picUrl),
          style: "border:none;background-color:#FFFFFF;"
        });
        // 重置扫码登录框的样式，让登录框居中
        let box = document.getElementById("dingCon");
        box.querySelector("iframe").style.minHeight = "250px";
        box.querySelector("iframe").style.width = "100%";
        box.querySelector("iframe").style.height = "100%";
        console.log(obj);
      });
    },
    async getLoginUrl() {
      let appId = this.appId;
      // let backUrl = this.backUrl;
      let handleMessage = async event => {
        let origin = event.origin;

        if (origin == "https://login.dingtalk.com") {
          let loginTmpCode = event.data;
          let time = Date.now();
          let sign = this.getSign();
          await getUserInfo(appId, time, sign, {
            tmp_auth_code: loginTmpCode
          });
          // window.location = `https://oapi.dingtalk.com/connect/oauth2/sns_authorize?appid=${appId}&response_type=code&scope=snsapi_login&state=STATE&redirect_uri=${backUrl}&loginTmpCode=${loginTmpCode}`;
        }
      };
      if (typeof window.addEventListener != "undefined") {
        window.addEventListener("message", handleMessage, false);
      } else if (typeof window.attachEvent != "undefined") {
        window.attachEvent("onmessage", handleMessage);
      }
    },
    getSign() {
      const hmac = HmacSHA256(
        Date.now(),
        "wnMB6kIt-d-Bg8oGVa009RHNdG77YTU2L0TizQcnUNyiDkrDPOs3FOTSdLBRUPVX"
      );
      let res = hmac.toString(Base64);

      return encodeURI(res);
    },
    async userLogin() {
      try {
        let res = await login({
          name: this.name,
          password: this.password
        });
        localStorage.setItem("token", res);

        // this.$log({
        //   system: "主系统",
        //   type: "系统访问",
        //   info: "系统初始化"
        // });
        // this.$log({
        //   system: "主系统",
        //   type: "功能操作",
        //   info: "用户登录"
        // });
        let info = await getInfo();
        let resource = await getResource();
        this.$store.commit("userInfo", info);
        this.$store.commit("resource", resource);

        this.$router.push({
          name: "Portal"
        });
      } catch (err) {
        console.log(err.message);
      }
    },
    handleShowErWei() {
      this.showErWei = !this.showErWei;
    }
  }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  height: 100%;
  background: url(~@/assets/imgs/bg1.jpg);
  background-repeat: no-repeat;
  background-size: 100%;
}
.login-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.login-container .login-content {
  background: rgba(0, 0, 0, 0.4);
  padding: 1rem 0;
  position: relative;

  .erwei-page {
    width: 100%;
    height: calc(100% - 4rem);
    position: absolute;
    bottom: 0;
    .ding-login {
      width: 100%;
      height: 100%;
      padding: 0 3rem;
    }
  }
  .toggle-login {
    width: 3rem;
    height: 3rem;
    position: absolute;
    right: 0;
    top: 0;
    cursor: pointer;
    .pic.bg2 {
      width: 100%;
      height: 100%;
      background: url("../assets/images/二维码.png") no-repeat center;
      background-size: 100% 100%;
    }
    .pic.bg1 {
      width: 100%;
      height: 100%;
      background: url("../assets/images/密码登录.png") no-repeat center;
      background-size: 100% 100%;
    }
  }
}
.pos-r {
  position: relative;
}
.login-container .login-header {
  padding: 10px 30px;
  text-align: center;
}
.login-container,
.login-container a,
.login-container input {
  color: #ffffff;
}
.login-container .login-title span {
  padding: 10px 20px;
  display: inline-block;
  margin-bottom: 20px;
  text-shadow: -1px 1px 1px rgb(17, 42, 51);
}
.login-container .login-title span strong {
  color: #4bccff;
}
.login-container .login-body {
  padding: 30px 30px;
}
.login-container .login-body input.form-control {
  background: rgba(0, 0, 0, 0.7);
  height: 50px;
  border-radius: 0;
  -webkit-box-shadow: none;
  -moz-box-shadow: none;
  box-shadow: none;
  border: none;
  border-left: 3px solid transparent;
  font-size: 16px;
  -o-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
.login-container .login-body input.form-control:focus {
  border-color: #4bccff;
}
.login-container .login-body input.form-control + i {
  position: absolute;
  right: 15px;
  top: 15px;
  font-size: 20px;
  color: rgb(24, 80, 103);
  -o-transition: all 0.5s;
  -webkit-transition: all 0.5s;
  transition: all 0.5s;
}
.login-container .login-body input.form-control:focus + i {
  color: #4bccff;
}
.login-container .login-body button {
  height: 50px;
  -moz-border-radius: 0px;
  -webkit-border-radius: 0px;
  border-radius: 0px;
  font-size: 20px;
  margin-bottom: 20px;
}
.login-container .login-footer {
  padding: 20px 0;
}
.template h5 a {
  color: #4bccff;
}

@media only screen and (max-width: 600px), screen and (max-height: 610px) {
  .login-container {
    padding: 0px;
  }
  .login-container .login-title span {
    padding: 0px;
    margin-bottom: 10px;
  }
  .login-container .login-content {
    background: none;
    -moz-box-shadow: none;
    -webkit-box-shadow: none;
    box-shadow: none;
  }
  .login-header {
    display: none;
  }
  .login-container .login-body {
    padding: 10px 10px;
  }
  .login-container .login-footer {
    padding: 0;
  }
}
@media only screen and (max-height: 400px) {
  .login-container {
    position: static;
    transform: none;
    padding: 0;
  }
}
/deep/.form-group {
  margin-bottom: 2.5rem;
}
/deep/ .form-group:last-child {
  margin-bottom: 0;
}
</style>