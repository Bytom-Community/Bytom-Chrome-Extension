<style scoped>
.form-item {
  background: transparent;
  margin: 0;
}
.form-item .form-item-content {
  padding: 0 10px;
  background-color: #282f38;
  border-radius: 5px;
}
.form-item .form-item-label {
  float: none;
  width: 200px;
  line-height: 35px;
  margin: 0 5px;
}
.form-item .btn {
  width: 200px;
  margin-top: 15px;
}
</style>

<template>
    <MenuPage :title="$t('createAccount.title')" @back="back">
      <div class="form">
          <div class="form-item">
            <label class="form-item-label">{{ $t('createAccount.accountAlias') }}</label>
            <div class="form-item-content">
              <input type="text" v-model="formItem.accAlias">
            </div>
          </div>
          <div class="form-item">
            <label class="form-item-label">{{ $t('createAccount.keyAlias') }}</label>
            <div class="form-item-content">
              <input type="text" v-model="formItem.keyAlias">
            </div>
          </div>
          <div class="form-item">
            <label class="form-item-label">{{ $t('createAccount.keyPassword') }}</label>
            <div class="form-item-content">
              <input type="password" v-model="formItem.passwd1">
            </div>
          </div>
          <div class="form-item">
            <label class="form-item-label">{{ $t('createAccount.confirmPassword') }}</label>
            <div class="form-item-content">
              <input type="password" v-model="formItem.passwd2">
            </div>
          </div>
          <div class="tips">{{tips}}</div>
          <div class="form-item bg-gray" style="text-align: center">
            <div class="btn bg-green" @click="create">{{ $t('createAccount.create') }}</div>
          </div>
        </div>
    </MenuPage>
</template>

<script>
import bytom from "../../script/bytom";
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
    back: function() {
      this.$emit("on-back", "creation");
    },
    close: function() {
      this.$emit("on-exit", "creation");
    },
    create: function() {
      if (this.formItem.passwd1 != this.formItem.passwd2) {
        this.tips = "两次密码不一致，请检查后再试";
        return;
      }

      let loader = this.$loading.show({
        container: this.fullPage ? null : this.$refs.formContainer,
        canCancel: true,
        onCancel: this.onCancel
      });

      bytom.Account.create(
        this.formItem.accAlias,
        this.formItem.keyAlias,
        this.formItem.passwd1
      )
        .then(res => {
          console.log(res);
          this.formItem = {};
          loader.hide();
          this.back();
        })
        .catch(err => {
          console.log(err);
          loader.hide();
          this.$dialog.show({
            body: err.message
          });
          // this.tips = err.message;
        });
    }
  },
  mounted() {}
};
</script>