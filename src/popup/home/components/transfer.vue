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
  display: flex;
  position: absolute;
  right: 0px;
  margin: 30px 50px;
}
.balance .token-icon {
  height: 30px;
  width: 30px;
  line-height: 35px;
}
.balance h1 {
  font-size: 38px;
  line-height: 32px;
  margin-left: 10px;
}
.balance span {
  line-height: 42px;
  margin-left: 3px;
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
}
.btn-inline .btn {
  margin: 0 10px;
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
              <div style="display: flex">
                <h1>{{balance}}</h1>
                <span> BTM</span>
              </div>
            </div>
        </section>
        <section v-show="maskShow" class="mask"></section>
        <section class="form">
          <div class="form-item-group">
            <div class="form-item">
              <!-- <label>账户</label> -->
              <select v-model="transaction.guid">
                <option v-for="account in accounts" :value="account.guid">{{account.alias != null ? account.alias : '账户1'}}</option>
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
            <label class="form-item-label">地址</label>
            <div class="form-item-content" style="margin-left: 60px;">
              <input type="text" v-model="transaction.to">
            </div>
          </div>
          <div class="form-item">
            <label class="form-item-label">数量</label>
            <div class="form-item-content" style="margin-left: 60px; display: flex;">
              <input type="text" v-model="transaction.amount">
              <span style="width: 30px;">{{unit}}</span>
            </div>
          </div>
          <!-- <div class="form-item">
            <label for="">≈</label>
            <input type="text" disabled>
            <span>CNY</span>
          </div> -->
          <div class="form-item">
            <label class="form-item-label">矿工费用</label>
            <div class="form-item-content" style="margin-left: 60px;">
              <select v-model="transaction.fee">
                <option value="">标准</option>
              </select>
            </div>
          </div>
          <br>
          <div class="form-item">
            <label class="form-item-label">交易密码</label>
            <div class="form-item-content" style="margin-left: 60px;">
              <input type="password" v-model="transaction.passwd">
            </div>
          </div>
          <div class="btn-group">
            <div class="btn bg-green" @click="confirmOpen">发送交易</div>
          </div>
        </section>
      </div>
    </transition>

    <transition name="page-transfer"
        enter-active-class="animated slideInUp faster" 
        leave-active-class="animated slideOutDown faster">
        <div v-show="confirmShow" class="confirm form bg-gray">
            <div class="form-item">
              <label class="form-item-label">密码确认</label>
              <div class="form-item-content" style="margin-left: 60px;">
                <input type="password" v-model="confirmPasssword" autofocus>
              </div>
            </div>
            <div class="btn-group btn-inline">
              <div class="btn bg-green" @click="confirmTransfer">确认发送</div>
              <div class="btn bg-red" @click="confirmClose">取消发送</div>
            </div>
        </div>
    </transition>
  </div>
</template>

<script>
import bytom from "../../script/bytom";
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
      unit: "单位",
      confirmPasssword: "",
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
      this.maskShow = true;
      this.confirmShow = true;
    },
    confirmClose: function() {
      this.confirmShow = false;
      this.maskShow = false;
    },
    confirmTransfer: function() {
      if (this.confirmPasssword != this.transaction.passwd) {
        alert("密码不一致");
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
          this.confirmPasssword = "";
          this.transaction.passwd = "";
        })
        .catch(error => {
          loader.hide();
          this.confirmClose();
          this.transaction.passwd = "";
          this.confirmPasssword = "";
          alert(error);
        });
    }
  }
};
</script>