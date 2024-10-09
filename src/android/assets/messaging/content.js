console.log(`content:start`);
const port = (typeof browser !== 'undefined' && browser.runtime.connectNative) ? browser.runtime.connectNative("browser") : null;

let JSBridge = {
    postMessage: function(message) {
        browser.runtime.sendMessage({
            action: "JSBridge",
            data: message
        });
    },
    postMessage2: function(data) {
        browser.runtime.sendMessage(data);
    }
}
window.wrappedJSObject.JSBridge = cloneInto(
    JSBridge,
    window, { cloneFunctions: true });

browser.runtime.onMessage.addListener((data, sender) => {
    console.log("content:eval:" + data);
    if (data.action === 'evalJavascript') {
        let evalCallBack = {
            id: data.id,
            action: "evalJavascript",
        }
        try {
            let result = window.eval(data.data);
            console.log("content:eval:result" + result);
            if (result) {
                evalCallBack.data = result;
            } else {
                evalCallBack.data = "";
            }
        } catch (e) {
            evalCallBack.data = e.toString();
            return Promise.resolve(evalCallBack);
        }
        return Promise.resolve(evalCallBack);
    }
}); // 发送消息到原生应用

window.addEventListener("message", function(event) {
 if((typeof browser !== 'undefined' && browser.runtime.connectNative)){
          browser.runtime.sendNativeMessage("browser", event);}
});
