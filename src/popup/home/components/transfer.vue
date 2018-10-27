<style lang="" scoped>
.warp {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 600px;
  z-index: 2;
}
.header {
  height: 150px;
}
.balance {
  text-align: center;
  margin-top: 15px;
}
.balance .token-icon {
  height: 38px;
  width: 38px;
  margin-right: 5px;
}
.balance .token-amount {
  display: inline-block;
  font-size: 45px;
  line-height: 45px;
}
.balance .token-amount .asset {
  font-size: 18px;
  margin-left: 2px;
}
.mask {
  z-index: 3 !important;
  top: 150px !important;
}
.form {
  padding: 10px 20px;
}
.form-item-group {
  display: flex;
}
.form-item-group .form-item {
  width: 40%;
}
.confirm {
  padding: 10px 20px;
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 4;
}

.btn-inline {
  display: flex;
  padding: 0;
}
.btn-inline .btn {
  margin: 10px 15px;
}
</style>

<template>
  <div>
    <transition name="page-transfer"
      enter-active-class="animated fadeInLeft faster" 
      leave-active-class="animated fadeOutLeft faster">
      <div v-show="show" class="warp bg-gray">
        <section class="header bg-green">
          <i class="iconfont icon-back" @click="show=false; confirmClose()"></i>
          <div class="balance">
            <img src="../../../assets/logo.png" class="token-icon">
            <div class="token-amount">{{balance}}<span class="asset">BTM</span></div>
          </div>
        </section>
        
        <section v-show="maskShow" class="mask"></section>
        <section class="form">
          <div class="form-item-group">
            <div class="form-item">
              <!-- <label>账户</label> -->
              <select v-model="transaction.guid">
                <option :key="index" v-for="(account, index) in accounts" :value="account.guid">{{account.alias != null ? account.alias : '账户1'}}</option>
              </select>
            </div>
            <div class="form-item" style="margin-left: 20px;">
              <!-- <label>资产</label> -->
              <select v-model="transaction.asset">
                <option value="ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff">BTM</option>
              </select>
            </div>
          </div>
          <div class="form-item">
            <label class="form-item-label">{{ $t('transfer.address') }}</label>
            <div class="form-item-content" style="margin-left: 80px;">
              <input type="text" v-model="transaction.to">
            </div>
          </div>
          <div class="form-item">
            <label class="form-item-label">{{ $t('transfer.quantity') }}</label>
            <div class="form-item-content" style="margin-left: 80px; display: flex;">
              <input type="text" v-model="transaction.amount">
              <span style="width: 40px; font-size: 15px;">{{unit}}</span>
            </div>
          </div>
          <!-- <div class="form-item">
            <label for="">≈</label>
            <input type="text" disabled>
            <span>CNY</span>
          </div> -->
          <div class="form-item">
            <label class="form-item-label">{{ $t('transfer.fee') }}</label>
            <div class="form-item-content" style="margin-left: 80px;">
              <select v-model="transaction.fee">
                <option value="">{{ $t('transfer.feeType') }}</option>
              </select>
            </div>
          </div>
          <br>
          <div style="width: 200px; margin: 0 auto;">
            <div class="btn bg-green" @click="confirmOpen">{{ $t('transfer.send') }}</div>
          </div>
        </section>
      </div>
    </transition>

    <transition name="page-transfer"
        <!-- enter-active-class="animated slideInUp faster" 
        leave-active-class="animated slideOutDown faster"> -->
        <div v-show="confirmShow" class="confirm form bg-gray">
            <div class="form-item">
              <label class="form-item-label">{{ $t('transfer.confirmPassword') }}</label>
              <div class="form-item-content" style="margin-left: 85px;">
                <input type="password" v-model="transaction.passwd" autofocus>
              </div>
            </div>
            <div class="btn-group btn-inline">
              <div class="btn bg-green" @click="confirmTransfer">{{ $t('transfer.confirm') }}</div>
              <div class="btn bg-red" @click="confirmClose">{{ $t('transfer.cancel') }}</div>
            </div>
        </div>
    </transition>
  </div>
</template>

<script>
import bytom from "../../script/bytom";
import getLang from "../../../assets/language/sdk"
export default {
  name: "",
  data() {
    const ASSET_BTM =
      "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";
    return {
      show: false,
      maskShow: false,
      confirmShow: false,
      balance: 0,
      accounts: [],
      unit: this.$t("transfer.unit"),
      assets: {
        ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff: "BTM"
      },
      transaction: {
        guid: "",
        to: "",
        asset: ASSET_BTM,
        amount: 0,
        fee: "",
        passwd: ""
      }
    };
  },
  methods: {
    open: function(accountInfo) {
      this.show = true;

      bytom.Account.list().then(accounts => {
        this.accounts = accounts;
      });

      this.balance = accountInfo.balance;
      this.transaction.guid = accountInfo.guid;
      this.unit = this.assets[this.transaction.asset];
    },
    close: function() {
      this.show = false;
    },
    confirmOpen: function() {
      if (this.transaction.to == "") {
        this.$dialog.show({
          body: this.$t("transfer.emptyTo"),
        });
        return;
      }
      let num = parseInt(this.transaction.amount);
      if (isNaN(num) || num<=0) {
        this.$dialog.show({
          body: this.$t("transfer.noneBTM"),
        });
        return;
      }
      this.maskShow = true;
      this.confirmShow = true;
    },
    confirmClose: function() {
      this.confirmShow = false;
      this.maskShow = false;
    },
    confirmTransfer: function() {
      if (this.transaction.passwd == "") {
        this.$dialog.show({
          body: this.$t("transfer.emptyPassword"),
        });
        return;
      }
      let loader = this.$loading.show({
        // Optional parameters
        container: null,
        canCancel: true,
        onCancel: this.onCancel
      });
      // guid, to, asset, amount, fee, password
      bytom.Transaction.transfer(
        this.transaction.guid,
        this.transaction.to,
        this.transaction.asset,
        this.transaction.amount,
        this.transaction.fee,
        this.transaction.passwd
      )
        .then(ret => {
          console.log(ret);

          loader.hide();
          this.close();
          this.confirmClose();
          this.$emit("on-success");
          this.transaction.passwd = "";
        })
        .catch(error => {
          loader.hide();
          this.confirmClose();
          this.transaction.passwd = "";
          this.$dialog.show({
            body: getLang(error.message)
          });
        });
    }
  }
};
</script>