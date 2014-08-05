// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderServices.factory('$exceptionHandler', [function () {
    return function (exception, cause) {
        if (window.location.origin === "http://localhost:3000") {
            console.log(exception);
            console.log(cause);
            throw exception;
        } else {
            console.log(exception);
        }
    };
}]);