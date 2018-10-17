module.exports = {
  name: "Bytom Wallet",
  version: "1.0.0",
  description: "Bytom Chrome Extension Wallet",
  author: "yanbo,xuhongxing",
  manifest_version: 2,
  icons: {
    "16": "icons/logo.png",
    "48": "icons/logo.png",
    "128": "icons/logo.png"
  },
  permissions: [
    "*://*/",
    "storage",
    "contextMenus",
    "clipboardWrite",
    "clipboardRead",
    "background"
  ],
  browser_action: {
    default_icon: {
      "19": "icons/logo.png",
      "38": "icons/logo.png",
      "128": "icons/logo.png"
    },
    default_title: "Bytom Wallet",
    default_popup: "pages/popup.html"
  },
  background: {
    persistent: true,
    scripts: ["js/background.js"]
  },
  // devtools_page: 'pages/devtools.html',
  options_page: "pages/options.html",
  content_scripts: [
    {
      js: ["js/inject.js"],
      run_at: "document_end",
      matches: ["<all_urls>"],
      all_frames: false
    }
  ],
  content_security_policy: "script-src 'self' 'unsafe-eval'; object-src 'self'",
  web_accessible_resources: ["js/content.js", "wasm/main.wasm"]
};
