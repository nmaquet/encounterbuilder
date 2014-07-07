'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('favouriteTree',
    ['$rootScope', '$timeout', '$routeParams', 'favouriteService', 'locationService',
        function ($rootScope, $timeout, $routeParams, favouriteService, locationService) {

            function link(scope, element) {

                function onClick(event, data) {
                    $timeout(function () {
                        locationService.goToDetails(data.node.data.type, data.node.data.id);
                    });
                }

                function onExpandOrCollapse(event, data) {
                    favouriteService.treeChanged();
                }

                var tree;

                function handleExtraClasses(node) {
                    node.extraClasses = "fancytree-" + node.data.type;
                }

                function initTree() {
                    element.fancytree({
                        source: favouriteService.favourites(),
                        click: onClick,
                        expand: onExpandOrCollapse,
                        collapse: onExpandOrCollapse,
                        clickFolderMode: 2 /* expand folder on click */
                    });
                    tree = element.fancytree("getTree");
                    favouriteService.setTree(tree);
                    tree.visit(handleExtraClasses);
                }

                if (favouriteService.favourites()) {
                    initTree();
                }
                else {
                    favouriteService.onLoadSuccess(initTree);
                }
            }

            return {
                restrict: "E",
                template: "<div></div>",
                replace: true,
                link: link
            };
        }
    ]);