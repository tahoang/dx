/*
Tu Hoang
2013
dx library 
javascript framework built upon jquery for quick application setup 
using mvc architecture. 
*/
if (typeof _d == 'undefined' || !_d) {
    var _d = {
        version: '0.1-dev',
        app: {
            model: {},
            view: {},
            controller: {}
        },
        data: {
            store: {}
        },
        noConflict: function () {
            return _d;
        },
        log: function (msg) {
            if (typeof console != 'undefined')
                console.log(msg);
        },
        application: function (options) {
            this.appInstance = new _d.app.Application(options);
        },
        /* 
        Helper functions used to define model, view, controller, and store classes
        */
        defineController: function (name, prototype) {
            var scope = this;
            if (typeof prototype == 'undefined')
                throw 'Can not define controller ' + name + '. Prototype is undefined';
            if (typeof prototype.extend == 'undefined')
                prototype.extend = _d.app.Controller; //base prototype for controller
            //set class name 
            prototype._className = 'dx.app.controller.' + name;
            //set name
            prototype.name = name;
            scope.app.controller[name] = _d.define(prototype);
        },
        defineView: function (name, prototype) {
            var scope = this;
            if (typeof prototype == 'undefined')
                throw 'Can not define view ' + name + '. Prototype is undefined';
            if (typeof prototype.extend == 'undefined')
                prototype.extend = _d.app.View; //base prototype for view
            //set class name 
            prototype._className = 'dx.app.view.' + name;
            scope.app.view[name] = _d.define(prototype);
        },
        defineModel: function (name, prototype) {
            var scope = this;
            if (typeof prototype == 'undefined')
                throw 'Can not define model ' + name + '. Prototype is undefined';
            if (typeof prototype.extend == 'undefined')
                prototype.extend = _d.app.Model; //base prototype for model
            //set class name 
            prototype._className = 'dx.app.model.' + name;
            scope.app.model[name] = _d.define(prototype);
        },
        defineStore: function (name, prototype) {
            var scope = this;
            if (typeof prototype == 'undefined')
                throw 'Can not define store ' + name + '. Prototype is undefined';
            if (typeof prototype.extend == 'undefined')
                prototype.extend = _d.data.Store; //base prototype for store
            //set class name 
            prototype._className = 'dx.data.store.' + name;
            scope.data.store[name] = _d.define(prototype);
        },
        /*
        Helper functions used to get app, model, view, controller, and store instances
        */
        getApp: function () {
            if (typeof window._appName != 'undefined')
                return window[window._appName];
        },
        getModel: function (name) {
            var models = this.getApp()._models;
            if (typeof models != 'undefined')
                for (var i in models) {
                    var model = models[i];
                    if (model.name == name)
                        return modelcm;
                }
        },
        getView: function (name) {
            var views = this.getApp()._views;
            if (typeof views != 'undefined')
                for (var i in views) {
                    var view = views[i];
                    if (view.name == name)
                        return view;
                }
        },
        getController: function (name) {
            var controllers = this.getApp()._controllers;
            if (typeof controllers != 'undefined')
                for (var i in controllers) {
                    var controller = controllers[i];
                    if (controller.name == name)
                        return controller;
                }
        },
        getStore: function (name) {
            var stores = this.getApp()._stores;
            if (typeof stores != 'undefined')
                for (var i in stores) {
                    var store = stores[i];
                    if (store.name == name)
                        return store;
                }
        }


    };
}
window.dx = _d;

