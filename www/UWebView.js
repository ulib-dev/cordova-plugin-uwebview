// www/UWebView.js

var exec = require("cordova/exec");

var UWebView = {
    loadUrlWithGeckoView: function(url, success, error) {
        exec(success, error, "UWebView", "loadUrlWithGeckoView", [url]);
    },
    initVideoPlayer: function(arg, success, error) {
        arg = arg || {};
        exec(success, error, "UWebView", "initVideoPlayer", ["", arg.width || 0, arg.height || 200, arg.x || 0, arg.y || 0]);
    },
    playRemoteVideo: function(arg, success, error) {
        arg = arg || {};
        exec(success, error, "UWebView", "playRemoteVideo", [arg.url || "", arg.width || 0, arg.height || 200, arg.x || 0, arg.y || 0]);
    },
    closePlayer: function(success, error) {
        exec(success, error, "UWebView", "closePlayer", []);
    },
    destroyVideoPlayer: function(success, error) {
        exec(success, error, "UWebView", "destroyVideoPlayer", []);
    },
    destroyRemoteVideo: function(success, error) {
        exec(success, error, "UWebView", "destroyVideoPlayer", []);
    },
    setRemoteVideoFullScreen: function(full, success, error) {
        exec(success, error, "UWebView", "setRemoteVideoFullScreen", [full ? 1 : 0]);
    },
    initVideoPlayer2: (elId, msgCallback) => {
        const _uPlayer = uPlayer || window.uPlayer;
        const playerInstance = new _uPlayer(elId, (message) => {
            console.log(message);
            if (msgCallback != null) {
                msgCallback(message);
            }
        });
        // // 调用方法
        // playerInstance.play();
        // playerInstance.pause();
        return playerInstance;
    },
};

// 将 UWebView 对象暴露到 window
module.exports = UWebView;