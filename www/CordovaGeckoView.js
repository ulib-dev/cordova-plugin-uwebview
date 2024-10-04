var exec = require('cordova/exec');

exports.loadUrlWithGeckoView = function (arg0, success, error) {
    exec(success, error, 'CordovaGeckoView', 'loadUrlWithGeckoView', [arg0]);
};
exports.playRemoteVideo = function (arg, success, error) {
    arg=arg||{};
    exec(success, error, 'CordovaGeckoView', 'playRemoteVideo', [arg.url||'',arg.width,arg.height||200,arg.x||0,arg.y||0]);
};
exports.destroyRemoteVideo = function (arg, success, error) {
    arg=arg||{};
    exec(success, error, 'CordovaGeckoView', 'destroyRemoteVideo', []);
};

module.exports = CordovaGeckoView;