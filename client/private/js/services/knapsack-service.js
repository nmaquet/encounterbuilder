'use strict';

DEMONSQUID.encounterBuilderServices.factory('knapsackService', [
    function () {

        var service = {};

        service.knapsack = function (values, target) {
            var smallEnough = function (value) {
                return value <= target;
            };
            var result = [];
            while (values.some(smallEnough) && target > 0) {
                var bestfit;
                for (var i = values.length - 1; i >= 0; i--) {
                    if (values[i] <= target) {
                        bestfit = values[i];
                        break;
                    }
                }
                result.push(bestfit);
                target -= bestfit;
            }
            return result;
        };

        return service;
    }
]);
