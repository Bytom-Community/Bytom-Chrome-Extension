<template>
  <section id="bytom-chrome-extension">
    <TopBar @fetch-exp="fetchExp" :view.sync="currView"></TopBar>
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

<style lang="scss">
html,
body {
  margin: 0;
  padding: 0;
  width: 350px;
  height: 600px;
  background-color: #ffffff;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

h1,
h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

@font-face {font-family: "iconfont";
  src: url('//at.alicdn.com/t/font_806738_cdx1dwv5z.eot?t=1535178200216'); /* IE9*/
  src: url('//at.alicdn.com/t/font_806738_cdx1dwv5z.eot?t=1535178200216#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('data:application/x-font-woff;charset=utf-8;base64,d09GRgABAAAAAAV4AAsAAAAACFQAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAABHU1VCAAABCAAAADMAAABCsP6z7U9TLzIAAAE8AAAARAAAAFY8e0nPY21hcAAAAYAAAABoAAABstGFnpFnbHlmAAAB6AAAAX8AAAHsujaYKWhlYWQAAANoAAAALwAAADYSbXGFaGhlYQAAA5gAAAAcAAAAJAfeA4ZobXR4AAADtAAAAA4AAAAUFAAAAGxvY2EAAAPEAAAADAAAAAwA0AF0bWF4cAAAA9AAAAAfAAAAIAEbAERuYW1lAAAD8AAAAUUAAAJtPlT+fXBvc3QAAAU4AAAAPQAAAE6e5oxNeJxjYGRgYOBikGPQYWB0cfMJYeBgYGGAAJAMY05meiJQDMoDyrGAaQ4gZoOIAgCKIwNPAHicY2BkYWCcwMDKwMHUyXSGgYGhH0IzvmYwYuRgYGBiYGVmwAoC0lxTGByesT6/y9zwv4EhhrmBoQEozAiSAwDuCQzGeJztkcsNgCAQBYePxhjpxCIoyJNdURRXLAN3WQ4W4SNDeBPCgQUWIAinEMHdODSXWDd8YB8+kqXvbHh8W1pq5am9w/c84+SeLX09SvciV/4cY8+zRf09Q6fQkjF8MXQKTzXwLxssG3d4nD1QO27bQBB9s6toxaU+JsWPpCCyKUI0DAMWIFpSZ2wOEN/BjVImJwgWqVMH8AFcuLIvYICdq5QucoRUrgOIlIeW5QXe7MybN28Wiwb4yEJygIKLNtAPkwUli8RjhJ/lj83PPcR2va4u19WXr1f1GGu3hbTvsz30ESPFMU4xQ44Ve+WLVLJTzFhxTl7i1bWXLlIv93JelU7f+tM0zGu9YhTWWrKVNYQtDOeGrNmCYAvDnCnx3hUsNcYwBGy50xkrTFUbFIQKrOSRYtcqbFmb1+8X/P5/8pccoIOPQDw5o+WKlvMoUNRMJseUnS/nMY2pS791ryWVeHKGgVOeOuKxU1/B0BFPSrZ6sfZ9JZ61P3JKT2vx7Ix8XXrK9/VuT/3H4j9CnACUTFRTdSk6pGi+PJ9RwjGbJvP8grIZZZNmcMiaZhDJ682fRqPTUqKtb9xx5H4Tfw/CcPMgc6Z9cu9eyTJjkgRJrQbhh1s3Hrvfo6NwI4NP7ft9BbwAweVkagB4nGNgZGBgAOKAz9ss4vltvjJwszCAwPXlYjcQ9P8DLAzMEkAuBwMTSBQAOVkKogB4nGNgZGBgbvjfwBDDwgACQJKRARWwAgBHCwJueJxjYWBgYEHDAAEEABUAAAAAAAAAHgB+ALIA9nicY2BkYGBgZbBg4GEAASYg5gJCBob/YD4DAA9dAWAAeJxlj01OwzAQhV/6B6QSqqhgh+QFYgEo/RGrblhUavdddN+mTpsqiSPHrdQDcB6OwAk4AtyAO/BIJ5s2lsffvHljTwDc4Acejt8t95E9XDI7cg0XuBeuU38QbpBfhJto41W4Rf1N2MczpsJtdGF5g9e4YvaEd2EPHXwI13CNT+E69S/hBvlbuIk7/Aq30PHqwj7mXle4jUcv9sdWL5xeqeVBxaHJIpM5v4KZXu+Sha3S6pxrW8QmU4OgX0lTnWlb3VPs10PnIhVZk6oJqzpJjMqt2erQBRvn8lGvF4kehCblWGP+tsYCjnEFhSUOjDFCGGSIyujoO1Vm9K+xQ8Jee1Y9zed0WxTU/3OFAQL0z1xTurLSeTpPgT1fG1J1dCtuy56UNJFezUkSskJe1rZUQuoBNmVXjhF6XNGJPyhnSP8ACVpuyAAAAHicY2BigAAuBuyAlZGJkZmRhZGVkY2BJTc1r5Q9tag8NTM3kTU5J784lTszOT9PtzAzozQxj4EBAMqNC1cAAAA=') format('woff'),
  url('//at.alicdn.com/t/font_806738_cdx1dwv5z.ttf?t=1535178200216') format('truetype'), /* chrome, firefox, opera, Safari, Android, iOS 4.2+*/
  url('//at.alicdn.com/t/font_806738_cdx1dwv5z.svg?t=1535178200216#iconfont') format('svg'); /* iOS 4.1- */
}

.iconfont {
  font-family:"iconfont" !important;
  font-size:16px;
  font-style:normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
