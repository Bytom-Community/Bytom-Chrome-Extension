
<style scoped>
</style>

<template>
    <div class="warp bg-gray">
        <section class="login-header bg-green">
            <img src="../../../../assets/logo.png">
        </section>
        <section class="login-content">
            <h4>创建账户</h4>
            <div class="form">
                <div class="form-item">
                    <label class="form-item-label">选择网络</label>
                    <div class="form-item-content" style="margin-left: 60px;">
                        <select name="" id="">
                            <option value="BYTOM私有网络">BYTOM私有网络</option>
                            <!-- <option value="BYTOM主网络">BYTOM主网络</option> -->
                            <!-- <option value="BYTOM测试网络">BYTOM测试网络</option> -->
                        </select>
                    </div>
                </div>
                <div class="form-item">
                    <label class="form-item-label">账户别名</label>
                    <div class="form-item-content" style="margin-left: 60px;">
                        <input type="text" v-model="formItem.accAlias" autofocus>
                    </div>
                </div>
                <div class="form-item">
                    <label class="form-item-label">密钥别名</label>
                    <div class="form-item-content" style="margin-left: 60px;">
                        <input type="text" v-model="formItem.keyAlias">
                    </div>
                </div>
                <div class="form-item">
                    <label class="form-item-label">密钥密码</label>
                    <div class="form-item-content" style="margin-left: 60px;">
                        <input type="password" v-model="formItem.passwd1">
                    </div>
                </div>
                <div class="form-item">
                    <label class="form-item-label">重复密码</label>
                    <div class="form-item-content" style="margin-left: 60px;">
                        <input type="password" v-model="formItem.passwd2">
                    </div>
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
import bytom from "../../../script/bytom";
export default {
  name: "",
  data() {
    return {
      formItem: {}
    };
  },
  methods: {
    create: function() {
      if (this.formItem.passwd1 != this.formItem.passwd2) {
        this.tips = "两次密码不一致，请检查后再试。";
        return;
      }

      bytom.Account.create(
        this.formItem.accAlias,
        this.formItem.keyAlias,
        this.formItem.passwd1
      )
        .then(res => {
          console.log(111, res);

        //   this.$emit("success");
          window.location.reload();
          this.formItem = {};
        })
        .catch(err => {
          console.log(err);
          alert(err);
        });
    },
    recover: function() {
      this.$emit("next");
    }
  },
  mounted() {
    console.log(21);
  }
};
</script>