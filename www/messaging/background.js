'use strict';

// Establish connection with app
const port = (typeof browser !== 'undefined' && browser.runtime.connectNative) ? browser.runtime.connectNative("Android") : null;

async function sendMessageToTab(message) {
    try {
        if (typeof browser !== 'undefined' && browser.tabs) {
            let tabs = await browser.tabs.query({});
            console.log(`background:tabs:${tabs}`);
            return await browser.tabs.sendMessage(
                tabs[tabs.length - 1].id,
                message
            );
        }
    } catch (e) {
        console.log(`background:sendMessageToTab:req:error:${e}`);
        return e.toString();
    }
}

async function sendMessageToApp(message) {
    try {
        if (typeof browser !== 'undefined' && browser.tabs) {
            let tabs = await browser.tabs.query({});
            return await browser.tabs.sendMessage(
                tabs[tabs.length - 1].id,
                message
            );
        }
    } catch (e) {
        return e.toString();
    }
}

// 监听 app message
if (port) {
    port.onMessage.addListener(request => {
        let action = request.action;
        if (action === "evalJavascript") {
            sendMessageToTab(request).then((resp) => {
                if (port) {
                    port.postMessage(resp);
                }
            }).catch((e) => {
                console.log(`background:sendMessageToTab:resp:error:${e}`);
            });
        }
    });
}

// 接收 content.js message
if (typeof browser !== 'undefined') {
    browser.runtime.onMessage.addListener((data, sender) => {
        let action = data.action;
        console.log("background:content:onMessage:" + action);
        if (action === 'JSBridge' && port) {
            port.postMessage(data);
        }
        return Promise.resolve('done');
    });
}
