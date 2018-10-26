
<style scoped>
</style>

<template>
    <div class="warp bg-gray">
        <section class="login-header bg-green">
            <img src="../../../assets/logo.png">
        </section>
        <section class="login-content">
            <div class="title">{{ $t('createAccount.title') }}</div>
            <div class="form">
                <div class="form-item">
                    <label class="form-item-label">{{ $t('createAccount.select') }}</label>
                    <div class="form-item-content" style="margin-left: 75px;">
                        <select name="net" v-model="selected" @change="onChange()">
                            <option value="mainnet">{{ $t('main.mainNet') }}</option>
                            <option value="testnet">{{ $t('main.testNet') }}</option>
                        </select>
                    </div>
                </div>
                <div class="form-item">
                    <label class="form-item-label">{{ $t('createAccount.accountAlias') }}</label>
                    <div class="form-item-content" style="margin-left: 76px;">
                        <input type="text" v-model="formItem.accAlias" autofocus>
                    </div>
                </div>
                <div class="form-item">
                    <label class="form-item-label">{{ $t('createAccount.keyAlias') }}</label>
                    <div class="form-item-content" style="margin-left: 76px;">
                        <input type="text" v-model="formItem.keyAlias">
                    </div>
                </div>
                <div class="form-item">
                    <label class="form-item-label">{{ $t('createAccount.keyPassword') }}</label>
                    <div class="form-item-content" style="margin-left: 76px;">
                        <input type="password" v-model="formItem.passwd1">
                    </div>
                </div>
                <div class="form-item">
                    <label class="form-item-label">{{ $t('createAccount.confirmPassword') }}</label>
                    <div class="form-item-content" style="margin-left: 76px;">
                        <input type="password" v-model="formItem.passwd2">
                    </div>
                </div>
                <div class="btn-group">
                    <div class="btn bg-green" @click="create">{{ $t('createAccount.create') }}</div>
                    <div class="btn bg-green" @click="recover">{{ $t('createAccount.import') }}</div>
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
      selected: 'mainnet',
      formItem: {}
    };
  },
  methods: {
    create: function() {
      if (this.formItem.passwd1 != this.formItem.passwd2) {
        this.$dialog.show({
            body: this.$t('createAccount.passwordAgain'),
        });
        return;
      }
      let loader = this.$loading.show({
        container: null,
        canCancel: true,
        onCancel: this.onCancel
      });
      bytom.Account.create(
        this.formItem.accAlias,
        this.formItem.keyAlias,
        this.formItem.passwd1
      )
        .then(res => {
          localStorage.login = true;
          loader.hide();
          window.location.reload();
          this.formItem = {};
        })
        .catch(err => {
          loader.hide();
          this.$dialog.show({
            body: err.message,
          });
        });
    },
    recover: function() {
      this.$emit("next");
    },
    onChange() {
      localStorage.bytomNet = this.selected;
      bytom.System.setupNet(this.selected);
    }
  },
  mounted() {
    if (localStorage.bytomNet != undefined) {
      bytom.System.setupNet(localStorage.bytomNet);
      this.selected = localStorage.bytomNet;
    }
  }
};
</script>