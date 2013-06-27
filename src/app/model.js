/*
Tu Hoang
2013
dx library 
javascript framework built upon jquery for quick application setup 
using mvc architecture. 
*/
_d.app.Model = _d.define({
    extend: dx.Component,
    _className: 'dx.app.Model',
    initialize: function (options) {
        //call base class' constructor
        dx.Component.prototype.initialize.apply(this, arguments);
    },
    fields: {}
});