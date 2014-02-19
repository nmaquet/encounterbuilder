"use strict";
var allowedTypes = ["undefined", "boolean", "number", "string"];

module.exports = function () {
    return {
        clone: function (object) {
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
        }
    }
};


