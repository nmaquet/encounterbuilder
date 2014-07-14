"use strict";

module.exports = function (userFeatCollection, featCollection, ObjectID) {
    return require("./userResourceRoute")(userFeatCollection, featCollection, ObjectID);
};

