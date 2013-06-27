/*
Tu Hoang
2013
dx library 
javascript framework built upon jquery for quick application setup 
using mvc architecture. 

application.js
Defines an application class that will be instantiated in the application function
which will then create a new object for the application being run.
*/
_d.app.Application = _d.define({
    extend: dx.Component,
    _className: 'dx.app.Application',
    controllers: [],
    views: [],
    stores: [],
    initialize: function (options) {
        _d.log('Initializing application ' + this.name + '...');
        //create app domain
        window._appName = this.name;
        window[this.name] = {
            name: this.name,
            appData: {},
            _views: [],
            _stores: [],
            _controllers: []
        };
        var scope = window[this.name];
        //create views
        for (var i in this.views) {
            var view = this.views[i];
            scope._views.push(new scope.view[view]());
        }
        //create stores
        for (var i in this.stores) {
            var store = this.stores[i];
            scope._stores.push(new scope.store[store]());
        }
        //create controllers
        for (var i in this.controllers) {
            var controller = this.controllers[i];
            scope._controllers.push(new scope.controller[controller]());
        }
        if (typeof this.launch == 'function')
            this.launch.apply(this);
    }
});