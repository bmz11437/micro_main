<template>
  <div class="portal-con">
    <div class="portal-header">
      <span class="title">我的网站</span>
      <Dropdown @on-click="handleDropClick" style="float:right;">
        <span class="user-opera">
          <Icon type="md-person" />
          {{userInfo.userName}}
        </span>
        <DropdownMenu slot="list">
          <DropdownItem name="登出">
            <Icon type="md-power" />登出
          </DropdownItem>
          <DropdownItem name="修改密码">
            <Icon type="md-create" />修改密码
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
    <div class="sys-con">
      <div
        class="sys-item"
        v-for="(item) in systems"
        :key="item.id"
        @click="handleClick(item.identify)"
      >
        <div class="sys-logo">
          <span class="sys-icon">
            <Icon :type="item.icon" />
          </span>
        </div>
        <div class="title">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Portal",
  data() {
    return {
      userInfo: this.$store.getters.userInfo
    };
  },
  computed: {
    systems() {
      let res = [];
      let resource = this.$store.getters.resource;
      let config = this.$store.getters.appConfig;
      resource.forEach(data => {
        config.microApps.forEach(item => {
          if (data.identify == item.name) {
            res.push({
              ...Object.assign(item, data),
              children: null
            });
          }
        });
      });
      console.log(res);
      return res;
    }
  },
  methods: {
    logOut() {
      this.$router.push({
        name: "Login"
      });
    },
    handleDropClick(name) {
      switch (name) {
        case "登出":
          this.logOut();
          break;
        case "修改密码":
          break;
      }
    },
    handleClick(name) {
      this.$router.push({
        name
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.portal-con {
  width: 100%;
  height: 100%;
  background-image: url(../assets/imgs/bg3.jpg);
  background-size: 100% 100%;
  position: relative;
  overflow: hidden;
  padding: 0 8rem;
  .portal-header {
    color: white;
    font-size: 2rem;

    padding-top: 3rem;
    .user-opera {
      font-size: 1.2rem;
      cursor: pointer;
    }
  }
  .sys-con {
    width: 100%;
    height: 8rem;
    position: absolute;
    bottom: 3rem;
    left: 0;
    display: flex;
    justify-content: center;
    background: unset;
    .sys-item {
      flex: 1;
      max-width: 16rem;
      background-color: white;
      cursor: pointer;
      border-radius: 0.5rem;
      border-left: 0.3rem solid rgb(3, 187, 255);
      margin-right: 2rem;
      .sys-logo {
        width: 100%;
        height: calc(100% - 3rem);
        .sys-icon {
          font-size: 3.5rem;
          padding-left: 1rem;
        }
      }
      .title {
        line-height: 3rem;
        height: 3rem;
        font-size: 1.2rem;
        padding-left: 1rem;
      }
    }
    .sys-item:hover {
      background-color: rgb(3, 187, 255);
      color: white;
    }
  }
}
</style>