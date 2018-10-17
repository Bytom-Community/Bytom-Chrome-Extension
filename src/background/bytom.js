import Bytom from "bytom-js-sdk";

let netWork = {
  solonet: "http://52.82.24.155:3000/"
};

var bytom = new Bytom(netWork, chrome.runtime.getURL("wasm/main.wasm"));
bytom.setNetType("solonet");

export default bytom.sdk;
