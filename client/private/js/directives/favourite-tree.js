'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('favouriteTree',
    ['$rootScope', '$timeout', '$routeParams', 'favouriteService', 'locationService', 'encounterEditorService',
        function ($rootScope, $timeout, $routeParams, favouriteService, locationService, encounterEditorService) {

            function link(scope, element) {

                function onClick(event, data) {
                    $timeout(function () {
                        if ($(event.toElement).text() === "+") {
                            var node = data.node;
                            var type = node.data.type;
                            var userCreated = node.data.userCreated;
                            var id = node.data.id;
                            if (type !== "item") {
                                if (userCreated) {
                                    encounterEditorService.addUserNpcOrMonster(type, id);
                                }
                                else {
                                    encounterEditorService.addNpcOrMonster(type, id);
                                }
                            }
                            else {
                                if (userCreated) {
                                    encounterEditorService.addUserItem(id);
                                } else {
                                    encounterEditorService.addItem(id);
                                }
                            }
                        }
                        else if (!data.node.folder) {
                            locationService.goToDetails(data.node.data.type, data.node.data.id);
                        }
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
                        extensions: ["add-to-encounter"],
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