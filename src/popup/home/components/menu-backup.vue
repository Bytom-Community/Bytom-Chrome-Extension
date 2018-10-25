<style scoped>

</style>

<template>
    <MenuPage title="备份" @back="back">
      <div style="text-align: center">
        <div style="width: 200px;" class="btn bg-green" @click="backup">备份</div>
      </div>
    </MenuPage>
</template>

<script>
import bytom from "../../script/bytom";
import FileSaver from "file-saver";
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
    backup() {
      bytom.Account.backup().then(txt => {
        var blob = new Blob([txt], {
          type: "text/plain;charset=utf-8"
        });
        FileSaver.saveAs(blob, "bytom_chrome_wallet_backup.txt");
      });
    }
  }
};
</script>