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
                contentTreeService.userResourceUpdated($scope.userResource);
                $scope.userResource.$save(function () {
                    locationService.go("/chronicle/" + $routeParams.chronicleId + "/" + resourceType + "/" + $routeParams.userResourceId);
                });

            };

            function updateUserResource(userResource) {
                if ($scope.classesString) {
                    var classesObject = parseClass($scope.classesString);
                    $scope.userResource.Classes = classesObject.Classes;
                    $scope.userResource.Heroic = classesObject.Heroic;
                    $scope.userResource.Level = classesObject.Level;
                    $scope.classesString = $filter("classesToString")($scope.userResource.Classes);
                }
                $scope.userResource.$save();
                contentTreeService.userResourceUpdated(userResource, resourceType);
            }

            $scope.exceptLastModified = function (userResource) {
                var result = angular.copy(userResource);
                delete result.lastModified;
                return result;
            };

            $scope.updateUserResource = updateUserResource;
            userResourceService[resourceType].getNoCache({id: $routeParams.userResourceId}, function (resource) {
                $scope.userResource = resource;
                var throttledSave = throttle(updateUserResource, 5000);
                $scope.$watch('exceptLastModified(userResource)', function () {
                    throttledSave($scope.userResource);
                }, true /* deep equality */);
                if ($scope.userResource.Classes) {
                    $scope.classesString = $filter("classesToString")($scope.userResource.Classes);
                }
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