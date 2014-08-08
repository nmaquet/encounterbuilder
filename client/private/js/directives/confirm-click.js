// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.confirmClick = {
    nextPopOverId: 0
}

DEMONSQUID.encounterBuilderDirectives.directive('confirmClick', ['$rootScope', function ($rootScope) {
    return {
        priority: 1,
        terminal: true,
        scope: {
            confirmClick: "@",
            confirmTitle: "@",
            onConfirm: '&'
        },
        link: function (scope, element) {

            var id = DEMONSQUID.confirmClick.nextPopOverId++;
            var yesId = "confirm-dialog-btn-yes-" + id;
            var noId = "confirm-dialog-btn-no-" + id;

            var self = $(element);

            self.bind('click', function (e) {
                var popoverOptions = {
                    trigger: 'manual',
                    title: scope.confirmTitle || 'Confirmation',
                    html: true,
                    placement: function (context, source) {
                        var viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
                        var viewportWidth = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
                        var left = $(source).offset().left;
                        var top = $(source).offset().top;
                        var right = viewportWidth - left;
                        var bottom = viewportHeight - top;
                        return {
                            top: "top",
                            left: "left",
                            right: "right",
                            bottom: "bottom"
                        }[Math.max(top, left, right, bottom)];
                    },
                    container: '#wrapper',
                    content: scope.confirmClick + '\
						<p class="button-group" style="margin-top: 10px; text-align: center;">\
							<button type="button" class="btn btn-small btn-danger confirm-dialog-btn-yes" id="' + yesId + '">Yes</button>\
							<button type="button" class="btn btn-small confirm-dialog-btn-no" id="' + noId + '">No</button>\
						</p>'
                };
                self.popover(popoverOptions);
                self.popover('show');
                $('#' + yesId).bind('click', function (e) {
                    scope.$apply(scope.onConfirm);
                    self.popover('destroy');
                });
                $('#' + noId).bind('click', function (e) {
                    self.popover('destroy');
                });
                scope.$on('$locationChangeStart', function (e) {
                    self.popover('destroy');
                });
            });
        }
    };
}]);