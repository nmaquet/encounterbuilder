"use strict";

module.exports = function () {
    return {
        idify: function (string) {

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
            if (id[id.length - 1] === "-"){
                id = id.slice(0, id.length - 1);
            }
            return id;
        }
    };
};


