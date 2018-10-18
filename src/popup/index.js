import Vue from "vue";
import App from "./App.vue";
import Loading from 'vue-loading-overlay';
import moment from "moment";
import "../assets/style.css";
import 'vue-loading-overlay/dist/vue-loading.css';

Vue.use(Loading);
Vue.filter("moment", function(value, formatString) {
  formatString = formatString || "YYYY-MM-DD HH:mm:ss";
  return moment(value * 1000).format(formatString);
});

new Vue({
  el: "#app",
  render: h => h(App)
});
