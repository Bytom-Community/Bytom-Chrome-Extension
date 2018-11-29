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
}

.transactions {
  font-size: 15px;
  height: 275px;
}
.transactions h3 {
  font-size: 18px;
  font-weight: inherit;
  color: #cacaca;
  text-align: center;
  padding: 5px 0;
}
.transactions .list {
  padding: 0 20px;
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
  <div id="app" class="warp">
    <section class="bg-green">
      <div class="topbar">
          <div class="topbar-right">
            <i class="lamp"></i>
            <select v-model="network" @change="netToggle">
              <option value="mainnet">{{ $t('main.mainNet') }}</option>
              <option value="testnet">{{ $t('main.testNet') }}</option>
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
          <a v-if="accountInfo.address!=undefined" class="btn btn-primary btn-transfer" @click="transferOpen">{{ $t('main.transfer') }}</a>
      </div>
    </section>

    <section v-if="accountInfo.address!=undefined" class="transactions">
      <h3 class="bg-gray">{{ $t('main.record') }}</h3>
      <vue-scroll @handle-scroll="handleScroll">
        <ul class="list">
            <li class="list-item" v-for="(transcation, index) in transcations" :key="index" @click="$refs.trxInfo.open(transcation, accountInfo.address)">
              <div class="value">{{transcation.direct}} {{transcation.val.toFixed(2)}} BTM</div>
              <div>
                <div v-if="transcation.is_confirmed" class="time">{{transcation.block_timestamp | moment}}</div>
                <div v-else class="time">{{transcation.submission_timestamp | moment}}</div>
                <div class="addr">{{transcation.address}}</div>
              </div>
            </li>
        </ul>
      </vue-scroll>
    </section>
    <section v-else>
      <p style="width: 250px; margin: 30px auto; text-align: center;">{{ $t('main.noAccount') }}</p>
      <a class="btn btn-primary btn-creation bg-green" @click="$refs.menu.open('creation')">{{ $t('main.create') }}</a>
    </section>

    <!-- modal -->
    <Qrcode ref="qrcode"></Qrcode>
    <Menu ref="menu" @on-current-account="accountLoader" @accounts-clear="accountClear"></Menu>
    <Transfer ref="transfer" :fee="fee" :feeTypeOptions="feeTypeOptions" @on-success="refreshTransactions"></Transfer>
    <TxInfo ref="trxInfo" @on-success="refreshTransactions"></TxInfo>
  </div>
</template>

<script>
import ClipboardJS from "clipboard";
import Menu from "../home/menu";
import Qrcode from "../transfer/qrcode";
import Transfer from "../transfer/transfer";
import TxInfo from "../transfer/detail";
import bytom from "../common/bytom";
import utils from "../common/utils";
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
      feeTypeOptions: [this.$t('transfer.feeType')],
      fee: this.$t('transfer.feeType'),
      network: "mainnet",
      clipboard: new ClipboardJS(".address-text"),
      addressTitle: this.$t("main.copy"),
      menuOpen: false,
      maskOpen: false,
      accountInfo: {},
      transcations: [],
      start: 0,
      limit: 10
    };
  },
  methods: {
    handleScroll(vertical, horizontal, nativeEvent) {
      if (vertical.process == 0) {
        this.start = 0;
        return;
      }

      if (vertical.process == 1) {
        this.start += this.limit;
        this.appendTransactions();
      }
    },
    netToggle: function(val) {
      bytom.System.setupNet(this.network);
      localStorage.bytomNet = this.network;

      this.$refs.menu.updateAccounts();
    },
    accountClear: function() {
      this.accountInfo = {};
      this.transcations = [];
    },
    accountLoader: function(accountInfo) {
      this.accountInfo = accountInfo;
      this.accountInfo.address_short = utils.shortAddress(
        this.accountInfo.address
      );
      this.refreshTransactions();
    },
    showQrcode: function() {
      this.$refs.qrcode.open(this.accountInfo.address);
    },
    transferOpen: function() {
      this.fee = this.$t('transfer.feeType');
      this.feeTypeOptions = [this.$t('transfer.feeType')];
      this.$refs.transfer.open(this.accountInfo);
    },
    transcationsFormat: function(transactions) {
      transactions.forEach(transaction => {
        let inputSum = 0;
        let outputSum = 0;
        let selfInputSum = 0;
        let selfoutputSum = 0;
        let inputAddresses = [];
        let outputAddresses = [];
        transaction.inputs.forEach(input => {
          inputSum += input.amount;
          if (input.address == this.accountInfo.address) {
            selfInputSum += input.amount;
            return;
          }

          inputAddresses.push(input.address);
        });
        transaction.outputs.forEach(output => {
          outputSum += output.amount;
          if (output.address == this.accountInfo.address) {
            selfoutputSum += output.amount;
            return;
          }

          outputAddresses.push(output.address);
        });

        let val = selfoutputSum - selfInputSum;
        if (val > 0) {
          transaction.direct = "+";
          transaction.address = utils.shortAddress(inputAddresses.pop());
        } else {
          val = selfInputSum - selfoutputSum;
          transaction.direct = "-";
          transaction.address = utils.shortAddress(outputAddresses.pop());
        }
        transaction.val = Number(val / 100000000);
        transaction.fee = Number(inputSum - outputSum) / 100000000;
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
            return;
          }

          this.transcationsFormat(transactions);
          console.log("formatTx", transactions);
          this.transcations = transactions;
        })
        .catch(error => {
          console.log(error);
        });
    },
    appendTransactions: function() {
      bytom.Transaction.list(
        this.accountInfo.guid,
        this.accountInfo.address,
        this.start,
        this.limit
      )
        .then(ret => {
          let transactions = ret.data.transactions;
          if (transactions == null || ret._links.next == undefined) {
            return;
          }

          this.transcationsFormat(transactions);
          console.log("formatTx", transactions);
          transactions.forEach(transaction => {
            this.transcations.push(transaction);
          });
        })
        .catch(error => {
          console.log(error);
        });
    }
  },
  mounted() {
    if (localStorage.bytomNet != undefined) {
      this.network = localStorage.bytomNet;
    }
    this.refreshTransactions();

    this.clipboard.on("success", e => {
      this.$dialog.show({
        header: this.$t("dialog.header"),
        body: this.$t("dialog.copy.success")
      });
    });
    this.clipboard.on("error", e => {
      this.$dialog.show({
        header: this.$t("dialog.header"),
        body: this.$t("dialog.copy.fail")
      });
    });
  },
  beforeDestroy() {
    this.clipboard.destroy();
  }
};
</script>