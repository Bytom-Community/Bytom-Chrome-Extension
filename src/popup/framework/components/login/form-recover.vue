<style scoped>
</style>

<template>
    <div class="warp">
        <section class="login-header bg-green">
            <img src="../../../../assets/logo.png">
        </section>
        <section class="login-content">
            <h4>从种子导入</h4>
            <div class="form">
                <div class="form-item">
                    <label for="">选择网络</label>
                    <select name="" id="">
                        <option value="BYTOM主网络">BYTOM主网络</option>
                        <option value="BYTOM测试网络">BYTOM测试网络</option>
                    </select>
                </div>
                <div class="form-item">
                    <input type="file">
                </div>
                <div class="btn-group">
                    <div class="btn bg-green" @click="recovery">从种子导入</div>
                    <div class="btn bg-red" @click="back">返回</div>
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
    recovery: function() {
      console.log(this.formData);
      //todo call api
    },
    back: function() {
      this.$emit("back");
    }
  }
};
</script>