<template>
  <section id="app">
    <!-- <TopBar @fetch-exp="fetchExp" :view.sync="currView"></TopBar> -->
    <transition-group name="panels" tag="div" class="app-wrapper">
      <search-panel class="view" key="search" :query="query" v-show="view.search"></search-panel>
      <home class="view" key="home" :query="query" v-show="view.home"></home>
      <AccountCreate class="view" key="accountCreate" :query="query" v-show="view.accountCreate"></AccountCreate>
    </transition-group>
  </section>
</template>

<script>
import TopBar from "./components/topbar";
import Home from "./components/home";
import SearchPanel from "./components/search-panel";
import AccountCreate from "./components/account-create";

export default {
  components: {
    TopBar,
    Home,
    SearchPanel,
    AccountCreate
  },
  data() {
    return {
      query: "",
      currView: "home",
      msg: "This is popup page1 !"
    };
  },
  computed: {
    view() {
      const { currView } = this;
      return {
        home: currView === "home",
        search: currView === "search",
        accountCreate: currView === "accountCreate"
      };
    }
  },
  methods: {
    fetchExp(v) {
      this.query = v;
    }
  }
};
</script>