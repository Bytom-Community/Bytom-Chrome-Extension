<style scoped>
.body {
  padding: 20px 15px;
}
input {
  width: 165px;
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
              <input type="file" ref="file" @change="tirggerFile($event)">
          </div>
          <div class="btn bg-green" @click="recovery">从种子导入</div>
        </section> 
    </div>
</template>

<script>
import bytom from "../../script/bytom";
export default {
  name: "",
  data() {
    return {
      fileTxt: ""
    };
  },
  methods: {
    close: function() {
      this.$emit("closed", "");
    },
    tirggerFile: function(event) {
      var reader = new FileReader();
      reader.onload = e => {
        this.fileTxt = e.target.result;
      };

      var file = event.target.files[0];
      reader.readAsText(file);
    },
    recovery: function() {
      bytom
        .restore(this.fileTxt)
        .then(res => {
          this.close();
          console.log(res);
        })
        .catch(error => {
          alert(error);
        });
    }
  }
};
</script>