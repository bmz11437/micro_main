<template>
  <div class="word-export">
    <div class="enter-btn">
      <Button type="primary" shape="circle" icon="md-arrow-round-forward" @click="handleClick"></Button>
    </div>
  </div>
</template>

<script>
export default {
  name: "WordExport",
  methods:{
    handleClick(){
      this.$emit('handle-click')
    }
  }
};
</script>

<style lang="scss" scoped>
.word-export {
  width: 100%;
  height: 100%;
  background: url(~@/assets/imgs/bg.jpeg) no-repeat;
  background-size: 100% 100%;
  position: relative;
  .enter-btn {
    position: absolute;
    top: 50%;
    left: 50%;
    font-size: 2rem;
    transform: translateX(-50%) translateY(-50%);
    /deep/ .ivu-btn-circle.ivu-btn-icon-only {
      font-size: 2rem;
      width: 3rem;
      height: 3rem;
    }
  }
}
</style>