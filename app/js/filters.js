'use strict';

angular.module('encounterBuilderFilters', []).filter('challengeRating', function() {
    return function(cr) {
        if (cr < 1) {
            return "1/" + String(1/cr);
        }
        else {
            return String(cr);
        }
    };
});
