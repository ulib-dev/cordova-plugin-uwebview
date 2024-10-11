// www/UWebView.js

var exec = require("cordova/exec");

var UWebView = {
    loadUrlWithGeckoView: function(url, success, error) {
        exec(success, error, "CordovaWKWebView", "loadUrlWithGeckoView", [url]);
    },
    initVideoPlayer: function(arg, success, error) {
        arg = arg || {};
        exec(success, error, "CordovaWKWebView", "initVideoPlayer", [
            "",
            arg.width || 0,
            arg.height || 200,
            arg.x || 0,
            arg.y || 0,
        ]);
    },
    playRemoteVideo: function(arg, success, error) {
        arg = arg || {};
        exec(success, error, "CordovaWKWebView", "playRemoteVideo", [
            arg.url || "",
            arg.width || 0,
            arg.height || 200,
            arg.x || 0,
            arg.y || 0,
        ]);
    },
    closePlayer: function(success, error) {
        exec(success, error, "CordovaWKWebView", "closePlayer", []);
    },
    destroyVideoPlayer: function(success, error) {
        exec(success, error, "CordovaWKWebView", "destroyVideoPlayer", []);
    },
    destroyRemoteVideo: function(success, error) {
        exec(success, error, "CordovaWKWebView", "destroyVideoPlayer", []);
    },
    setRemoteVideoFullScreen: function(full, success, error) {
        exec(success, error, "CordovaWKWebView", "setRemoteVideoFullScreen", [
            full ? 1 : 0,
        ]);
    },
};

// 将 UWebView 对象暴露到 window
module.exports = UWebView;