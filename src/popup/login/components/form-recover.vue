<style scoped>
</style>

<template>
    <div class="warp bg-gray">
        <section class="login-header bg-green">
            <img src="../../../assets/logo.png">
        </section>
        <section class="login-content">
            <h4>从种子导入</h4>
            <div class="form">
                <div class="form-item">
                    <label class="form-item-label">备份文件</label>
                    <div class="form-item-content" style="margin-left: 60px;">
                      <input type="file" @change="tirggerFile($event)">
                    </div>
                </div>
                <div class="btn-group">
                    <div class="btn bg-green" @click="recovery">导入</div>
                    <div class="btn bg-red" @click="back">返回</div>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import bytom from "../../script/bytom";
export default {
  name: "",
  data() {
    return {
      formData: {}
    };
  },
  methods: {
    tirggerFile: function(event) {
      var reader = new FileReader();
      reader.onload = e => {
        this.fileTxt = e.target.result;
      };

      var file = event.target.files[0];
      reader.readAsText(file);
    },
    recovery: function() {
      bytom.Account.restore(this.fileTxt)
        .then(res => {
          window.location.reload();
          localStorage.login = true;
        })
        .catch(error => {
          this.$dialog.show({
            header: "提示",
            body: err.message,
          });
        });
    },
    back: function() {
      this.$emit("back");
    }
  }
};
</script>