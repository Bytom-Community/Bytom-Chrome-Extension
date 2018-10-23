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
            <i class="iconfont btn-close" @click="back">&#xe605;</i>
            <h3>{{ $t("setting.title") }}</h3>
        </section>
        <section class="content">
            <div>
                <p>{{ $t("setting.version") }}</p>
                <p>1.0.1-2c74b9a</p>
            </div>
            <div>
                <p>{{ $t("setting.lang") }}</p>
                <select v-model="selected" @change="onChange()">
                    <option value="cn">中文</option>
                    <option value="en">English</option>
                </select>
            </div>
            <div>
                <p>{{ $t("setting.unit") }}</p>
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
    return {
      selected: 'cn'
    };
  },
  methods: {
    onChange: function() {
      localStorage.lang = this.selected;
      this.$i18n.locale = this.selected;
    },
    back: function() {
      this.$emit("on-back");
    },
    close: function() {
      this.$emit("on-exit");
    },
  },
  mounted: function() {
    if (localStorage.lang) {
      this.selected = localStorage.lang;
    }
  }
};
</script>