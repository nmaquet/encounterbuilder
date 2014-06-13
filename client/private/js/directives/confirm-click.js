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
            var placement = 'left';
            if (!$rootScope.viewport.xs) {
                placement = 'right';
            }

            self.bind('click', function (e) {
                var popoverOptions = {
                    trigger: 'manual',
                    title: scope.confirmTitle || 'Confirmation',
                    html: true,
                    placement: placement,
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
                $rootScope.$on('$locationChangeStart', function (e) {
                    self.popover('destroy');
                });
            });
        }
    };
}]);