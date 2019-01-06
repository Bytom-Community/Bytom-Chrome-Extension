import Vue from 'vue'
import moment from 'moment'
import VueI18n from 'vue-i18n'
import VueRouter from 'vue-router'
import Loading from 'vue-loading-overlay'
import vuescroll from 'vuescroll/dist/vuescroll-native'
import 'vue-loading-overlay/dist/vue-loading.css'
import 'vuescroll/dist/vuescroll.css'

import Routers from './router'
import ViewBase from '@/views/viewBase'
import Dialog from '@/components/dialog'
import vSelect from '@/components/select'
import messages, { getLanguage } from '@/assets/language'
import '@/assets/style.css'

Vue.use(VueI18n)
const i18n = new VueI18n({
  fallbackLocale: 'en',
  locale: getLanguage(),
  messages
})
Vue.use(i18n)
Vue.use(vuescroll)
Vue.use(VueRouter)
Vue.use(Loading)
Vue.use(Dialog, i18n)
Vue.component('v-select', vSelect)
Vue.filter('moment', function(value, formatString) {
  formatString = formatString || 'YYYY-MM-DD HH:mm:ss'
  return moment(value * 1000).format(formatString)
})
Vue.prototype.$vuescrollConfig = {
  mode: 'pure-native',
  bar: {
    keepShow: true,
    background: '#c9c9c9'
  }
}

const RouterConfig = {
  routes: Routers
}
const router = new VueRouter(RouterConfig)

new Vue({
  el: '#app',
  i18n: i18n,
  router: router,
  render: h => h(ViewBase)
})
