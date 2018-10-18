<style lang="" scoped>
.warp {
  z-index: 1;
}
.account {
  /* text-align: center; */
  font-size: 18px;
}
.account .btn-menu {
  float: left;
  margin: 20px 8px 0 20px;
}
.account .btn-toggle {
  float: right;
  margin-top: 15px;
  margin-right: 20px;
  border: 2px solid #fff;
  border-radius: 18px;
  padding: 0 10px;
  font-size: 14px;
}
.account .alias {
  height: 25px;
}
.account span {
  display: block;
  padding-top: 20px;
  font-size: 18px;
  font-weight: bold;
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.balance {
  margin-top: 20px;
  text-align: center;
  padding: 0 30px 20px;
}
.balance .token-icon {
  display: inline-flex;
  height: 40px;
  width: 40px;
  /* background: #fff; */
  /* border: 1px solid #dedede; */
  /* border-radius: 25px; */
  padding: 8px;
  margin: 8px;
}
.balance .amount {
  padding-bottom: 10px;
}
.balance .token-amount {
  font-size: 32px;
}
.qrcode {
  margin-left: 5px;
  vertical-align: middle;
  cursor: pointer;
}
.btn-transfer {
  width: 200px;
  font-size: 20px;
  line-height: 22px;
  height: 40px;
  line-height: 40px;
}

.transactions {
  font-size: 14px;
  /* line-height: 40px; */
  /* display: contents; */
}
.transactions h3 {
  padding: 10px;
  margin: 0;
  color: #cacaca;
}
.transactions .list {
  padding: 0 10px;
}
.list-item {
  display: flex;
  padding: 5px 10px;
  border-bottom: 1px solid #5e5e5e;
}

.list-item .value {
  position: absolute;
  right: 20px;
  margin-top: 13px;
}
</style>

<template>
  <div class="warp">
    <section class="bg-green">
      <div class="row account">
          <a class="btn-menu" href="#"><i class="iconfont icon-menu" @click="openMenu"></i></a>
          <span class="btn-toggle">
            <select>
              <option value="">BYTOM主网络</option>
              <option value="">BYTOM测试网络</option>
            </select>
          </span>
          <span class="alias">{{accountInfo.alias}}</span>
      </div>
      <div class="row balance">
          <img src="../../assets/logo.png" class="token-icon">
          <div class="amount">
              <div class="token-amount">{{accountInfo.balance}} BTM</div>
              <p class="account-address">{{accountInfo.address_short}}<i class="iconfont qrcode" @click="showQrcode">&#xe7dd;</i></p>
          </div>
          <a href="#" class="btn btn-primary btn-transfer" @click="transferOpen">转账</a>
      </div>
    </section>

    <section class="transactions">
      <h3 class="color-gray">交易记录</h3>
      <ul class="list">
        <li class="list-item" v-for="(transcation, index) in latestTranscations" v-if="index < 4" :key="index">
            <div>
              <div class="time">{{transcation.timestamp | moment}}</div>
              <div class="addr">{{transcation.address}}</div>
            </div>
            <div class="value">{{transcation.direct}} {{transcation.val}} BTM</div>
        </li>
        <span v-else style="width: 22px; margin: 0px auto; font-weight: bold; font-size: 22px;">...</span>
      </ul>
    </section>

    <!-- modal -->
    <div v-show="maskOpen" class="mask"></div>
    <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
    <transition name="left-menu" 
        enter-active-class="animated slideInLeft faster" 
        leave-active-class="animated slideOutLeft faster" 
        v-on:after-leave="afterLeave">
        <Menu v-show="menuOpen" @closed="menuOpen=false" @account-change="selectedAccountChange"></Menu>
    </transition>
    
    <Qrcode ref="qrcode"></Qrcode>
    <Transfer ref="transfer" @on-success="refreshTransactions"></Transfer>

  </div>
</template>

<script>
import Menu from "./menu";
import Qrcode from "./components/qrcode";
import Transfer from "./components/transfer";
import TransList from "./components/trans-list";
import TransDetail from "./components/trans-detail";
import bytom from "../script/bytom";
export default {
  name: "",
  components: {
    Menu,
    Qrcode,
    Transfer,
    TransDetail
  },
  data() {
    return {
      menuOpen: false,
      maskOpen: false,
      accountInfo: {},
      latestTranscations: []
    };
  },
  methods: {
    openMenu: function() {
      this.maskOpen = true;
      this.menuOpen = true;
      this.$refs.qrcode.close();
    },
    shortAddress(address) {
      return (
        address.substr(0, 7) + "..." + address.substr(address.length - 7, 7)
      );
    },
    selectedAccountChange: function(accountInfo) {
      console.log(accountInfo);

      this.accountInfo = accountInfo;
      this.accountInfo.address_short = this.shortAddress(
        this.accountInfo.address
      );
      this.refreshTransactions();
    },
    afterLeave: function() {
      this.maskOpen = false;
    },
    showQrcode: function() {
      this.$refs.qrcode.open(this.accountInfo.address);
    },
    transferOpen: function() {
      this.$refs.transfer.open(this.accountInfo);
    },
    refreshTransactions: function() {
      bytom.Transaction.list(
        this.accountInfo.guid,
        this.accountInfo.address
      ).then(ret => {
        let transactions = ret.data.transactions;
        if (transactions == null) {
          this.latestTranscations = [];
          return;
        }

        transactions.forEach(transaction => {
          let inputSum = 0;
          let outoutSum = 0;
          let inputAddresses = [],
            outputAddresses = [];
          transaction.inputs.forEach(input => {
            if (input.address == this.accountInfo.address) {
              inputSum += input.amount;
              return;
            }

            inputAddresses.push(input.address);
          });

          transaction.outputs.forEach(output => {
            if (output.address == this.accountInfo.address) {
              outoutSum += output.amount;
              return;
            }

            outputAddresses.push(output.address);
          });
          console.log(112, inputAddresses, outputAddresses);

          let val = outoutSum - inputSum;
          if (val > 0) {
            transaction.direct = "+";
            transaction.address = this.shortAddress(inputAddresses.pop());
          } else {
            val = inputSum - outoutSum;
            transaction.direct = "-";
            transaction.address = this.shortAddress(outputAddresses.pop());
          }
          transaction.val = Number(val / 100000000).toFixed(8);
          // console.log(111, transaction, val);
        });
        console.log(transactions);
        this.latestTranscations = transactions;
      });
    }
  },
  mounted() {
    this.refreshTransactions();
  }
};
</script>