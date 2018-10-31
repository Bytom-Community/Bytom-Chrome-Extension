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
            <v-select :value="selected" :clearable="false" :onChange="onChange" :options="i18nOptions"></v-select>
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
import {have} from "../../../assets/language";

export default {
  name: "",
  data() {
    return {
      i18nOptions: [{label: "中文", value: "cn"}, {label: "English", value: "en"}],
      selected: {label: "中文", value: "cn"},
      hashVersion: ""
    };
  },
  methods: {
    onChange: function(value) {
      let needReload = false;
      localStorage.lang = value.value;
      this.$i18n.locale = value.value;
      this.selected = value;
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
    if (have(localStorage.lang)) {
      if(localStorage.lang == 'cn') {
        this.selected = {label: "中文", value: "cn"};
      } else if (localStorage.lang == 'en') {
        this.selected = {label: "English", value: "en"};
      }
    }
  }
};
</script>