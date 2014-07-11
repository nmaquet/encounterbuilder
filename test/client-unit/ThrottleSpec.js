"use strict";

var expect = chai.expect;

var throttle, $timeout;

var fooCalls = 0;

function foo() {
    fooCalls++;
}

describe("throttle", function () {

    beforeEach(module("encounterBuilderApp"));

    beforeEach(inject(function (_throttle_, _$timeout_) {
        throttle = _throttle_;
        $timeout = _$timeout_;
        fooCalls = 0;
    }));

    it("should just call the function if the delay is zero", function (done) {
        var throttledFoo = throttle(function() {
            done();
        }, 0);
        throttledFoo();
        $timeout.flush();
    });

    it("should just call the function once if called 3 x every 10ms on a 100ms delay", function (done) {
        var throttledFoo = throttle(function() {
            done();
        }, 100);
        $timeout(function(){
            throttledFoo();
            $timeout(function(){
                throttledFoo();
                $timeout(function(){
                    throttledFoo();
                },300);
                $timeout.flush();
            },300);
            $timeout.flush();
        },300);
        $timeout.flush();
    });
});