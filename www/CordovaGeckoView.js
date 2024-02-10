var exec = require('cordova/exec');

exports.getGeckoView = function (arg0, success, error) {
    exec(success, error, 'CordovaGeckoView', 'getGeckoView', [arg0]);
};
