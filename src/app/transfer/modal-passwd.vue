<style scoped>
.mask {
  z-index: 3 !important;
  top: 60px !important;
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
  padding: 0;
}
.btn-inline .btn {
  margin: 10px 15px;
}
</style>

<template>
    <div>        
        <section v-show="show" class="mask"></section>
        <transition name="page-transfer"
        <!-- enter-active-class="animated slideInUp faster" 
        leave-active-class="animated slideOutDown faster"> -->
            <div v-show="show" class="confirm form bg-gray">
                <div class="form-item">
                    <label class="form-item-label">{{ $t('transfer.confirmPassword') }}</label>
                    <div class="form-item-content" style="margin-left: 85px;">
                    <input type="password" v-model="passwd" autofocus>
                    </div>
                </div>
                <div class="btn-group btn-inline">
                    <div class="btn bg-green" @click="confirm">确认</div>
                    <div class="btn bg-red" @click="close">取消</div>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
export default {
  data() {
    return {
      show: false,
      passwd: ""
    };
  },
  methods: {
    open() {
      this.show = true;

      this.passwd = "";
    },
    close() {
      this.show = false;
    },
    confirm() {
      if (this.passwd == "") {
        this.$dialog.show({
          body: this.$t("transfer.emptyPassword")
        });
        return;
      }

      this.close();
      this.$emit("confirm", this.passwd);
    }
  }
};
</script>

<style scoped>
</style>