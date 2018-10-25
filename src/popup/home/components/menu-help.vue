<style scoped>
</style>

<template>
    <MenuPage :title="$t('help.title')" @back="back">
        <p>{{ $t("help.page") }}</p>
        <a href="http://github.com/bytom/bytom/wiki" target="_blank">http://github.com/bytom/bytom/wiki</a>
    </MenuPage>
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