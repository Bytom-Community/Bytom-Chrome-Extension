import Bytom from "bytom-js-sdk";

window.bytom = new Bytom("http://52.82.24.155:3000/", chrome.runtime.getURL("wasm/main.wasm"));