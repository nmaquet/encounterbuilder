// Copyright (c) 2014 DemonSquid, Inc. All rights reserved.

"use strict";

DEMONSQUID.encounterBuilderFilters.filter('timestampToHowlongago', function () {
    return function (value) {
        if (value === undefined) {
            return '';
        }
        var timeDifference = new Date().getTime() - new Date(value).getTime();
        var howLongAgo = '';
        if (timeDifference < 60 * 1000) {
            howLongAgo = "now";
        }
        else if (timeDifference < 60 * 60 * 1000) {
            var roundedTimeDiff = Math.round(timeDifference / 60000);
            howLongAgo = roundedTimeDiff + ((roundedTimeDiff === 1 ) ? " minute ago" : " minutes ago");
        }
        else if (timeDifference < 24 * 60 * 60 * 1000) {
            var roundedTimeDiff = Math.round(timeDifference / (60 * 60 * 1000));
            howLongAgo = roundedTimeDiff + ((roundedTimeDiff === 1 ) ? " hour ago" : " hours ago");
        }
        else if (timeDifference < 7 * 24 * 60 * 60 * 1000) {
            var roundedTimeDiff = Math.round(timeDifference / ( 24 * 60 * 60 * 1000));
            howLongAgo = roundedTimeDiff + ((roundedTimeDiff === 1 ) ? " day ago" : " days ago");
        }
        else if (timeDifference < 365 * 24 * 60 * 60 * 1000) {
            var roundedTimeDiff = Math.round(timeDifference / (30 * 24 * 60 * 60 * 1000));
            howLongAgo = roundedTimeDiff + ((roundedTimeDiff === 1 ) ? " month ago" : " months ago");
        }
        else if (timeDifference > 365 * 24 * 60 * 60 * 1000) {
            var roundedTimeDiff = Math.round(timeDifference / (365 * 24 * 60 * 60 * 1000));
            howLongAgo = roundedTimeDiff + ((roundedTimeDiff === 1 ) ? " year ago" : " years ago");
        }
        return howLongAgo;
    };
});