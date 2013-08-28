/*
Tu Hoang
2013
dx library 
javascript framework built upon jquery for quick application setup 
using mvc architecture. 

component.js
component is a base class for any other class.
*/

_d.Component = _d.define({
    _className: 'dx.Component',
    on: function (event, handler) {
        this.events[event] = handler;
    },
    initialize: function (options) {
        //_d.log('initialized component');
        _d.copy(this, options);
        this.events = {};
    }
});