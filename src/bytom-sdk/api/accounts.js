import http from "../http.js"

function accountsApi(http) {
    this.http = http;
}

accountsApi.prototype.create = function(xpubs, quorum, alias) {
    return this.http.request('/create-account', {root_xpubs: xpubs, quorum, alias})
};

accountsApi.prototype.listAll = function() {
    return this.http.request('/list-accounts', {})
}

export default accountsApi;