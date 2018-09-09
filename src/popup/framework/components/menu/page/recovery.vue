<style scoped>
.body{
  padding: 20px 15px;
}
</style>

<template>
    <div class="mc2warp bg-gray">
        <section>
            <i class="iconfont btn-close" @click="close">&#xe605;</i>
            <h3>导入账户</h3>
        </section>
        <section class="body">
          <div class="form-item">
              <input type="file">
          </div>
          <div class="btn bg-green" @click="recovery">从种子导入</div>
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
    },
    recovery: function() {
      
    }
  }
};
</script>