"use strict";

DEMONSQUID.encounterBuilderControllers.controller('SearchItemController', ['$scope', '$http',
    function ($scope, $http) {
        $scope.items = [];

        refreshItems({},function(error,data){
            if(error){
                console.log(error);
            }
            else{
                $scope.items = data.magicItems;
            }
        });


        function refreshItems(params, callback){
                var now = new Date().getTime();
                $http.get('/api/search-magic-items/', {params : params})
                    .success(function (data) {
                        data["timestamp"] = now;
                        callback(null, data);
                    })
                    .error(function (error) {
                        callback(error, null);
                    });
        }
    }
]);