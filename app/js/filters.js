'use strict';

angular.module('encounterBuilderFilters', []).filter('challengeRating', function() {
    return function(input) {
        var i = 0;
        var fractions = [ 2, 3, 4, 5, 6, 7, 8];

        for (i in fractions) {
            if (input === (1 / fractions[i])) {
                return "1/" + String(fractions[i]);
            }
        }

        return String(input);
    };
});
