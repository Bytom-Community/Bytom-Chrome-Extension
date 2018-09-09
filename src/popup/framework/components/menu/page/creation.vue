<style scoped>
.form{
  margin: 50px 0;
}
.form-item .btn{
  margin-top: 15px;
}
</style>

<template>
    <div class="mc2warp bg-gray">
        <section>
            <i class="iconfont btn-close" @click="close">&#xe605;</i>
            <h3>创建账户</h3>
        </section>
        <section class="form">
          <div class="form-item">
            <label for="">账户别名</label>
            <input type="text">
          </div>
          <div class="form-item">
            <label for="">密钥别名</label>
            <input type="text">
          </div>
          <div class="form-item">
            <label for="">密码</label>
            <input type="password">
          </div>
          <div class="form-item">
            <label for="">重复密码</label>
            <input type="password">
          </div>
          <div class="form-item bg-gray">
            <div class="btn bg-green" @click="create">创建账户</div>
          </div>
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
    close: function() {
      this.$emit("closed", "");
    },
    create: function() {
      
    }
  }
};
</script>