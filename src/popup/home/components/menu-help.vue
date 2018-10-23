<style scoped>
.content {
  margin: 50px 0;
  word-wrap: break-word;
  font-size: 14px;
}
</style>

<template>
    <div class="mc2warp bg-gray">
        <section>
            <i class="iconfont btn-close" @click="back">&#xe605;</i>
            <h3>{{ $t("help.title") }}</h3>
        </section>
        <section class="content">
          <p>{{ $t("help.page") }}</p>
          <a href="http://github.com/bytom/bytom/wiki" target="_blank">http://github.com/bytom/bytom/wiki</a>
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
    back: function() {
      this.$emit("on-back");
    },
    close: function() {
      this.$emit("on-exit");
    },
  }
};
</script>