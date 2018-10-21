console.log("This is BACKGROUND page!");

import bytom from "./bytom";
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
        if (item.asset != null) {
          item.asset.forEach(asset => {
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
      console.log(accounts);
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
window.bytomAccount = bytomAccount;
window.bytomTransaction = bytomTransaction;
