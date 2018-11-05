import bytom from "./bytom";

function query(bytom) {
  this.bytom = bytom;
}

query.prototype.blockCount = function() {
  return bytom.query.getblockcount();
};
query.prototype.asset = function(asset_id) {
  return bytom.query.asset(asset_id);
};

export default query;
