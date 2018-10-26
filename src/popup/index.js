import Vue from "vue";
import App from "./App.vue";
import moment from "moment";
import Loading from "vue-loading-overlay";
import vuescroll from "vuescroll/dist/vuescroll-native";
import Dialog from "./components/dialog";
import MenuPage from "./components/menu-page";
import VueI18n from "vue-i18n";
import messages from "../assets/language";
import "../assets/style.css";
import "vuescroll/dist/vuescroll.css";
import "vue-loading-overlay/dist/vue-loading.css";

Vue.use(vuescroll);
Vue.use(MenuPage);
Vue.use(Loading);
Vue.use(VueI18n);
Vue.prototype.$vuescrollConfig = {
  bar: {
    mode: "pure-native",
    keepShow: true,
    background: "#c9c9c9"
  }
};
Vue.filter("moment", function(value, formatString) {
  formatString = formatString || "YYYY-MM-DD HH:mm:ss";
  return moment(value * 1000).format(formatString);
});

let lang = "cn";
if (localStorage.lang) {
  lang = localStorage.lang;
}
const i18n = new VueI18n({
  fallbackLocale: "en",
  locale: lang,
  messages
});
Vue.use(Dialog, i18n);
new Vue({
  el: "#app",
  i18n: i18n,
  render: h => h(App)
});
