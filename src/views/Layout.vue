<template>
  <div class="layout">
    <div class="header">
      <Menu mode="horizontal" theme="light" :active-name="activeIndex" @on-select="onClick">
        <div class="layout-logo" @click="handleBack">个人网站</div>
        <div class="layout-nav">
          <MenuItem :name="i" v-for="(item,i) in apps" :key="i">
            <Icon :type="item.icon"></Icon>
            {{item.title}}
          </MenuItem>
          <Dropdown @on-click="handleDropClick">
            <a href="javascript:void(0)">
              <Icon type="md-person" />
              {{userInfo.userName}}
            </a>
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
      </Menu>
    </div>
    <div class="iframe-con" v-show="showIframe">
      <iframe :src="iframeUrl" style="width:100%;height:100%;overflow: hidden;border:none"></iframe>
      <span class="back-icon" @click="handleBack">
        <Icon type="ios-close-circle-outline" />
      </span>
    </div>
  </div>
</template>
<script>
export default {
  name: "Layout",
  data() {
    return {
      userInfo: this.$store.getters.userInfo,
      activeIndex: 0,
      showIframe: false,
      iframeUrl: ""
    };
  },
  computed: {
    apps() {
      return this.$store.getters.appConfig.microApps;
    }
  },

  mounted() {
    let name = this.$route.name;
    this.apps.forEach((item, i) => {
      if (item.name == name && item.type == "iframe") {
        this.iframeUrl = item.entry;
        this.showIframe = true;
        this.activeIndex = i;
      }
    });
  },
  methods: {
    logOut() {
      debugger
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
    onClick(i) {
      let data = this.apps[i];
      if (data.type == "iframe") {
        this.iframeUrl = data.entry;
        this.showIframe = true;
      } else {
        this.$router.push({
          name: data.name
        });
      }
    },

    handleBack() {
      this.$router.push({
        name: "Portal"
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.layout {
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
  width: 100%;
  .iframe-con {
    width: 100%;
    position: absolute;
    height: 100%;
    top: 0;
    border: none;
    z-index: 999;
    left: 0;
    overflow: hidden;
    .back-icon {
      position: absolute;
      top: 0;
      right: 23px;
      font-size: 20px;
      cursor: pointer;
    }
    .back-icon:hover {
      color: blue;
    }
  }
}
.ivu-layout {
  height: 100%;
}
.root-view {
  width: 100%;
  height: calc(100% - 60px);
}

.root-view > :first-child {
  height: 100%;
}
.layout-logo {
  width: 100px;
  height: 30px;
  line-height: 30px;
  /* background: #5b6270; */
  border-radius: 3px;
  float: left;
  position: relative;
  top: 15px;
  left: 20px;
  text-align: center;
  font-size: 20px;
  cursor: pointer;
}
.layout-nav {
  margin: 0 auto;
  margin-right: 3rem;
  height: 100%;
  text-align: right;
}
.ivu-menu-horizontal .ivu-menu-item {
  float: unset;
  display: inline-block;
}
/deep/ .ivu-select-dropdown {
  text-align: left;
  /deep/ .ivu-icon {
    margin-right: 0.5rem;
  }
}
</style>
