<style scoped>
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
  z-index: 25;
  width: 60%;
  height: 100%;
  padding: 40px;
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
  padding: 5px;
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
</style>

<template>
        <div class="mc-wrap bg-gray">
            <section>
                <i class="iconfont btn-close" @click="close">&#xe605;</i>
            </section>
            <section class="account-list">
                <h2>账号切换</h2>
                <ul>
                    <li class="active">
                        <i class="iconfont icon-user"></i>
                        <div>
                            <p>账号1</p>
                            <p>1000 BTM</p>
                        </div>
                    </li>
                    <li>
                        <i class="iconfont icon-user"></i>
                        <div>
                            <p>账号2</p>
                            <p>200 BTM</p>
                        </div>
                    </li>
                    <li>
                        <i class="iconfont icon-user"></i>
                        <div>
                            <p>账号3</p>
                            <p>0 BTM</p>
                        </div>
                    </li>
                </ul>
            </section>
            <hr>
            <section class="menu-list">
                <ul>
                    <li><i class="iconfont icon-plusbox"></i>创建账户</li>
                    <li><i class="iconfont icon-import"></i>导入账号</li>
                    <li><i class="iconfont icon-backup"></i>备份种子</li>
                    <li><i class="iconfont icon-help"></i>帮助</li>
                    <li><i class="iconfont icon-settings"></i>设置</li>
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