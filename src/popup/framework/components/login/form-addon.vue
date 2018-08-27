
<style scoped>
</style>

<template>
    <div class="warp">
        <section class="header bg-green">
            <img src="../../../../assets/logo.png" class="balance-icon">
        </section>
        <section class="content">
            <h4>创建账户</h4>
            <div class="form">
                <div class="form-item">
                    <label for="">选择网络</label>
                    <select name="" id="">
                        <option value="BYTOM主网络">BYTOM主网络</option>
                        <option value="BYTOM测试网络">BYTOM测试网络</option>
                    </select>
                </div>
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
                <div class="btn-group">
                    <div class="btn bg-green" @click="create">创建账户</div>
                    <div class="btn bg-green" @click="recover">从种子导入</div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      formData: {}
    };
  },
  methods: {
    create: function() {
      console.log(this.formData);
      //todo call api

      //temp
      this.$emit('success')
    },
    recover: function() {
      this.$emit("next");
    }
  }
};
</script>