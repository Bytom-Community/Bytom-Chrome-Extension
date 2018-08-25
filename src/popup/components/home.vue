<style lang="" scoped>
.account {
  border-bottom: 1px solid rgb(229, 229, 229);
  padding-bottom: 10px;
  text-align: center;
}
.qrcode{
    margin-left: 5px;
    vertical-align: middle;
}
.account .menu,
.toggle {
  font-size: 24px;
}

.balance {
  margin-top: 30px;
  text-align: center;
  padding: 0 30px 20px;
}
.balance .balance-icon {
  display: inline-flex;
  height: 50px;
  width: 50px;
  border: 1px solid #dedede;
  border-radius: 25px;
  padding: 8px;
  background: #fff;
}
.balance .amount {
  padding-bottom: 10px;
}
.balance .token-amount {
  font-size: 32px;
}
.balance .fiat-amount {
  text-transform: uppercase;
  color: #a0a0a0;
}

.transactions {
  font-size: 14px;
  line-height: 40px;
  display: contents;
}
.transactions .time {
}
.transactions .addr {
}
.transactions .value {
}
.aui-list-item {
  padding: 0;
}
.mask {
  z-index: 25;
  position: fixed;
  height: 100%;
  width: 100%;
  top: 60px;
  left: 0;
  right: 0;
  bottom: 0;
  opacity: 1;
  visibility: visible;
  background-color: rgba(0, 0, 0, 0.3);
}
.faster {
  animation-duration: 0.3s;
}
</style>

<template>
    <div>
        <section class="aui-content-padded">
            <div class="aui-row account">
                <div class="aui-col-xs-2 menu">
                    <a href="#" style="color: #000"><i class="iconfont" @click="openMenu">&#xe6a9;</i></a>
                </div>
                <div class="aui-col-xs-8 info">
                    <p class="account-name">账户1</p>
                    <p class="account-address">bm1qsgh.....2dz8uny<i class="iconfont qrcode" @click="showQrcode">&#xe7dd;</i></p>
                </div>
                <div class="aui-col-xs-2 toggle">
                    <i class="iconfont">&#xe60d;</i>
                </div>
            </div>
            <div class="aui-row balance">
                <img src="../../assets/logo.png" class="balance-icon">
                <div class="amount">
                    <div class="token-amount">100.123 BTM</div>
                    <div class="fiat-amount">≈￥501.23</div>
                </div>
                <button class="aui-btn aui-btn-info aui-btn-block">转账</button>
            </div>

            <div class="aui-row">
                <ul class="aui-list aui-list-in">
                    <li class="aui-list-item">
                        <div class="transactions">
                            <div class="time">2018-08-22</div>
                            <div class="addr">bm1qsg...8uny</div>
                            <div class="value">+2344 BTM</div>
                        </div>
                    </li>
                    <li class="aui-list-item">
                        <div class="transactions">
                            <div class="time">2018-08-22</div>
                            <div class="addr">bm1qsg...8uny</div>
                            <div class="value">-1234 BTM</div>
                        </div>
                    </li>
                </ul>
            </div>
        </section>

        <!-- modal -->
        <div v-show="maskOpen" class="mask"></div>
        <link href="https://cdn.jsdelivr.net/npm/animate.css@3.5.1" rel="stylesheet" type="text/css">
        <transition name="custom-classes-transition" 
            enter-active-class="animated slideInLeft faster" 
            leave-active-class="animated slideOutLeft faster" 
            v-on:after-leave="afterLeave">
            <Menu v-show="menuOpen" @closeNotify="menuOpen=false"></Menu>
        </transition>
    </div>
</template>

<script>
import Menu from "./menu";
export default {
  name: "",
  components: {
    Menu
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
    showQrcode: function(){

    }
  },
  mounted(){
    //   this.openMenu()
  }
};
</script>