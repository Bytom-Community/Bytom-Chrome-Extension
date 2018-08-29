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
  width: 350px;
  padding-left: 75px;
  padding-top: 30px;
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
              <img src="../../../../assets/logo.png" class="token-icon">
              <div style="display: flex">
                <h1>3000000</h1>
                <span>BTM</span>
              </div>
            </div>
        </section>
        <section v-show="maskShow" class="mask"></section>
        <section class="form">
          <div class="form-item-group">
            <div class="form-item">
              <select placeholder="账户">
                <option value="">账户1</option>
              </select>
            </div>
            <div class="form-item" style="margin-left: 20px;">
              <select placeholder="资产">
                <option value="">BTM</option>
              </select>
            </div>
          </div>
          <div class="form-item">
            <label for="">地址</label>
            <input type="text">
          </div>
          <div class="form-item">
            <label for="">数量</label>
            <input type="text">
            <span>单位</span>
          </div>
          <div class="form-item">
            <label for="">≈</label>
            <input type="text">
            <span>CNY</span>
          </div>
          <div class="form-item">
            <label for="">矿工费用</label>
            <select>
              <option value=""></option>
            </select>
          </div>
          <br>
          <div class="form-item">
            <label for="">交易密码</label>
            <input type="password">
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
              <label for="">密码确认</label>
              <input type="password">
            </div>
            <div class="btn-group btn-inline">
              <div class="btn bg-green">确认发送</div>
              <div class="btn bg-red" @click="confirmClose">取消发送</div>
            </div>
        </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      show: false,
      maskShow: false,
      confirmShow: false
    };
  },
  methods: {
    open: function() {
      this.show = true;
    },
    confirmOpen: function() {
      this.maskShow = true;
      this.confirmShow = true;
    },
    confirmClose: function() {
      this.confirmShow = false;
      this.maskShow = false;
    }
  }
};
</script>