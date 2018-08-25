<style>
.btn-close{
    font-size: 32px;
    position: relative;
    top: 10px;
    left: 10px;;
}
.mc-wrap {
  position: fixed;
  top: 60px;;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 25;
  width: 75%;
  height: 100%;
  background: #fff;
}

.menu-list {
    margin-top: 20px;
}
</style>

<template>
        <div class="mc-wrap">
            <section style="height: 65px;">
                <i class="iconfont btn-close" @click="close">&#xe605;</i>
            </section>
            <section>
                <ul class="aui-list aui-list-in">
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-title">账号1</div>
                        </div>
                    </li>
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-title">账号2</div>
                        </div>
                    </li>
                </ul>
            </section>
            <section class="menu-list">
                <ul class="aui-list">
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-title">创建账户</div>
                        </div>
                    </li>
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-title">导入账号</div>
                        </div>
                    </li>
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-title">备份种子</div>
                        </div>
                    </li>
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-title">帮助</div>
                        </div>
                    </li>
                    <li class="aui-list-item">
                        <div class="aui-list-item-inner">
                            <div class="aui-list-item-title">设置</div>
                        </div>
                    </li>
                </ul>
            </section>
        </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    close: function() {
      this.$emit("closeNotify");
    }
  }
};
</script>