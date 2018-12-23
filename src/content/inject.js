const content = chrome.extension.getURL("js/content.js");
const script = document.createElement("script");
script.setAttribute("type", "text/javascript");
script.setAttribute("src", content);
document.body.appendChild(script);

// setup listenr
window.addEventListener("message", function (event) {
    if (event.source != window) {
        return;
    }
    
    console.log("event.data", event.data);
    if(event.data.bty == 'transfer'){
        chrome.runtime.sendMessage(event.data, function (response) {
            console.log("transfer response", response);
        });
    }

},false);