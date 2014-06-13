'use strict';

DEMONSQUID.encounterBuilderServices.factory('viewportService', [ function () {

    var service = {
        viewport: {
            xs: false,
            sm: false,
            md: false,
            lg: false
        }
    };

    function onResize() {
        var viewportWidth = $(window).width();
        service.viewport.xs = false;
        service.viewport.sm = false;
        service.viewport.md = false;
        service.viewport.lg = false;
        if (viewportWidth < 768) {
            service.viewport.xs = true;
        } else if (viewportWidth < 992) {
            service.viewport.sm = true;
        } else if (viewportWidth < 1200) {
            service.viewport.md = true;
        } else {
            service.viewport.lg = true;
        }
    }

    $(window).resize(function () {
        onResize();
    });

    onResize();

    return service;
}]);