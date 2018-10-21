import Vue from "vue";
import App from "./App.vue";
import Loading from 'vue-loading-overlay';
import moment from "moment";
import vuescroll from 'vuescroll/dist/vuescroll-native';
import 'vuescroll/dist/vuescroll.css';
import "../assets/style.css";
import 'vue-loading-overlay/dist/vue-loading.css';
import Dialog from "./dialog/index"

Vue.use(Loading);
Vue.use(vuescroll);
Vue.use(Dialog);
Vue.prototype.$vuescrollConfig = {
  bar: {
    mode: 'pure-native',
    keepShow: true,
    background: '#c9c9c9'
  }
};
Vue.filter("moment", function(value, formatString) {
  formatString = formatString || "YYYY-MM-DD HH:mm:ss";
  return moment(value * 1000).format(formatString);
});

new Vue({
  el: "#app",
  render: h => h(App)
});
