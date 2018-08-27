import Vue from 'vue'
import App from './App.vue'
// import Bytom from "/opt/mygit/btm/js-sdk"
// import Bytom from "../bytom-sdk"
import '../assets/style.css';

// const url = 'http://127.0.0.1:9888'
// const accessToken = ''

// const client = new Bytom(url, accessToken)

//create key
// const keyPromise = client.keys.create('alias', 'password')
// keyPromise.then(key => {
//     console.log(key)
// })

//accounts list
// const acPromise = client.accounts.listAll()
// acPromise.then(res => {
//     console.log(res)
// })

new Vue({
  el: '#app',
  render: h => h(App)
})
