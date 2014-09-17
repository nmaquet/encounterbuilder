// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderControllers.controller('EditUserResourceController',
    ['$scope', '$routeParams', 'userResourceService', 'contentTreeService', 'locationService', 'throttle',
        function ($scope, $routeParams, userResourceService, contentTreeService, locationService, throttle) {


            $scope.tinymceOptions = {
                resize: false,
                menubar: false,
                toolbar: "bold italic underline strikethrough alignleft aligncenter alignright alignjustify bullist numlist outdent indent blockquote formatselect undo redo removeformat subscript superscript",
                plugins: "autoresize",
                autoresize_min_height: 400
            };

            var resourceType = locationService.getResourceType();

            $scope.view = function () {
                locationService.go("/" + resourceType + "/" + $routeParams.userResourceId);
            };

            function updateUserResource(userResource) {
                userResourceService[resourceType].save(userResource);
                contentTreeService.userResourceUpdated(userResource,resourceType);
            }

            $scope.updateUserResource = updateUserResource;

            $scope.userResource = userResourceService[resourceType].get({id: $routeParams.userResourceId}, function () {
                var throttledSave = throttle(updateUserResource, 1000);
                $scope.$watch('userResource', function (userResource) {
                    throttledSave(userResource);
                }, true /* deep equality */);
            });

            $scope.$on('$locationChangeStart', function () {
                contentTreeService.userResourceUpdated($scope.userResource);
                $scope.userResource.$save();
            });

            // FIXME: change title !

            function parseClass(Class) {
                var basicClasses = ['commoner', 'aristocrat', 'expert', 'warrior', 'adept'];

                function parseSingleClass(singleClass) {
                    var words = singleClass.split(" ");
                    var readClass = '';
                    var classLevel = 0;
                    for (var i in words) {
                        if (isNaN(Number(words[i]))) {
                            if (i > 0) {
                                readClass += " ";
                            }
                            readClass += words[i]
                        }
                        else {
                            classLevel = Number(words[i]);
                        }
                    }
                    return {Class: readClass.trim(), Level: classLevel};
                }

                if (Class.indexOf('/') === -1) {
                    var singleClass = parseSingleClass(Class);
                    var heroic = basicClasses.indexOf(singleClass.class) === -1;
                    return {'Heroic': heroic, 'Level': singleClass.Level, 'Classes': [singleClass]};
                }
                else {
                    var classes = Class.split('/');
                    var multipleClasses = [];
                    var heroic = false;
                    var level = 0;
                    for (var j in classes) {
                        multipleClasses[j] = parseSingleClass(classes[j]);
                        level += multipleClasses[j].Level;
                        if (!heroic) {
                            heroic = basicClasses.indexOf(multipleClasses[j].class) === -1;
                        }
                    }
                    return {'Heroic': heroic, 'Level': level, 'Classes': multipleClasses};
                }
            }
        }
    ])
;