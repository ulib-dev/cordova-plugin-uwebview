// www/UWebView.js

var exec = require("cordova/exec");

var UWebView = {
  loadUrlWithGeckoView: function (url, success, error) {
    exec(success, error, "UWebView", "loadUrlWithGeckoView", [url]);
  },
  initVideoPlayer: function (arg, success, error) {
    arg = arg || {};
    exec(success, error, "UWebView", "initVideoPlayer", [
      "",
      arg.width || 0,
      arg.height || 200,
      arg.x || 0,
      arg.y || 0,
    ]);
  },
  playRemoteVideo: function (arg, success, error) {
    arg = arg || {};
    exec(success, error, "UWebView", "playRemoteVideo", [
      arg.url || "",
      arg.width || 0,
      arg.height || 200,
      arg.x || 0,
      arg.y || 0,
    ]);
  },
  destroyRemoteVideo: function (success, error) {
    exec(success, error, "UWebView", "destroyRemoteVideo", []);
  },
  setRemoteVideoFullScreen: function (full, success, error) {
    exec(success, error, "UWebView", "setRemoteVideoFullScreen", [
      full ? 1 : 0,
    ]);
  },
};

// 将 UWebView 对象暴露到 window
module.exports = UWebView;
