<style scoped>
.content {
  height: 414px;
  font-size: 12px;
}
.footer {
  padding: 20px 85px;
}
</style>
<template>
    <div class="warp">
        <section class="header bg-green">
            <img src="../../../../assets/logo.png" class="balance-icon">
        </section>
        <section class="content">
            <h4>钱包使用条款</h4>
            <p>1.是范德萨发</p>
        </section>
        <section class="footer bg-green">
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