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
    name: 'Application', //default name if undefined
    extend: dx.Component,
    _className: 'dx.app.Application',
    initialize: function (options) {
        //call base class' constructor
        dx.Component.prototype.initialize.apply(this, arguments);
        _d.log('Initializing application ' + this.name + '...');
        //create app domain
        window._appName = this.name;
        window[this.name] = {
            name: this.name,
            appData: {},
            app: _d.app,//copy library base app namespace to app domain
            data: _d.data,//copy library base data namespace to app domain
            _stores: [],
            _models: [],
            _views: [],
            _controllers: []
        };
        var scope = window[this.name];
        
        //create stores
        for (var i in this.stores) {
            var store = this.stores[i];
            scope._stores.push(new scope.data.store[store]());
        }
        //create stores
        for (var i in this.models) {
            var model = this.models[i];
            scope._models.push(new scope.app.model[model]());
        }
        //create views
        for (var i in this.views) {
            var view = this.views[i];
            scope._views.push(new scope.app.view[view]());
        }
        //create controllers
        for (var i in this.controllers) {
            var controller = this.controllers[i];
            scope._controllers.push(new scope.app.controller[controller]());
        }
        if (typeof this.launch == 'function')
            this.launch.apply(this);
    }
});