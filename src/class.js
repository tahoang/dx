/*
Tu Hoang
2013
dx library 
javascript framework built upon jquery for quick application setup 
using mvc architecture. 

class.js
utility functions that implements OOP
*/

/*
function that defines a new class by passing a new
prototype object (literal) as parameter. New classes
can extend/inherit from other classes by passing the 
inherit class name to extend property of the new class 
prototype object

Example:
var newClass = dx.define({
extend: OtherClass,
initialize: function(options){
};
});
*/
_d.define = function (child) {
    var ch = child;
    var p = ch.extend;
    var _class_ = null;
    if (p == null || typeof p == 'undefined') {
        _class_ = function () {
            if (typeof this.initialize != 'undefined')
                this.initialize.apply(this, arguments);
        };
        _class_.prototype = ch;
    }
    else {
        _class_ = function () {
            /*
            check if parent's prototype exists
            this is to eliminate the case where an "invalid" parent object 
            is passed to child.extend 
            (for example: bad name or typo makes parent class not exist, therefore, 
            p has 'undefined' value which does not have a prototype
            */
            if (typeof p.prototype != 'undefined') {
                var parentInit = p.prototype.initialize;
                if (typeof parentInit == 'function') {
                    parentInit.apply(this, arguments);
                }
            }
            var init = typeof this.initialize == "function" ? this.initialize : 'undefined';
            //run child initialize function if exists
            if (typeof init == 'function') {
                init.apply(this, arguments);
            }
        };
        _d.extend(_class_, p); //inherit prototype
        _d.copy(_class_.prototype, ch); //augment prototype
    }
    return _class_;
};
/*
Deep copy object prototype by new keyword.
This method creates a new prototype object, whose prototype 
is a copy of the parent's prototype, and assign it to the child prototype.
Finally, sets the child's prototype constructor to the child's constructor
*/
_d.extend = function (child, parent) {
    var F = function () { };
    F.prototype = parent.prototype;
    child.prototype = new F();
    child.prototype.constructor = child;
    child.parent = parent.prototype;
};
//copy object properties
_d.copy = function (dest, source) {
    dest = dest || {};
    if (source) {
        for (var property in source) {
            var value = source[property];
            if (value !== undefined) {
                dest[property] = value;
            }
        }
        /**
        * IE doesn't include the toString property when iterating over an object's
        * properties with the for(property in object) syntax.  Explicitly check if
        * the source has its own toString property.
        */
        /*
        * FF/Windows < 2.0.0.13 reports "Illegal operation on WrappedNative
        * prototype object" when calling hawOwnProperty if the source object
        * is an instance of window.Event.
        */

        var sourceIsEvt = typeof window.Event == "function"
                          && source instanceof window.Event;

        if (!sourceIsEvt &&
                source.hasOwnProperty && source.hasOwnProperty("toString")) {
            dest.toString = source.toString;
        }
    }
};