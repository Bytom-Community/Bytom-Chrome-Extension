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

.preview i {
  width: 100px;
  margin: 0 auto;
  display: block;
  width: 45px;
  font-size: 45px;
  margin-bottom: 25px;
}
.preview .value {
  font-size: 30px;
  width: 300px;
  margin: 0 auto;
  text-align: center;
}
.preview .value span {
  font-size: 18px;
}

.title {
  font-size: 18px;
  font-weight: inherit;
  color: #cacaca;
  text-align: center;
  padding: 5px 0;
}
.transaction {
  width: 293px;
  padding: 0 30px;
  font-size: 15px;
  word-break: break-all;
  height: 415px;
  margin-top: 20px;
}
.transaction .time {
  margin: 10px 0;
  font-size: 15px;
}
.transaction .label {
  font-size: 12px;
}
.transaction .info {
  font-size: 18px;
  display: inline-flex;
}
.transaction .info section {
  margin-right: 30px;
  width: 80px;
}
.transaction .txid {
  margin-top: 20px;
}
.transaction .inputs {
  margin-top: 10px;
}
.transaction .outputs {
  margin-top: 10px;
  margin-bottom: 30px;
}
</style>

<template>
  <div>
    <transition name="page-transfer"
      enter-active-class="animated fadeInLeft faster" 
      leave-active-class="animated fadeOutLeft faster">
      <div v-show="show" class="warp bg-black">
        <section class="header bg-green">
            <i class="iconfont icon-back" @click="close"></i>
            <div class="preview">
              <i class="iconfont icon-ios-checkmark-circle color-black"></i>
              <p class="value">{{transaction.direct}}{{transaction.val}}<span>BTM</span></p>
            </div>
        </section>

        <h3 class="title bg-gray">{{ $t('transactionDetail.title') }}</h3>
        <section>
          <vue-scroll>
            <div class="transaction">
              <p class="time">{{transaction.timestamp | moment}}</p>
              <div class="info">
                <section>
                  <p class="label">{{ $t('transactionDetail.fee') }}(BTM)</p>
                  <p>{{transaction.fee}}</p>
                </section>
                <section>
                  <p class="label">{{ $t('transactionDetail.blockHeight') }}</p>
                  <p>{{transaction.block_height}}</p>
                </section>
                <section>
                  <p class="label">{{ $t('transactionDetail.blockSize') }}</p>
                  <p>{{transaction.size}}</p>
                </section>
              </div>
              <div class="txid">
                <p class="label">{{ $t('transactionDetail.transactionID') }}</p>
                <p>{{transaction.hash}}</p>
              </div>
              <div class="inputs">
                <section :key="index" v-for="(input, index) in transaction.inputs">
                  <p class="label">{{ $t('transactionDetail.sendAddress') }}{{transaction.inputs.length > 1 ? index+1 : ''}}</p>
                  <p>{{input.address}}<span v-if="input.address == selfAddress"> {{ $t('transactionDetail.myAddress') }}</span></p>
                </section>
              </div>
              <div class="outputs">
                <section :key="index" v-for="(output, index) in transaction.outputs">
                  <p class="label">{{ $t('transactionDetail.receiveAddress') }}{{transaction.outputs.length > 1 ? index+1 : ''}}</p>
                  <p>{{output.address}}<span v-if="output.address == selfAddress"> {{ $t('transactionDetail.myAddress') }}</span></p>
                </section>
              </div>
            </div>
          </vue-scroll>
        </section>
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
      selfAddress: "",
      transaction: {
        guid: "",
        to: "",
        amount: 0,
        fee: ""
      }
    };
  },
  methods: {
    open: function(transaction, selfAddress) {
      this.show = true;

      console.log(transaction);
      this.transaction = transaction;
      this.selfAddress = selfAddress;
    },
    close: function() {
      this.show = false;
    }
  }
};
</script>