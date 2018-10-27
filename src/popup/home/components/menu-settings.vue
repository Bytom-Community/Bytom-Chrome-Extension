<style scoped>
.row {
  margin: 25px 0;
}
.value {
  font-size: 15px;
  line-height: 30px;
}
</style>

<template>
    <MenuPage :title="$t('setting.title')" @back="back">
        <div class="row">
            <p>{{ $t("setting.version") }}</p>
            <p class="value">[AIV]{version}[/AIV]-{{hashVersion}}</p>
        </div>
        <div class="row">
            <p>{{ $t("setting.lang") }}</p>
            <select class="value" v-model="selected" @change="onChange()">
                <option value="cn">中文</option>
                <option value="en">English</option>
            </select>
        </div>
        <div class="row">
            <p>{{ $t("setting.unit") }}</p>
            <select class="value">
                <option value="">BTM</option>
            </select>
        </div>
    </MenuPage>
</template>

<script>
export default {
  name: "",
  data() {
    return {
      selected: "cn",
      hashVersion: ""
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
    }
  },
  mounted: function() {
    this.hashVersion = version.hash;
    if (localStorage.lang) {
      this.selected = localStorage.lang;
    }
  }
};
</script>