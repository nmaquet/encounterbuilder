'use strict';

DEMONSQUID.encounterBuilderDirectives.directive('contentTree',
    ['$rootScope', '$timeout', '$routeParams', 'contentTreeService', 'encounterService',
        function ($rootScope, $timeout, $routeParams, contentTreeService, encounterService) {

            function link(scope, element) {

                function onActivate(event, data) {
                    contentTreeService.treeChanged(tree.toDict());
                    $timeout(function () {
                        var node = data.node;
                        if (node.data.encounterId) {
                            scope.go("/encounter/" + node.data.encounterId);
                        } else if (node.folder) {
                            scope.go("/binder/" + node.key);
                        }
                    });
                }

                function onExpandOrCollapse(event, data) {
                    contentTreeService.treeChanged(tree.toDict());
                }



                var tree;

                function initTree() {

                    element.fancytree({
                        extensions: ["dnd"],
                        source: contentTreeService.contentTree(),
                        activate: onActivate,
                        expand: onExpandOrCollapse,
                        collapse: onExpandOrCollapse,
                        dnd: {
                            preventVoidMoves: true, // Prevent dropping nodes 'before self', etc.
                            preventRecursiveMoves: true, // Prevent dropping nodes on own descendants
                            autoExpandMS: 400,
                            dragStart: function (node, data) {
                                // This function MUST be defined to enable dragging for the tree.
                                // Return false to cancel dragging of node.
                                //    if( data.originalEvent.shiftKey ) ...
                                return true;
                            },
                            dragEnter: function (node, data) {
                                return node.folder || ["before", "after"];
                            },
                            dragOver: function (node, data) {
                            },
                            dragLeave: function (node, data) {
                            },
                            dragStop: function (node, data) {
                            },
                            dragDrop: function (node, data) {
                                // This function MUST be defined to enable dropping of items on the tree.
                                // hitMode is 'before', 'after', or 'over'.
                                // We could for example move the source to the new target:
                                data.otherNode.moveTo(node, data.hitMode);
                                contentTreeService.treeChanged(tree.toDict());
                            },
                            draggable: {
                                zIndex: 1000,
                                scroll: false
                            }
                        }
                    });

                    tree = element.fancytree("getTree");
                    contentTreeService.setTree(tree);
                    if ($routeParams.encounterId) {
                        tree.visit(function (node) {
                            if (node.data.encounterId && node.data.encounterId === $routeParams.encounterId) {
                                node.setActive(true);
                                return false;
                            }
                        });
                    } else if ($routeParams.binderId) {
                        tree.visit(function (node) {
                            if (node.folder && node.key === $routeParams.binderId) {
                                node.setActive(true);
                                return false;
                            }
                        });
                    }
                }

                if (contentTreeService.contentTree()) {
                    initTree();
                }
                else {
                    contentTreeService.onLoadSuccess(initTree);
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