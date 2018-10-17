<style>
.btn-close {
  color: #ffffff;
  font-weight: bold;
  position: absolute;
  right: 10px;
  top: 10px;
}
.mc-wrap {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 9999;
  width: 60%;
  height: 100%;
  padding: 40px;
  background-color: #3c454b;
}

.mc2warp {
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  padding: 40px;
}
.account-list {
  width: 100%;
  height: 230px;
  overflow-x: hidden;
  overflow-y: scroll;
}
.account-list::-webkit-scrollbar {
  display: none;
}
.account-list ul {
  margin-top: 30px;
}
.account-list i {
  font-size: 28px;
  line-height: 45px;
  margin-right: 18px;
}

ul {
  display: grid;
}
ul li {
  display: flex;
  padding: 5px 0;
}
li i {
  margin: 0 8px;
}
li:active,
li:hover,
li.active {
  background-color: #1bc1b0;
  border-radius: 8px;
  cursor: pointer;
}
.acc-alias {
  width: 150px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>

<template>
  <div class="mc-wrap bg-gray">
    <section>
      <i class="iconfont btn-close" @click="close">&#xe605;</i>
      <h3>账号切换</h3>
    </section>
    <section class="account-list">
      <ul>
        <!--  class="active" -->
        <div v-for="(account, index) in accounts">
            <li :class="(currentAccount != undefined && account.address == currentAccount.address) ? 'active': ''" @click="accountSelected(account)">
              <i class="iconfont icon-user"></i>
              <div>
                  <p v-if="account.alias" class="acc-alias">{{account.alias}}</p>
                  <p v-else>账户{{index+1}}</p>
                  <p>{{account.balance}} BTM</p>
              </div>
          </li>
        </div>
        
      </ul>
    </section>
    <hr>
    <section class="menu-list">
        <ul>
            <li @click="currView='creation'"><i class="iconfont icon-plusbox"></i>创建账户</li>
            <!-- <li @click="currView='recovery'"><i class="iconfont icon-import"></i>导入账号</li> -->
            <li @click="currView='backup'"><i class="iconfont icon-backup"></i>备份</li>
            <li @click="currView='help'"><i class="iconfont icon-help"></i>帮助</li>
            <li @click="currView='settings'"><i class="iconfont icon-settings"></i>设置</li>
        </ul>
    </section>

    <!-- modal -->
    <transition-group name="menus">
      <Creation key="creation" v-show="view.creation" @closed="currView=''"></Creation>
      <Recovery key="recovery" v-show="view.recovery" @closed="currView=''"></Recovery>
      <Bakcup key="backup" v-show="view.backup" @closed="currView=''"></Bakcup>
      <Help key="help" v-show="view.help" @closed="currView=''"></Help>
      <Settings key="settings" v-show="view.settings" @closed="currView=''"></Settings>
    </transition-group>
  </div>
</template>

<script>
import Creation from "./page/creation";
import Recovery from "./page/recovery";
import Bakcup from "./page/backup";
import Help from "./page/help";
import Settings from "./page/settings";
import bytom from "../../../script/bytom";
export default {
  name: "",
  components: {
    Creation,
    Recovery,
    Bakcup,
    Help,
    Settings
  },
  data() {
    return {
      currView: "",
      accounts: [],
      currentAccount: ""
    };
  },
  computed: {
    view() {
      const { currView } = this;
      return {
        creation: currView === "creation",
        recovery: currView === "recovery",
        backup: currView === "backup",
        help: currView === "help",
        settings: currView === "settings"
      };
    }
  },
  watch: {
    currView: function() {
      if (this.currView == "" || this.accounts.length == 0) {
        this.refresh();
      }
    }
  },
  methods: {
    close: function() {
      this.$emit("closed");
    },
    accountSelected: function(accountInfo) {
      this.currentAccount = accountInfo;
      this.$emit("account-change", this.currentAccount);
      this.close();
    },
    refresh: function(accountInfo) {
      bytom.Account.list().then(accounts => {
        console.log(222, accounts);
        if (accounts.length == 0) {
          return;
        }

        this.accounts = accounts;
        this.currentAccount = accounts[0];
        this.$emit("account-change", this.currentAccount);
      });
    }
  },
  mounted() {
    this.refresh();
  }
};
</script>