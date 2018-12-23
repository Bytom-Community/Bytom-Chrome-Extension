console.log("This is BACKGROUND page!");

import bytom from "./bytom";
import query from "./query";
import account from "./account";
import transaction from "./transaction";

const ASSET_BTM =
  "ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff";

var globalAccounts = [];

function refreshBalances() {
  globalAccounts.forEach(account => {
    bytom.accounts.listAddressUseServer(account.guid).then(addresses => {
      let balance = 0;
      addresses.forEach(item => {
        if (item.balances != null) {
          item.balances.forEach(asset => {
            if (asset.asset == ASSET_BTM) {
              balance += asset.balance;
            }
          });
        }
      });

      if (account.balance != balance) {
        account.balance = balance / 100000000;
      }
    });
  });
}

function refreshAccounts(success) {
  bytom.accounts
    .listAccountUseServer()
    .then(accounts => {
      console.log("refreshAccounts", accounts);
      globalAccounts = accounts;
      globalAccounts.forEach(account => {
        if (account.balance == null) {
          account.balance = 0;
        }
      });
      success();
    })
    .catch(error => {
      console.log(error);
    });
}
refreshAccounts(refreshBalances);
setInterval(refreshBalances, 10000);

var bytomQuery = new query(bytom);
var bytomAccount = new account(bytom);
var bytomTransaction = new transaction(bytom);
bytomAccount.list = function() {
  let retPromise = new Promise((resolve, reject) => {
    refreshAccounts(() => {
      refreshBalances();
      resolve(globalAccounts);
    });
  });
  return retPromise;
};

window.bytomSystem = bytom;
window.bytomQuery = bytomQuery;
window.bytomAccount = bytomAccount;
window.bytomTransaction = bytomTransaction;

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("收到来自content-script的消息：");
  console.log(request);
  console.log(sender);
  console.log(sendResponse);
  // sendResponse("我是后台，我已收到你的消息：" + JSON.stringify(request));

  if (request.bty == "transfer") {
    var optionsUrl = chrome.extension.getURL("pages/prompt.html");
    console.log(optionsUrl);
    chrome.tabs.query({ url: optionsUrl }, (tabs) => {
        console.log(22, tabs)
        chrome.windows.create({ url: optionsUrl, type: "popup", width: 350, height: 625, left: 0 }, ()=>{
          chrome.extension.sendMessage(  {cmd: "来自前台页面的主动调用"}, function(response) {  console.log(123, response); }  );//测试前台掉后台
        });
        
    });
  }
});
