'use strict';

DEMONSQUID.confirmClick = {
    nextPopOverId : 0
}

DEMONSQUID.encounterBuilderDirectives.directive('confirmClick', function () {
    return {
        priority: 1,
        terminal: true,
        link: function (scope, element, attr) {

            var id = DEMONSQUID.confirmClick.nextPopOverId++;
            var yesId = "confirm-dialog-btn-yes-" + id;
            var noId = "confirm-dialog-btn-no-" + id;

            var popoverOptions = {
                trigger: 'manual',
                title: attr.confirmTitle || 'Confirmation',
                html: true,
                placement: 'right',
                container: 'body',
                content: attr.confirmClick + '\
						<p class="button-group" style="margin-top: 10px; text-align: center;">\
							<button type="button" class="btn btn-small btn-danger confirm-dialog-btn-yes" id="' + yesId + '">Yes</button>\
							<button type="button" class="btn btn-small confirm-dialog-btn-no" id="' + noId + '">No</button>\
						</p>'
            };

            var self = $(element);
            self.popover(popoverOptions);

            self.bind('click', function (e) {
                self.popover('show');
                $('#' + yesId).bind('click', function (e) {
                    scope.$eval(attr.ngClick);
                    self.popover('hide');
                });
                $('#' + noId).bind('click', function (e) {
                    self.popover('hide');
                });
            });
        }
    };
});