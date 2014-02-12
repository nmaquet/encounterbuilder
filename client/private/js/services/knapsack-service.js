'use strict';

DEMONSQUID.encounterBuilderServices.factory('knapsackService', [
    function () {

        var service = {};

        service.knapsack = function (values, target) {
            var tooSmall = function (value) {
                return target < value;
            };

            if (values.every(tooSmall) || target <= 0) {
                return [];
            }
            else {
                var bestfit;
                for (var i = values.length - 1; i >= 0; i--) {
                    if (values[i] <= target) {
                        bestfit = values[i];
                        break;
                    }
                }
                var result = service.knapsack(values, target - bestfit);
                result.push(bestfit);
                return result;
            }
        }
        return service;
    }
]);
