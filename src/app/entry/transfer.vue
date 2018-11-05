<template>
    <div>aaa{{transfer}}</div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      transfer: ''
    };
  },
  mounted() {},
  beforeCreate() {
    chrome.extension.onMessage.addListener((request, sender, sendResponse) => {
      this.transfer = request.cmd;
      console.log(request, 222);
    //   alert("前端/后端/Popup收到");
        sendResponse("popup返回值");
    });
  }
};
</script>

<style lang="" scoped>
</style>