<template>
    <div>{{transfer}}</div>
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
      console.log("transfer", request);
        sendResponse("popup返回值");
    });
  }
};
</script>

<style lang="" scoped>
</style>