'use strict';

DEMONSQUID.encounterBuilderServices.factory('$exceptionHandler', [function () {
    return function (exception, cause) {
        if (window.location.origin === "http://localhost:3000") {
            throw exception;
        } else {
            console.log(exception);
        }
    };
}]);