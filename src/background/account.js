import bytom from "./bytom";

function account(bytom) {
  this.bytom = bytom;
}

account.prototype.create = function(
  accountAlias,
  keyAlias,
  passwd,
  success,
  error
) {
  let retPromise = new Promise((resolve, reject) => {
    this.bytom.keys
      .create(keyAlias, passwd)
      .then(res => {
          this.bytom.accounts
              .createAccountUseServer(res.xpub, accountAlias)
              .then(ret => {
                  resolve(ret);
              })
              .catch(error => {
                  reject(error);
              });
      })
      .catch(error => {
        reject(error);
      });
  });
  return retPromise;
};

account.prototype.backup = function() {
  return bytom.wallet.backup();
};
account.prototype.restore = function(walletImage) {
  return bytom.wallet.restore(walletImage);
};

export default account;
