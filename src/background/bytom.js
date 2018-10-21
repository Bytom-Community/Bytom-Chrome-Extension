import Bytom from "bytom-js-sdk";

var networks = {
  testnet: "http://52.82.24.155:3000/"
};

var bytom = new Bytom(networks, chrome.runtime.getURL("wasm/main.wasm"));

// bytom.sdk.networks = function() {
//   return bytom.networks;
// };
bytom.sdk.setupNet = function(network) {
  bytom.setNetType(network);
};

export default bytom.sdk;
