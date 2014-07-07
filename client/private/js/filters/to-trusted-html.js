'use strict';

DEMONSQUID.encounterBuilderFilters .filter('toTrustedHtml', ['$sce', function($sce){
    return function(text) {
        return $sce.trustAsHtml(text);
    };
}]);