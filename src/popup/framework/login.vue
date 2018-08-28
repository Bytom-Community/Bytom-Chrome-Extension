<style>
.warp {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
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
  font-size: 12px;
}
.login-content h4 {
  text-align: center;
  font-size: 18px;
}
.login-footer {
  padding: 20px 85px;
}
</style>

<template>
  <section id="app">
    <transition-group name="panels">
      <Welcome class="view" key="welcome" v-show="view.welcome" @next="currView='protocol'"></Welcome>
      <Protocol class="view" key="protocol" v-show="view.protocol" @next="currView='formAddon'"></Protocol>
      <FormAddon class="view" key="formAddon" v-show="view.formAddon" @next="currView='formRecover'" @success="loadHome"></FormAddon>
      <FormRecover class="view" key="formRecover" v-show="view.formRecover" @back="currView='formAddon'"></FormRecover>
    </transition-group>
  </section>
</template>

<script>
import Welcome from "./components/login/welcome";
import Protocol from "./components/login/protocol";
import FormAddon from "./components/login/form-addon";
import FormRecover from "./components/login/form-recover";

export default {
  components: {
    Welcome,
    Protocol,
    FormAddon,
    FormRecover
  },
  data() {
    return {
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
    loadHome: function() {
      this.$emit("succ");
    }
  }
};
</script>