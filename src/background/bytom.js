import Bytom from "bytom-js-sdk";

let network = {
  testnet: "http://52.82.24.155:3000/"
};

var bytom = new Bytom(network, chrome.runtime.getURL("wasm/main.wasm"));
bytom.setNetType("testnet");

export default bytom.sdk;
