// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

'use strict';

DEMONSQUID.encounterBuilderServices.factory('viewportService', [ '$rootScope', '$timeout', function ($rootScope, $timeout) {

    var VIEWPORT_CHANGED = 'ViewportChanged';

    var service = {
        viewport: {
            xs: false,
            sm: false,
            md: false,
            lg: false
        },
        register: function(callback) {
            callback();
            $rootScope.$on(VIEWPORT_CHANGED, callback);
        }
    };

    window.viewport = service.viewport;

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
        $rootScope.$emit(VIEWPORT_CHANGED);
        $timeout(function(){
            $rootScope.$apply();
        });
    }

    $(window).resize(function () {
        onResize();
    });

    onResize();

    return service;
}]);