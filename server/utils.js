"use strict";
var allowedTypes = ["undefined", "boolean", "number", "string"];
module.exports = function () {
    function idify(string) {
        var alphaNumeric = /^[a-z0-9]$/i;
        var id = "";
        for (var i in string) {
            var char = string[i];
            if (alphaNumeric.test(char)) {
                id += char.toLowerCase();
            }
            else if (id[id.length - 1] !== "-") {
                id += "-";
            }
        }
        if (id[id.length - 1] === "-") {
            id = id.slice(0, id.length - 1);
        }
        return id;
    };
    return {
        idify: idify,
        idifyFeat: function (feat) {
            var featId = idify(feat.name);
            if (feat.type === "Mythic") {
                featId += "-mythic";
            }
            return featId;
        },
        escapeRegExp: function (str) {
            return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        },
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
        },
        fromHTMLToString: function (html) {
            var result = html;
            result = result.replace(/<\/p>/gim, '\n\n');
            result = result.replace(/<\/h5>/gim, '\n\n');
            result = result.replace(/<br>/gim, '\n\n');
            result = result.replace(/<(?:.|\n)*?>/gim, '');
            return result.trim();
        }
    };
};


