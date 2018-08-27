<template>
  <section id="app">
    <transition-group name="panels" tag="div" class="app-wrapper">
      <Login class="view" key="login" v-show="view.login" @succ="currView='home'"></Login>
      <Home class="view" key="home" v-show="view.home"></Home>
    </transition-group>
  </section>
</template>

<script>
import Home from "./framework/home";
import Login from "./framework/login";

import Bytom from "bytom-js-sdk";

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
    const url = "http://127.0.0.1:9888";
    const accessToken = "";

    const client = new Bytom(url, accessToken);

    //create key
    // const keyPromise = client.keys.create('alias', 'password')
    // keyPromise.then(key => {
    //     console.log(key)
    // }).catch(function(error){
    //     console.log(error)
    // })

    //accounts list
    const acPromise = client.accounts.listAll();
    acPromise.then(res => {
      console.log(res);
    });
  }
};
</script>