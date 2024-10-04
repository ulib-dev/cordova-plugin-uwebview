// www/UWebView.js

var exec = require('cordova/exec');

var UWebView = {
    loadUrlWithGeckoView: function (url, success, error) {
        exec(success, error, 'UWebView', 'loadUrlWithGeckoView', [url]);
    },
    playRemoteVideo: function (arg, success, error) {
        arg = arg || {};
        exec(success, error, 'UWebView', 'playRemoteVideo', [
            arg.url || '',
            arg.width || 0,
            arg.height || 200,
            arg.x || 0,
            arg.y || 0
        ]);
    },
    destroyRemoteVideo: function (success, error) {
        exec(success, error, 'UWebView', 'destroyRemoteVideo', []);
    }
};

// 将 UWebView 对象暴露到 window
window.uwebview = UWebView;
window.UWebView = UWebView;
module.exports = UWebView;
