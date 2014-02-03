"use strict";

DEMONSQUID.encounterBuilderFilters.filter('numberToFractionString', function () {
    return function (value) {
        if (value == 0) {
            return '0';
        }
        if (value < 1) {
            return "1/" + String(1 / value);
        }
        else {
            return String(value);
        }
    };
});