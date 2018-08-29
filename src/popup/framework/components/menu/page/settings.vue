<style scoped>
.content{
    margin: 50px 0;
  font-size: 14px;
}
.content div{
    margin: 20px 0;
}
</style>

<template>
    <div class="mc2warp bg-gray">
        <section>
            <i class="iconfont btn-close" @click="close">&#xe605;</i>
            <h3>设置</h3>
        </section>
        <section class="content">
            <div>
                <p>钱包版本</p>
                <p>1.0.1-2c74b9a</p>
            </div>
            <div>
                <p>语言</p>
                <select name="" id="">
                    <option value="">中文</option>
                </select>
            </div>
            <div>
                <p>比原数量单位</p>
                <select name="" id="">
                    <option value="">BTM</option>
                </select>
            </div>
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
      this.$emit("closed", '');
    }
  }
};
</script>