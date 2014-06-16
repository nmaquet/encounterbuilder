'use strict';

DEMONSQUID.encounterBuilderServices.factory('$exceptionHandler', [function () {
    return function (exception, cause) {
        if (window.location.origin === "http://localhost:3000") {
            console.log(cause);
            throw exception;
        } else {
            console.log(exception);
        }
    };
}]);