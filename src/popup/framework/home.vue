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
  margin-top: 22px;
  margin-right: 20px;
  border: 2px solid #fff;
  border-radius: 18px;
  padding: 0 10px;
  font-size: 14px;
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
  padding: 0 20px;
}
.list-item {
  display: flex;
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
          <span>账户1aaadfddssdsd</span>
      </div>
      <div class="row balance">
          <img src="../../assets/logo.png" class="token-icon">
          <div class="amount">
              <div class="token-amount">100.123 BTM</div>
              <p class="account-address">bm1qsgh.....2dz8uny<i class="iconfont qrcode" @click="showQrcode">&#xe7dd;</i></p>
          </div>
          <a href="#" class="btn btn-primary btn-transfer" @click="transferOpen">转账</a>
      </div>
    </section>

    <section class="transactions">
      <h3 class="color-gray">交易记录</h3>
      <ul class="list">
        <li class="list-item">
            <div>
              <div class="time">2018-08-22</div>
              <div class="addr">bm1qsg...8uny</div>
            </div>
            <div class="value">+2344 BTM</div>
        </li>
        <li class="list-item">
            <div>
              <div class="time">2018-08-22</div>
              <div class="addr">bm1qsg...8uny</div>
            </div>
            <div class="value">-1234 BTM</div>
        </li>
      </ul>
    </section>

    <!-- modal -->
    <div v-show="maskOpen" class="mask"></div>
    <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
    <transition name="left-menu" 
        enter-active-class="animated slideInLeft faster" 
        leave-active-class="animated slideOutLeft faster" 
        v-on:after-leave="afterLeave">
        <Menu v-show="menuOpen" @closeNotify="menuOpen=false"></Menu>
    </transition>
    
    <Qrcode ref="qrcode"></Qrcode>
    <Transfer ref="transfer"></Transfer>

  </div>
</template>

<script>
import Menu from "./components/menu/main";
import Qrcode from "./components/trans/qrcode";
import Transfer from "./components/trans/transfer";
import TransList from "./components/trans/trans-list";
import TransDetail from "./components/trans/trans-detail";
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
      maskOpen: false
    };
  },
  methods: {
    openMenu: function() {
      this.maskOpen = true;
      this.menuOpen = true;
    },
    afterLeave: function() {
      this.maskOpen = false;
    },
    showQrcode: function() {
      this.$refs.qrcode.open();
    },
    transferOpen: function() {
      this.$refs.transfer.open();
    }
  },
  mounted() {
    console.log(1111);
    // this.openMenu()
    this.transferOpen();
  }
};
</script>