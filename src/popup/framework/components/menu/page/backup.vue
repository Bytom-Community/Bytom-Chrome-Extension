<style scoped>
.content {
  margin: 30px 0;
  padding: 0 10px;
}
</style>

<template>
    <div class="mc2warp bg-gray">
        <section>
            <i class="iconfont btn-close" @click="close">&#xe605;</i>
            <h3>备份种子</h3>
        </section>
        <section class="content">
          <div class="btn bg-green">备份</div>
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
      this.$emit("closed", "");
    }
  }
};
</script>