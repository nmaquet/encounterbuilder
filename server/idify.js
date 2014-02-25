"use strict";

module.exports = function () {
    return {
        idify: function (string) {
            return string.toLowerCase().replace(" ", "-");
        }
    };
};


