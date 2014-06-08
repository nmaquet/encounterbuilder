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

DEMONSQUID.resetProfiles = function() {
    DEMONSQUID.profiles = {last: {}, total: {}, calls: {}};
};

DEMONSQUID.startProfile = function(label) {
    DEMONSQUID.profiles.last[label] = new Date().getTime();
};

DEMONSQUID.stopProfile = function(label) {
    var end = new Date().getTime();
    DEMONSQUID.profiles.total[label] = DEMONSQUID.profiles.total[label] || 0;
    DEMONSQUID.profiles.calls[label] = DEMONSQUID.profiles.calls[label] || 0;
    DEMONSQUID.profiles.total[label] += end - DEMONSQUID.profiles.last[label];
    DEMONSQUID.profiles.calls[label] += 1;
};

DEMONSQUID.reportProfiles = function() {
    for (var label in DEMONSQUID.profiles.total) {
        if (DEMONSQUID.profiles.total.hasOwnProperty(label)) {
            console.log(label + "\t: " + DEMONSQUID.profiles.total[label] + " ms (" + DEMONSQUID.profiles.calls[label] + " calls)")
        }
    }
};

DEMONSQUID.resetProfiles();