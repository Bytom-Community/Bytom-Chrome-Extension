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
          <div class="btn bg-green" @click="backup">备份</div>
        </section>
    </div>
</template>

<script>
import bytom from "../../../../script/bytom";
import FileSaver from "file-saver";
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    close: function() {
      this.$emit("closed", "");
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