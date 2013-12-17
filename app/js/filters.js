'use strict';

/* Filters */

angular.module('encounterBuilderFilters', []).filter('checkmark', function() {
  return function(input) {
    return input ? '\u2713' : '\u2718';
  };
});
