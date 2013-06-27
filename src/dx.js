/*
Tu Hoang
2013
dx library 
javascript framework built upon jquery for quick application setup 
using mvc architecture. 
*/

var _d = {
    version: '0.1-dev',
    app: {},
    noConflict: function () {
        return _d;
    },
    log: function (msg) {
        if (typeof console != 'undefined')
            console.log(msg);
    },
    application: function (options) {
        new _d.app.Application(options);
    }
};

window.dx = _d;

