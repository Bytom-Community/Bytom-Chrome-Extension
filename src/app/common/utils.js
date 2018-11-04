let utils = {};

utils.shortAddress = function(address, length) {
  if (address == undefined) {
    return '-';
  }

  if (length == undefined) {
    length = 7;
  }

  let startSome = address.substr(0, length);
  let endSome = address.substr(address.length - length, length);
  return startSome + "..." + endSome;
};

export default utils;
