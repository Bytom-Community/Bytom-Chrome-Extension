<template>
  <section id="app">
    <transition-group name="panels" tag="div" class="app-wrapper">
      <Login class="view" key="login" v-show="view.login"></Login>
      <Home class="view" key="home" v-show="view.home"></Home>
    </transition-group>
  </section>
</template>

<script>
import Home from "./home/main";
import Login from "./login/main";

export default {
  components: {
    Login,
    Home
  },
  data() {
    return {
      currView: "home"
    };
  },
  computed: {
    view() {
      const { currView } = this;
      return {
        login: currView === "login",
        home: currView === "home"
      };
    }
  },
  methods: {},
  mounted() {
    if (localStorage.login == undefined) {
      this.currView = "login";
      return;
    }
  }
};
</script>