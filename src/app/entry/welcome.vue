<style>
.warp {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 100%;
}
.login-header {
  height: 60px;
  text-align: center;
}
.login-header img {
  width: 30px;
  height: 30px;
  margin-top: 15px;
}
.login-content {
  padding: 30px;
}
.login-content .title {
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
}
.login-footer {
  padding: 20px 85px;
}
</style>

<template>
  <section id="app">
    <transition-group name="panels">
      <Welcome class="view" key="welcome" v-show="view.welcome" @next="currView='protocol'"></Welcome>
      <Protocol class="view" key="protocol" v-show="view.protocol" @next="protocolNext"></Protocol>
      <FormAddon class="view" key="formAddon" :i18n="i18n" v-show="view.formAddon" @next="currView='formRecover'" @success="loadHome"></FormAddon>
      <FormRecover class="view" key="formRecover" v-show="view.formRecover" @back="currView='formAddon'" @success="loadHome"></FormRecover>
    </transition-group>
  </section>
</template>

<script>
import Welcome from "../welcome/welcome";
import Protocol from "../welcome/protocol";
import FormAddon from "../welcome/form-addon";
import FormRecover from "../welcome/form-recover";
import {have} from "../../assets/language"

export default {
  components: {
    Welcome,
    Protocol,
    FormAddon,
    FormRecover
  },
  data() {
    return {
      i18n: "cn",
      currView: "welcome"
    };
  },
  computed: {
    view() {
      const { currView } = this;
      return {
        welcome: currView === "welcome",
        protocol: currView === "protocol",
        formAddon: currView === "formAddon",
        formRecover: currView === "formRecover"
      };
    }
  },
  methods: {
    protocolNext() {
      if(have(localStorage.lang)) {
        this.i18n = localStorage.lang;
      }
      this.currView='formAddon';
    },
    loadHome: function() {
      this.$emit("succ");
    }
  }
};
</script>