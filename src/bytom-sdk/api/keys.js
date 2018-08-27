import http from "../http.js"

function keysApi(http) {
    this.http = http;
}

keysApi.prototype.create = function(alias, password) {
    return this.http.request('/create-key', {alias, password})
}

export default keysApi;