let bytom = {};

var bg = chrome.extension.getBackgroundPage();

bytom.System = bg.bytomSystem;
bytom.Account = bg.bytomAccount;
bytom.Transaction = bg.bytomTransaction;

export default bytom;