import bytom from "./bytom";

function transaction(bytom) {
  this.bytom = bytom;
}

transaction.prototype.list = function(guid, address, start, limit) {
  return this.bytom.transaction.list(guid, address, start, limit);
};

transaction.prototype.build = function(guid, to, asset, amount, fee){
    let retPromise = new Promise((resolve, reject) => {
        this.bytom.transaction.buildPayment(guid, to, asset, Number(amount*100000000)).then(res => {
            resolve(res);
        }).catch(error => {
            reject(error);
        });
    })
    return retPromise;
}
transaction.prototype.transfer = function(guid, transaction, password){
    let retPromise = new Promise((resolve, reject) => {
        this.bytom.transaction.signTransaction(guid, JSON.stringify(transaction), password).then(ret => {
            this.bytom.transaction.submitPayment(guid, ret.raw_transaction, ret.signatures).then(res3 => {
                resolve(res3);
            }).catch(error => {
                reject(error);
            });
        }).catch(error => {
            reject(error);
        });
    })

    return retPromise
}

export default transaction;
