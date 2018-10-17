<style scoped>
.form {
  margin: 50px 0;
}
.form-item .btn {
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
            <label class="form-item-label">账户别名</label>
            <div class="form-item-content" style="margin-left: 60px;">
              <input type="text" v-model="formItem.accAlias">
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
          <div class="tips">{{tips}}</div>
          <div class="form-item bg-gray">
            <div class="btn bg-green" @click="create">创建账户</div>
          </div>
        </section>
    </div>
</template>

<script>
import bytom from "../../../../script/bytom";
export default {
  name: "",
  components: {},
  data() {
    return {
      formItem: {
        accAlias: "",
        keyAlias: "",
        passwd1: "",
        passwd2: ""
      },
      tips: ""
    };
  },
  methods: {
    close: function() {
      this.$emit("closed", "");
    },
    create: function() {
      if (this.formItem.passwd1 != this.formItem.passwd2) {
        this.tips = "两次密码不一致，请检查后再试";
        return;
      }

      bytom.Account.create(
        this.formItem.accAlias,
        this.formItem.keyAlias,
        this.formItem.passwd1
      )
        .then(res => {
          this.close();
          console.log(res);
          this.formItem = {};
        })
        .catch(err => {
          console.log(err);
          alert(err)
          // this.tips = err.message;
        });
    }
  },
  mounted() {}
};
</script>