<style scoped>
.login-content {
  height: 414px;
  font-size: 12px;
}
.login-footer {
  padding: 20px 85px;
}
</style>
<template>
    <div class="warp bg-gray">
        <section class="login-header bg-green">
            <img src="../../../../assets/logo.png">
        </section>
        <section class="login-content">
            <h4>钱包使用条款</h4>
            <p>1.是范德萨发</p>
        </section>
        <section class="login-footer bg-green">
            <div class="btn btn-primary" @click="confirm">确认</div>
        </section>
    </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    confirm: function() {
      this.$emit("next");
    }
  }
};
</script>