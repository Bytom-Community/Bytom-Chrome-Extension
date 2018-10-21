<style lang="" scoped>
.warp {
  z-index: 1;
}
.account {
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
  font-size: 12px;
  text-align: center;
}

.lamp {
  display: inline-block;
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: #02f823;
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
  /* overflow-y: scroll; */
  height: 290px;
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
</style>

<template>
  <div class="warp">
    <section class="bg-green">
      <div class="row account">
          <a class="btn-menu" href="#"><i class="iconfont icon-menu" @click="$refs.menu.open()"></i></a>
          <span class="btn-toggle">
            <i class="lamp"></i>
            <select v-model="network" @change="netToggle">
              <option value="mainnet">BYTOM主网络</option>
              <option value="testnet">BYTOM测试网络</option>
            </select>
          </span>
          <span class="alias">{{accountInfo.alias}}</span>
      </div>
      <div class="row balance">
          <img src="../../assets/logo.png" class="token-icon">
          <div class="amount">
              <div class="token-amount">{{accountInfo.balance}} BTM</div>
              <p class="account-address">
                <span class="address-text" :title="addressTitle" :data-clipboard-text="accountInfo.address">{{accountInfo.address_short}}</span>
                <i class="iconfont qrcode" @click="showQrcode">&#xe7dd;</i>
              </p>
          </div>
          <a href="#" class="btn btn-primary btn-transfer" @click="transferOpen">转账</a>
      </div>
    </section>

    <section class="transactions">
      <h3 class="bg-gray">交易记录</h3>
      <vue-scroll>
        <ul class="list">
            <li class="list-item" v-for="(transcation, index) in transcations" :key="index" v-if="index<2" @click="$refs.trxInfo.open(transcation, accountInfo.address)">
              <div class="value">{{transcation.direct}} {{transcation.val}} BTM</div>
              <div>
                <div class="time">{{transcation.timestamp | moment}}</div>
                <div class="addr">{{transcation.address}}</div>
              </div>
            </li>
        </ul>
      </vue-scroll>
    </section>

    <!-- modal -->
    <Menu ref="menu" @on-current-account="accountLoader" @accounts-clear="accountClear"></Menu>
    <Qrcode ref="qrcode"></Qrcode>
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
    },
    refreshTransactions: function() {
      if (this.accountInfo.guid == undefined) {
        return;
      }

      bytom.Transaction.list(
        this.accountInfo.guid,
        this.accountInfo.address
      ).then(ret => {
        let transactions = ret.data.transactions;
        if (transactions == null) {
          this.transcations = [];
          return;
        }

        this.transcationsFormat(transactions);
        console.log("formatTx", transactions);
        this.transcations = transactions;
      });
    }
  },
  mounted() {
    this.network = localStorage.bytomNet;
    this.refreshTransactions();

    this.clipboard.on("success", function(e) {
      alert("coby success");
    });
    this.clipboard.on("error", function(e) {
      alert("coby error");
    });
  },
  beforeDestroy() {
    this.clipboard.destroy();
  }
};
</script>