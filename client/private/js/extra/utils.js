"use strict";

DEMONSQUID.clone = function (object) {
    var allowedTypes = ["undefined", "boolean", "number", "string"];
    if (Object.getPrototypeOf(object) !== Object.prototype) {
        throw Error("Non clonable object with prototype: " + object.prototype);
    }
    var clone = {};
    for (var property in object) {
        if (object.hasOwnProperty(property)) {
            if (object[property] === null || allowedTypes.indexOf(typeof object[property]) > -1) {
                clone[property] = object[property];
            }
            else {
                throw Error("Non clonable member: " + property + " of type " + typeof object[property]);
            }
        }
    }
    return clone;
};

DEMONSQUID.idify = function (string) {
    return string.toLowerCase().replace(" ", "-");
};

DEMONSQUID.escapeRegExp = function (str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};

DEMONSQUID.dump = function(object) {
    console.log(JSON.stringify(object, null, 4));
};

var origin = new Date().getTime();

DEMONSQUID.encounterBuilderApp.factory('throttle', ['$timeout',
    function ($timeout) {
        return function throttle(callback, delay) {
            var lastCallTime = 0;
            return function () {
                var thisCallTime = lastCallTime = new Date().getTime();
                var self = this;
                var args = arguments;
                $timeout(function () {
                    if (lastCallTime === thisCallTime) {
                        callback.apply(self, args);
                    }
                }, delay);
            }
        }
    }
]);