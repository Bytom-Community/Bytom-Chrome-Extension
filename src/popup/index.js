import Vue from "vue";
import Spin from "./components/spin";
import App from "./App.vue";
import moment from "moment";
import "../assets/style.css";

Vue.prototype.$Spin = Spin;
Vue.filter("moment", function(value, formatString) {
  formatString = formatString || "YYYY-MM-DD HH:mm:ss";
  return moment(value * 1000).format(formatString);
});

new Vue({
  el: "#app",
  render: h => h(App)
});
