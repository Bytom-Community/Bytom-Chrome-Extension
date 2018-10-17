let bytom = {};

var bg = chrome.extension.getBackgroundPage();

bytom.Account = bg.bytomAccount;
bytom.Transaction = bg.bytomTransaction;

export default bytom;