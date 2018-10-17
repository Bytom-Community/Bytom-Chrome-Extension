import bytom from "./bytom";

function transaction(bytom) {
  this.bytom = bytom;
}

transaction.prototype.list = function(guid, address) {
  return this.bytom.transaction.list(guid, address);
};

transaction.prototype.transfer = function(guid, to, asset, amount, fee, password){
    let retPromise = new Promise((resolve, reject) => {
        this.bytom.transaction.buildPayment(guid, to, asset, Number(amount*100000000)).then(res => {
            this.bytom.transaction.signTransaction(guid, JSON.stringify(res.data), password).then(ret => {
                this.bytom.transaction.submitPayment(guid, ret.raw_transaction, ret.signatures).then(res3 => {
                    resolve(res3);
                }).catch(error => {
                    reject(error);
                });
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
