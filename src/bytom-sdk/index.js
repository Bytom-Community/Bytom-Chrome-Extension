import keysApi from "./api/keys.js";
import accountsApi from "./api/accounts.js"
import http from "./http.js"

function Bytom(baseURL, token) {
    this.http = new http(baseURL, token)

    this.keys = new keysApi(this.http);
    this.accounts = new accountsApi(this.http);
}

export default Bytom

