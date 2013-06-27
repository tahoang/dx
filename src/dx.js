/*
Tu Hoang
2013
dx library 
javascript framework built upon jquery for quick application setup 
using mvc architecture. 
*/

var _d = {
    version: '0.1-dev',
    app: {}
};
window.dx = _d;

_d.noConflict = function () {
    return _d;
};

_d.log = function (msg) {
    if (typeof console != 'undefined')
        console.log(msg);
};
_d.application = function (options) {
    new _d.app.Application(options);
};