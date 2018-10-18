import Vue from "vue";
import App from "./App.vue";
import Loading from 'vue-loading-overlay';
import moment from "moment";
import ClipboardJS from "clipboard";
import "../assets/style.css";
import 'vue-loading-overlay/dist/vue-loading.css';

let clipboard = new ClipboardJS(".account-address");
clipboard.on('success', function(e) {
  alert("coby success");
});
clipboard.on('error', function(e) {
  alert("coby error");
});
Vue.use(Loading);
Vue.filter("moment", function(value, formatString) {
  formatString = formatString || "YYYY-MM-DD HH:mm:ss";
  return moment(value * 1000).format(formatString);
});

new Vue({
  el: "#app",
  render: h => h(App)
});
