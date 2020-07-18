<template>
  <div class="layout">
    <Layout>
      <div class="header">
        <Menu mode="horizontal" theme="light" :active-name="activeIndex" @on-select="onClick">
          <div class="layout-logo">个人网站</div>
          <div class="layout-nav">
            <MenuItem :name="i" v-for="(item,i) in apps" :key="i">
              <Icon :type="item.icon"></Icon>
              {{item.title}}
            </MenuItem>
          </div>
        </Menu>
      </div>
    </Layout>
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
  data() {
    return {
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
  methods: {
    onClick() {},
    handleBack() {}
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
}
.layout-nav {
  width: 420px;
  margin: 0 auto;
  margin-right: 20px;
  height: 100%;
  text-align: right;
}
.ivu-menu-horizontal .ivu-menu-item {
  float: unset;
  display: inline-block;
}
</style>
