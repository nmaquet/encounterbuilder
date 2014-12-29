// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

DEMONSQUID = {};
DEMONSQUID.utils = {};
DEMONSQUID.utils.escapeRegexp = function (str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};

_.containsAny = function (array, elements) {
    return _.any(elements, function (e) {
        return _.contains(array, e);
    });
};