'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('favouriteTree',
    ['$rootScope', '$timeout', '$routeParams', 'favouriteService', 'locationService',
        function ($rootScope, $timeout, $routeParams, favouriteService, locationService) {

            function link(scope, element) {

                function onClick(event, data) {
                    if (data.node.folder) {
                        data.node.setExpanded(!data.node.isExpanded());
                    }
                    else {
                        $timeout(function () {
                            locationService.goToDetails(data.node.data.type, data.node.data.id);
                        });
                    }

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
//                        extensions: ["dnd"],
                        source: favouriteService.favourites(),
                        click: onClick,
                        expand: onExpandOrCollapse,
                        collapse: onExpandOrCollapse,
                        dnd: {
                            preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
                            preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
                            autoExpandMS: 400,
//                            dragStart: function (node, data) {
//                                // This function MUST be defined to enable dragging for the tree.
//                                // Return false to cancel dragging of node.
//                                //    if( data.originalEvent.shiftKey ) ...
//                                return true;
//                            },
//                            dragEnter: function (node, data) {
//                                return node.folder || ["before", "after"];
//                            },
//                            dragOver: function (node, data) {
//                            },
//                            dragLeave: function (node, data) {
//                            },
//                            dragStop: function (node, data) {
//                            },
//                            dragDrop: function (node, data) {
//                                // This function MUST be defined to enable dropping of items on the tree.
//                                // hitMode is 'before', 'after', or 'over'.
//                                // We could for example move the source to the new target:
//                                data.otherNode.moveTo(node, data.hitMode);
//                                //FIXME
//                                //favouriteService.treeChanged(tree.toDict(removeExtraClasses));
//                            },
//                            draggable: {
//                                zIndex: 1000,
//                                scroll: false
//                            }
                        }
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