let bytom = {};

var bg = chrome.extension.getBackgroundPage();

bytom.Query = bg.bytomQuery;
bytom.System = bg.bytomSystem;
bytom.Account = bg.bytomAccount;
bytom.Transaction = bg.bytomTransaction;

export default bytom;