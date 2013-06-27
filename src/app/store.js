﻿/*
Tu Hoang
2013
dx library 
javascript framework built upon jquery for quick application setup 
using mvc architecture. 

store.js
handles ajax requests

*/

_d.app.Store = _d.define({
    extend: dx.Component,
    _className: 'dx.app.Store',
    model: '',
    dataRoot: '',
    type: 'json',
    autoLoad: false, //default
    initialize: function (options) {
        //run init function in sub class
        if (typeof this.init == 'function')
            this.init.apply(this, options);
        //run auto load if property is set to true
        if (this.autoLoad)
            this.loadJson();

    },
    loadJson: function (method) {
        var scope = this;

        if (typeof this.events.beforeLoad == 'function')
            this.events.beforeLoad.call(scope, this); //used to update url parameters

        if (typeof this.url == 'undefined') {
            log('No url was defined. ' + this._className + '.loadJson()');
            return;
        }

        var callback = function (data) {
            if (scope.dataRoot != '')
                data = data[scope.dataRoot]; //get to specified root
            //store original data
            scope.originalData = data;
            if (scope.model != '') {
                //process data
                var model = new ESRGC.Model[scope.model]();
                scope.data = [];
                //loop through data collection
                for (var i in data) {
                    var dataEntry = data[i]; //get data entry
                    var entry = {};
                    for (var x in model.fields) {
                        var field = model.fields[x];
                        var dataType = field.type;
                        var value = dataEntry[field.name];
                        switch (dataType) {
                            case 'string':
                                entry[field.name] = new String(value);
                                break;
                            case 'int':
                                entry[field.name] = new Number(value);
                                break;
                            case 'date':
                                entry[field.name] = new Date(value);
                                break;
                            case 'boolean':
                                entry[field.name] = new Boolean(value);
                                break;
                        }
                    }
                    scope.data.push(entry);
                }
            }

            //ESRGC.updateStatusMessage("Ready");
            //call onLoad function
            if (typeof scope.events.load == 'function')
                scope.events.load.call(scope, scope, data);
            //ESRGC.AjaxLoader.onLoadEnd(); //hide loader

        };
        var errorCallback = function () {
            if (typeof scope.errorCallback == 'function')
                scope.errorCallback.call(scope);
            else {
                alert('An error has occured. Store.' + scope.name + '.loadJson()');
            }
        };
        //load data with ajax using jquery
        if (typeof method == 'undefined' || method == 'get') {
            var requestUrl = this.constructParams();
            $.getJSON(requestUrl, callback).error(errorCallback);
        }
        else if (method == 'post')
            $.post(this.url, this.params, callback).error(errorCallback);
    },
    //load content using get or post (default get)
    loadContent: function (method) {
        var scope = this;
        //execute preload event
        if (typeof this.events.beforeLoad == 'function')
            this.events.beforeLoad.call(scope, this); //used to update url parameters

        if (typeof this.url == 'undefined') {
            log('No url was defined. ' + this.CLASSNAME + '.loadContent()');
            return;
        }
        //call back to process result
        var callback = function (response) {
            //call post-load event to handle response
            if (typeof scope.events.load == 'function')
                scope.events.load.call(scope, scope, response);
        };
        var errorCallback = function () {
            if (typeof scope.errorCallback != 'undefined')
                scope.errorCallback.call(scope);
            else {
                alert('An error has occured. Store.' + scope.name + '.loadContent(). Url: ' + scope.url);
            }
        };
        //call jquery .get or .post methods to send request
        if (typeof method == 'undefined' || method == 'get') {
            var url = this.constructParams();
            $.get(url, callback).error(errorCallback);
        }
        else if (method == 'post')
            $.post(this.url, this.params, callback).error(errorCallback);
    },
    //load content using get
    loadContentUrl: function (url) {
        var scope = this;
        //execute preload event
        if (typeof this.events.beforeLoad == 'function')
            this.events.beforeLoad.call(scope, this); //used to update url parameters

        if (typeof url == 'undefined') {
            log('No url was defined. ' + this.CLASSNAME + '.loadContentUrl()');
            return;
        }
        //call back to process result
        var callback = function (response) {
            //call post-load event to handle response
            if (typeof scope.events.load == 'function')
                scope.events.load.call(scope, scope, response);
        };
        var errorCallback = function () {
            if (typeof scope.errorCallback != 'undefined')
                scope.errorCallback.call(scope);
            else {
                alert('An error has occured. Store.' + scope.name + '.loadContentUrl()');
            }
        };
        //call jquery .get to send request
        $.get(url, callback).error(errorCallback);
    },
    constructParams: function (url) {
        //construct url params
        var paramStr = [];
        for (var i in this.params) {
            var paramValue = this.params[i];
            paramStr.push(i + '=' + paramValue);
        }
        //use default url if url wasn't provided through parameter
        if (typeof url == 'undefined')
            url = this.url;

        //concatenate params to url
        for (var x = 0; x < paramStr.length; x++) {
            if (x == 0 && paramStr.length > 0)
                url += '?' + paramStr[x]
            else if (paramStr.length > 0) {
                url += '&' + paramStr[x]
            }
        }
        if (this.type == 'jsonp')
            url += '&outFields=&f=json&callback=?';
        return url;
    },
    setParams: function (data) {
        this.params = data;
    },
    getParams: function () {
        return this.params;
    },
    getData: function () {
        if (typeof this.data != 'undefined') {
            return this.data;
        }
        else { log('store ' + this.ClassName + ' has no data'); }
    },
    getResponseData: function () {
        if (typeof this.originalData != 'undefined')
            return this.originalData;
        else
            log('store ' + this.ClassName + ' has no response data');
    },
    getRecord: function (field, value) {
        if (typeof this.data != 'undefined') {
            for (var i in this.data) {
                var entry = this.data[i];
                if (entry[field] == value)
                    return entry;
            }
        }
    }
});