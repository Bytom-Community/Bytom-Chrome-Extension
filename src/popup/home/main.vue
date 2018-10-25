<style lang="" scoped>
.warp {
  z-index: 1;
}

.topbar {
  font-size: 19px;
}
.topbar .topbar-left {
  width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  padding-top: 20px;
  padding-left: 20px;
}
.topbar-left .btn-menu {
  float: left;
  margin-right: 8px;
}
.topbar-left .btn-menu i {
  font-size: 100%;
}
.topbar-left .alias {
  height: 25px;
  font-size: 19px;
  line-height: 28px;
}

.topbar .topbar-right {
  float: right;
  margin-top: 20px;
  margin-right: 20px;
  border: 2px solid #fff;
  border-radius: 18px;
  padding: 0 10px;
  font: 12px system-ui;
  text-align: center;
}

.topbar-right .lamp {
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #02f823;
  margin-right: 2px;
  position: relative;
  top: -2px;
}

.content {
  margin-top: 20px;
  text-align: center;
  padding: 0 30px 20px;
}
.content .token-icon {
  display: inline-flex;
  height: 40px;
  width: 40px;
  padding: 8px;
  margin: 8px;
}
.content .amount {
  padding-bottom: 10px;
}
.content .token-amount {
  font-size: 45px;
  line-height: 45px;
}
.token-amount .asset {
  font-size: 18px;
  margin-left: 2px;
}
.qrcode {
  margin-left: 5px;
  vertical-align: middle;
  cursor: pointer;
}
.btn-transfer {
  width: 200px;
  /* font-size: 20px; */
  /* line-height: 22px; */
  /* height: 40px; */
}

.transactions {
  font-size: 15px;
  /* line-height: 40px; */
  /* display: contents; */
}
.transactions h3 {
  font-size: 18px;
  font-weight: inherit;
  color: #cacaca;
  text-align: center;
  padding: 5px 0;
}
.transactions .list {
  padding: 0 10px;
}
.list-item {
  display: block;
  padding: 5px 10px;
  border-bottom: 1px solid #5e5e5e;
}

.list-item .value {
  float: right;
  margin-top: 13px;
}
.account-address {
  cursor: pointer;
}
.btn-creation {
  display: block;
  width: 200px;
  margin: 0 auto;
}
</style>

<template>
  <div class="warp">
    <section class="bg-green">
      <div class="topbar">
          <div class="topbar-right">
            <i class="lamp"></i>
            <select v-model="network" @change="netToggle">
              <option value="mainnet">BYTOM主网络</option>
              <option value="testnet">BYTOM测试网络</option>
            </select>
          </div>
          <div class="topbar-left">
            <a class="btn-menu" href="#"><i class="iconfont icon-menu" @click="$refs.menu.open()"></i></a>
            <span class="alias">{{accountInfo.alias}}</span>
          </div>
      </div>
      <div class="content">
          <img src="../../assets/logo.png" class="token-icon">
          <div v-if="accountInfo.address!=undefined" class="amount">
              <div class="token-amount">{{accountInfo.balance}}<span class="asset">BTM</span></div>
              <p class="account-address">
                <span class="address-text" :title="addressTitle" :data-clipboard-text="accountInfo.address">{{accountInfo.address_short}}</span>
                <i class="iconfont qrcode" @click="showQrcode">&#xe7dd;</i>
              </p>
          </div>
          <a v-if="accountInfo.address!=undefined" class="btn btn-primary btn-transfer" @click="transferOpen">转账</a>
      </div>
    </section>

    <section v-if="accountInfo.address!=undefined" class="transactions">
      <h3 class="bg-gray">交易记录</h3>
      <div style="height: 290px;">
        <vue-scroll>
          <ul class="list">
              <li class="list-item" v-for="(transcation, index) in transcations" :key="index" @click="$refs.trxInfo.open(transcation, accountInfo.address)">
                <div class="value">{{transcation.direct}} {{transcation.val}} BTM</div>
                <div>
                  <div class="time">{{transcation.timestamp | moment}}</div>
                  <div class="addr">{{transcation.address}}</div>
                </div>
              </li>
          </ul>
        </vue-scroll>
      </div>
    </section>
    <section v-else>
      <p style="width: 250px; margin: 30px auto; text-align: center;">在此网络中尚无您的账户信息</p>
      <a class="btn btn-primary btn-creation bg-green" @click="$refs.menu.open('creation')">创建账户</a>
    </section>

    <!-- modal -->
    <Qrcode ref="qrcode"></Qrcode>
    <Menu ref="menu" @on-current-account="accountLoader" @accounts-clear="accountClear"></Menu>
    <Transfer ref="transfer" @on-success="refreshTransactions"></Transfer>
    <TxInfo ref="trxInfo" @on-success="refreshTransactions"></TxInfo>
  </div>
</template>

<script>
import ClipboardJS from "clipboard";
import Menu from "./menu";
import Qrcode from "./components/qrcode";
import Transfer from "./components/transfer";
import TxInfo from "./components/tx-info";
import bytom from "../script/bytom";
export default {
  name: "",
  components: {
    Menu,
    Qrcode,
    Transfer,
    TxInfo
  },
  data() {
    return {
      network: "testnet",
      clipboard: new ClipboardJS(".address-text"),
      addressTitle: "点击复制地址",
      menuOpen: false,
      maskOpen: false,
      accountInfo: {},
      transcations: []
    };
  },
  methods: {
    netToggle: function(val) {
      bytom.System.setupNet(this.network);
      localStorage.bytomNet = this.network;

      this.$refs.menu.updateAccounts();
    },
    shortAddress(address) {
      return (
        address.substr(0, 7) + "..." + address.substr(address.length - 7, 7)
      );
    },
    accountClear: function() {
      this.accountInfo = {};
      this.transcations = [];
    },
    accountLoader: function(accountInfo) {
      this.accountInfo = accountInfo;
      this.accountInfo.address_short = this.shortAddress(
        this.accountInfo.address
      );
      this.refreshTransactions();
    },
    showQrcode: function() {
      this.$refs.qrcode.open(this.accountInfo.address);
    },
    transferOpen: function() {
      this.$refs.transfer.open(this.accountInfo);
    },
    transcationsFormat: function(transactions) {
      transactions.forEach(transaction => {
        let inputSum = 0;
        let outoutSum = 0;
        let inputAddresses = [];
        let outputAddresses = [];
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
    },
    refreshTransactions: function() {
      this.transcations = [];
      if (this.accountInfo.guid == undefined) {
        return;
      }

      bytom.Transaction.list(this.accountInfo.guid, this.accountInfo.address)
        .then(ret => {
          let transactions = ret.data.transactions;
          if (transactions == null) {
            this.transcations = [];
            return;
          }

          this.transcationsFormat(transactions);
          console.log("formatTx", transactions);
          this.transcations = transactions;
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    this.network = localStorage.bytomNet;
    this.refreshTransactions();

    this.clipboard.on("success", e => {
      this.$dialog.show({
        header: this.$t("dialog.header"),
        body: this.$t("dialog.copy.success"),
      });
    });
    this.clipboard.on("error", e => {
      this.$dialog.show({
        header: this.$t("dialog.header"),
        body: this.$t("dialog.copy.fail"),
      });
    });
  },
  beforeDestroy() {
    this.clipboard.destroy();
  }
};
</script>