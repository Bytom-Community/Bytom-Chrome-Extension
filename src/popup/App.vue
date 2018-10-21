<template>
  <section id="app">
    <transition-group name="panels" tag="div" class="app-wrapper">
      <Login class="view" key="login" v-show="view.login" @succ="loadAccounts"></Login>
      <Home ref="Home" class="view" key="home" v-show="view.home"></Home>
    </transition-group>
  </section>
</template>

<script>
import Home from "./home/main";
import Login from "./login/main";
import bytom from "./script/bytom";

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
  methods: {
    loadAccounts: function() {
      // localStorage.bytomNet = "testnet";
      console.log(localStorage.bytomNet);
      if (localStorage.bytomNet == undefined) {
        this.currView = "login";
        return;
      }

      // bytom.Account.list().then(accounts => {
      //   this.currView = accounts.length > 0 ? "home" : "login";
      // });
    }
  },
  mounted() {
    this.loadAccounts();
  }
};
</script>