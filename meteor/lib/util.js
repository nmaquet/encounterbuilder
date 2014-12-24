// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

DEMONSQUID = {};
DEMONSQUID.utils = {};
DEMONSQUID.utils.escapeRegexp = function (str) {
    return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};