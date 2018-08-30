import Vue from "vue";
import App from "./App.vue";
import "../assets/style.css";
import Bytom from "bytom-js-sdk"

var bytom = new Bytom("http://127.0.0.1:9888", "");
Vue.use(bytom);

new Vue({
  el: "#app",
  render: h => h(App)
});
