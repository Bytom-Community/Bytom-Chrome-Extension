const content = chrome.extension.getURL("js/content.js");
const script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.setAttribute("src", content);
document.body.appendChild(script);

window.addEventListener("message", function (event) {
    if (event.source != window) {
        return;
    }
    
    console.log(111, event.data);
    // chrome.runtime.sendMessage({ greeting: "hello" }, function(response) {
    //     console.log(222, response);
    // });
},false);