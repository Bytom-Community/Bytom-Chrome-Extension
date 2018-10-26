<style scoped>
.protocol {
  height: 385px;
  /* font-size: 12px; */
}
</style>
<template>
    <div class="warp bg-gray">
        <section class="login-header bg-green">
            <img src="../../../assets/logo.png">
        </section>
        <section class="login-content protocol">
            <div class="title">{{ $t('welcome.terms') }}</div>
            <p>1.是范德萨发</p>
        </section>
        <section class="welcome-bottom bg-green">
            <div class="btn btn-primary btn-startup" @click="confirm">{{ $t('welcome.confirm') }}</div>
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