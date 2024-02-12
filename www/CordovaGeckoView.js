var exec = require('cordova/exec');

exports.loadUrlWithGeckoView = function (arg0, success, error) {
    exec(success, error, 'CordovaGeckoView', 'loadUrlWithGeckoView', [arg0]);
};
